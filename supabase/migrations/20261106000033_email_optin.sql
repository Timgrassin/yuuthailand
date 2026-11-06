-- Double opt-in for subscribers (D27).
-- The confirmation email is sent by the Supabase Edge Function `send-confirmation`, which runs with the
-- service role, so the confirm token never reaches a public client. Confirm and unsubscribe take an
-- unguessable token from the email link and are callable with the publishable key.

alter table public.subscribers
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid(),
  add column if not exists confirm_sent_at timestamptz,
  add column if not exists confirm_sends_today int not null default 0;
create unique index if not exists subscribers_unsubscribe_token_key on public.subscribers (unsubscribe_token);

-- Service role only. Returns what the confirmation email needs and records the send, or nothing when the
-- subscriber is not pending or was emailed in the last 10 minutes or 3 times in the last day.
create or replace function public.claim_confirmation_email(p_email text)
returns table (email text, confirm_token uuid, unsubscribe_token uuid, lead_magnet text)
language plpgsql security definer set search_path = '' as $$
begin
  return query
  update public.subscribers s
     set confirm_sends_today = case when s.confirm_sent_at is null or s.confirm_sent_at < now() - interval '1 day' then 1 else s.confirm_sends_today + 1 end,
         confirm_sent_at = now()
   where s.email = lower(trim(p_email))
     and s.status = 'pending'
     and (s.confirm_sent_at is null
          or (s.confirm_sent_at < now() - interval '10 minutes'
              and (s.confirm_sends_today < 3 or s.confirm_sent_at < now() - interval '1 day')))
  returning s.email::text, s.confirm_token, s.unsubscribe_token, s.lead_magnet;
end $$;

-- Public: confirm from the email link. Returns 'confirmed', 'already' or 'invalid'.
create or replace function public.confirm_subscription(p_token uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare v_status public.subscriber_status;
begin
  select status into v_status from public.subscribers where confirm_token = p_token;
  if v_status is null then return 'invalid'; end if;
  if v_status = 'confirmed' then return 'already'; end if;
  update public.subscribers set status = 'confirmed', confirmed_at = now(), unsubscribed_at = null
   where confirm_token = p_token;
  return 'confirmed';
end $$;

-- Public: one-click unsubscribe from any email. Returns true when the token matched.
create or replace function public.unsubscribe(p_token uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  update public.subscribers set status = 'unsubscribed', unsubscribed_at = coalesce(unsubscribed_at, now())
   where unsubscribe_token = p_token;
  return found;
end $$;

revoke all on function public.claim_confirmation_email(text) from public, anon, authenticated;
revoke all on function public.confirm_subscription(uuid) from public;
revoke all on function public.unsubscribe(uuid) from public;
grant execute on function public.claim_confirmation_email(text) to service_role;
grant execute on function public.confirm_subscription(uuid) to anon, authenticated;
grant execute on function public.unsubscribe(uuid) to anon, authenticated;
