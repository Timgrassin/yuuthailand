-- 0014 provider portal users
create table public.provider_users (
  provider_id uuid not null references public.providers (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.provider_user_role not null default 'member',
  invited_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  primary key (provider_id, user_id)
);
create index provider_users_user_idx on public.provider_users (user_id);

create or replace function public.is_provider_member(_provider_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.provider_users pu
    where pu.provider_id = _provider_id and pu.user_id = (select auth.uid())
  );
$$;
revoke execute on function public.is_provider_member(uuid) from anon;
