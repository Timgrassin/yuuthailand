# START HERE: Yuu build package for Claude Code

Read this file first, end to end. It is the single source of truth.
It merges the founder's build brief with the finished Claude Design handoff.
Where the brief and the design disagree, section A2 says which one wins.

## A. What is in this package

```
START-HERE.md                 this file: build brief + design handoff, merged
design/screenshots/*.png      one image per artboard. Look at these first.
design/html/*.html            plain HTML versions of every artboard. Open in a browser.
design/html/yuu.css           the design system: tokens + component classes
design/source/*.dc.html       original Claude Design source (reference only)
design/source/canvas.json     canvas layout + handoff notes per screen (in "notes")
reference/design-brief.md     the brief Claude Design worked from
reference/build-brief-original.md   the founder's original build brief, unedited
```

How to use the design files:
- The `.dc.html` files use a Claude Design runtime. Do not try to run them. Use `design/html/` instead.
- The HTML is a visual and structural reference, not production code. Rebuild it as React Server Components with Tailwind + shadcn/ui.
- Copy the tokens from `yuu.css` exactly (hex values, radii, shadows, type sizes). Map them into the Tailwind theme as CSS variables.
- Handoff notes per screen live in `canvas.json` under `notes.h1` to `notes.h12`. They cover responsive rules, interactions, empty and error states, and data fields.
- Photos are labelled striped placeholders. Real photos come later.

### A1. Artboard to route map

The build brief's routes win. Design artboard names map to them like this:

| Artboard | Build route |
|---|---|
| 01-Home-Mobile / Desktop | `/` |
| 00B-Home-Alt-* | Rejected direction. Reference only. Do not build. |
| 02-Checker-Step-* | `/check` (one question per step, 8 steps) |
| 02-Checker-Results-* | `/check/results/[id]` |
| 03-Listing-Mobile / Desktop, 03-Listing-Filters-Mobile | `/[activity]-dtv/[city]`, e.g. `/muay-thai-dtv/phuket` |
| 04-Provider-* | `/providers/[slug]` |
| 05-Compare-* | `/compare?ids=` (noindex) |
| 06-Embassy-* | `/embassies/[country]/[city]` |
| 06-Report-Outcome-Mobile | report flow on the embassy page (sheet on mobile, modal on desktop) |
| 07-Enquiry-* , 07-Enquiry-Confirm-* | enquiry form + confirmation page |
| 08-Rules-* | `/rule-changes` |
| 09-Guide-* | `/guides/[slug]` (MDX) |
| 10-Providers-Landing-* | `/for-providers` |
| 10-Portal-Inbox-Mobile | `/portal` lead inbox (mobile first) |
| 11-Admin-Board-Desktop | `/admin` lead board (low fidelity, desktop only) |
| DS-Foundations, DS-Components | design system reference |

Pages in the brief with no artboard (DTV hub and track pages, `/dtv/requirements`, `/visa-exemption-30-days`, `/visa-agents/[city]`, `/methodology`, `/about`, `/privacy`, `/terms`, `/disclosures`, admin CRUD screens): build them from the same components. Use the Guide template for content pages and the Listing template for `/visa-agents/[city]`.

### A2. Brief vs design conflicts: resolved

1. **Muay Thai course length.** The brief says usually 9 months, some embassies 12. The design's sample data shows 6-month minimums and a "London expects 6+ months" quirk. The brief wins. All lengths, minimums and quirks render from the `rules`, `embassies` and `programs` tables. Never hard-code design sample values.
2. **Design sample data is invented.** Every count, price, provider, review, outcome report, processing time and reference number in the design is fake. Never seed it as real data. Use it only for local fixtures, clearly marked.
3. **Reference code format.** The brief says `LS-7K3Q`. The design shows `YU-7K3Q-PKT`. Use `YU-` + 4 characters. Confirm the city suffix with the founder.
4. **Verified + Partner.** The brief's `providers.status` makes `partner` exclusive of `verified`. The design shows both badges together. Raise this as an architecture question. Recommended: keep `status` for verification and add `is_partner` (or a `partner_since` date).
5. **Facts not shown in the design.** Add to content and rules: visa-free applies to 60 countries and territories, tourism only; land-border visa-exempt entries capped at 2 per calendar year; DTV extendable once in Thailand for up to 180 days; fee non-refundable; dependents are spouse and children under 20.
6. **Brand and domain.** Brand is **Yuu** (อยู่, "to stay"). Domain is still `[DOMAIN]`. Ask the founder.
7. **Placeholders still open:** `[PRICE]` and `[AMOUNT]` per qualified enquiry, `[REVIEWER NAME]` and `[ROLE]` on guides. The Thai headline on `/for-providers` needs a native speaker check.

