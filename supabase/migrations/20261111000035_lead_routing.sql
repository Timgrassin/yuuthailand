-- 0035 Lead routing (brief Phase 1, items 5 and 6).
-- A new lead is qualified (duplicate check), then sent to up to 3 matching Verified providers with an email
-- carrying one-tap Accept and Decline links (unguessable token, 7 days). Providers see contact details only
-- after they accept (D10). Leads wait while no Verified provider matches (D29) and are retried hourly for 14 days.

alter table public.lead_deliveries
  add column token text unique,
  add column token_expires_at timestamptz,
  add column reminded_at timestamptz,
  add column escalated_at timestamptz;

-- Provider types that can serve a visa track.
create or replace function public.provider_types_for(p_track text)
returns text[] language sql immutable as $$
  select case
    when p_track is null then array['language_school', 'muay_thai_camp', 'cooking_school', 'massage_school', 'visa_agent']
    when p_track = 'ed' then array['language_school']
    when p_track = 'dtv' then array['muay_thai_camp', 'cooking_school', 'massage_school', 'language_school']
    else array['visa_agent']
  end;
$$;

-- What a provider sees before accepting: no name, email, phone or LINE.
create or replace function public.lead_summary(p_lead uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'track', l.track, 'city', c.name_en, 'nationality', l.nationality,
    'start_month', to_char(l.start_month, 'YYYY-MM'), 'message', l.message,
    'received', to_char(l.created_at at time zone 'Asia/Bangkok', 'YYYY-MM-DD HH24:MI'))
  from public.leads l left join public.cities c on c.id = l.city_id where l.id = p_lead;
$$;

create or replace function public.route_lead(p_lead uuid)
returns int language plpgsql security definer set search_path = '' as $$
declare
  l public.leads%rowtype;
  v_dup uuid;
  v_open int;
  v_requested uuid;
  v_sent int := 0;
  r record;
  v_token text;
begin
  select * into l from public.leads where id = p_lead for update;
  if not found or l.status in ('spam', 'duplicate') then return 0; end if;

  if l.status = 'new' then
    -- Same person, open request in the last 30 days: mark as duplicate instead of sending again.
    select x.id into v_dup from public.leads x
     where x.email = l.email and x.id <> l.id and x.status in ('new', 'qualified')
       and x.created_at < l.created_at and x.created_at > l.created_at - interval '30 days'
     order by x.created_at limit 1;
    if v_dup is not null then
      update public.leads set status = 'duplicate', duplicate_of = v_dup where id = l.id;
      return 0;
    end if;
    update public.leads set status = 'qualified', qualified_at = now() where id = l.id;
  end if;

  select count(*) into v_open from public.lead_deliveries d where d.lead_id = l.id and d.status <> 'declined';
  if v_open >= 3 then return 0; end if;
  v_requested := nullif(l.answers ->> 'requested_provider_id', '')::uuid;

  for r in
    select p.id, p.name_en, p.email::text as email
      from public.providers p
     where p.status = 'verified' and p.email is not null
       and not exists (select 1 from public.lead_deliveries d where d.lead_id = l.id and d.provider_id = p.id)
       and (p.id = v_requested
            or ((l.city_id is null or p.city_id = l.city_id) and p.provider_type = any (public.provider_types_for(l.track))))
     order by (p.id = v_requested) desc nulls last, jsonb_array_length(coalesce(p.facts, '[]'::jsonb)) desc, random()
     limit 3 - v_open
  loop
    v_token := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
    insert into public.lead_deliveries (lead_id, provider_id, token, token_expires_at)
    values (l.id, r.id, v_token, now() + interval '7 days');
    perform public.enqueue_email('provider_new_lead', r.email,
      public.lead_summary(l.id) || jsonb_build_object('provider', r.name_en, 'token', v_token), l.id);
    v_sent := v_sent + 1;
  end loop;
  return v_sent;
end $$;

