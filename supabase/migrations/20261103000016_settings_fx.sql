-- 0016 site settings and FX rates (display only; THB is the source of truth)
create table public.site_settings (
  key text primary key check (key ~ '^[a-z0-9_.]+$'),
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);
create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

create table public.fx_rates (
  currency char(3) not null check (currency ~ '^[A-Z]{3}$'),
  as_of date not null,
  thb_per_unit numeric(14, 6) not null check (thb_per_unit > 0),
  source text not null,
  created_at timestamptz not null default now(),
  primary key (currency, as_of)
);

create view public.fx_latest with (security_invoker = true) as
  select distinct on (currency) currency, as_of, thb_per_unit, source
  from public.fx_rates
  order by currency, as_of desc;
