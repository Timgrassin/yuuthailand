\set ON_ERROR_STOP 1
create or replace function pg_temp.expect_error(sql text, label text) returns text language plpgsql as $$
begin execute sql; return 'FAIL (no error): ' || label;
exception when others then return 'ok: ' || label || ' -> ' || sqlerrm; end $$;

insert into cities (slug, code, name_en, name_th) values ('smoke-town','SMK','Smoke Town','ทดสอบ');
insert into providers (slug, name_en, provider_type, city_id) select 'fake-school','FAKE School','language_school',id from cities where code = 'SMK';
select 'ref_code ' || ref_code || case when ref_code ~ '^YU-[2-9A-HJ-NP-Z]{4}-SMK$' then ' ok' else ' FAIL' end from providers;
select pg_temp.expect_error($$update providers set partner_since = current_date$$, 'partner blocked while unverified');
update providers set status = 'verified';
select 'verified_at set: ' || (verified_at is not null) from providers;
update providers set partner_since = current_date;
select 'is_partner: ' || is_partner || ', show_ctas: ' || show_ctas from public_providers;
update providers set status = 'suspended';
select 'suspended is_partner: ' || is_partner || ', show_ctas: ' || show_ctas || ', email hidden: ' || (email is null) from public_providers;
select pg_temp.expect_error($$update providers set status = 'contacted'$$, 'contacted with partner set blocked');
update providers set status = 'verified';
select 'verification events: ' || count(*) || ' (expect 5)' from verification_events;

insert into pricing_plans (code, name_en, price_per_lead_thb) values ('standard','Standard',750);
update providers set pricing_plan_id = (select id from pricing_plans);
insert into consent_texts (key, locale, version, body, published_at) values ('lead_form','en',1,'FAKE consent', now());
select pg_temp.expect_error($$update consent_texts set body = 'x'$$, 'published consent immutable');
insert into leads (full_name, email, consent_text_id) select 'FAKE Lead','fake@example.com',id from consent_texts;
select pg_temp.expect_error($$insert into lead_deliveries (lead_id, provider_id) select l.id, p.id from leads l, providers p$$, 'unqualified lead not deliverable');
update leads set status = 'qualified';
insert into lead_deliveries (lead_id, provider_id) select l.id, p.id from leads l, providers p;
select 'price snapshot: ' || price_thb from lead_deliveries;
select pg_temp.expect_error($$update lead_deliveries set status = 'enrolled'$$, 'sent -> enrolled blocked');
update lead_deliveries set status = 'accepted';
select 'billable after accept: ' || count(*) from billable_deliveries;
update lead_deliveries set status = 'disputed';
select 'billable while disputed: ' || count(*) from billable_deliveries;
update lead_deliveries set status = 'accepted';
select 'billable after dispute resolved: ' || count(*) || ', disputed_at cleared: ' || (select disputed_at is null from lead_deliveries) from billable_deliveries;
update lead_deliveries set status = 'disputed'; update lead_deliveries set status = 'refunded';
select 'billable after refund: ' || count(*) from billable_deliveries;
select pg_temp.expect_error($$update lead_deliveries set status = 'accepted'$$, 'refunded is final');

create temp table v0 as select current_rules_version() v;
grant select on v0 to public;
insert into rules (key, track, label_en, value_num, effective_from) values ('smoke.min_hours_week','ed','Min hours',4,'2026-01-01');
update rules set value_num = 5 where key = 'smoke.min_hours_week';
update rules set value_num = 5 where key = 'smoke.min_hours_week';
select 'rules version delta after insert+update+noop: ' || (select count(*) from rule_changes where rule_key = 'smoke.min_hours_week') || case when (select count(*) from rule_changes where rule_key = 'smoke.min_hours_week') = 2 then ' ok' else ' FAIL' end;
select 'audit rows: ' || count(*) from audit_log;

-- RLS as anon
set role anon;
select 'anon public_providers: ' || count(*) from public_providers;
select 'anon public_rule_changes: ' || count(*) from public_rule_changes;
select pg_temp.expect_error($$select * from leads$$, 'anon cannot read leads');
select pg_temp.expect_error($$select pricing_plan_id from providers$$, 'anon cannot read pricing_plan_id');
select pg_temp.expect_error($$select old_value from rule_changes$$, 'anon cannot read rule_changes.old_value');
select pg_temp.expect_error($$select * from checker_results$$, 'anon cannot read checker_results');
select pg_temp.expect_error($$insert into leads (full_name, email, consent_text_id) values ('x','x@x.co', gen_random_uuid())$$, 'anon cannot insert leads');
reset role;

-- Provider member visibility
insert into auth.users (id) values ('00000000-0000-0000-0000-000000000001');
insert into provider_users (provider_id, user_id) select id, '00000000-0000-0000-0000-000000000001' from providers;
insert into leads (full_name, email, consent_text_id, status) select 'FAKE Lead 2','fake2@example.com',id,'qualified' from consent_texts;
insert into lead_deliveries (lead_id, provider_id) select l.id, p.id from leads l, providers p where l.full_name = 'FAKE Lead 2';
set role authenticated; set request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';
select 'member sees deliveries: ' || count(*) || ' (expect 2)' from lead_deliveries;
select 'member sees leads: ' || count(*) || ' (expect 1: refunded one, not the unaccepted one)' from leads;
update providers set name_en = 'hack';
select 'member edit blocked by RLS, name: ' || (select name_en from providers);
reset role;
