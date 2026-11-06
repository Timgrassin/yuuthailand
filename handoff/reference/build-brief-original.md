# Build brief: [BRAND] ([DOMAIN]), the verified long-stay Thailand directory

## 0. How to work with me
- I'm the founder: an experienced operator, not a developer. Explain setup in plain language and run terminal commands yourself. When a step needs my accounts (Vercel, Supabase, domain registrar, Google Search Console, LINE, Meta), tell me exactly what to click and what to paste back to you.
- Ask before anything that costs money, contacts real businesses or people, or cannot be undone: buying domains or paid plans, sending emails, deleting data, calling paid APIs.
- Never commit secrets. Use .env.local locally and Vercel environment variables in production.
- Keep a CLAUDE.md at the repo root with the product summary, decisions and why, data sources, open questions and how to run the project. Update it at the end of every session.
- Work in the phases below. End each phase with: what you built, the URL where I can see it, what I need to do, known gaps, and the plan for the next phase.
- If a fact in this brief looks outdated, flag it and propose a fix. Never silently change rules shown to users.

## 1. Product
[BRAND] helps foreigners find a legal way to stay in Thailand longer than the visa-free stay. It matches people to the right Destination Thailand Visa (DTV) route and to verified providers whose documents get accepted, then sends qualified enquiries to those providers.
Revenue: providers pay per qualified enquiry or per enrollment; visa agents pay per signed client; featured listings; affiliate partners (insurance, accommodation, coworking).
North-star metric: qualified enquiries accepted by providers per week.
Supporting metrics: organic sessions, route checker completion rate, enquiries per provider page view, provider acceptance rate, revenue per enquiry, enrollments reported by providers.

## 2. Facts the product is built on (as of 3 Nov 2026; re-verify before launch)
Store each fact as a rule record with a source URL and a last-verified date, and show both on the site.
1. From 15 Sep 2026, Thailand's standard visa-free stay is 30 days for 60 countries and territories, for tourism only. One extension of up to 30 days is possible. Visa-exempt land-border entries are capped at two per calendar year.
2. DTV: 5-year multiple-entry visa, 180 days per entry, extendable once in Thailand for up to 180 days. Fee 10,000 THB, non-refundable. Proof of funds is commonly 500,000 THB. Applicants apply through thaievisa.go.th to the embassy covering their citizenship or legal residence, while outside Thailand. A spouse and children under 20 can apply as dependents.
3. For applications from 31 Aug 2026, applicants must provide proof of permanent residence and a criminal record certificate. Missions define these differently, so each embassy page needs its own checklist.
4. Two tracks: Workcation (remote workers and freelancers with foreign employers or clients) and Thai soft power (Muay Thai, Thai culinary training, sports training, medical treatment, seminars, music festivals). Some embassies list only Muay Thai, culinary training and medical treatment.
5. Soft-power Muay Thai usually needs at least 9 months of enrollment, and some embassies ask for 12. Short camps are typically rejected. The provider should be recognized by the Sports Authority of Thailand or the Ministry of Education.
Product implication: embassy-level variation is the core value. Model rules per embassy, not globally.

## 3. Users
- Applicants: remote workers who relied on 60-day exemptions, long-term Muay Thai trainees, Thai cooking students, people on long medical or dental treatment plans, relocating families (one DTV holder plus dependents).
- Providers: gym owners, cooking school owners, clinics, visa agents and law firms.
- Internal: me and an ops assistant who verify providers and handle leads.

## 4. Stack
- Next.js (latest stable, App Router, TypeScript, Server Components), Tailwind CSS with shadcn/ui.
- Supabase (Postgres, Auth, Storage, Row Level Security), region Singapore. Migrations live in the repo.
- Vercel hosting, with Incremental Static Regeneration for directory pages.
- Email: Resend. Provider billing: Stripe (Phase 3). Analytics: Vercel Web Analytics plus PostHog for funnels.
- Maps: MapLibre GL with free OpenStreetMap-based tiles. Ask before adding any paid map or places API.
- next-intl from day one: English only at launch, locale-ready routes.
- Messaging: LINE Messaging API for provider notifications through a LINE Official Account; WhatsApp click-to-chat links with a prefilled reference code. WhatsApp Cloud API later.
- Zod for validation, generated database types, Playwright for end-to-end tests, Sentry free tier for errors.

## 5. Design handoff
The visual design comes from Claude Design. I'll share a design system link or exported screens. Implement its tokens (color, type, spacing, radius, shadow) as CSS variables mapped into the Tailwind theme, and build components that match its states: verification badges, last-checked chips, route result cards, comparison tray, bottom-sheet filters.
If I haven't shared the design yet, build with clean shadcn defaults and keep every style tokenized so the design drops in without refactoring.

