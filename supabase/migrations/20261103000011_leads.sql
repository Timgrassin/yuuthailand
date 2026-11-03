-- 0011 leads (qualification) and lead_deliveries (per-provider pipeline).
-- Billing: one charge per accepted or enrolled delivery that is not disputed or refunded.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email extensions.citext not null,
  phone text,
  line_id text,
  whatsapp text,
  nationality char(2),
  city_id uuid references public.cities (id),
  track text,
  program_id uuid references public.programs (id) on delete set null,
  start_month date,
  message text,
  answers jsonb not null default '{}',
  checker_result_id uuid references public.checker_results (id) on delete set null,
  locale public.locale not null default 'en',
  status public.lead_status not null default 'new',
  duplicate_of uuid references public.leads (id),
  consent_text_id uuid not null references public.consent_texts (id),
  consented_at timestamptz not null default now(),
  marketing_opt_in boolean not null default false,
  source_path text,
  utm jsonb,
  ip_hash text,
  user_agent text,
  qualified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint duplicate_needs_ref check ((status = 'duplicate') = (duplicate_of is not null))
);
create index leads_status_idx on public.leads (status, created_at desc);
create index leads_email_idx on public.leads (email);
create trigger leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

create table public.lead_deliveries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  provider_id uuid not null references public.providers (id),
  status public.delivery_status not null default 'sent',
  price_thb numeric(12, 2),
  pricing_plan_id uuid,
  sent_at timestamptz not null default now(),
  accepted_at timestamptz,
  declined_at timestamptz,
  enrolled_at timestamptz,
  disputed_at timestamptz,
  dispute_reason text,
  refunded_at timestamptz,
  decline_reason text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lead_id, provider_id)
);
create index lead_deliveries_provider_idx on public.lead_deliveries (provider_id, status);
create index lead_deliveries_status_idx on public.lead_deliveries (status, sent_at desc);
create trigger lead_deliveries_updated_at before update on public.lead_deliveries
  for each row execute function public.set_updated_at();

-- Allowed pipeline moves. Stamps the matching timestamp.
create or replace function public.lead_deliveries_guard()
returns trigger language plpgsql set search_path = '' as $$
declare
  ok boolean;
begin
  if tg_op = 'INSERT' then
    if (select l.status from public.leads l where l.id = new.lead_id) <> 'qualified' then
      raise exception 'Only qualified leads can be delivered (lead %)', new.lead_id;
    end if;
    return new;
  end if;
  if old.status = new.status then return new; end if;
  ok := case old.status
    when 'sent' then new.status in ('accepted', 'declined')
    when 'accepted' then new.status in ('enrolled', 'disputed')
    when 'enrolled' then new.status in ('disputed')
    when 'declined' then false
    when 'disputed' then new.status in ('accepted', 'enrolled', 'refunded')
    when 'refunded' then false
  end;
  if not ok then
    raise exception 'Invalid delivery move % -> %', old.status, new.status;
  end if;
  case new.status
    when 'accepted' then
      new.accepted_at := coalesce(new.accepted_at, now());
      new.disputed_at := null;
    when 'enrolled' then
      new.enrolled_at := coalesce(new.enrolled_at, now());
      new.disputed_at := null;
    when 'declined' then new.declined_at := now();
    when 'disputed' then new.disputed_at := now();
    when 'refunded' then new.refunded_at := now();
    else null;
  end case;
  return new;
end $$;
create trigger lead_deliveries_guard before insert or update on public.lead_deliveries
  for each row execute function public.lead_deliveries_guard();
