-- 0025 Brand is Staylong (staylong.co). Provider ref codes become SL-XXXX-<CITY>.
alter table public.providers drop constraint ref_code_format;
update public.providers set ref_code = 'SL-' || substr(ref_code, 4) where ref_code like 'YU-%';
alter table public.providers add constraint ref_code_format check (ref_code ~ '^SL-[A-Z0-9]{4}-[A-Z]{3}$');

create or replace function public.gen_ref_code(_city_code text)
returns text language plpgsql volatile set search_path = '' as $$
declare
  alphabet constant text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  code text;
  i int;
begin
  loop
    code := '';
    for i in 1..4 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    code := 'SL-' || code || '-' || upper(_city_code);
    exit when not exists (select 1 from public.providers p where p.ref_code = code);
  end loop;
  return code;
end $$;
revoke execute on function public.gen_ref_code(text) from anon, authenticated;
