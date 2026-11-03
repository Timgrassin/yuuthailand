-- 0018 public read model. Views run as the caller (security_invoker),
-- so RLS and column grants in 0019 decide what anon sees.
create view public.public_providers with (security_invoker = true) as
  select
    p.id, p.slug, p.ref_code, p.name_en, p.name_th, p.provider_type,
    p.city_id, c.slug as city_slug, c.name_en as city_name_en, c.name_th as city_name_th,
    p.status, p.verified_at, p.last_checked_at,
    (p.status = 'verified'
      and p.partner_since is not null and p.partner_since <= current_date
      and (p.partner_until is null or p.partner_until >= current_date)) as is_partner,
    (p.status <> 'suspended') as show_ctas,
    p.summary_en, p.summary_th, p.description_en, p.description_th,
    case when p.status <> 'suspended' then p.website end as website,
    case when p.status <> 'suspended' then p.email end as email,
    case when p.status <> 'suspended' then p.phone end as phone,
    case when p.status <> 'suspended' then p.line_id end as line_id,
    p.address_en, p.address_th, p.lat, p.lng, p.founded_year, p.languages, p.logo_path,
    p.updated_at
  from public.providers p
  join public.cities c on c.id = p.city_id;

create view public.public_programs with (security_invoker = true) as
  select g.id, g.provider_id, pp.slug as provider_slug, g.slug, g.track,
         g.name_en, g.name_th, g.summary_en, g.summary_th,
         g.duration_months, g.hours_per_week, g.price_thb, g.price_note_en, g.price_note_th,
         g.supports_visa, g.sort_order, pp.status as provider_status, pp.is_partner, pp.show_ctas
  from public.programs g
  join public.public_providers pp on pp.id = g.provider_id
  where g.is_active;

create view public.public_rules with (security_invoker = true) as
  select id, key, track, label_en, label_th, value_num, value_json, unit,
         note_en, note_th, source_url, effective_from, effective_until, sort_order
  from public.rules
  where effective_from <= current_date and (effective_until is null or effective_until > current_date);

create view public.public_rule_changes with (security_invoker = true) as
  select id, rule_key, track, action, summary_en, summary_th, changed_at
  from public.rule_changes
  where is_public;

create view public.public_verification_events with (security_invoker = true) as
  select id, provider_id, event_type, from_status, to_status, created_at
  from public.verification_events
  where is_public;
