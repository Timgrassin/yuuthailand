-- 0004 providers, accreditations, provider FAQs
-- status = verification only. Partner is separate and only valid while verified.
create table public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  ref_code text not null unique,
  name_en text not null,
  name_th text,
  provider_type text not null,
  city_id uuid not null references public.cities (id),
  status public.provider_status not null default 'unverified',
  verified_at timestamptz,
  last_checked_at timestamptz,
  partner_since date,
  partner_until date,
  summary_en text,
  summary_th text,
  description_en text,
  description_th text,
  website text,
  email extensions.citext,
  phone text,
  line_id text,
  address_en text,
  address_th text,
  lat numeric(9, 6),
  lng numeric(9, 6),
  founded_year int check (founded_year between 1900 and 2100),
  languages text[] not null default '{}',
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partner_requires_verified check (
    partner_since is null or status in ('verified', 'suspended')
  ),
  constraint partner_dates check (partner_until is null or partner_since is null or partner_until >= partner_since),
  constraint ref_code_format check (ref_code ~ '^YU-[A-Z0-9]{4}-[A-Z]{3}$')
);
create index providers_city_idx on public.providers (city_id);
create index providers_status_idx on public.providers (status);
create trigger providers_updated_at before update on public.providers
  for each row execute function public.set_updated_at();

-- Ref code YU-XXXX-<CITY>. Alphabet drops 0/O/1/I for readability on the phone.
create or replace function public.gen_ref_code(_city_code text)
returns text language plpgsql volatile set search_path = '' as $$
declare
  alphabet constant text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  code text;
  i int;
begin
  loop
    code := '';
    for i in 1..4 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    code := 'YU-' || code || '-' || upper(_city_code);
    exit when not exists (select 1 from public.providers p where p.ref_code = code);
  end loop;
  return code;
end $$;

create or replace function public.providers_set_ref_code()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.ref_code is null or new.ref_code = '' then
    new.ref_code := public.gen_ref_code((select c.code from public.cities c where c.id = new.city_id));
  end if;
  return new;
end $$;
create trigger providers_ref_code before insert on public.providers
  for each row execute function public.providers_set_ref_code();

-- Partner can only start while verified.
create or replace function public.providers_guard_partner()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.partner_since is not null
     and (tg_op = 'INSERT' or old.partner_since is distinct from new.partner_since)
     and new.status <> 'verified' then
    raise exception 'Partner requires status verified (provider %)', new.id;
  end if;
  if new.status = 'verified' and (tg_op = 'INSERT' or old.status <> 'verified') then
    new.verified_at := now();
  end if;
  return new;
end $$;
create trigger providers_guard_partner before insert or update on public.providers
  for each row execute function public.providers_guard_partner();

create table public.provider_accreditations (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers (id) on delete cascade,
  body_en text not null,
  body_th text,
  reference text,
  valid_from date,
  valid_until date,
  evidence_path text,
  is_checked boolean not null default false,
  checked_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index provider_accreditations_provider_idx on public.provider_accreditations (provider_id);
create trigger provider_accreditations_updated_at before update on public.provider_accreditations
  for each row execute function public.set_updated_at();

create table public.provider_faqs (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers (id) on delete cascade,
  locale public.locale not null,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index provider_faqs_provider_idx on public.provider_faqs (provider_id, locale, sort_order);
create trigger provider_faqs_updated_at before update on public.provider_faqs
  for each row execute function public.set_updated_at();
