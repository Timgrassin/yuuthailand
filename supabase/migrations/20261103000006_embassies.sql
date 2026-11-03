-- 0006 Thai embassies and consulates abroad
create table public.embassies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  country_code char(2) not null check (country_code ~ '^[A-Z]{2}$'),
  kind text not null default 'embassy' check (kind in ('embassy', 'consulate', 'honorary_consulate')),
  name_en text not null,
  name_th text,
  city text not null,
  address text,
  website text,
  email text,
  phone text,
  evisa_supported boolean,
  tracks text[] not null default '{}',
  notes_en text,
  notes_th text,
  last_checked_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index embassies_country_idx on public.embassies (country_code);
create trigger embassies_updated_at before update on public.embassies
  for each row execute function public.set_updated_at();
