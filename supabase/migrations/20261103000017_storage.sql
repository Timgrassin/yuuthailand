-- 0017 storage buckets and policies
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('provider-media', 'provider-media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

-- Public bucket: anyone reads. Staff write anything. Members write under <provider_id>/.
create policy "provider-media staff write" on storage.objects for all to authenticated
  using (bucket_id = 'provider-media' and public.is_staff())
  with check (bucket_id = 'provider-media' and public.is_staff());

create policy "provider-media member write" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'provider-media'
    and public.is_provider_member(((storage.foldername(name))[1])::uuid)
  );

-- Evidence bucket: staff only.
create policy "evidence staff all" on storage.objects for all to authenticated
  using (bucket_id = 'evidence' and public.is_staff())
  with check (bucket_id = 'evidence' and public.is_staff());
