-- 0015 append-only audit log for business tables
create table public.audit_log (
  id bigint generated always as identity primary key,
  table_name text not null,
  row_id text,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  actor_id uuid default auth.uid(),
  old_row jsonb,
  new_row jsonb,
  at timestamptz not null default now()
);
create index audit_log_table_row_idx on public.audit_log (table_name, row_id, at desc);

create or replace function public.audit_trigger()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  o jsonb := case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end;
  n jsonb := case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end;
begin
  if tg_op = 'UPDATE' and o - 'updated_at' = n - 'updated_at' then
    return new;
  end if;
  insert into public.audit_log (table_name, row_id, action, old_row, new_row)
  values (tg_table_name, coalesce(n ->> 'id', o ->> 'id'), tg_op, o, n);
  return coalesce(new, old);
end $$;

do $$
declare t text;
begin
  foreach t in array array['providers', 'provider_accreditations', 'programs', 'rules', 'leads',
                           'lead_deliveries', 'pricing_plans', 'provider_users', 'user_roles', 'consent_texts']
  loop
    execute format('create trigger %I after insert or update or delete on public.%I
                    for each row execute function public.audit_trigger()', t || '_audit', t);
  end loop;
end $$;

revoke update, delete, truncate on public.audit_log from anon, authenticated;
