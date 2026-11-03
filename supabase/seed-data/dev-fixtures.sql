-- DEV FIXTURES ONLY. Every name is prefixed FAKE. Never apply to production (D8).
-- Apply after migrations on a local or branch database: psql "$DB" -f supabase/seed-data/dev-fixtures.sql
insert into public.pricing_plans (code, name_en, price_per_lead_thb, monthly_fee_thb, is_partner_plan)
values ('fake_standard', 'FAKE Standard', 750, 0, false), ('fake_partner', 'FAKE Partner', 500, 4900, true)
on conflict (code) do nothing;

insert into public.providers (slug, name_en, name_th, provider_type, city_id, summary_en, website, phone, line_id, address_en, languages, pricing_plan_id)
select v.slug, v.name_en, v.name_th, v.ptype, c.id, v.summary, 'https://example.com', '+66 2 000 0000', 'fake_line', v.addr, array['en','th'], (select id from public.pricing_plans where code = 'fake_standard')
from (values
  ('fake-sukhumvit-thai-school', 'FAKE Sukhumvit Thai School', 'โรงเรียนภาษาไทยสุขุมวิท (ตัวอย่าง)', 'language_school', 'bangkok', 'FAKE. Thai language courses with ED visa support.', 'FAKE 1 Sukhumvit Rd'),
  ('fake-nimman-language-centre', 'FAKE Nimman Language Centre', 'ศูนย์ภาษานิมมาน (ตัวอย่าง)', 'language_school', 'chiang-mai', 'FAKE. Small-group Thai classes.', 'FAKE 2 Nimmanhaemin Rd'),
  ('fake-patong-muay-thai', 'FAKE Patong Muay Thai Camp', 'ค่ายมวยไทยป่าตอง (ตัวอย่าง)', 'muay_thai_camp', 'phuket', 'FAKE. Muay Thai training for DTV soft-power applicants.', 'FAKE 3 Patong Beach'),
  ('fake-bkk-visa-agency', 'FAKE Bangkok Visa Agency', null, 'visa_agent', 'bangkok', 'FAKE. Retirement and marriage visa paperwork.', 'FAKE 4 Silom Rd')
) as v(slug, name_en, name_th, ptype, city, summary, addr)
join public.cities c on c.slug = v.city
on conflict (slug) do nothing;

update public.providers set status = 'verified', last_checked_at = now() where slug in ('fake-sukhumvit-thai-school', 'fake-patong-muay-thai');
update public.providers set partner_since = current_date, pricing_plan_id = (select id from public.pricing_plans where code = 'fake_partner') where slug = 'fake-sukhumvit-thai-school';
update public.providers set status = 'contacted' where slug = 'fake-nimman-language-centre';

insert into public.programs (provider_id, slug, track, name_en, duration_months, hours_per_week, price_thb, supports_visa)
select p.id, v.slug, v.track, v.name, v.months, v.hours, v.price, true
from (values
  ('fake-sukhumvit-thai-school', 'thai-12-months', 'ed', 'FAKE Thai 12 months', 12, 4, 32000),
  ('fake-nimman-language-centre', 'thai-6-months', 'ed', 'FAKE Thai 6 months', 6, 4, 18000),
  ('fake-patong-muay-thai', 'muay-thai-6-months', 'dtv', 'FAKE Muay Thai 6 months', 6, 10, 60000)
) as v(provider, slug, track, name, months, hours, price)
join public.providers p on p.slug = v.provider
on conflict (provider_id, slug) do nothing;

insert into public.provider_faqs (provider_id, locale, question, answer, sort_order)
select id, 'en', 'FAKE: Do you issue ED visa documents?', 'FAKE: Yes, after enrolment and payment.', 1 from public.providers where slug = 'fake-sukhumvit-thai-school';
