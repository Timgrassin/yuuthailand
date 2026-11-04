# Staylong editorial brief (read fully before writing)

Site: staylong.co. English only. Audience: foreigners planning a long stay in Thailand (remote workers, students, retirees 50+, high earners, people married to Thais), mostly from the US, UK, EU and Australia. Goal: rank #1 in Google and be the source ChatGPT, Perplexity, Google AI Overviews and Claude cite.

## Files you must read first
- Content schema: src/content/types.ts (Guide and VisaContent types). Your output MUST type-check against it.
- Exemplar of the target quality and format: src/content/guides/dtv-vs-ed-visa.ts
- Current rule values with official sources and confidence: supabase/seed-data/visa-rules.json and docs/visa-rules-research.md
- Competitor gaps and content plan: docs/research/competitors.md
- Keywords, questions and AI prompts: docs/research/keywords.md

## Facts policy (non-negotiable)
- Every number, date, fee or threshold must come from visa-rules.json or from a source you verified with WebSearch (mode "extended" for anything 2025-2026). Put that source URL in `sources`.
- Prefer official sources: mfa.go.th / image.mfa.go.th, thaievisa.go.th, immigration.go.th, bangkok.immigration.go.th, ltr.boi.go.th, boi.go.th, thailandprivilege.co.th, Royal Gazette (ratchakitcha.soc.go.th), Thai embassy sites. Use reputable secondary sources only when no official one exists, and say so in the text ("reported by ...").
- If sources conflict or you cannot confirm, say so plainly in the text, use the more conservative figure, and set `confidence: "low"` (Guide) for that page.
- Never invent: statistics, quotes, named experts, provider/school names, prices of specific schools, case studies, user counts.
- Do not contradict visa-rules.json. If your research shows a value there is outdated, keep the page consistent with the newer official source AND list the discrepancy in your final reply so the rules table can be updated.
- Not legal or tax advice: for tax, say who to ask (a Thai tax adviser) and keep claims general and sourced.

## Writing style
- Answer first. `answer` is 40-60 words, self-contained, quotable, with the key number in it.
- H2 headings phrased the way people search ("How long can I stay on a DTV?").
- Short sentences (aim under 20 words). One idea per sentence. Active voice. Plain English. Second person ("you").
- No em dashes or en dashes anywhere. Use commas, colons or full stops. No emojis. No hype words (ultimate, seamless, game-changer, unlock). No filler.
- Use Markdown tables for any comparison, fees, timelines. Use numbered lists for steps. Bullets for criteria.
- Link internally with root-relative links: visa pages /visa-rules/dtv, /visa-rules/education-visa, /visa-rules/retirement-visa, /visa-rules/o-a-visa, /visa-rules/ltr-visa, /visa-rules/thailand-privilege, /visa-rules/marriage-visa, /visa-rules/work-visa; checker /checker; change log /visa-rules/changes; providers /providers; method /how-we-verify; other guides /guides/<slug>.
- 900-1,800 words of body per guide across 4-8 sections. FAQ: 4-6 real questions people ask (use keywords.md PAA list), answers 2-4 sentences, each self-contained.
- metaTitle <= 60 chars, description <= 155 chars, both containing the target query.
- Dates: published and updated = "2026-11-04". Today is 4 November 2026.

## Output rules
- Write ONLY the files assigned to you, in src/content/guides/<slug>.ts (export `const guide: Guide`) or src/content/visas/<track>.ts (export `const content: VisaContent`). Import types with `import type { Guide } from "../types";` (or VisaContent).
- Use template literals for Markdown bodies; escape backticks and `${` if they appear.
- Do NOT edit any other file (not index.ts, not components). The lead registers files.
- After writing, run in /home/user/yuuthailand: `npx -y pnpm@9.15.9 exec tsc --noEmit -p . 2>&1 | grep src/content` and fix any errors in your files. Ignore errors in files that are not yours.
- Final reply (under 200 words): list of files written with slug, target query, confidence, and every fact you could not verify or that conflicts with visa-rules.json.
