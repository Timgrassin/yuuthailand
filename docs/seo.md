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
| Sitemap | `src/app/sitemap.ts` | Lists static routes, visa pages, indexable cities and embassies, and every indexable provider (`isIndexableListing`, read past the 1,000-row page), with real `lastModified`. Never list a noindex page. |
| llms.txt | `src/app/llms.txt/route.ts` | Plain-text site map for AI engines. Lists every verified provider. |
| Rule change feed | `src/app/feeds/rule-changes.xml/route.ts` | RSS of the last 50 rule changes. |
| JSON-LD | `src/lib/seo/schema.ts` | Organization and WebSite site-wide. Builders for provider, program, embassy, FAQ, breadcrumb, item list and article. |
| Answer block | `src/components/seo/answer-block.tsx` | Answer-first summary with a visible "Last checked" date and source links. |
| Related links | `src/lib/seo/related.ts`, `src/components/seo/related-links.tsx` | The "Related on Staylong" block on guide, visa, tool, nationality and provider pages. See Internal linking. |

## Page template checklist

1. **H1 matches the query.** Write it the way the user searches. Example: "Thai ED visa schools in Chiang Mai", not "Our schools".
2. **Answer block first.** A 40 to 60 word answer that stands alone. It carries a number, a date and a source.
3. **Visible freshness.** Show "Last checked" or "Last updated" with a real date from the database. Never fake a date.
4. **Sources.** Rules and guides link to the official source (Thai MFA, Immigration Bureau, BOI, embassy pages).
5. **Tables over prose.** Comparisons, fees, durations and requirements go in HTML tables.
6. **FAQ.** Three to eight real questions per template, from `provider_faqs` or the page config. Emit `FAQPage` JSON-LD only when the questions are visible on the page.
7. **JSON-LD.** Each template emits its builder plus `BreadcrumbList` through `graph()`.
8. **Named author or reviewer.** Guides and rule pages show [REVIEWER NAME], [ROLE] and the review date.
9. **Internal links.** Follow the Internal linking section below.
10. **English only.** One language, one URL per page. No hreflang.
11. **Server-rendered.** Content and prices are in the initial HTML. No client-only rendering for indexable text.
12. **No keyword stuffing.** It lowers AI citation. Write plainly, with specific numbers.

## Internal linking

Goal: every indexable page is two clicks from the home page, gets contextual links from at least three related pages, and every link says where it goes.

**Structure.** The site is hub and spoke. Hubs: `/visa-rules`, `/guides`, `/tools`, `/visas-for`, `/places`, `/immigration-offices`, `/providers`. Each visa page is the pillar for its track. Guides, tools, nationality pages and providers are spokes that link up to their pillar and across to siblings.

**Rules.**

1. **One source of truth.** Related links come from `src/lib/seo/related.ts` (`relatedForGuide`, `relatedForTrack`, `relatedForTool`, `relatedForCountry`, `relatedForProvider`). Add a new page family there, not with hand-written links in a template.
2. **What links to what.**
   - Visa page: all nationality pages (DTV and retirement tracks), its tools, the other seven visas, the FAQ and the change log. Its sidebar lists its guides (`trackGuides`).
   - Guide: its visa pages, the best-matching tools, guides it does not already show in "Read next", the FAQ, and nationality pages for DTV and retirement topics.
   - Tool: its visa pages, its guides, other tools, and nationality pages for the DTV checklist.
   - Nationality page: the four visas that vary by nationality, DTV and retirement guides, six other nationalities, the DTV checklist, the exemption calculator and the embassy list.
   - Provider: the visas that fit its programs or type, a guide for its type, the places and immigration offices in its city, and up to six nearby providers, indexable ones first.
3. **Rotate long lists.** When a list is longer than the block, it rotates by the page it is on, so every target gets links instead of the first few getting all of them.
4. **Anchors are page names.** Use the target's title ("Retirement visa (Non-O)", "Thailand visas for British citizens"), never a bare path, "click here" or the same exact-match phrase everywhere. Editorial text may write a bare path ("See /visa-rules/dtv."); `LinkedText` renders it with `pathLabel()`.
5. **Noindex pages still pass links.** Thin pages (cities under 3 verified providers, unverified listings, filtered lists) are `noindex, follow`, so crawlers reach the listings they link to. Only previews are `nofollow`.
6. **Do not link to noindex pages from sitewide nav** unless they are hubs that lead to indexable pages (the footer city links lead to provider listings).
7. **Guard it.** `src/lib/seo/related.test.ts` fails if any guide, visa, tool or nationality page gets fewer than three contextual links, if a page links to itself, or if an anchor is a bare path.

**Checking it.** Crawl the site from `/` and compare with the sitemap: every sitemap URL should be reachable by links, at depth 3 or less, and every indexable page should be in the sitemap.

## Programmatic pages

These are the page families that scale. Each one needs unique data on the page, or it stays noindex.

| Family | Pattern | Index when |
|---|---|---|
| Track x city | `/cities/[city]?track=` then promote to a static path | at least 3 verified providers |
| Provider | `/providers/[slug]` | verified, described, or 3+ quoted facts (`isIndexableListing`, D14/D23) |
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
