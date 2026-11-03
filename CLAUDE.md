# Yuu

Verified long-stay Thailand directory. Next.js App Router, TypeScript strict, Tailwind, pnpm 9, Supabase (Singapore, ref `fbopazqtgbukzdgbwlzf`), Vercel.

## Commands

`pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. Migrations live in `supabase/migrations` (0001 to 0024). `scripts/db-smoke.sh` applies them to plain Postgres and runs `supabase/tests/smoke.sql`; CI runs it on every push.

## Layout

- `src/app/` public pages. English only. UI copy lives in `src/lib/copy.ts`.
- `src/lib/data.ts` read model (anon key, views from 0018). `src/lib/supabase/admin.ts` service role, server only.
- `src/lib/checker/engine.ts` pure checker. Thresholds come from `rules`, never from code.
- `src/lib/actions/` server actions: checker save (Q4), lead submit (consent, honeypot, rate limit).
- Design tokens in `src/app/globals.css` `:root`. Replace values with `yuu.css` when `/handoff` lands. Register new color tokens in `src/lib/cn.ts`.

## SEO and AI search

Every public page follows `docs/seo.md`. Use `pageMetadata()` for metadata, `graph()` builders for JSON-LD, and `AnswerBlock` above the fold. Never index previews. Never show a date that is not from the database.

## A2 decisions log

| Date | ID | Decision |
|---|---|---|
| 2026-11-03 | Q1 | `providers.status` is verification only: unverified, contacted, verified, suspended. Partner uses `partner_since` / `partner_until` and is valid only while verified. Suspended hides the Partner label and all CTAs. |
| 2026-11-03 | Q3 | `leads.status` is qualification only: new, qualified, spam, duplicate. `lead_deliveries.status` is the per-provider pipeline: sent, accepted, declined, enrolled, disputed, refunded. Admin board cards are deliveries. Billing is per accepted, non-disputed delivery. |
| 2026-11-03 | Q4 | Checker results live at a server-stored unguessable id. Store answers plus rules version. Recompute with current rules. Show "rules changed since you checked" when the version moved. |
| 2026-11-03 | D1 | Brief routes win over design routes. |
| 2026-11-03 | D2 | ~~English at root, Thai under `/th`.~~ Superseded by D15. |
| 2026-11-03 | D3 | Provider ref code is `YU-XXXX-<CITY>` (alphabet drops 0, O, 1, I). |
| 2026-11-03 | D4 | Rules table has typed values (`value_num`, `value_json`), plus `track`, `effective_from`, `sort_order`. |
| 2026-11-03 | D5 | Accreditations and provider FAQs have their own tables. |
| 2026-11-03 | D6 | `fx_rates` and `site_settings` tables exist. THB is the source of truth. |
| 2026-11-03 | D7 | Maps use OpenFreeMap tiles. |
| 2026-11-03 | D8 | Design sample data lives in dev fixtures only, marked FAKE. |
| 2026-11-03 | D9 | Rules version = latest `rule_changes.id`. A trigger logs every write to `rules`. |
| 2026-11-03 | D10 | Providers see lead contact details only after they accept the delivery. To confirm with founder. |
| 2026-11-03 | D11 | Public site writes (leads, checker results, subscribers) go through server code with the service role. Anon has read-only access to the public read model. |
| 2026-11-03 | D13 | Visa rules seeded from official-source research (docs/visa-rules-research.md) with a `confidence` per rule. Pages show "Pending expert review" until `reviewed_at` is set. Low-confidence values show an "Unconfirmed" badge. |
| 2026-11-03 | D14 | Thin pages stay noindex: city pages until 3 verified providers, embassies until address and check date, filtered provider lists always. |
| 2026-11-03 | D15 | English-only website. No Thai routes, copy, columns or consent texts (migration 0024). Database `locale` enums stay but only `en` is used. |
| 2026-11-03 | D12 | All AI search and answer bots are allowed in robots.txt, including training bots. AI citation growth outranks blocking training. |

## Open

Name and domain (Q2): rename from Yuu under review. Supabase Pro at launch (Q5). Owner email for GitHub, Vercel, Supabase, Resend, LINE (Q5). Placeholders: [PRICE], [AMOUNT], [REVIEWER NAME], [ROLE]. Consent text v1 needs legal review; publish v2 to change. `SUPABASE_SERVICE_ROLE_KEY` not yet in Vercel: lead submit and saved checker results return "unavailable" until it is. `fx_rates` empty: checker uses a 33 THB/USD fallback. Handoff files (`/handoff`) not yet in repo, so design tokens from `yuu.css` are not applied.
