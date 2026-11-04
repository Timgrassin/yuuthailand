-- 0029 Points of interest for place pages and maps (banks, hospitals, coworking, gyms, schools, immigration).
-- Source: OpenStreetMap via Nominatim (ODbL, attribution shown on every map).
create table if not exists public.pois (
  id bigint generated always as identity primary key,
  osm_id text unique,
  area text not null,          -- matches Place.citySlug in src/content/places.ts
  category text not null check (category in ('bank','hospital','coworking','gym','muay_thai','language_school','international_school','supermarket','immigration')),
  name text not null,
  lat numeric(9,6) not null,
  lng numeric(9,6) not null,
  street text,
  website text,
  source text not null default 'osm',
  hidden boolean not null default false,
  fetched_at timestamptz not null default now()
);
create index if not exists pois_area_cat on public.pois (area, category);
alter table public.pois enable row level security;
create policy pois_read on public.pois for select to anon, authenticated using (not hidden);
grant select on public.pois to anon, authenticated;

create or replace function public.import_pois(p_token text, p_rows jsonb)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if encode(extensions.digest(p_token, 'sha256'), 'hex') <> '7f25e14f3072da49a9523d0623a82d2542829ce1e0467399bc4e0a5f01bf6dfe' then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  insert into public.pois (osm_id, area, category, name, lat, lng, street, website, fetched_at)
  select r ->> 'osm_id', r ->> 'area', r ->> 'category', left(r ->> 'name', 200),
         (r ->> 'lat')::numeric, (r ->> 'lng')::numeric, nullif(r ->> 'street', ''), nullif(r ->> 'website', ''), now()
  from jsonb_array_elements(p_rows) r
  where nullif(r ->> 'osm_id', '') is not null
  on conflict (osm_id) do update set area = excluded.area, category = excluded.category, name = excluded.name,
    lat = excluded.lat, lng = excluded.lng, street = excluded.street, website = excluded.website, fetched_at = now();
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public.import_pois(text, jsonb) from public;
grant execute on function public.import_pois(text, jsonb) to anon;
