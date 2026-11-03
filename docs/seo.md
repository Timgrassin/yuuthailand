# SEO and AI search standard

Every public page must pass this before merge. The goal is to rank in Google and to get cited in Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini and Copilot.

## The moat

Staylong owns three facts nobody else publishes in one place. Each must appear as visible text, in JSON-LD and in llms.txt.

1. Verification status and the date it was last checked, per provider.
2. Visa rules with typed values, effective dates and official source links.
3. A dated public log of every rule change, with an RSS feed.

## Built in (Phase 0)

| Piece | File | Rule |
|---|---|---|
| Metadata | `src/lib/seo/metadata.ts` | Every page calls `pageMetadata()`. It sets canonical, OG and Twitter. |
| Indexing guard | `src/lib/seo/site.ts` | Only production on the real domain is indexable. Previews are noindex and robots blocks them. |
| Robots | `src/app/robots.ts` | All AI search and answer bots are allowed by name. `/admin`, `/portal`, `/api`, `/dev`, `/r/`, `/auth` are disallowed. |
| Sitemap | `src/app/sitemap.ts` | Lists static routes, visa pages, indexable cities and embassies, and non-suspended providers, with real `lastModified`. |
| llms.txt | `src/app/llms.txt/route.ts` | Plain-text site map for AI engines. Lists every verified provider. |
| Rule change feed | `src/app/feeds/rule-changes.xml/route.ts` | RSS of the last 50 rule changes. |
| JSON-LD | `src/lib/seo/schema.ts` | Organization and WebSite site-wide. Builders for provider, program, embassy, FAQ, breadcrumb, item list and article. |
| Answer block | `src/components/seo/answer-block.tsx` | Answer-first summary with a visible "Last checked" date and source links. |

## Page template checklist

1. **H1 matches the query.** Write it the way the user searches. Example: "Thai ED visa schools in Chiang Mai", not "Our schools".
2. **Answer block first.** A 40 to 60 word answer that stands alone. It carries a number, a date and a source.
3. **Visible freshness.** Show "Last checked" or "Last updated" with a real date from the database. Never fake a date.
4. **Sources.** Rules and guides link to the official source (Thai MFA, Immigration Bureau, BOI, embassy pages).
5. **Tables over prose.** Comparisons, fees, durations and requirements go in HTML tables.
6. **FAQ.** Three to eight real questions per template, from `provider_faqs` or the page config. Emit `FAQPage` JSON-LD only when the questions are visible on the page.
7. **JSON-LD.** Each template emits its builder plus `BreadcrumbList` through `graph()`.
8. **Named author or reviewer.** Guides and rule pages show [REVIEWER NAME], [ROLE] and the review date.
9. **Internal links.** Each provider links to its city, track and the methodology. Each city links to its providers and the matching rules. Each rule links to the checker.
10. **English only.** One language, one URL per page. No hreflang.
11. **Server-rendered.** Content and prices are in the initial HTML. No client-only rendering for indexable text.
12. **No keyword stuffing.** It lowers AI citation. Write plainly, with specific numbers.

## Programmatic pages

These are the page families that scale. Each one needs unique data on the page, or it stays noindex.

| Family | Pattern | Index when |
|---|---|---|
| Track x city | `/cities/[city]?track=` then promote to a static path | at least 3 verified providers |
| Provider | `/providers/[slug]` | the provider is not suspended |
| Embassy | `/embassies/[slug]` | it has address and checked date |
| Rule | `/visa-rules#[track]` | always |

## Off-site presence (founder actions)

AI engines cite third-party sources about 6.5 times more often than a brand's own site. These moves matter as much as the code.

1. Create Google Business Profile, LINE OA and Facebook pages. Then add them to `organizationSchema().sameAs`.
2. Answer long-stay visa threads on r/Thailand, r/ThailandTourism, r/digitalnomad and the Thaivisa forum, linking to the rule change log.
3. Pitch the rule change log to expat news sites as a dated, citable source.
4. Create a Wikidata item for Staylong once there is press coverage.

## Monitoring

Every month, run the top 20 queries through ChatGPT, Perplexity, Google AI Overviews and Gemini. Log whether Staylong is cited, who is cited instead, and which page. Track AI referral traffic in PostHog by referrer: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai.