---

# Build brief: Yuu ([DOMAIN]), the verified long-stay Thailand directory

## 0. How to work with me
- I'm the founder: an experienced operator, not a developer. Explain setup in plain language and run terminal commands yourself. When a step needs my accounts (Vercel, Supabase, domain registrar, Google Search Console, LINE, Meta), tell me exactly what to click and what to paste back to you.
- Ask before anything that costs money, contacts real businesses or people, or cannot be undone: buying domains or paid plans, sending emails, deleting data, calling paid APIs.
- Never commit secrets. Use .env.local locally and Vercel environment variables in production.
- Keep a CLAUDE.md at the repo root with the product summary, decisions and why, data sources, open questions and how to run the project. Update it at the end of every session. Copy section A2 into it as the first decisions log.
- Work in the phases below. End each phase with: what you built, the URL where I can see it, what I need to do, known gaps, and the plan for the next phase.
- If a fact in this brief looks outdated, flag it and propose a fix. Never silently change rules shown to users.

## 1. Product
Yuu helps foreigners find a legal way to stay in Thailand longer than the visa-free stay. It matches people to the right Destination Thailand Visa (DTV) route and to verified providers whose documents get accepted, then sends qualified enquiries to those providers.
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
6. The DTV was introduced on 15 Jul 2024. Verify against an official source before showing it.
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
- next-intl from day one: English only at launch, locale-ready routes. Provider portal needs Thai early.
- Messaging: LINE Messaging API for provider notifications through a LINE Official Account; WhatsApp click-to-chat links with a prefilled reference code. WhatsApp Cloud API later.
- Zod for validation, generated database types, Playwright for end-to-end tests, Sentry free tier for errors.

## 5. Design handoff (done: see section A)
Direction: "Visa Desk". Calm authority with Thai warmth. Light mode only at launch.

**Tokens** (from `design/html/yuu.css`, map into the Tailwind theme as CSS variables):
- Ground: paper `#FAF8F3`, surface `#FFFFFF`, sunk `#F1EDE4`, line `#E3DDD1`, line-strong `#CDC5B5`.
- Ink: ink `#17201D`, ink-2 `#47514C`, ink-3 `#626C67` (lowest allowed text color, 5.1:1 on paper).
- Brand: teal `#0F5246` (primary action, links), teal-hover `#0A3D34`, teal-tint `#E2EFEA`; turmeric `#E8A92B` (highlight fill only, never text on paper), turmeric-tint `#FBF0D6`.
- Status (always paired with icon + word): green `#1D6B3B` on `#E1F0E5` (Strong, approved); amber `#7A4D00` on `#FCEFD2` (Possible, needs recheck); red `#A3262A` on `#F9E4E2` (rejected, suspended, errors); blue `#1F4E8C` on `#E3EBF6` (Partner, paid).
- Font: one variable font, **Anuphan** (Google Fonts, Latin + Thai, weights 400 to 700). Self-host it with next/font. Numbers use tabular figures.
- Type scale: display 56/58, mobile hero 36/39, H1 34/39, H2 24/30, H3 19/26, body 17/26, small 15/22, caption 14/20, eyebrow 14 caps. Body never below 16px.
- Spacing 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Radius 6 tags, 10 buttons and inputs, 14 cards, 20 sheet top, 999 chips. Shadows sh-1, sh-2, sh-3 as in the CSS.
- Logo: lowercase "yuu" wordmark plus a circle half teal, half turmeric (180 of 360 days).
- Icons: 24px grid, 1.9 stroke, round caps, inline SVG. Use Lucide equivalents. No WhatsApp or LINE brand logos: icon plus name.
- Focus: 3px teal outline, 2px offset. Tap targets 44px minimum.

