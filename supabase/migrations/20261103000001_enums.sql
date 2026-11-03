-- 0001 enums, extensions, shared helpers
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

create type public.app_role as enum ('admin', 'editor');
create type public.provider_status as enum ('unverified', 'contacted', 'verified', 'suspended');
create type public.lead_status as enum ('new', 'qualified', 'spam', 'duplicate');
create type public.delivery_status as enum ('sent', 'accepted', 'declined', 'enrolled', 'disputed', 'refunded');
create type public.verification_event_type as enum (
  'status_change', 'contacted', 'document_received', 'site_visit', 'call', 'note', 'partner_change'
);
create type public.subscriber_status as enum ('pending', 'confirmed', 'unsubscribed');
create type public.locale as enum ('en', 'th');
create type public.provider_user_role as enum ('owner', 'member');

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;
