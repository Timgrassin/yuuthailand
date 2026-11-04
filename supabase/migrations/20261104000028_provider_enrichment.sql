-- 0028 Enriched provider listings (RoxSkin-style pages) and a token-gated bulk import.
alter table public.providers
  add column if not exists google_place_id text unique,
  add column if not exists google_maps_url text,
  add column if not exists google_rating numeric(2,1) check (google_rating between 0 and 5),
  add column if not exists google_reviews int check (google_reviews >= 0),
  add column if not exists opening_hours jsonb,           -- [{ day: "Monday", hours: "08:00-17:00" }]
  add column if not exists categories text[] not null default '{}',
  add column if not exists facts jsonb not null default '[]', -- [{ key, value, quote, source_url }] quotes are exact substrings of the source page
  add column if not exists price_from_thb numeric(12,2),
  add column if not exists data_source text,              -- apify_google_maps | osm | manual
  add column if not exists data_checked_at timestamptz;

drop view if exists public.public_programs;
drop view if exists public.public_providers;
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
    p.google_maps_url, p.google_rating, p.google_reviews, p.opening_hours, p.categories, p.facts,
    p.price_from_thb, p.data_source, p.data_checked_at,
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

grant select (google_maps_url, google_rating, google_reviews, opening_hours, categories, facts, price_from_thb, data_source, data_checked_at)
  on public.providers to anon;
grant select on public.public_providers, public.public_programs to anon, authenticated;

-- Token-gated import functions for these columns live in 0030 (import_keys).