**Components to build with every state** (see `DS-Components.png`): buttons (primary, secondary, ghost, accent, dark, disabled, focus), verification badge (Unverified, Contacted, Verified with date, Partner · paid, Suspended), last-checked chip + "Needs recheck" chip, numbered source footnotes, route result card (Strong, Possible, Not a fit), price display (THB first, ≈ converted value with rate date, currency toggle), filter chips (default, selected, disabled with zero count), stepper, progress bar, bottom sheet, map pins and clusters, comparison tray (max 4), sticky mobile CTA, alert banner, inputs with error, option cards, consent checkboxes, empty state with one-tap filter removals, loading skeletons, error box, offline banner with "saved on this device".

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
- providers: id, slug, name, name_th, type (muay_thai_gym, cooking_school, sports_program, medical_provider, language_school, visa_agent, law_firm), city_id, area, address, lat, lng, website, phone, email, line_id, whatsapp, languages[], description_md, photos[], accreditation (jsonb array of body, reference_no, document_url, verified_at), dtv_documents_provided[] (enrollment_letter, payment_receipt, training_schedule, business_license_copy, attendance_record, treatment_plan), status (unverified, contacted, verified, partner, suspended), verified_at, verified_by, median_reply_hours, created_at, updated_at. See A2 item 4 on partner.
- programs: id, provider_id, name, activity, duration_months, sessions_per_week, price_total_thb, price_monthly_thb, includes[], accommodation_available, accommodation_price_thb, levels[], dtv_eligible, notes, price_verified_at.
- embassies: id, slug, country, city, mission_type, apply_url, tracks_accepted[], soft_power_activities_listed[], min_course_months, funds_note, residence_proof_note, criminal_record_note, extra_documents[], reported_processing_days_median, source_urls[], last_verified_at, notes_md.
- rules: id, scope (global or an embassy_id), key, value_text, source_url, verified_at, verified_by. The site renders requirements only from this table.
- rule_changes: id, effective_date, title, summary_md, affects[], source_url, published_at. Add type (official, embassy_notice, correction) to match the design.
- outcome_reports: id, embassy_id, track, activity, provider_id (nullable), outcome (approved, rejected, pending), applied_on, decided_on, notes, proof_file (private storage), moderation_status, reporter_email_hash, created_at.
- reviews: id, provider_id, author_name, verified_enrollment, rating, body, status, created_at.
- leads: id, ref_code (see A2 item 3), name, email, whatsapp, line_id, nationality, embassy_id, track, activity, city_id, start_month, budget_band, message, source_path, utm (jsonb), referrer, consent (jsonb: purposes, text_version, timestamp, ip_hash), status (new, qualified, sent, accepted, rejected, enrolled, disputed, refunded, spam), qualification_notes, created_at.
- lead_deliveries: id, lead_id, provider_id, channel (email, line, portal), sent_at, opened_at, accepted_at, rejected_at, reject_reason, billable, price_thb, dispute_reason, invoice_id.
- pricing_plans: provider_type, model (per_lead or success_fee), price_thb or percent, active_from. I set real values in admin; seed placeholder values for testing only.
- subscribers: id, email, interests[], embassy_id, consent, confirmed_at, unsubscribed_at.
- affiliate_partners: id, category (insurance, accommodation, coworking, bank_help, language_school), name, url, commission_note.
- provider_users: id, provider_id, email, role.
- audit_log: who changed what and when, for admin and portal edits.

## 8. Features by phase

### Phase 0: foundations (1 to 2 days)
Repo, stack, environments, CLAUDE.md, lint, format and type-check, GitHub CI with Vercel preview deploys. Supabase project with migrations, a seed script, RLS policies and roles (public, provider, admin). Design tokens from section 5 in place, plus a `/dev/components` page showing every component state from DS-Components. A deployed skeleton I can open on my phone.

