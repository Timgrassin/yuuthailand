-- 0013 rule-change newsletter subscribers (double opt-in)
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null unique,
  status public.subscriber_status not null default 'pending',
  locale public.locale not null default 'en',
  tracks text[] not null default '{}',
  confirm_token uuid not null default gen_random_uuid() unique,
  consent_text_id uuid not null references public.consent_texts (id),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  source_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger subscribers_updated_at before update on public.subscribers
  for each row execute function public.set_updated_at();
