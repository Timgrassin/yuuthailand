-- 0012 pricing plans. Delivery rows snapshot price_thb at send time.
create table public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[a-z0-9_]+$'),
  name_en text not null,
  name_th text,
  price_per_lead_thb numeric(12, 2) not null check (price_per_lead_thb >= 0),
  monthly_fee_thb numeric(12, 2) not null default 0 check (monthly_fee_thb >= 0),
  is_partner_plan boolean not null default false,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger pricing_plans_updated_at before update on public.pricing_plans
  for each row execute function public.set_updated_at();

alter table public.providers add column pricing_plan_id uuid references public.pricing_plans (id);
alter table public.lead_deliveries
  add constraint lead_deliveries_pricing_plan_fk foreign key (pricing_plan_id) references public.pricing_plans (id);

create or replace function public.lead_deliveries_snapshot_price()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.pricing_plan_id is null then
    select p.pricing_plan_id into new.pricing_plan_id from public.providers p where p.id = new.provider_id;
  end if;
  if new.price_thb is null and new.pricing_plan_id is not null then
    select pp.price_per_lead_thb into new.price_thb from public.pricing_plans pp where pp.id = new.pricing_plan_id;
  end if;
  return new;
end $$;
create trigger lead_deliveries_snapshot_price before insert on public.lead_deliveries
  for each row execute function public.lead_deliveries_snapshot_price();

create view public.billable_deliveries with (security_invoker = true) as
  select d.*, date_trunc('month', d.accepted_at)::date as billing_month
  from public.lead_deliveries d
  where d.status in ('accepted', 'enrolled') and d.disputed_at is null and d.refunded_at is null;