### Phase 1: launchable directory (weeks 1 to 2)
1. Admin: CRUD for cities, providers, programs, embassies, rules and rule changes. CSV import for providers and programs with a dry-run preview. A verification queue where every status change is logged with notes and evidence uploads. Lead board per `11-Admin-Board-Desktop`.
2. Seed data: an import template and a research checklist. Target 100 providers across Bangkok, Phuket, Chiang Mai and Pattaya, from official sources and providers' own websites. Don't scrape sites whose terms forbid it. Ask before any paid API. Every record starts as unverified until my team verifies it.
3. Public pages: home, DTV hub and track pages, requirements, rule changes, the 30-day exemption explainer, activity x city listings, provider profiles, and embassy pages for the 15 most-used embassies (propose the list from nationality data you can find, then confirm with me).
4. Enquiry flow: Zod validation, honeypot plus Cloudflare Turnstile, consent checkboxes, reference code, a confirmation page with WhatsApp and LINE buttons carrying the code. Draft saved locally on each field blur.
5. Lead routing: each lead goes to up to 3 providers matching activity, city, embassy experience and budget. Notify each by email and LINE, with one-tap Accept and Decline links (signed, expiring tokens, no login). Remind after 12 hours if untouched, escalate to admin after 24 hours.
6. Qualification: valid email or phone, no duplicate from the same person within 30 days, fits the provider's criteria, not spam. Only qualified and accepted leads are billable.
7. SEO baseline (section 9) and analytics events (section 11).

### Phase 2: the defensible layer (weeks 3 to 5)
1. Route checker: a deterministic rules engine that reads the rules and embassies tables, never an LLM at runtime. It outputs ranked routes (strong, possible, not a fit) with reasons, an embassy-specific checklist and matched providers. Results are saved with an unguessable id and emailed on request. Unit-test every rule path. Answers persist locally so a reload resumes the last step.
2. Embassy outcome reports: 3-step submission flow, private proof upload, moderation queue, and public aggregates per embassy and per provider (counts by month, approval share). Never show personal details.
3. Provider portal: magic-link login; profile and program edits that go to review before publishing; lead inbox with fit summary, accept and decline (reason required); monthly statement; accreditation document uploads. Thai / English toggle.
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
- Every page footer states that Yuu is independent and not a government site. Never copy government branding.
- No guaranteed-visa language anywhere, including provider-supplied copy. Flag and reject provider copy that promises approval.
- We list genuine programs only. Provider terms require real attendance; we never help create paper-only enrollments. State this on the methodology page.
- Every requirement shown to users comes from the rules table with a source link and last-verified date. Any page with a rule older than 60 days shows an update-pending notice and appears in an admin staleness report.
- Disclose paid relationships: Partner label, a disclosures page, and a methodology page explaining ranking.
- Thailand PDPA: separate consent for sharing an enquiry with providers and for marketing email, versioned consent text, a privacy policy, retention rules (delete raw lead data after 24 months unless enrolled), and a self-serve deletion request.
- A plain-language not-legal-advice line near checker results, not hidden in a footer.
- Applicant-reported facts carry a "Reported, not official" tag and never mix with official rules.

## 11. Analytics events
page_view (with page_type), checker_started, checker_step_completed (step), checker_completed (routes), listing_filtered, provider_viewed, compare_opened, enquiry_started, enquiry_submitted, whatsapp_clicked, line_clicked, lead_accepted, lead_rejected (reason), enrollment_reported, outcome_report_submitted, subscriber_confirmed. Keep UTM and referrer on each lead. Build a simple admin dashboard: enquiries by day, acceptance rate, revenue to date, top pages by enquiries.

## 12. Quality bar
- Playwright tests for the enquiry flow, lead routing, accept and decline links, and checker results. Unit tests for qualification and billing rules.
- Lighthouse mobile score of 90 or more on home, listing and provider templates.
- WCAG 2.2 AA: keyboard navigation, labeled fields, visible focus, no meaning carried by color alone.
- Sentry error monitoring and an uptime check on the enquiry endpoint.
- Every content page shows last reviewed and who reviewed it.
- Built pages match the screenshots in `design/screenshots/` at 390px and 1440px.

## 13. Out of scope for now
Native apps, applicant accounts, applicant payments on the site, an AI chat that gives visa advice, automated visa filing.

## 14. Start here
Read this file end to end and look at every screenshot in `design/screenshots/`. Ask me up to 5 questions whose answers would change the architecture. Include A2 item 4 (Partner status) and the domain. Then propose the Phase 0 and Phase 1 plan with a file structure and a list of database migrations, and wait for my go-ahead before writing code.
