-- 0030 Token-gated bulk imports (scraped schools, OSM POIs). The token is never stored or committed:
-- only its SHA-256 lives in import_keys, which no client role can read. Add a key in the SQL Editor:
--   insert into public.import_keys (label, token_sha256) values ('github-actions', encode(extensions.digest('<token>', 'sha256'), 'hex'));
create table if not exists public.import_keys (
  id bigint generated always as identity primary key,
  label text not null,
  token_sha256 text not null unique check (token_sha256 ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);
alter table public.import_keys enable row level security;
revoke all on public.import_keys from anon, authenticated;

create or replace function public.import_key_ok(p_token text)
returns boolean language sql stable security definer set search_path = '' as $$
  select p_token is not null and length(p_token) >= 32 and exists (
    select 1 from public.import_keys k
    where k.revoked_at is null and k.token_sha256 = encode(extensions.digest(p_token, 'sha256'), 'hex'));
$$;
revoke all on function public.import_key_ok(text) from public;

create or replace function public.import_pois(p_token text, p_rows jsonb)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if not public.import_key_ok(p_token) then raise exception 'forbidden' using errcode = '42501'; end if;
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

-- Scraped listings (Google Maps via Apify). Rows start 'unverified' and never overwrite status,
-- partner fields or editor-written copy.
create or replace function public.import_providers(p_token text, p_rows jsonb)
returns int language plpgsql security definer set search_path = '' as $$
declare
  r jsonb;
  n int := 0;
  v_city uuid;
  v_slug text;
begin
  if not public.import_key_ok(p_token) then raise exception 'forbidden' using errcode = '42501'; end if;
  for r in select * from jsonb_array_elements(p_rows) loop
    select id into v_city from public.cities where slug = r ->> 'city_slug';
    continue when v_city is null or nullif(r ->> 'google_place_id', '') is null or nullif(r ->> 'name', '') is null;
    v_slug := trim(both '-' from left(regexp_replace(lower(coalesce(r ->> 'slug', r ->> 'name')), '[^a-z0-9]+', '-', 'g'), 80));
    if v_slug = '' or exists (select 1 from public.providers p where p.slug = v_slug and p.google_place_id is distinct from r ->> 'google_place_id') then
      v_slug := trim(both '-' from v_slug || '-' || substr(md5(r ->> 'google_place_id'), 1, 4));
    end if;
    insert into public.providers (slug, name_en, provider_type, city_id, website, phone, address_en, lat, lng,
      google_place_id, google_maps_url, google_rating, google_reviews, opening_hours, categories, data_source, data_checked_at)
    values (v_slug, left(r ->> 'name', 160), coalesce(nullif(r ->> 'provider_type', ''), 'language_school'), v_city,
      nullif(r ->> 'website', ''), nullif(r ->> 'phone', ''), nullif(r ->> 'address', ''),
      nullif(r ->> 'lat', '')::numeric, nullif(r ->> 'lng', '')::numeric,
      r ->> 'google_place_id', nullif(r ->> 'google_maps_url', ''),
      nullif(r ->> 'google_rating', '')::numeric, nullif(r ->> 'google_reviews', '')::int,
      r -> 'opening_hours', coalesce(array(select jsonb_array_elements_text(coalesce(r -> 'categories', '[]'::jsonb))), '{}'),
      coalesce(nullif(r ->> 'data_source', ''), 'apify_google_maps'), now())
    on conflict (google_place_id) do update set
      website = coalesce(excluded.website, public.providers.website),
      phone = coalesce(excluded.phone, public.providers.phone),
      address_en = coalesce(public.providers.address_en, excluded.address_en),
      lat = coalesce(public.providers.lat, excluded.lat), lng = coalesce(public.providers.lng, excluded.lng),
      google_maps_url = coalesce(excluded.google_maps_url, public.providers.google_maps_url),
      google_rating = coalesce(excluded.google_rating, public.providers.google_rating),
      google_reviews = coalesce(excluded.google_reviews, public.providers.google_reviews),
      opening_hours = coalesce(excluded.opening_hours, public.providers.opening_hours),
      categories = case when cardinality(excluded.categories) > 0 then excluded.categories else public.providers.categories end,
      data_checked_at = now();
    n := n + 1;
  end loop;
  return n;
end $$;

-- Facts extracted from a provider's own website. The import script keeps only facts whose quote
-- is an exact substring of the fetched page text.
create or replace function public.import_provider_facts(p_token text, p_google_place_id text, p_facts jsonb, p_summary text default null, p_price_from numeric default null)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if not public.import_key_ok(p_token) then raise exception 'forbidden' using errcode = '42501'; end if;
  if jsonb_typeof(coalesce(p_facts, '[]'::jsonb)) <> 'array' then raise exception 'facts must be an array' using errcode = '22023'; end if;
  update public.providers set facts = coalesce(p_facts, '[]'::jsonb),
    summary_en = coalesce(public.providers.summary_en, left(p_summary, 400)),
    price_from_thb = coalesce(p_price_from, public.providers.price_from_thb), data_checked_at = now()
  where google_place_id = p_google_place_id;
  return found;
end $$;

revoke all on function public.import_pois(text, jsonb) from public;
revoke all on function public.import_providers(text, jsonb) from public;
revoke all on function public.import_provider_facts(text, text, jsonb, text, numeric) from public;
grant execute on function public.import_pois(text, jsonb) to anon;
grant execute on function public.import_providers(text, jsonb) to anon;
grant execute on function public.import_provider_facts(text, text, jsonb, text, numeric) to anon;
