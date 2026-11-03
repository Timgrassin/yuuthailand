-- 0024 English-only site (D15). Drop every Thai column and the Thai consent texts.
drop view if exists public.public_programs;
drop view if exists public.public_providers;
drop view if exists public.public_rules;
drop view if exists public.public_rule_changes;

alter table public.cities drop column name_th, drop column province_th;
alter table public.providers drop column name_th, drop column summary_th, drop column description_th, drop column address_th;
alter table public.provider_accreditations drop column body_th;
alter table public.programs drop column name_th, drop column summary_th, drop column price_note_th;
alter table public.embassies drop column name_th, drop column notes_th;
alter table public.rules drop column label_th, drop column note_th;
alter table public.rule_changes drop column summary_th;
alter table public.pricing_plans drop column name_th;

-- Published consent texts are frozen by trigger; lift it only for this cleanup.
alter table public.consent_texts disable trigger consent_texts_freeze;
delete from public.consent_texts where locale = 'th';
alter table public.consent_texts enable trigger consent_texts_freeze;
delete from public.provider_faqs where locale = 'th';

create view public.public_providers with (security_invoker = true) as
  select
    p.id, p.slug, p.ref_code, p.name_en, p.provider_type,
    p.city_id, c.slug as city_slug, c.name_en as city_name_en,
    p.status, p.verified_at, p.last_checked_at,
    (p.status = 'verified'
      and p.partner_since is not null and p.partner_since <= current_date
      and (p.partner_until is null or p.partner_until >= current_date)) as is_partner,
    (p.status <> 'suspended') as show_ctas,
    p.summary_en, p.description_en,
    case when p.status <> 'suspended' then p.website end as website,
    case when p.status <> 'suspended' then p.email end as email,
    case when p.status <> 'suspended' then p.phone end as phone,
    case when p.status <> 'suspended' then p.line_id end as line_id,
    p.address_en, p.lat, p.lng, p.founded_year, p.languages, p.logo_path,
    p.updated_at
  from public.providers p
  join public.cities c on c.id = p.city_id;

create view public.public_programs with (security_invoker = true) as
  select g.id, g.provider_id, pp.slug as provider_slug, g.slug, g.track,
         g.name_en, g.summary_en, g.duration_months, g.hours_per_week, g.price_thb, g.price_note_en,
         g.supports_visa, g.sort_order, pp.status as provider_status, pp.is_partner, pp.show_ctas
  from public.programs g
  join public.public_providers pp on pp.id = g.provider_id
  where g.is_active;

create view public.public_rules with (security_invoker = true) as
  select id, key, track, label_en, value_num, value_json, unit, note_en, source_url,
         effective_from, effective_until, sort_order, confidence, source_date, reviewed_at, reviewed_by, updated_at
  from public.rules
  where effective_from <= current_date and (effective_until is null or effective_until > current_date);

create view public.public_rule_changes with (security_invoker = true) as
  select id, rule_key, track, action, summary_en, changed_at
  from public.rule_changes
  where is_public;

grant select on public.public_providers, public.public_programs, public.public_rules, public.public_rule_changes to anon, authenticated;
