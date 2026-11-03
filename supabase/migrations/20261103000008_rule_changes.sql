-- 0008 rule change log, rules version, saved checker results.
-- The rules version is the latest rule_changes.id. Every write to rules bumps it.
create table public.rule_changes (
  id bigint generated always as identity primary key,
  rule_id uuid references public.rules (id) on delete set null,
  rule_key text not null,
  track text not null,
  action text not null check (action in ('insert', 'update', 'delete')),
  old_value jsonb,
  new_value jsonb,
  summary_en text,
  summary_th text,
  is_public boolean not null default true,
  changed_by uuid default auth.uid(),
  changed_at timestamptz not null default now()
);
create index rule_changes_changed_at_idx on public.rule_changes (changed_at desc);

create or replace function public.rules_log_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'DELETE' then
    insert into public.rule_changes (rule_id, rule_key, track, action, old_value)
    values (null, old.key, old.track, 'delete', to_jsonb(old));
    return old;
  end if;
  if tg_op = 'UPDATE' and to_jsonb(old) - 'updated_at' = to_jsonb(new) - 'updated_at' then
    return new;
  end if;
  insert into public.rule_changes (rule_id, rule_key, track, action, old_value, new_value)
  values (new.id, new.key, new.track, lower(tg_op),
          case when tg_op = 'UPDATE' then to_jsonb(old) end, to_jsonb(new));
  return new;
end $$;
create trigger rules_log_change after insert or update or delete on public.rules
  for each row execute function public.rules_log_change();

create or replace function public.current_rules_version()
returns bigint language sql stable security definer set search_path = '' as $$
  select coalesce(max(id), 0) from public.rule_changes;
$$;

-- Saved checker results. The uuid is the unguessable share id.
-- Store answers plus the rules version. The app recomputes with current rules
-- and shows "rules changed since you checked" when the version moved.
create table public.checker_results (
  id uuid primary key default gen_random_uuid(),
  answers jsonb not null,
  rules_version bigint not null,
  locale public.locale not null default 'en',
  created_at timestamptz not null default now(),
  last_viewed_at timestamptz
);
