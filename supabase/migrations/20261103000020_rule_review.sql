-- 0020 rule provenance and expert review. Unreviewed rules show a "pending expert review" note.
create type public.rule_confidence as enum ('high', 'medium', 'low');
alter table public.rules
  add column confidence public.rule_confidence not null default 'medium',
  add column source_date date,
  add column reviewed_at timestamptz,
  add column reviewed_by text;

create or replace view public.public_rules with (security_invoker = true) as
  select id, key, track, label_en, label_th, value_num, value_json, unit,
         note_en, note_th, source_url, effective_from, effective_until, sort_order,
         confidence, source_date, reviewed_at, reviewed_by, updated_at
  from public.rules
  where effective_from <= current_date and (effective_until is null or effective_until > current_date);
grant select on public.public_rules to anon, authenticated;
