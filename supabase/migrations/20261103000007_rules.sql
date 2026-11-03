-- 0007 visa rules with typed values. One row per (key, track, effective_from).
create table public.rules (
  id uuid primary key default gen_random_uuid(),
  key text not null check (key ~ '^[a-z0-9_.]+$'),
  track text not null,
  label_en text not null,
  label_th text,
  value_num numeric,
  value_json jsonb,
  unit text,
  note_en text,
  note_th text,
  source_url text,
  effective_from date not null,
  effective_until date,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rules_has_value check (value_num is not null or value_json is not null),
  constraint rules_dates check (effective_until is null or effective_until > effective_from),
  unique (key, track, effective_from)
);
create index rules_track_idx on public.rules (track, sort_order);
create trigger rules_updated_at before update on public.rules
  for each row execute function public.set_updated_at();

-- Rules in force on a given date.
create or replace function public.rules_in_force(_on date default current_date)
returns setof public.rules language sql stable set search_path = '' as $$
  select r.* from public.rules r
  where r.effective_from <= _on and (r.effective_until is null or r.effective_until > _on);
$$;
