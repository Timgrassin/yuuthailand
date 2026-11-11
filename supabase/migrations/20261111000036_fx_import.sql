-- 0036 Daily exchange-rate refresh. .github/workflows/fx.yml reads European Central Bank reference rates
-- (api.frankfurter.dev, no key) and writes them here with the import token (D22). THB stays the source of truth (D6).
create or replace function public.import_fx_rates(p_token text, p_rows jsonb)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if not public.import_key_ok(p_token) then raise exception 'forbidden' using errcode = '42501'; end if;
  insert into public.fx_rates (currency, as_of, thb_per_unit, source)
  select upper(r ->> 'currency'), (r ->> 'as_of')::date, (r ->> 'thb_per_unit')::numeric, left(r ->> 'source', 200)
    from jsonb_array_elements(p_rows) r
   where (r ->> 'currency') ~ '^[A-Za-z]{3}$' and (r ->> 'thb_per_unit')::numeric between 0.001 and 10000
     and (r ->> 'as_of')::date between current_date - 10 and current_date + 1
  on conflict (currency, as_of) do nothing;
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public.import_fx_rates(text, jsonb) from public;
grant execute on function public.import_fx_rates(text, jsonb) to anon, authenticated;
