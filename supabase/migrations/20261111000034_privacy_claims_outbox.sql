-- 0034 Privacy requests, listing claims, an email outbox and data retention.
-- Public writes stay SECURITY DEFINER functions called with the publishable key (D19).
-- Emails are queued in public.outbox and sent by the Edge Function `outbox` (service role, Resend).

-- Privacy requests (PDPA): access, correction, deletion, withdrawal. Handled by hand with erase_person().
create table public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null,
  kind text not null check (kind in ('delete', 'access', 'correct', 'withdraw', 'other')),
  details text,
  status text not null default 'open' check (status in ('open', 'done', 'rejected')),
  ip_hash text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolution_note text
);
create index privacy_requests_open_idx on public.privacy_requests (status, created_at);

-- Listing claims from schools, camps and agents. Reviewed by hand before anything changes on a listing.
create table public.provider_claims (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references public.providers (id) on delete set null,
  listing text,
  full_name text not null,
  role text,
  email extensions.citext not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'approved', 'rejected')),
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index provider_claims_status_idx on public.provider_claims (status, created_at);
create trigger provider_claims_updated_at before update on public.provider_claims
  for each row execute function public.set_updated_at();

-- Outbox: every email the site sends is a row here first. payload holds what the template needs.
create table public.outbox (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  to_email extensions.citext not null,
  payload jsonb not null default '{}',
  ref_id uuid,
  send_after timestamptz not null default now(),
  claimed_at timestamptz,
  sent_at timestamptz,
  attempts int not null default 0,
  last_error text,
  created_at timestamptz not null default now()
);
create index outbox_due_idx on public.outbox (send_after) where sent_at is null;

-- Only the team reads these. RLS covers signed-in staff; anon gets no table rights at all.
revoke all on public.privacy_requests, public.provider_claims, public.outbox from anon;
alter table public.privacy_requests enable row level security;
alter table public.provider_claims enable row level security;
alter table public.outbox enable row level security;
create policy privacy_requests_staff on public.privacy_requests for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy provider_claims_staff on public.provider_claims for all to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy outbox_admin on public.outbox for select to authenticated using ((select public.is_admin()));

-- Where operational emails go. Redefine this function to change it.
create or replace function public.ops_email() returns text language sql immutable as $$ select 'hello@staylong.co' $$;

create or replace function public.enqueue_email(p_kind text, p_to text, p_payload jsonb, p_ref uuid default null, p_after timestamptz default now())
returns uuid language sql security definer set search_path = '' as $$
  insert into public.outbox (kind, to_email, payload, ref_id, send_after) values (p_kind, p_to, coalesce(p_payload, '{}'), p_ref, p_after) returning id;
$$;

