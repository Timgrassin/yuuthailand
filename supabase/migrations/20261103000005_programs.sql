-- 0005 programs offered by providers
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers (id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9-]+$'),
  track text not null,
  name_en text not null,
  name_th text,
  summary_en text,
  summary_th text,
  duration_months numeric(5, 1) check (duration_months > 0),
  hours_per_week numeric(4, 1) check (hours_per_week > 0),
  price_thb numeric(12, 2) check (price_thb >= 0),
  price_note_en text,
  price_note_th text,
  supports_visa boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_id, slug)
);
create index programs_track_idx on public.programs (track) where is_active;
create trigger programs_updated_at before update on public.programs
  for each row execute function public.set_updated_at();
