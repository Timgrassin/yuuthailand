-- 0019 row level security. Server-side writes from the public site (leads,
-- checker results, subscribers) use the service role and bypass RLS.
do $$
declare t text;
begin
  foreach t in array array[
    'user_roles', 'cities', 'providers', 'provider_accreditations', 'provider_faqs', 'programs',
    'embassies', 'rules', 'rule_changes', 'checker_results', 'verification_events', 'consent_texts',
    'leads', 'lead_deliveries', 'pricing_plans', 'subscribers', 'provider_users', 'audit_log',
    'site_settings', 'fx_rates']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon', t);
  end loop;
end $$;

-- Staff (admin or editor) manage content.
do $$
declare t text;
begin
  foreach t in array array['cities', 'providers', 'provider_accreditations', 'provider_faqs', 'programs',
                           'embassies', 'rules', 'verification_events', 'consent_texts', 'fx_rates']
  loop
    execute format('create policy "staff all" on public.%I for all to authenticated
                    using ((select public.is_staff())) with check ((select public.is_staff()))', t);
  end loop;
end $$;

-- Admin only: money, people, PII and config.
do $$
declare t text;
begin
  foreach t in array array['user_roles', 'leads', 'lead_deliveries', 'pricing_plans', 'subscribers',
                           'provider_users', 'checker_results', 'site_settings']
  loop
    execute format('create policy "admin all" on public.%I for all to authenticated
                    using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

create policy "staff read" on public.rule_changes for select to authenticated using ((select public.is_staff()));
create policy "admin read" on public.audit_log for select to authenticated using ((select public.is_admin()));
create policy "own roles read" on public.user_roles for select to authenticated using (user_id = (select auth.uid()));

-- Public reads. Column grants keep internal fields away from anon.
create policy "public read" on public.cities for select to anon, authenticated using (is_active);
create policy "public read" on public.providers for select to anon, authenticated using (true);
create policy "public read" on public.provider_accreditations for select to anon, authenticated using (true);
create policy "public read" on public.provider_faqs for select to anon, authenticated using (true);
create policy "public read" on public.programs for select to anon, authenticated using (is_active);
create policy "public read" on public.embassies for select to anon, authenticated using (true);
create policy "public read" on public.rules for select to anon, authenticated using (true);
create policy "public read" on public.rule_changes for select to anon, authenticated using (is_public);
create policy "public read" on public.verification_events for select to anon, authenticated using (is_public);
create policy "public read" on public.consent_texts for select to anon, authenticated using (published_at is not null);
create policy "public read" on public.site_settings for select to anon, authenticated using (is_public);
create policy "public read" on public.fx_rates for select to anon, authenticated using (true);

grant select on public.cities, public.provider_faqs, public.programs, public.embassies,
  public.rules, public.consent_texts, public.fx_rates to anon;
grant select (id, slug, ref_code, name_en, name_th, provider_type, city_id, status, verified_at,
  last_checked_at, partner_since, partner_until, summary_en, summary_th, description_en, description_th,
  website, email, phone, line_id, address_en, address_th, lat, lng, founded_year, languages, logo_path,
  created_at, updated_at) on public.providers to anon;
grant select (id, provider_id, body_en, body_th, reference, valid_from, valid_until, is_checked,
  checked_at, sort_order) on public.provider_accreditations to anon;
grant select (id, rule_key, track, action, summary_en, summary_th, is_public, changed_at)
  on public.rule_changes to anon;
grant select (id, provider_id, event_type, from_status, to_status, is_public, created_at)
  on public.verification_events to anon;
grant select (key, value, is_public) on public.site_settings to anon;

-- Provider portal members.
create policy "member read" on public.provider_users for select to authenticated
  using (user_id = (select auth.uid()) or public.is_provider_member(provider_id));
create policy "member read" on public.lead_deliveries for select to authenticated
  using (public.is_provider_member(provider_id));
-- Members see lead contact details only after they accept the delivery.
create policy "member read accepted" on public.leads for select to authenticated
  using (exists (
    select 1 from public.lead_deliveries d
    where d.lead_id = leads.id
      and d.status in ('accepted', 'enrolled', 'disputed', 'refunded')
      and public.is_provider_member(d.provider_id)
  ));

-- Views: anon reads the public read model only.
revoke all on public.billable_deliveries from anon;
grant select on public.public_providers, public.public_programs, public.public_rules,
  public.public_rule_changes, public.public_verification_events, public.fx_latest to anon, authenticated;

-- Helper functions anon may call.
grant execute on function public.current_rules_version() to anon, authenticated;
revoke execute on function public.gen_ref_code(text) from anon, authenticated;
