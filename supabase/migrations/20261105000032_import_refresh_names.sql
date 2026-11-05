-- 0032 Re-imports refresh the name and type of Unverified scraped listings (cleaner names, category-based types).
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
      -- Cleaned names replace scraped ones until an editor owns the listing. Slugs never change, so URLs stay stable.
      name_en = case when public.providers.status = 'unverified' and public.providers.description_en is null then excluded.name_en else public.providers.name_en end,
      provider_type = case when public.providers.status = 'unverified' then excluded.provider_type else public.providers.provider_type end,
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

