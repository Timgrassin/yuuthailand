-- 0009 verification timeline per provider, plus the private evidence bucket.
create table public.verification_events (
  id bigint generated always as identity primary key,
  provider_id uuid not null references public.providers (id) on delete cascade,
  event_type public.verification_event_type not null,
  from_status public.provider_status,
  to_status public.provider_status,
  note text,
  evidence_path text,
  is_public boolean not null default false,
  actor_id uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index verification_events_provider_idx on public.verification_events (provider_id, created_at desc);

create or replace function public.providers_log_status()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' or old.status is distinct from new.status then
    insert into public.verification_events (provider_id, event_type, from_status, to_status, is_public)
    values (new.id, 'status_change', case when tg_op = 'UPDATE' then old.status end, new.status, true);
  end if;
  if tg_op = 'UPDATE' and (old.partner_since is distinct from new.partner_since
                           or old.partner_until is distinct from new.partner_until) then
    insert into public.verification_events (provider_id, event_type, note)
    values (new.id, 'partner_change',
            format('partner %s to %s', coalesce(new.partner_since::text, '-'), coalesce(new.partner_until::text, '-')));
  end if;
  return new;
end $$;
create trigger providers_log_status after insert or update on public.providers
  for each row execute function public.providers_log_status();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('evidence', 'evidence', false, 20971520,
        array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
