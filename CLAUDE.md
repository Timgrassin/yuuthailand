# Yuu

Verified long-stay Thailand directory. Next.js App Router, TypeScript strict, Tailwind, pnpm 9, Supabase (Singapore, ref `fbopazqtgbukzdgbwlzf`), Vercel.

## Commands

`pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm build`. Migrations live in `supabase/migrations`, numbered 0001 to 0019.

## A2 decisions log

| Date | ID | Decision |
|---|---|---|
| 2026-11-03 | Q1 | `providers.status` is verification only: unverified, contacted, verified, suspended. Partner uses `partner_since` / `partner_until` and is valid only while verified. Suspended hides the Partner label and all CTAs. |
| 2026-11-03 | Q3 | `leads.status` is qualification only: new, qualified, spam, duplicate. `lead_deliveries.status` is the per-provider pipeline: sent, accepted, declined, enrolled, disputed, refunded. Admin board cards are deliveries. Billing is per accepted, non-disputed delivery. |
| 2026-11-03 | Q4 | Checker results live at a server-stored unguessable id. Store answers plus rules version. Recompute with current rules. Show "rules changed since you checked" when the version moved. |
| 2026-11-03 | D1 | Brief routes win over design routes. |
| 2026-11-03 | D2 | English URLs have no locale prefix. Thai lives under `/th`. |
| 2026-11-03 | D3 | Provider ref code is `YU-XXXX-<CITY>` (alphabet drops 0, O, 1, I). |
| 2026-11-03 | D4 | Rules table has typed values (`value_num`, `value_json`), plus `track`, `effective_from`, `sort_order`. |
| 2026-11-03 | D5 | Accreditations and provider FAQs have their own tables. |
| 2026-11-03 | D6 | `fx_rates` and `site_settings` tables exist. THB is the source of truth. |
| 2026-11-03 | D7 | Maps use OpenFreeMap tiles. |
| 2026-11-03 | D8 | Design sample data lives in dev fixtures only, marked FAKE. |
| 2026-11-03 | D9 | Rules version = latest `rule_changes.id`. A trigger logs every write to `rules`. |
| 2026-11-03 | D10 | Providers see lead contact details only after they accept the delivery. To confirm with founder. |
| 2026-11-03 | D11 | Public site writes (leads, checker results, subscribers) go through server code with the service role. Anon has read-only access to the public read model. |

## Open

Domain (Q2). Supabase Pro at launch (Q5). Owner email for GitHub, Vercel, Supabase, Resend, LINE (Q5). Placeholders: [PRICE], [AMOUNT], [REVIEWER NAME], [ROLE]. Thai headline needs a native speaker check. Handoff files (`/handoff`) not yet in repo, so design tokens from `yuu.css` are not applied.
