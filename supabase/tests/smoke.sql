\set ON_ERROR_STOP 1
create or replace function pg_temp.expect_error(sql text, label text) returns text language plpgsql as $$
begin execute sql; return 'FAIL (no error): ' || label;
exception when others then return 'ok: ' || label || ' -> ' || sqlerrm; end $$;

insert into cities (slug, code, name_en) values ('smoke-town','SMK','Smoke Town');
insert into providers (slug, name_en, provider_type, city_id) select 'fake-school','FAKE School','language_school',id from cities where code = 'SMK';
select 'ref_code ' || ref_code || case when ref_code ~ '^SL-[2-9A-HJ-NP-Z]{4}-SMK$' then ' ok' else ' FAIL' end from providers;
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
insert into consent_texts (key, locale, version, body, published_at) values ('smoke_form','en',1,'FAKE consent', now());
select pg_temp.expect_error($$update consent_texts set body = 'x' where key = 'smoke_form'$$, 'published consent immutable');
insert into leads (full_name, email, consent_text_id) select 'FAKE Lead','fake@example.com',id from consent_texts where key = 'smoke_form';
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
insert into leads (full_name, email, consent_text_id, status) select 'FAKE Lead 2','fake2@example.com',id,'qualified' from consent_texts where key = 'smoke_form';
insert into lead_deliveries (lead_id, provider_id) select l.id, p.id from leads l, providers p where l.full_name = 'FAKE Lead 2';
set role authenticated; set request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';
select 'member sees deliveries: ' || count(*) || ' (expect 2)' from lead_deliveries;
select 'member sees leads: ' || count(*) || ' (expect 1: refunded one, not the unaccepted one)' from leads;
update providers set name_en = 'hack';
select 'member edit blocked by RLS, name: ' || (select name_en from providers);
reset role;

-- 0026 public write functions as anon
set role anon;
select 'subscribe ok: ' || public.subscribe('smoke@example.com', '/tools/x', 'smoke', array['dtv'], '{}');
select 'save checker ok: ' || (public.save_checker_result('{"age":30}') is not null);
select pg_temp.expect_error($$select public.subscribe('not-an-email')$$, 'subscribe rejects bad email');
select pg_temp.expect_error($$select public.submit_lead('{"full_name":"FAKE","email":"a@b.co"}')$$, 'lead needs consent');
reset role;

-- 0033 double opt-in
create or replace function pg_temp.check(ok boolean, label text) returns text language sql as $$ select case when ok then 'ok: ' else 'FAIL: ' end || label $$;
set role anon;
select pg_temp.expect_error($$select * from public.claim_confirmation_email('smoke@example.com')$$, 'anon cannot claim confirmation email');
reset role;
set role service_role;
select pg_temp.check((select count(*) from public.claim_confirmation_email('smoke@example.com')) = 1, 'first confirmation claim returns the subscriber');
select pg_temp.check((select count(*) from public.claim_confirmation_email('smoke@example.com')) = 0, 'second claim within 10 minutes is refused');
reset role;
do $$ begin
  perform set_config('smoke.ct', (select confirm_token::text from public.subscribers where email = 'smoke@example.com'), false);
  perform set_config('smoke.ut', (select unsubscribe_token::text from public.subscribers where email = 'smoke@example.com'), false);
end $$;
set role anon;
select pg_temp.check(public.confirm_subscription(gen_random_uuid()) = 'invalid', 'unknown confirm token is invalid');
select pg_temp.check(public.confirm_subscription(current_setting('smoke.ct')::uuid) = 'confirmed', 'confirm token confirms');
select pg_temp.check(public.confirm_subscription(current_setting('smoke.ct')::uuid) = 'already', 'second confirm says already');
select pg_temp.check(public.unsubscribe(current_setting('smoke.ut')::uuid), 'unsubscribe token matches');
select pg_temp.check(not public.unsubscribe(gen_random_uuid()), 'unknown unsubscribe token does nothing');
reset role;
select pg_temp.check((select status = 'unsubscribed' and unsubscribed_at is not null from public.subscribers where email = 'smoke@example.com'), 'unsubscribe sets status');
set role service_role;
select pg_temp.check((select count(*) from public.claim_confirmation_email('smoke@example.com')) = 0, 'no confirmation claim after unsubscribe');
reset role;