## 6. Routes
- / : home
- /check : route checker (multi-step, client-side state); /check/results/[id] : saved results with an unguessable id, no login
- /dtv : DTV hub; /dtv/workcation; /dtv/soft-power; /dtv/soft-power/[activity] (muay-thai, thai-cooking, medical-treatment, sports-training)
- /dtv/requirements : current requirements, sourced and dated
- /rule-changes : dated changelog with sources and a subscribe form
- /visa-exemption-30-days : explainer for the 15 Sep 2026 change
- /embassies/[country]/[city] : one page per embassy or consulate
- /[activity]-dtv/[city] : listing pages, for example /muay-thai-dtv/phuket
- /providers/[slug] : provider profile
- /visa-agents/[city] : agents and law firms
- /compare : 2 to 4 providers via query string, noindex
- /guides/[slug] : long-form guides (MDX in the repo)
- /for-providers : B2B landing and claim-your-listing
- /portal : provider portal (magic-link login)
- /admin : internal admin (role-gated)
- /methodology, /about, /privacy, /terms, /disclosures

## 7. Data model (Postgres, RLS on every table)
- cities: id, slug, name, name_th, region, lat, lng, intro_md.
- providers: id, slug, name, name_th, type (muay_thai_gym, cooking_school, sports_program, medical_provider, language_school, visa_agent, law_firm), city_id, area, address, lat, lng, website, phone, email, line_id, whatsapp, languages[], description_md, photos[], accreditation (jsonb array of body, reference_no, document_url, verified_at), dtv_documents_provided[] (enrollment_letter, payment_receipt, training_schedule, business_license_copy, attendance_record, treatment_plan), status (unverified, contacted, verified, partner, suspended), verified_at, verified_by, median_reply_hours, created_at, updated_at.
- programs: id, provider_id, name, activity, duration_months, sessions_per_week, price_total_thb, price_monthly_thb, includes[], accommodation_available, accommodation_price_thb, levels[], dtv_eligible, notes, price_verified_at.
- embassies: id, slug, country, city, mission_type, apply_url, tracks_accepted[], soft_power_activities_listed[], min_course_months, funds_note, residence_proof_note, criminal_record_note, extra_documents[], reported_processing_days_median, source_urls[], last_verified_at, notes_md.
- rules: id, scope (global or an embassy_id), key, value_text, source_url, verified_at, verified_by. The site renders requirements only from this table.
- rule_changes: id, effective_date, title, summary_md, affects[], source_url, published_at.
- outcome_reports: id, embassy_id, track, activity, provider_id (nullable), outcome (approved, rejected, pending), applied_on, decided_on, notes, proof_file (private storage), moderation_status, reporter_email_hash, created_at.
- reviews: id, provider_id, author_name, verified_enrollment, rating, body, status, created_at.
- leads: id, ref_code (short and readable, for example LS-7K3Q), name, email, whatsapp, line_id, nationality, embassy_id, track, activity, city_id, start_month, budget_band, message, source_path, utm (jsonb), referrer, consent (jsonb: purposes, text_version, timestamp, ip_hash), status (new, qualified, sent, accepted, rejected, enrolled, disputed, refunded, spam), qualification_notes, created_at.
- lead_deliveries: id, lead_id, provider_id, channel (email, line, portal), sent_at, opened_at, accepted_at, rejected_at, reject_reason, billable, price_thb, dispute_reason, invoice_id.
- pricing_plans: provider_type, model (per_lead or success_fee), price_thb or percent, active_from. I set real values in admin; seed placeholder values for testing only.
- subscribers: id, email, interests[], embassy_id, consent, confirmed_at, unsubscribed_at.
- affiliate_partners: id, category (insurance, accommodation, coworking, bank_help, language_school), name, url, commission_note.
- provider_users: id, provider_id, email, role.
- audit_log: who changed what and when, for admin and portal edits.

## 8. Features by phase

### Phase 0: foundations (1 to 2 days)
Repo, stack, environments, CLAUDE.md, lint, format and type-check, GitHub CI with Vercel preview deploys. Supabase project with migrations, a seed script, RLS policies and roles (public, provider, admin). Design tokens in place. A deployed skeleton I can open on my phone.

### Phase 1: launchable directory (weeks 1 to 2)
1. Admin: CRUD for cities, providers, programs, embassies, rules and rule changes. CSV import for providers and programs with a dry-run preview. A verification queue where every status change is logged with notes and evidence uploads.
2. Seed data: an import template and a research checklist. Target 100 providers across Bangkok, Phuket, Chiang Mai and Pattaya, from official sources and providers' own websites. Don't scrape sites whose terms forbid it. Ask before any paid API. Every record starts as unverified until my team verifies it.
3. Public pages: home, DTV hub and track pages, requirements, rule changes, the 30-day exemption explainer, activity x city listings, provider profiles, and embassy pages for the 15 most-used embassies (propose the list from nationality data you can find, then confirm with me).
4. Enquiry flow: Zod validation, honeypot plus Cloudflare Turnstile, consent checkboxes, reference code, a confirmation page with WhatsApp and LINE buttons carrying the code.
5. Lead routing: each lead goes to up to 3 providers matching activity, city, embassy experience and budget. Notify each by email and LINE, with one-tap Accept and Decline links (signed, expiring tokens, no login). Remind after 12 hours if untouched, escalate to admin after 24 hours.
6. Qualification: valid email or phone, no duplicate from the same person within 30 days, fits the provider's criteria, not spam. Only qualified and accepted leads are billable.
7. SEO baseline (section 9) and analytics events (section 11).