create or replace function public.submit_privacy_request(p_email text, p_kind text, p_details text default null, p_ip_hash text default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(trim(p_email));
  v_id uuid;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' or length(v_email) > 200 then raise exception 'invalid email' using errcode = '22023'; end if;
  if p_kind not in ('delete', 'access', 'correct', 'withdraw', 'other') then raise exception 'invalid kind' using errcode = '22023'; end if;
  if (select count(*) from public.privacy_requests r where r.email = v_email and r.created_at > now() - interval '1 day') >= 3
     or (nullif(p_ip_hash, '') is not null and (select count(*) from public.privacy_requests r where r.ip_hash = p_ip_hash and r.created_at > now() - interval '1 hour') >= 5) then
    raise exception 'rate limited' using errcode = '53400';
  end if;
  insert into public.privacy_requests (email, kind, details, ip_hash) values (v_email, p_kind, left(nullif(trim(p_details), ''), 2000), nullif(p_ip_hash, ''))
  returning id into v_id;
  perform public.enqueue_email('ops_privacy_request', public.ops_email(), jsonb_build_object('id', v_id, 'email', v_email, 'kind', p_kind, 'details', left(p_details, 2000)), v_id);
  perform public.enqueue_email('privacy_request_received', v_email, jsonb_build_object('kind', p_kind), v_id);
  return v_id;
end $$;

create or replace function public.submit_provider_claim(p jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(trim(p ->> 'email'));
  v_name text := trim(p ->> 'full_name');
  v_provider uuid;
  v_id uuid;
begin
  if coalesce(length(v_name), 0) < 2 or length(v_name) > 120 then raise exception 'invalid name' using errcode = '22023'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' or length(v_email) > 200 then raise exception 'invalid email' using errcode = '22023'; end if;
  if coalesce(length(trim(p ->> 'listing')), 0) < 2 then raise exception 'invalid listing' using errcode = '22023'; end if;
  if (select count(*) from public.provider_claims c where c.email = v_email and c.created_at > now() - interval '1 day') >= 5
     or (nullif(p ->> 'ip_hash', '') is not null and (select count(*) from public.provider_claims c where c.ip_hash = p ->> 'ip_hash' and c.created_at > now() - interval '1 hour') >= 10) then
    raise exception 'rate limited' using errcode = '53400';
  end if;
  -- The listing field takes a ref code (SL-XXXX-CTY), a staylong.co URL or a name.
  select pr.id into v_provider from public.providers pr
   where upper(trim(p ->> 'listing')) = pr.ref_code
      or trim(p ->> 'listing') ~ ('/providers/' || pr.slug || '/?$')
   limit 1;
  insert into public.provider_claims (provider_id, listing, full_name, role, email, phone, message, ip_hash)
  values (v_provider, left(trim(p ->> 'listing'), 300), v_name, left(nullif(trim(p ->> 'role'), ''), 120), v_email,
          left(nullif(trim(p ->> 'phone'), ''), 40), left(nullif(trim(p ->> 'message'), ''), 2000), nullif(p ->> 'ip_hash', ''))
  returning id into v_id;
  perform public.enqueue_email('ops_provider_claim', public.ops_email(), jsonb_build_object(
    'id', v_id, 'listing', p ->> 'listing', 'matched', (select pr.name_en || ' (' || pr.ref_code || ')' from public.providers pr where pr.id = v_provider),
    'full_name', v_name, 'role', p ->> 'role', 'email', v_email, 'phone', p ->> 'phone', 'message', left(p ->> 'message', 2000)), v_id);
  perform public.enqueue_email('provider_claim_received', v_email, jsonb_build_object('listing', p ->> 'listing'), v_id);
  return v_id;
end $$;

-- The Edge Function `outbox` claims due rows. A claim lasts 10 minutes, so a crashed send is retried.
create or replace function public.claim_outbox(p_limit int default 20)
returns table (id uuid, kind text, to_email text, payload jsonb) language sql security definer set search_path = '' as $$
  update public.outbox o set claimed_at = now(), attempts = o.attempts + 1
   where o.id in (select x.id from public.outbox x
                   where x.sent_at is null and x.send_after <= now() and x.attempts < 5
                     and (x.claimed_at is null or x.claimed_at < now() - interval '10 minutes')
                   order by x.send_after limit greatest(1, least(p_limit, 50)) for update skip locked)
  returning o.id, o.kind, o.to_email::text, o.payload;
$$;

create or replace function public.finish_outbox(p_id uuid, p_error text default null)
returns void language sql security definer set search_path = '' as $$
  update public.outbox set sent_at = case when p_error is null then now() end, last_error = p_error, claimed_at = case when p_error is null then claimed_at end
   where id = p_id;
$$;

-- Erase everything held about one email address (PDPA deletion). SQL editor or service role only:
-- select public.erase_person('x@y.z');
create or replace function public.erase_person(p_email text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(trim(p_email));
  n_leads int; n_subs int; n_claims int; n_outbox int;
begin
  delete from public.leads where email = v_email; get diagnostics n_leads = row_count;
  delete from public.subscribers where email = v_email; get diagnostics n_subs = row_count;
  delete from public.provider_claims where email = v_email; get diagnostics n_claims = row_count;
  delete from public.outbox where to_email = v_email or payload ->> 'email' = v_email; get diagnostics n_outbox = row_count;
  update public.privacy_requests set status = 'done', resolved_at = now(), resolution_note = coalesce(resolution_note, 'erased')
   where email = v_email and status = 'open' and kind in ('delete', 'withdraw');
  return jsonb_build_object('leads', n_leads, 'subscribers', n_subs, 'claims', n_claims, 'emails', n_outbox);
end $$;

-- Retention (privacy policy): run daily.
create or replace function public.apply_retention()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  n_leads int; n_subs int; n_results int; n_outbox int; n_requests int; n_claims int;
begin
  -- Requests to providers: 24 months, unless a provider reported an enrolment.
  delete from public.leads l where l.created_at < now() - interval '24 months'
    and not exists (select 1 from public.lead_deliveries d where d.lead_id = l.id and d.status = 'enrolled');
  get diagnostics n_leads = row_count;
  -- Email addresses never confirmed within 30 days, or unsubscribed for 30 days.
  delete from public.subscribers s where (s.status = 'pending' and s.created_at < now() - interval '30 days')
    or (s.status = 'unsubscribed' and s.unsubscribed_at < now() - interval '30 days');
  get diagnostics n_subs = row_count;
  -- Saved checker answers (no name or email): 24 months after the last view.
  delete from public.checker_results c where coalesce(c.last_viewed_at, c.created_at) < now() - interval '24 months'
    and not exists (select 1 from public.leads l where l.checker_result_id = c.id);
  get diagnostics n_results = row_count;
  delete from public.outbox o where (o.sent_at < now() - interval '30 days') or (o.sent_at is null and o.created_at < now() - interval '30 days');
  get diagnostics n_outbox = row_count;
  delete from public.privacy_requests r where r.status <> 'open' and r.resolved_at < now() - interval '24 months';
  get diagnostics n_requests = row_count;
  delete from public.provider_claims c where c.status in ('rejected', 'approved') and c.updated_at < now() - interval '24 months';
  get diagnostics n_claims = row_count;
  return jsonb_build_object('leads', n_leads, 'subscribers', n_subs, 'checker_results', n_results, 'outbox', n_outbox, 'privacy_requests', n_requests, 'claims', n_claims);
end $$;

revoke all on function public.enqueue_email(text, text, jsonb, uuid, timestamptz) from public, anon, authenticated;
revoke all on function public.claim_outbox(int) from public, anon, authenticated;
revoke all on function public.finish_outbox(uuid, text) from public, anon, authenticated;
revoke all on function public.erase_person(text) from public, anon, authenticated;
revoke all on function public.apply_retention() from public, anon, authenticated;
revoke all on function public.submit_privacy_request(text, text, text, text) from public;
revoke all on function public.submit_provider_claim(jsonb) from public;
grant execute on function public.submit_privacy_request(text, text, text, text) to anon, authenticated;
grant execute on function public.submit_provider_claim(jsonb) to anon, authenticated;
grant execute on function public.claim_outbox(int) to service_role;
grant execute on function public.finish_outbox(uuid, text) to service_role;
