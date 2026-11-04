-- 0026 Public write path without the service role key (D19).
-- The site calls these SECURITY DEFINER functions with the publishable key.
-- Each validates its input, pins consent to the published text, and rate-limits.

alter table public.subscribers
  add column if not exists lead_magnet text,
  add column if not exists meta jsonb not null default '{}';

create or replace function public.subscribe(p_email text, p_source_path text default null, p_lead_magnet text default null, p_tracks text[] default '{}', p_meta jsonb default '{}')
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  v_consent uuid;
  v_email text := lower(trim(p_email));
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' or length(v_email) > 200 then
    raise exception 'invalid email' using errcode = '22023';
  end if;
  select id into v_consent from public.consent_texts
    where key = 'subscribe' and locale = 'en' and published_at is not null order by version desc limit 1;
  if v_consent is null then raise exception 'consent text missing'; end if;
  insert into public.subscribers (email, consent_text_id, source_path, lead_magnet, tracks, meta)
  values (v_email, v_consent, left(p_source_path, 300), left(p_lead_magnet, 80), coalesce(p_tracks, '{}'), coalesce(p_meta, '{}'))
  on conflict (email) do update
    set lead_magnet = coalesce(excluded.lead_magnet, public.subscribers.lead_magnet),
        tracks = (select array(select distinct unnest(public.subscribers.tracks || excluded.tracks))),
        meta = public.subscribers.meta || excluded.meta,
        status = case when public.subscribers.status = 'unsubscribed' then 'pending'::public.subscriber_status else public.subscribers.status end,
        unsubscribed_at = null;
  return true;
end $$;

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
          v_consent, (p ->> 'marketing') = 'on', left(p ->> 'source_path', 300), nullif(p ->> 'ip_hash', ''), left(p ->> 'user_agent', 300))
  returning id into v_id;
  if (p ->> 'marketing') = 'on' then
    perform public.subscribe(v_email, p ->> 'source_path', 'lead_form', case when nullif(p ->> 'track', '') is null then '{}'::text[] else array[p ->> 'track'] end, '{}');
  end if;
  return v_id;
end $$;

create or replace function public.save_checker_result(p_answers jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
  if jsonb_typeof(p_answers) <> 'object' or length(p_answers::text) > 4000 then raise exception 'invalid answers' using errcode = '22023'; end if;
  insert into public.checker_results (answers, rules_version) values (p_answers, public.current_rules_version()) returning id into v_id;
  return v_id;
end $$;

-- Read one saved result by its unguessable id. No listing is possible.
create or replace function public.get_checker_result(p_id uuid)
returns table (answers jsonb, rules_version bigint, created_at timestamptz) language sql security definer set search_path = '' as $$
  update public.checker_results set last_viewed_at = now() where id = p_id
  returning answers, rules_version, created_at;
$$;

revoke all on function public.subscribe(text, text, text, text[], jsonb) from public;
revoke all on function public.submit_lead(jsonb) from public;
revoke all on function public.save_checker_result(jsonb) from public;
revoke all on function public.get_checker_result(uuid) from public;
grant execute on function public.subscribe(text, text, text, text[], jsonb) to anon, authenticated;
grant execute on function public.submit_lead(jsonb) to anon, authenticated;
grant execute on function public.save_checker_result(jsonb) to anon, authenticated;
grant execute on function public.get_checker_result(uuid) to anon, authenticated;