### Phase 2: the defensible layer (weeks 3 to 5)
1. Route checker: a deterministic rules engine that reads the rules and embassies tables, never an LLM at runtime. It outputs ranked routes (strong, possible, not a fit) with reasons, an embassy-specific checklist and matched providers. Results are saved with an unguessable id and emailed on request. Unit-test every rule path.
2. Embassy outcome reports: submission flow, private proof upload, moderation queue, and public aggregates per embassy and per provider (counts by month, approval share). Never show personal details.
3. Provider portal: magic-link login; profile and program edits that go to review before publishing; lead inbox with accept and decline; monthly statement; accreditation document uploads.
4. Reviews from verified students only: the provider confirms enrollment, or the student uploads proof.
5. Compare view and saved shortlists.
6. Rule-change alerts: double opt-in subscriptions by embassy and track. Publishing a rule change emails affected subscribers.

### Phase 3: monetize and widen (weeks 6 to 8)
1. Billing: a Stripe customer per provider, monthly invoices for billable leads, a 7-day dispute window, admin approval of disputes, credit notes.
2. Featured placement: labeled Partner, at most 2 per listing page, never shown above the best match without the label.
3. Affiliate modules, after I approve each partner: insurance, accommodation, coworking, Thai bank account help.
4. A second language, chosen from traffic data.

## 9. SEO requirements
- Every indexable page has a unique title, meta description, H1, canonical URL, and an Open Graph image generated with @vercel/og.
- Listing pages are indexable only with at least 3 verified providers. Otherwise noindex them and link to the nearest city.
- JSON-LD: Organization and WebSite site-wide; BreadcrumbList everywhere; LocalBusiness subtypes on provider pages (SportsActivityLocation for gyms, EducationalOrganization for schools); Course and CourseInstance for programs; FAQPage only for real FAQs; Article with dateModified and author on guides. No review markup unless real reviews are on the page.
- Segmented XML sitemaps (providers, listings, embassies, guides) with real lastmod dates, robots.txt, and an llms.txt summarizing what the site covers.
- Internal links: each provider links to its city, activity and embassy pages; each embassy page links to providers whose students reported approvals there; guides link to listings.
- Facts appear as clean tables and short definitions so search engines and AI answers can quote and cite them.
- Performance budgets: LCP under 2.5s on 4G, CLS under 0.1, INP under 200ms, under 150KB of JavaScript on listing pages.

## 10. Trust, compliance and ethics
- Every page footer states that [BRAND] is independent and not a government site. Never copy government branding.
- No guaranteed-visa language anywhere, including provider-supplied copy. Flag and reject provider copy that promises approval.
- We list genuine programs only. Provider terms require real attendance; we never help create paper-only enrollments. State this on the methodology page.
- Every requirement shown to users comes from the rules table with a source link and last-verified date. Any page with a rule older than 60 days shows an update-pending notice and appears in an admin staleness report.
- Disclose paid relationships: Partner label, a disclosures page, and a methodology page explaining ranking.
- Thailand PDPA: separate consent for sharing an enquiry with providers and for marketing email, versioned consent text, a privacy policy, retention rules (delete raw lead data after 24 months unless enrolled), and a self-serve deletion request.
- A plain-language not-legal-advice line near checker results, not hidden in a footer.

## 11. Analytics events
page_view (with page_type), checker_started, checker_step_completed (step), checker_completed (routes), listing_filtered, provider_viewed, compare_opened, enquiry_started, enquiry_submitted, whatsapp_clicked, line_clicked, lead_accepted, lead_rejected (reason), enrollment_reported, outcome_report_submitted, subscriber_confirmed. Keep UTM and referrer on each lead. Build a simple admin dashboard: enquiries by day, acceptance rate, revenue to date, top pages by enquiries.

## 12. Quality bar
- Playwright tests for the enquiry flow, lead routing, accept and decline links, and checker results. Unit tests for qualification and billing rules.
- Lighthouse mobile score of 90 or more on home, listing and provider templates.
- WCAG 2.2 AA: keyboard navigation, labeled fields, visible focus.
- Sentry error monitoring and an uptime check on the enquiry endpoint.
- Every content page shows last reviewed and who reviewed it.

## 13. Out of scope for now
Native apps, applicant accounts, applicant payments on the site, an AI chat that gives visa advice, automated visa filing.

## 14. Start here
Read this brief end to end. Ask me up to 5 questions whose answers would change the architecture. Then propose the Phase 0 and Phase 1 plan with a file structure and a list of database migrations, and wait for my go-ahead before writing code.