-- After a lead arrives through the site: route it, tell the person, tell the team. Never fails the submission.
-- Leads inserted by hand (admin, tests) are not routed until route_lead() is called.
create or replace function public.after_lead_submitted(p_lead uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_sent int := 0;
  l public.leads%rowtype;
begin
  begin
    v_sent := public.route_lead(p_lead);
  exception when others then
    raise warning 'route_lead failed for %: %', p_lead, sqlerrm;
  end;
  select * into l from public.leads where id = p_lead;
  perform public.enqueue_email('lead_received', l.email, public.lead_summary(l.id) || jsonb_build_object('first_name', split_part(l.full_name, ' ', 1), 'sent', v_sent), l.id);
  perform public.enqueue_email('ops_new_lead', public.ops_email(), public.lead_summary(l.id) || jsonb_build_object('id', l.id, 'sent', v_sent), l.id);
end $$;

-- submit_lead from 0026 with two changes: it calls after_lead_submitted, and marketing_opt_in is false (not null)
-- when the box is unticked. Before this fix, every request without the marketing box failed.
create or replace function public.submit_lead(p jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_consent uuid;
  v_id uuid;
  v_email text := lower(trim(p ->> 'email'));
  v_name text := trim(p ->> 'full_name');
begin
  if coalesce(length(v_name), 0) < 2 or length(v_name) > 120 then raise exception 'invalid name' using errcode = '22023'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' then raise exception 'invalid email' using errcode = '22023'; end if;
  if (p ->> 'consent') is distinct from 'on' then raise exception 'consent required' using errcode = '22023'; end if;
  -- Rate limits: 3 per email per day, 10 per ip hash per hour.
  if (select count(*) from public.leads l where l.email = v_email and l.created_at > now() - interval '1 day') >= 3 then
    raise exception 'rate limited' using errcode = '53400';
  end if;
  if nullif(p ->> 'ip_hash', '') is not null and (select count(*) from public.leads l where l.ip_hash = p ->> 'ip_hash' and l.created_at > now() - interval '1 hour') >= 10 then
    raise exception 'rate limited' using errcode = '53400';
  end if;
  select id into v_consent from public.consent_texts
    where key = 'lead_form' and locale = 'en' and published_at is not null order by version desc limit 1;
  insert into public.leads (full_name, email, phone, line_id, nationality, city_id, track, checker_result_id, start_month, message,
                            answers, consent_text_id, marketing_opt_in, source_path, ip_hash, user_agent)
  values (v_name, v_email, left(nullif(p ->> 'phone', ''), 40), left(nullif(p ->> 'line_id', ''), 60),
          upper(nullif(p ->> 'nationality', ''))::char(2),
          nullif(p ->> 'city_id', '')::uuid, left(nullif(p ->> 'track', ''), 40), nullif(p ->> 'checker_result_id', '')::uuid,
          case when (p ->> 'start_month') ~ '^\d{4}-\d{2}$' then ((p ->> 'start_month') || '-01')::date end,
          left(nullif(p ->> 'message', ''), 2000),
          case when nullif(p ->> 'provider_id', '') is not null then jsonb_build_object('requested_provider_id', p ->> 'provider_id') else '{}'::jsonb end,
          v_consent, coalesce((p ->> 'marketing') = 'on', false), left(p ->> 'source_path', 300), nullif(p ->> 'ip_hash', ''), left(p ->> 'user_agent', 300))
  returning id into v_id;
  perform public.after_lead_submitted(v_id);
  if (p ->> 'marketing') = 'on' then
    perform public.subscribe(v_email, p ->> 'source_path', 'lead_form', case when nullif(p ->> 'track', '') is null then '{}'::text[] else array[p ->> 'track'] end, '{}');
  end if;
  return v_id;
end $$;

-- The provider's page behind the email link. Contact details only once accepted (D10).
create or replace function public.get_delivery(p_token text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select public.lead_summary(d.lead_id) || jsonb_build_object(
      'status', d.status, 'provider', p.name_en, 'expired', d.token_expires_at < now(),
      'contact', case when d.status in ('accepted', 'enrolled') then
        jsonb_build_object('name', l.full_name, 'email', l.email, 'phone', l.phone, 'line_id', l.line_id, 'whatsapp', l.whatsapp) end)
    from public.lead_deliveries d
    join public.providers p on p.id = d.provider_id
    join public.leads l on l.id = d.lead_id
   where p_token ~ '^[0-9a-f]{64}$' and d.token = p_token;
$$;

create or replace function public.respond_to_delivery(p_token text, p_action text, p_reason text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  d public.lead_deliveries%rowtype;
  v_provider record;
  l public.leads%rowtype;
begin
  if p_token !~ '^[0-9a-f]{64}$' then raise exception 'not found' using errcode = 'P0002'; end if;
  select * into d from public.lead_deliveries where token = p_token for update;
  if not found then raise exception 'not found' using errcode = 'P0002'; end if;
  if d.status <> 'sent' then return public.get_delivery(p_token); end if;
  if d.token_expires_at < now() then raise exception 'expired' using errcode = '22023'; end if;
  select p.name_en, p.email::text as email, p.website into v_provider from public.providers p where p.id = d.provider_id;
  select * into l from public.leads where id = d.lead_id;

  if p_action = 'accept' then
    update public.lead_deliveries set status = 'accepted' where id = d.id;
    perform public.enqueue_email('provider_lead_contact', v_provider.email,
      public.lead_summary(l.id) || jsonb_build_object('provider', v_provider.name_en, 'token', p_token,
        'name', l.full_name, 'email', l.email, 'phone', l.phone, 'line_id', l.line_id, 'whatsapp', l.whatsapp), l.id);
    perform public.enqueue_email('lead_matched', l.email,
      jsonb_build_object('first_name', split_part(l.full_name, ' ', 1), 'provider', v_provider.name_en, 'website', v_provider.website), l.id);
  elsif p_action = 'decline' then
    if coalesce(length(trim(p_reason)), 0) < 3 then raise exception 'reason required' using errcode = '22023'; end if;
    update public.lead_deliveries set status = 'declined', decline_reason = left(trim(p_reason), 500) where id = d.id;
    perform public.route_lead(l.id); -- offer the request to another match
  else
    raise exception 'invalid action' using errcode = '22023';
  end if;
  return public.get_delivery(p_token);
end $$;

-- Hourly: reminders after 12 hours, team alert after 24, and retry waiting leads for 14 days.
create or replace function public.lead_followups()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  n_remind int := 0; n_escalate int := 0; n_routed int := 0;
  r record;
begin
  for r in select d.id, d.lead_id, d.token, p.name_en, p.email::text as email from public.lead_deliveries d join public.providers p on p.id = d.provider_id
            where d.status = 'sent' and d.reminded_at is null and d.sent_at < now() - interval '12 hours' and d.token_expires_at > now() and p.email is not null
  loop
    perform public.enqueue_email('provider_reminder', r.email, public.lead_summary(r.lead_id) || jsonb_build_object('provider', r.name_en, 'token', r.token), r.lead_id);
    update public.lead_deliveries set reminded_at = now() where id = r.id;
    n_remind := n_remind + 1;
  end loop;
  for r in select d.id, d.lead_id, p.name_en from public.lead_deliveries d join public.providers p on p.id = d.provider_id
            where d.status = 'sent' and d.escalated_at is null and d.sent_at < now() - interval '24 hours'
  loop
    perform public.enqueue_email('ops_delivery_stale', public.ops_email(), jsonb_build_object('lead_id', r.lead_id, 'provider', r.name_en), r.lead_id);
    update public.lead_deliveries set escalated_at = now() where id = r.id;
    n_escalate := n_escalate + 1;
  end loop;
  for r in select l.id from public.leads l
            where l.status in ('new', 'qualified') and l.created_at > now() - interval '14 days'
              and not exists (select 1 from public.lead_deliveries d where d.lead_id = l.id and d.status <> 'declined')
  loop
    n_routed := n_routed + public.route_lead(r.id);
  end loop;
  return jsonb_build_object('reminders', n_remind, 'escalations', n_escalate, 'routed', n_routed);
end $$;

revoke all on function public.provider_types_for(text) from public;
revoke all on function public.lead_summary(uuid) from public, anon, authenticated;
revoke all on function public.route_lead(uuid) from public, anon, authenticated;
revoke all on function public.after_lead_submitted(uuid) from public, anon, authenticated;
revoke all on function public.lead_followups() from public, anon, authenticated;
revoke all on function public.get_delivery(text) from public;
revoke all on function public.respond_to_delivery(text, text, text) from public;
grant execute on function public.get_delivery(text) to anon, authenticated;
grant execute on function public.respond_to_delivery(text, text, text) to anon, authenticated;

-- Schedules. pg_cron and pg_net exist on Supabase, not in the plain Postgres used by CI, so this is guarded.
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron')
     and exists (select 1 from pg_available_extensions where name = 'pg_net') then
    create extension if not exists pg_net;
    create extension if not exists pg_cron;
    perform cron.schedule('staylong-retention', '17 19 * * *', 'select public.apply_retention()');
    perform cron.schedule('staylong-lead-followups', '5 * * * *', 'select public.lead_followups()');
    -- The outbox function only sends rows already queued, so calling it needs no key (verify_jwt off).
    perform cron.schedule('staylong-outbox', '*/5 * * * *',
      $cron$select net.http_post(url := 'https://fbopazqtgbukzdgbwlzf.supabase.co/functions/v1/outbox', body := '{}'::jsonb, timeout_milliseconds := 20000)$cron$);
  end if;
end $$;
