-- 0003 cities. code is the ref-code suffix (YU-XXXX-BKK).
create table public.cities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  code char(3) not null unique check (code ~ '^[A-Z]{3}$'),
  name_en text not null,
  name_th text not null,
  province_en text,
  province_th text,
  lat numeric(9, 6),
  lng numeric(9, 6),
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger cities_updated_at before update on public.cities
  for each row execute function public.set_updated_at();
