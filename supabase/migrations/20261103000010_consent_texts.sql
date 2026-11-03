-- 0010 versioned consent texts (PDPA). Leads and subscribers point at the exact text shown.
create table public.consent_texts (
  id uuid primary key default gen_random_uuid(),
  key text not null check (key ~ '^[a-z0-9_]+$'),
  locale public.locale not null,
  version int not null check (version > 0),
  body text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique (key, locale, version)
);

-- Published texts are immutable.
create or replace function public.consent_texts_freeze()
returns trigger language plpgsql set search_path = '' as $$
begin
  if old.published_at is not null then
    raise exception 'Published consent text % is immutable. Create a new version.', old.id;
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end $$;
create trigger consent_texts_freeze before update or delete on public.consent_texts
  for each row execute function public.consent_texts_freeze();
