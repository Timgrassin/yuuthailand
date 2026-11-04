# Staylong keyword and question research

Prepared 4 Nov 2026 for staylong.co. Scope: English-language search and AI-assistant demand from foreigners planning a stay in Thailand longer than 30 days.

## 0. Method and honesty notes

**No paid SEO tool was used.** No volume in this document is measured. Demand tiers are inferred from these signals:

1. **Forum density.** I counted how many distinct thread titles exist for the same question on ask.in.th / asq.in.th (Thailand Q&A aggregators that mirror Reddit, ASEAN Now and Thai Visa questions) and r/Thailand. Examples: "800,000 baht seasoning" has 15+ near-duplicate threads. "DTV bank account" has 8+. "ED visa Rayong school" has 1.
2. **Competition.** Who ranks: official sources (embassy, BOI, Immigration), law firms (Siam Legal, Thai Law Online, Tilleke), agencies (Issa Compass, Thai Visa Centre, Thai Visa Services), media (Thaiger, Khaosod, Pattaya Mail, Phuket News), and many thin `*.pages.dev` / blogspot / vercel.app affiliate sites. Lots of thin AI-written sites ranking means demand exists and the bar is beatable on trust.
3. **Freshness gaps.** Topics where results conflict with each other or carry stale numbers. Examples: O-A insurance (400k/40k vs 3M THB), seasoning (60 vs 90 days), LTR income (USD 80k "removed" vs still required), DTV bank accounts (possible vs impossible). Conflict means searchers keep searching. That is Staylong's opening, because typed rules plus "last checked" dates resolve conflict.
4. **News triggers.** Two 2026 changes create spike demand: (a) DTV must be applied for in the country of citizenship or legal residence, plus a police clearance, from **31 Aug 2026** (mission notices, not a Royal Gazette instrument; "legal" vs "permanent" residence wording differs by embassy); (b) the visa exemption was **cut from 60 to 30 days from about 15 Sep 2026** (Royal Gazette 31 Aug 2026, about 60 countries, one 30-day extension, land border entries capped at 2 per year). Also an **Aug 2026 police raid** on a Bangkok visa agency over forged bank statements (400+ clients reported).

**Tiers** (relative, English, global, monthly):
- VH, very high: head terms ("thailand retirement visa", "dtv visa"). Probably 10k+ per month globally.
- H, high: core modifiers ("retirement visa requirements", "dtv visa requirements").
- M, medium: specific process or comparison terms.
- L, low: long tail. Low volume, high conversion, easy to rank.

Treat the tiers as ordinal guesses. Check them in Google Search Console within 8 weeks of launch and re-tier.

**Competition tiers:** H = official pages plus big law firms or media hold the top 5. M = mixed agency and blog sites. L = thin or stale results, forums ranking.

**Intent:** I = informational, C = commercial (comparing options or providers), T = transactional (ready to apply, book or contact).

**Page types:** guide, comparison, tool, directory, checklist, news, rule page (an existing `/visa-rules/[track]` page).

**Existing Staylong routes** (from `src/app` and `src/lib/tracks.ts`): `/checker`, `/visa-rules`, `/visa-rules/{dtv, education-visa, retirement-visa, o-a-visa, ltr-visa, thailand-privilege, marriage-visa, work-visa}`, `/visa-rules/changes`, `/cities/[slug]` (bangkok, chiang-mai, phuket, pattaya, hua-hin, koh-samui, krabi, khon-kaen, chiang-rai, udon-thani), `/embassies/[slug]`, `/providers`, `/providers/[slug]`, `/how-we-verify`. **New** routes I propose: `/guides/*`, `/compare/*`, `/schools/*`, `/muay-thai/*`, `/visa-agents/*`, `/cost-of-living/*`. Rename these to fit the router as needed.

**Constraints from CLAUDE.md that shape these recommendations:**
- D13: rule pages show "Pending expert review" and "Unconfirmed" badges. Keep them. They are a trust signal, not a ranking penalty.
- D14: city pages stay noindex until there are 3 verified providers. Filtered lists stay noindex. Programmatic pages below respect this.
- Never show a date that is not from the database. Any "2026" in a title must be backed by the `effective_from` or `reviewed_at` value shown on the page.

---

## 1. Keyword clusters

Columns: keyword | intent | demand | competition | page type | angle.

### C1. DTV (Destination Thailand Visa)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| dtv visa thailand | I | VH | H | rule page | Typed rules: 500k THB funds, 5-year validity, 180-day stays, current fee, with sources and the date last checked. |
| dtv visa requirements | I | H | H | rule page | A checklist split by remote-work and soft-power routes. |
| dtv visa new rules 31 august 2026 | I | H (spike) | M | news + change log | What changed, who is affected, how the transition works for applications already paid. Embassy wording differs. |
| dtv apply country of residence | I | M | M | guide | Which mission you must use, and what counts as proof of residence for each embassy. |
| dtv police clearance certificate | I | M | L | checklist | Which certificate, issued within how many months, apostille or not, by nationality. |
| dtv visa cost / fee | I | H | M | rule page | Government fee (10,000 THB at most missions; varies by currency) vs agent markup. |
| dtv visa 500000 baht bank statement | I | M | M | guide | How long the funds must be seasoned, whose account, and whether a sponsor letter is accepted. |
| dtv visa rejected / rejection reasons | I | M | L | guide | Common causes (weak employer letter, funds, wrong mission) and how to reapply. |
| dtv extension 180 days immigration | I | M | M | guide | The 1,900 THB in-country extension, timing, and the office per city. |
| dtv re-entry after 180 days border run | I | M | M | guide | Exit and re-enter vs extend. Reports of border questioning in 2026. |
| dtv remote work legal / can i work on dtv | I | H | M | guide | Foreign employer and clients only. No Thai clients. Tax link. |
| dtv muay thai / soft power visa | C | H | M | directory + guide | Gyms that issue DTV paperwork, verified. |
| dtv visa agent | C | M | M | directory | Verified agents with a Partner label, plus the price range. |
| dtv tax 180 days | I | M | M | guide | DTV holders who stay 180+ days are tax residents. Remittance rule. |
| dtv after 5 years | I | L | L | guide | Options after expiry: reapply, LTR, ED, marriage. |
| dtv visa from inside thailand | I | M | L | guide | Not possible. You must apply abroad (Vientiane, KL and so on, subject to the new residence rule). |
| dtv visa processing time | I | M | L | rule page | Days by embassy, from reports. Mark as reported, not official. |
| dtv family / dependent visa | I | M | L | guide | Spouse and children under 20, and what they must show. |

### C2. Education visa (Non-ED), schools

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand education visa / ed visa thailand | I | H | M | rule page | Who qualifies, the 90-day extension cycle, the attendance rule. |
| ed visa thai language school | C | H | M | directory | Verified schools only. Ministry license shown. |
| ed visa chiang mai | C | M | M | directory (city) | Price ranges, verified schools, the CM immigration office. |
| ed visa bangkok school | C | M | M | directory (city) | Same, for Bangkok. |
| ed visa phuket / pattaya / hua hin / koh samui | C | L-M | L | directory (city) | Few competitors. Fast wins once 3 schools are verified. |
| ed visa cost / price 1 year | C | M | M | guide | All-in package range (reported 25k to 70k THB) plus immigration fees. |
| ed visa extension 90 days | I | M | L | checklist | Documents, the 1,900 THB fee, the Thai-language test risk. |
| ed visa thai test immigration | I | L | L | guide | Why immigration quizzes students, and how to pass honestly. |
| ed visa age limit / over 50 | I | L | L | guide | No age limit, but scrutiny applies. Compare with retirement. |
| ed visa work remotely | I | M | L | guide | Not permitted. Risk explained. Point to DTV. |
| ed visa online classes | I | L | L | guide | Mostly not accepted. Attendance rules. |
| ed visa vs dtv | C | M | L | comparison | See C9. |
| thai lessons cost | C | M | M | guide | Group vs private, per hour by city. |
| learn thai chiang mai / bangkok | C | M | M | directory | Schools with or without a visa. |
| ed visa university thailand | I | L | M | guide | University degree students vs language schools. |
| ed visa scam school | I | L | L | guide | Unlicensed schools, schools closed by the ministry, how to check a license. |

### C3. Retirement visa (Non-O, extension of stay)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand retirement visa | I | VH | H | rule page | 50+, 800k THB or 65k THB per month, yearly extension. |
| thailand retirement visa requirements | I | VH | H | rule page | A checklist plus the typed values. |
| retirement visa 800000 baht seasoning | I | H | L | guide | The 2-month pre-application and 3-month post-approval rules, and the 400k floor. Forums are confused, so own it. |
| retirement visa 65000 baht income letter | I | M | M | guide | Embassy income letters vs 12 months of transfers, by nationality. |
| retirement visa combination method | I | M | L | guide | Bank deposit plus income totalling 800k per year. |
| retirement visa extension documents | I | H | M | checklist | A printable list per immigration office. |
| non o retirement visa from inside thailand | I | M | M | guide | Converting from visa-exempt entry. The 30-day exemption makes this harder. |
| retirement visa cost | I | M | M | rule page | Gov fees (Non-O visa, 1,900 extension, re-entry 1,000 / 3,800) vs agent fees. |
| retirement visa agent / without 800k | C | M | M | directory + scam guide | Legit agents vs "no money" services (forgery risk). See C13. |
| retirement visa age 50 | I | M | M | rule page | Exact rule. Spouse under 50 joins as a dependent. |
| retirement visa permanent residence | I | L | L | guide | Retirement is not a PR route. Correct the myth (some sources claim it is). |
| retirement visa health insurance | I | M | M | guide | Not required for Non-O extensions; required for O-A. |
| retirement visa rejected | I | L | L | guide | Common office reasons. |
| retire in thailand | I | VH | H | guide | Entry hub: visa choice, cost, cities, health. |
| retire in thailand on social security | I | M | M | guide | US-specific. The income route with a US embassy letter or SSA statement. |

### C4. O-A long-stay visa and health insurance

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| o-a visa thailand | I | H | M | rule page | Applied abroad, 1 year, insurance required. |
| o-a visa health insurance 3 million baht | I | M | L | guide | 3M THB cover (Sep 2024 rule), OIC-approved insurers, why sources still say 400k/40k. |
| o-a visa requirements | I | M | M | rule page | Police clearance, medical certificate, financials, insurance. |
| o-a visa extension in thailand | I | M | L | checklist | Insurance at extension, Thai-issued policy, the 1,900 fee. |
| o-a visa vs non-o | C | M | L | comparison | Insurance and police check vs a simpler in-country route. |
| o-a visa usa / uk embassy | I | M | M | embassy page | Per-mission documents. |
| health insurance for thailand retirement visa | C | H | H | guide | Requirements by visa, not an insurer sales page. |
| o-x visa thailand 10 year | I | M | M | guide | Eligible nationalities, 3M THB funds, insurance. |
| o-a police clearance fbi / dbs / afp | I | L | L | checklist | Per-country certificate names. |
| o-a medical certificate | I | L | L | checklist | Which diseases. Translation rules. |

### C5. LTR (Long-Term Resident)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| ltr visa thailand | I | H | H | rule page | Four categories, 10 years, BOI. |
| ltr visa requirements | I | H | H | rule page | Typed per category. Note the 2025 criteria update. |
| ltr work from thailand professional | I | M | M | guide | USD 80k income vs the employer revenue test. Clarify conflicting sources. |
| ltr wealthy pensioner | I | M | M | guide | USD 80k pension, or 40k plus 250k invested. Insurance. |
| ltr visa tax exemption | I | M | M | guide | Foreign income exemption by category. Which categories get the 17% rate. |
| ltr visa cost 50000 baht | I | M | L | rule page | Fee plus documents plus translation. |
| ltr visa health insurance usd 50000 | I | L | L | checklist | Cover rules or alternatives. |
| ltr visa processing time / boi | I | L | L | guide | Steps from GE endorsement to visa. |
| ltr visa vs dtv | C | M | L | comparison | See C9. |
| ltr vs thailand privilege | C | M | M | comparison | See C9. |
| ltr visa work permit | I | L | M | guide | The digital work permit, and what it does not cover. |
| ltr visa rejected | I | L | L | guide | Income evidence gaps. |

### C6. Thailand Privilege (Elite)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand privilege visa / thailand elite visa | C | H | H | rule page | Tiers, price, years, no age or income test. |
| thailand privilege price / cost | C | H | H | rule page | Typed tier prices from the database (sources conflict: Bronze 650k vs Gold 900k). |
| thailand elite visa worth it | C | M | M | comparison | Cost per year vs retirement or LTR, by age. |
| thailand privilege vs retirement visa | C | M | M | comparison | See C9. |
| thailand privilege agent | C | M | H | directory | GSSAs (official sales agents) vs resellers. Commission transparency. |
| thailand privilege 90 day report | I | L | L | guide | Still required. Members can get help with it. |
| thailand privilege work | I | L | L | guide | No work rights. |
| thailand privilege family | C | L | M | rule page | Family tiers. |
| thailand privilege tax | I | L | L | guide | Membership grants no tax exemption. Contrast with LTR. |

### C7. Marriage visa (Non-O for a Thai spouse)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thai marriage visa | I | H | M | rule page | 400k THB or 40k THB per month. Yearly extension. |
| marriage visa thailand requirements | I | H | M | rule page | Typed values plus documents. |
| marriage visa 400000 baht seasoning | I | M | L | guide | 2 months before applying. Office variation (Bangkok office deposit-only reports, Mar 2026). |
| marriage visa extension documents | I | M | M | checklist | Kor Ror 2/3/22, photos, house map, witnesses. |
| marriage visa interview / home visit | I | L | L | guide | What officers check. |
| register marriage in thailand foreigner | I | M | M | guide | Embassy affirmation, translation, the amphur. |
| marriage visa vs retirement visa | C | M | L | comparison | 400k vs 800k. Over-50s married to Thais. |
| marriage visa work permit | I | M | L | guide | Allowed with a permit. A Non-O marriage visa lets you get one. |
| thai spouse visa usa / uk | I | L | M | embassy page | Per mission. |
| marriage visa divorce what happens | I | L | L | guide | Cancellation, the 7-day stay, options. |

### C8. Work visa (Non-B) and work permit

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| non b visa thailand | I | H | H | rule page | Employer sponsor, 2M THB capital and 4:1 Thai staff ratio. |
| thailand work permit requirements | I | H | H | guide | Process, restricted occupations. |
| teach english in thailand visa | C | M | M | guide | Non-B plus teacher's license waiver. |
| non b visa extension | I | M | M | checklist | Yearly, tied to the job. |
| work permit cost thailand | I | M | M | guide | Gov fees vs company costs. |
| can foreigners work in thailand | I | H | M | guide | Hub: which visas allow work, which never do. |
| smart visa thailand | I | M | M | guide | Out of scope for the checker today. Short page or link. |
| digital nomad thailand legal | I | H | M | guide | DTV vs working illegally on visa exemption. |

### C9. Comparisons (cross-visa decisions)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| dtv vs ed visa | C | M | L | comparison | Cost, work rights, attendance, renewals. Typed table. |
| dtv vs retirement visa / non-o vs dtv over 50 | C | M | L | comparison | The 500k one-off vs 800k held. 5 years vs yearly. Bank account access. |
| retirement visa vs o-a vs ltr vs privilege | C | M | M | comparison | One matrix for over-50s. Cost over 5 and 10 years. |
| best visa for long stay thailand | C | H | M | comparison + tool | Checker CTA. |
| best visa to retire in thailand | C | H | M | comparison | Over-50 matrix. |
| best visa for digital nomads thailand | C | H | M | comparison | DTV, LTR WFT, Privilege. |
| ltr vs dtv | C | M | L | comparison | Income tiers. Tax. |
| thailand privilege vs ltr | C | M | M | comparison | Paid vs qualified. |
| marriage vs retirement visa | C | M | L | comparison | 400k vs 800k. |
| o-a vs non-o | C | M | L | comparison | Insurance. |
| thailand vs malaysia mm2h / vietnam / bali long stay | C | M | M | comparison | Optional later. Out-of-country comparisons pull international traffic. |
| easiest visa thailand 1 year | C | H | M | comparison + tool | Checker. |

### C10. Processes and admin

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| 90 day report thailand | I | VH | M | guide | Online, in person, by mail, by agent. Window rules. Fines. |
| 90 day report online | T | H | M | guide | Step by step. Known outages. |
| tm30 thailand | I | H | M | guide | Who files (landlord). What to do if they do not. |
| re-entry permit thailand | I | H | M | guide | 1,000 single / 3,800 multiple. Losing your extension without one. |
| extension of stay thailand | I | H | M | guide | Hub by visa. |
| visa exemption extension 30 days | I | H | M | guide | Now relevant: 30 + 30 under the new rule. |
| tdac thailand digital arrival card | I | VH | H | guide | Required for everyone. Fake TDAC sites warning. |
| open bank account thailand foreigner | I | H | M | guide | By visa type. DTV is hard. Branch tips. Do not name branches without verification. |
| bank account dtv visa | I | M | L | guide | Conflicting reports. Collect dated user reports. |
| certificate of residence thailand | I | M | L | guide | Uses: driving licence, bank. Where to get one. |
| thai driving license foreigner | I | H | M | guide | Required documents. |
| yellow house book tabien baan | I | M | M | guide | Who can get one. Value. |
| police clearance certificate for thailand visa | I | M | L | checklist | By nationality. |
| overstay thailand fine | I | H | M | guide | 500 THB per day, 20k cap, ban tiers. |
| immigration office chiang mai / bangkok / jomtien / phuket | T | M | M | city or office page | Address, hours, queue tips, last checked date. |

### C11. Cost of living and budgeting by city

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| cost of living thailand | I | VH | H | guide | Budget tiers tied to visa financial rules (for example 65k THB per month). |
| cost of living chiang mai | I | H | H | guide (city) | Monthly budget by persona. |
| cost of living bangkok expat | I | H | H | guide (city) | Same. |
| cost of living phuket | I | H | M | guide (city) | Same. |
| cost of living pattaya retiree | I | M | M | guide (city) | Retiree angle. |
| cost of living hua hin | I | M | L | guide (city) | Retiree angle. Few strong competitors. |
| cost of living koh samui | I | M | L | guide (city) | Same. |
| how much money do i need to retire in thailand | I | H | M | guide + tool | Visa minimum vs a realistic budget. |
| chiang mai vs bangkok vs phuket for expats | C | M | M | comparison | Persona-based. |
| budget for 6 months in thailand dtv | I | L | L | guide | DTV persona. |
| rent condo chiang mai long term | C | M | H | guide | Out of the directory's scope. Link out or skip. |

Note: cost-of-living numbers are not visa rules. They need their own sourced table, or a clear "estimate" label. Under the site rule, do not show dates that are not in the database.

### C12. Schools and Muay Thai camps (directory demand)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| muay thai camp thailand | C | H | H | directory | Verified camps. DTV paperwork flag. |
| muay thai camp phuket / chiang mai / bangkok / koh samui / pattaya | C | M-H | H | directory (city) | Price ranges, visa support. |
| muay thai camp price per month | C | M | M | guide | 7k to 15k THB per month for training. All-in packages up to 80k. |
| muay thai dtv visa package | T | M | L | directory | 6-month DTV packages (15k to 25k THB reported). Verified issuers only. |
| muay thai visa 6 months | T | M | L | directory | Same. |
| thai cooking class dtv | T | L | L | directory | Other soft-power routes. |
| thai language school bangkok | C | M | M | directory | |
| thai language school chiang mai | C | M | M | directory | |
| best thai language school | C | M | M | directory | Verified, not ranked by payment. Explain the order. |
| ed visa school price comparison | C | L | L | directory | Price table from the database. |
| muay thai gym women / beginner | C | L | M | directory (filter, noindex) | Per D14, filtered lists stay noindex. Use an editorial guide instead. |

### C13. Scams, agents and trust

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand visa agent scam | I | M | L | guide | Red flags. The Aug 2026 forged bank statement raid. How Staylong verifies agents. |
| fake visa stamp thailand | I | M | L | guide | Real convictions. Overstay and jail risk. |
| visa agent thailand legal | I | M | L | guide | Agents are legal. Forgery is not. |
| retirement visa without money agent | C | M | M | guide | What "no 800k" services actually do. The risk. |
| thai visa centre review / [agent name] review | C | M | M | provider page | Verified profiles, not reviews. Never fabricate reviews. |
| best visa agent bangkok / pattaya / chiang mai | C | M | M | directory (city) | Verified agents. |
| how to check visa agent licence | I | L | L | checklist | No single licence. What to check instead. |
| fake tdac website | I | M | M | news | Official URL only. |
| ed visa school closed fake | I | L | L | guide | Ministry checks. |

### C14. Rule changes 2025-2026 and tax

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand visa changes 2026 | I | H | M | change log | Dated log with RSS. Strongest moat asset. |
| thailand visa exemption 30 days | I | VH (spike) | H | news + guide | From 15 Sep 2026. 30 + 30 extension. Land entries capped at 2. |
| thailand 60 day visa exemption ended | I | H (spike) | M | news | Who is affected. Countries list. |
| dtv new rules 2026 | I | H | M | news | See C1. |
| thailand tax foreign income 2024 remittance | I | H | M | guide | Applies to income earned from 2024 and remitted while resident. Pre-2024 income is exempt. |
| thailand tax residency 180 days | I | M | M | guide | Calendar year, cumulative. |
| thailand tax on pension uk / us | I | M | M | guide | Tax treaty basics. Advise seeing an adviser. |
| dtv tax | I | M | M | guide | |
| ltr tax exemption | I | M | M | guide | |
| thailand worldwide taxation proposal | I | L | L | news | Not enacted as of the July 2026 reports. Log status. |
| thailand visa news | I | M | H | change log | RSS, subscribe. |
| o-a insurance 3 million change | I | L | L | change log | |

### C15. Nationality-specific (programmatic seed)

| Keyword | Int | Dem | Comp | Page | Angle |
|---|---|---|---|---|---|
| thailand retirement visa for americans / us citizens | I | H | M | visa x nationality | US embassy income letter rules, SSA, FBI check for O-A, LA/NY/Chicago consulates. |
| thailand retirement visa uk citizens | I | H | M | visa x nationality | UK pension letter, London embassy, DBS check. |
| thailand retirement visa australians | I | M | M | visa x nationality | Canberra / Sydney, AFP check. |
| thailand retirement visa canadians / germans | I | M | L | visa x nationality | |
| dtv visa for americans / uk / australians / indians | I | M | L | visa x nationality | Apply-at-home mission rule makes this very relevant now. |
| dtv visa india | I | M | L | visa x nationality | India is a growing market. India is not on the exemption list for the same length, so check the typed rule. |
| dtv visa philippines / china / vietnam | I | L-M | L | visa x nationality | Asian growth markets. |
| thailand marriage visa uk / us | I | M | M | visa x nationality | |
| thai embassy london / washington / canberra visa | T | M | H | embassy page | Address, process, check date. Indexable per D14 once address and date exist. |
| does [country] need a visa for thailand | I | H | H | visa x nationality | Post-15-Sep exemption status per country. |

---

## 2. Top 50 question queries

"Owner" is the Staylong page that should answer it. Answers are angles that point to the rule database. Where a figure is given, it must render from `rules` with its source, not hard-coded.

| # | Question | Shortest correct-answer angle | Owner |
|---|---|---|---|
| 1 | What is the DTV visa? | A 5-year multiple-entry visa allowing 180-day stays per entry, for remote workers and soft-power activities. Needs 500k THB in funds. | /visa-rules/dtv |
| 2 | Can I work remotely on a DTV? | Yes, for foreign employers or clients only. No Thai employment, no Thai clients. | /visa-rules/dtv |
| 3 | Can I apply for a DTV in a neighbouring country? | Since 31 Aug 2026, only at a mission covering your citizenship or legal residence, with proof. | /guides/dtv-country-of-residence-rule |
| 4 | Do I need a police clearance for the DTV? | Yes, from 31 Aug 2026. Issued within 6 months at most missions. Wording varies by embassy. | /guides/dtv-police-clearance |
| 5 | How much money do I need for a DTV? | 500,000 THB equivalent in a bank statement, typically for the last 3 to 6 months. | /visa-rules/dtv |
| 6 | Can I extend a DTV inside Thailand? | Once per entry, by 180 days, at immigration for 1,900 THB. | /visa-rules/dtv |
| 7 | Do I pay tax in Thailand on a DTV? | If you are in Thailand 180+ days in a calendar year and remit foreign income earned from 2024 onward, likely yes. | /guides/thailand-tax-residency |
| 8 | Can I open a bank account with a DTV? | Inconsistent. Many branches refuse. Success depends on the branch, with extra documents. | /guides/open-bank-account-thailand |
| 9 | What is the best visa to retire in Thailand? | Non-O retirement for most people (800k / 65k). O-A if applying abroad. LTR for USD 80k+ pensions. Privilege if you want no paperwork. | /compare/retirement-visas |
| 10 | What are the retirement visa requirements? | Age 50+, 800k THB in a Thai bank or 65k THB per month income (or a combination), plus a yearly extension. | /visa-rules/retirement-visa |
| 11 | How long must the 800,000 baht be in the bank? | Commonly: 2 months before applying, untouched for 3 months after approval, then never below 400k. First-time vs renewal timing varies by office, so show the confidence badge. | /guides/retirement-800k-seasoning |
| 12 | Can I use income instead of 800k? | Yes: 65k THB per month via an embassy letter or 12 months of transfers, depending on nationality. | /visa-rules/retirement-visa |
| 13 | Do I need health insurance for a retirement visa? | Not for the Non-O extension. Yes for O-A (3M THB cover). | /guides/health-insurance-for-thai-visas |
| 14 | What insurance does the O-A visa need? | 3,000,000 THB cover (in force since Sep 2024) from an OIC-acceptable insurer. Old 400k/40k figures are outdated. | /visa-rules/o-a-visa |
| 15 | O-A vs Non-O: which is better? | O-A: applied abroad, insurance, police check. Non-O: in country, no insurance. | /compare/o-a-vs-non-o |
| 16 | What is the LTR visa? | A 10-year BOI visa for wealthy citizens, pensioners, remote professionals and skilled hires. | /visa-rules/ltr-visa |
| 17 | Does the LTR need USD 80,000 income? | For most categories, yes, or a lower amount with investment. The 2025 update dropped work experience, not income, for remote professionals (confirm with BOI). | /visa-rules/ltr-visa |
| 18 | Is Thailand Privilege worth it? | If you value no income test and an easy process, and stay several years, yes. Compare its cost per year with retirement. | /compare/privilege-vs-retirement |
| 19 | How much is the Thailand Elite visa? | From the database tier table (Bronze / Gold and so on). One-off fee covering 5 to 20 years. | /visa-rules/thailand-privilege |
| 20 | Can I work on a Thailand Privilege visa? | No. | /visa-rules/thailand-privilege |
| 21 | What are the marriage visa requirements? | Legal marriage registered in Thailand, plus 400k THB or 40k THB per month, yearly extension. | /visa-rules/marriage-visa |
| 22 | Can I work on a marriage visa? | Yes, with a work permit. | /visa-rules/marriage-visa |
| 23 | Marriage visa or retirement visa if I'm over 50 and married? | Marriage needs half the money but more paperwork and an interview. | /compare/marriage-vs-retirement |
| 24 | What is an ED visa? | A non-immigrant visa for study at an approved school. Extended every 90 days. | /visa-rules/education-visa |
| 25 | How much does an ED visa cost? | School package of roughly 25k to 70k THB per year (reported) plus 1,900 THB per extension. | /guides/ed-visa-cost |
| 26 | Can I work on an ED visa? | No. Remote work is also not permitted. | /visa-rules/education-visa |
| 27 | DTV or ED visa: which is better? | DTV for most people with funds and remote income. ED if you want to learn Thai and lack 500k. | /compare/dtv-vs-ed |
| 28 | Can I get a DTV through Muay Thai? | Yes, with an enrolment letter from a gym the embassy accepts, plus 500k funds. | /muay-thai/dtv |
| 29 | How much is a Muay Thai camp per month? | Training about 7k to 15k THB per month. All-inclusive camps up to about 80k. | /muay-thai/prices |
| 30 | How long can I stay in Thailand without a visa now? | 30 days for about 60 nationalities since 15 Sep 2026, extendable once by 30 days. | /guides/thailand-visa-exemption-30-days |
| 31 | Can I extend my visa exemption? | Once, by up to 30 days, at an immigration office, for 1,900 THB. | /guides/thailand-visa-exemption-30-days |
| 32 | How many times can I enter by land visa-free? | 2 entries per calendar year at land borders (from Sep 2026). | /guides/thailand-visa-exemption-30-days |
| 33 | What is a 90-day report? | A notice of your address every 90 days of continuous stay. Online, in person, or by mail. | /guides/90-day-report |
| 34 | What happens if I miss a 90-day report? | 2,000 THB fine (5,000 if caught) in most cases. | /guides/90-day-report |
| 35 | What is TM30? | The landlord's notice of a foreign resident within 24 hours. Needed for extensions. | /guides/tm30 |
| 36 | Do I need a re-entry permit? | Yes, if you leave on an extension of stay. Without one the extension is lost. | /guides/re-entry-permit |
| 37 | What is the overstay fine in Thailand? | 500 THB per day, capped at 20,000 THB. Bans from 1 to 10 years if over 90 days or arrested. | /guides/overstay-thailand |
| 38 | Is the TDAC mandatory? | Yes, for all foreign arrivals. Submit online within 3 days before arrival. Use only the official site. | /guides/tdac |
| 39 | Is foreign income taxed in Thailand? | Only if you are a tax resident (180+ days) and remit income earned from 2024 onward. | /guides/thailand-foreign-income-tax |
| 40 | Is my pension taxed in Thailand? | Depends on the treaty. UK government pensions are usually taxed only in the UK. Check treaty specifics. | /guides/thailand-foreign-income-tax |
| 41 | How much money do I need to retire in Thailand? | Visa minimum 800k THB. A realistic budget is 40k to 90k THB per month depending on city. | /cost-of-living/retire |
| 42 | Is Chiang Mai cheaper than Bangkok? | Yes, typically 20% to 40% cheaper, mostly on rent. | /compare/chiang-mai-vs-bangkok |
| 43 | Are Thai visa agents legal? | Yes. Forged documents and "no money" shortcuts are not. | /visa-agents/how-to-choose |
| 44 | Can I get a retirement visa without 800k? | Legally, via the income or combination route. Agent "no money" deals carry forgery risk. | /guides/retirement-visa-without-800k |
| 45 | How do I find a trustworthy visa agent? | Use agents verified against licence documents, an address and a history of real cases. | /visa-agents |
| 46 | Can foreigners open a bank account in Thailand? | Yes, on a long-stay visa with a certificate of residence or a letter. Rules vary by branch. | /guides/open-bank-account-thailand |
| 47 | Can I get permanent residence in Thailand? | Only after 3 years on yearly extensions on work or marriage, not retirement. Annual quota. | /guides/thailand-permanent-residence |
| 48 | Which visa lets me stay 1 year easily? | Retirement (50+), DTV (funds and remote work), ED (study), Privilege (pay). | /checker |
| 49 | Where do I apply for a Thai visa in the US / UK? | The e-Visa portal for your mission. Each embassy covers set regions. | /embassies/[slug] |
| 50 | What changed in Thai visa rules this year? | Dated log: the DTV residence rule, the 30-day exemption, O-A insurance and so on. | /visa-rules/changes |

Note on Q11 and Q34: forum figures are commonly cited but immigration offices vary. Pull these from `rules` with a confidence value and show the "Unconfirmed" badge where confidence is low (D13).

---

## 3. AI-search prompts (ChatGPT, Perplexity, Gemini, Claude, Copilot)

What gets a page cited: a 40 to 60 word standalone answer with one number, one date and one official source link. Then a typed table. Then "last checked" from the database. The following elements raise citation odds: entity-explicit naming ("Destination Thailand Visa (DTV)"), stated effective dates, and an explicit "this changed on" line. Assistants prefer pages that resolve conflicts between sources.

| # | Prompt | The citable answer block should contain |
|---|---|---|
| 1 | What is the easiest way to live in Thailand for a year? | 3 routes by profile (50+ retirement, DTV, ED), each with its money threshold, plus a link to the checker. |
| 2 | Can I work remotely on a DTV? | Yes for foreign employers or clients, no Thai clients. Tax residency note at 180 days. Source: MFA e-Visa. |
| 3 | What changed for the DTV in August 2026? | The 31 Aug 2026 date, residence-based mission rule, police clearance within 6 months, and the transition for paid applications. |
| 4 | How long can Americans stay in Thailand without a visa? | 30 days since 15 Sep 2026 (was 60). One 30-day extension. Royal Gazette 31 Aug 2026. |
| 5 | Best visa for retiring in Thailand at 55? | Matrix of Non-O / O-A / LTR / Privilege by money and paperwork. Recommendation logic. |
| 6 | How much money do I need for a Thai retirement visa? | 800k THB, or 65k per month, or a combination. Seasoning rules. Last-checked date. |
| 7 | Do I need health insurance for the O-A visa? | 3M THB cover, since Sep 2024. Non-O extension does not need it. |
| 8 | DTV vs ED visa, which should I get? | A 5-row comparison: cost, work, attendance, renewal, bank account. |
| 9 | Is the Thailand Elite visa worth it? | Cost per year by tier, compared with retirement visa costs, plus who it suits. |
| 10 | What is the LTR visa and do I qualify? | The 4 categories with their thresholds, typed. Link to the checker. |
| 11 | Will I pay Thai tax on my foreign income? | 180-day test, 2024 remittance rule, pre-2024 exemption, treaty pointer. Advise an adviser. |
| 12 | Can I get a Thai visa through Muay Thai training? | DTV soft-power route, funds plus gym letter. Verified gyms list. |
| 13 | What's a reasonable price for a Muay Thai camp in Phuket? | Price range from the database with the date checked, and n camps verified. |
| 14 | Best Thai language school in Chiang Mai for an ED visa | Verified schools list with licence status. Price range. How we verify. |
| 15 | How do I do a 90-day report online? | 5 steps, the window (15 days before to 7 days after), fine amounts. |
| 16 | What is TM30 and who files it? | The landlord files within 24 hours. Tenant consequences. |
| 17 | Can I open a Thai bank account as a foreigner on a DTV? | An honest "inconsistent" with dated reports. Visas that reliably work. |
| 18 | How do I avoid visa agent scams in Thailand? | Red flags list, the Aug 2026 raid, and Staylong's verification criteria. |
| 19 | Can I get a retirement visa from inside Thailand? | Yes, by converting to Non-O at certain offices, with the timing issue of the 30-day exemption. |
| 20 | Marriage visa Thailand requirements | 400k / 40k, registered marriage, documents. |
| 21 | Cost of living in Chiang Mai for a retiree | Budget tiers and the visa minimum vs a realistic budget. |
| 22 | Chiang Mai vs Hua Hin vs Pattaya for retirees | Healthcare, cost, immigration office ease, expat community. |
| 23 | Where should a UK citizen apply for a Thai retirement visa? | London embassy e-Visa or in-country conversion. UK pension letter. |
| 24 | What happens if I overstay in Thailand? | Fine per day, cap, ban tiers. |
| 25 | Is Thailand going to cancel the DTV? | No official cancellation. 2026 tightening listed. Link to the change log with RSS. |

Feed these into `llms.txt` as question links, and use `FAQPage` JSON-LD only where the questions are visible on the page.

---

## 4. Programmatic page opportunities

Estimated counts assume 8 visa tracks, about 20 priority nationalities, 10 seeded cities and roughly 40 Thai missions abroad. Every template needs enough unique data to avoid thin content. D14 noindex rules apply.

| Template | Example slug | Est. pages (indexable at launch / eventual) | Data needed | Thin-content risk and gate |
|---|---|---|---|---|
| Visa x nationality | `/visa-rules/retirement-visa/uk` | 20-40 / 160 | Per-nationality differences: income letter type, police certificate name, competent missions, exemption length, treaty notes. | High. Only publish where 3+ facts differ from the base rule. Start with US, UK, AU, CA, DE, FR, NL, IN, CN, PH. |
| Embassy x country | `/embassies/thai-embassy-london` | 15 / 40-90 | Address, jurisdiction, accepted visas, e-Visa notes, DTV residence wording, check date. | Already gated by D14 (address plus check date). Good fit for AI citations. |
| Visa x city (immigration office) | `/cities/chiang-mai/retirement-visa` or `/immigration-offices/chiang-mai` | 10 / 30-80 | Office address, hours, local document quirks, queue notes, check date. | Medium. Office quirks need real verification. 10 cities x 1 office page first, not x 8 visas. |
| School x city | `/schools/chiang-mai` | 3-5 / 10 | Verified schools with licence, price range, visa support. | D14: noindex until 3 verified providers. |
| Muay Thai camp x city | `/muay-thai/phuket` | 3-5 / 10 | Same, plus DTV letter status. | Same gate. |
| Visa agent x city | `/visa-agents/pattaya` | 3 / 10 | Verified agents, services, fee bands. | Same gate. High commercial value. |
| Visa comparison pairs | `/compare/dtv-vs-ed` | 10 / 28 (8 choose 2) | Typed rules already in the database. | Low. Auto-tables from `rules`. Publish only pairs with real search demand (about 10). |
| Cost of living x city | `/cost-of-living/chiang-mai` | 6 / 10 | Rent bands, food, transport, healthcare, with sources and a date. | Medium. Needs a new data table. Do not use fabricated numbers. |
| Rule change entries | `/visa-rules/changes/2026-08-31-dtv-residence` | Ongoing, about 2-6 per month | `rule_changes` rows with a source. | Low. Each is a news page with a date from the database. Strong for "new rules" spikes. |
| Nationality x visa exemption | `/guides/thailand-visa-exemption/india` | 20 / 90 | Exemption days, VOA eligibility, extension. | Medium. Combine into one table page first, then split by demand. |
| Provider profile | `/providers/[slug]` | Per verified provider | Verification events, programs, fees, FAQs. | Low. The moat. |

Avoid: city x visa x nationality (thousands of near-duplicate pages, a scaled-content-abuse risk), and indexed filtered lists.

---

## 5. First 40 pages, prioritised

Priority logic: (a) news spikes with weak competition now, (b) rule pages that already exist and need the target H1 and answer block, (c) comparisons with low competition, (d) process guides with high demand, (e) directory pages as soon as the D14 gate opens.

| # | Slug | H1 | Target keyword | Cluster | Why it can rank |
|---|---|---|---|---|---|
| 1 | /visa-rules/changes | Thailand visa rule changes (dated log) | thailand visa changes 2026 | C14 | A unique dated log plus RSS. Few competitors keep a true log. |
| 2 | /guides/thailand-visa-exemption-30-days | Thailand visa exemption is now 30 days: what changed on 15 Sep 2026 | thailand visa exemption 30 days | C14 | Spike. Many results still say 60 days. |
| 3 | /guides/dtv-country-of-residence-rule | DTV rules from 31 August 2026: apply where you live | dtv new rules 31 august 2026 | C1 | Spike. Embassy wording conflicts. A per-embassy table wins. |
| 4 | /visa-rules/dtv | Destination Thailand Visa (DTV): requirements, cost and rules | dtv visa requirements | C1 | Exists. Typed rules beat blogs. |
| 5 | /visa-rules/retirement-visa | Thailand retirement visa (Non-O): requirements | thailand retirement visa requirements | C3 | Exists. Biggest head term. |
| 6 | /compare/retirement-visas | Best Thailand retirement visa: Non-O vs O-A vs LTR vs Privilege | best visa to retire in thailand | C9 | Agency-dominated SERP. A neutral matrix is citable. |
| 7 | /compare/dtv-vs-ed | DTV vs ED visa: which should you choose? | dtv vs ed visa | C9 | Low competition, mostly forums. |
| 8 | /guides/retirement-800k-seasoning | How long must 800,000 baht stay in the bank? | retirement visa 800000 baht seasoning | C3 | 15+ confused forum threads. No clear owner. |
| 9 | /visa-rules/o-a-visa | O-A visa Thailand: requirements and 3M baht insurance | o-a visa requirements | C4 | Exists. Fixes the stale 400k/40k figure. |
| 10 | /guides/health-insurance-for-thai-visas | Health insurance for Thai visas: what each visa requires | health insurance for thailand retirement visa | C4 | Insurer pages compete, but are biased. |
| 11 | /checker | Which Thailand visa fits you? Free checker | best visa for long stay thailand | C9 | A tool. Links from all guides. Cited by AI as a tool. |
| 12 | /visa-rules/ltr-visa | Thailand LTR visa: requirements by category | ltr visa requirements | C5 | Exists. Resolves the 2025 update confusion. |
| 13 | /visa-rules/thailand-privilege | Thailand Privilege (Elite) visa: prices and tiers | thailand privilege price | C6 | Exists. Neutral vs sales pages. |
| 14 | /visa-rules/marriage-visa | Thai marriage visa: requirements and 400,000 baht rule | marriage visa thailand requirements | C7 | Exists. |
| 15 | /visa-rules/education-visa | Thailand education visa (ED): requirements and schools | ed visa thailand | C2 | Exists. Feeds the school directory. |
| 16 | /guides/90-day-report | 90-day report in Thailand: online, in person, fines | 90 day report thailand | C10 | High demand. Generic competitors. |
| 17 | /guides/dtv-remote-work-and-tax | Can you work on a DTV? Work and tax rules | can i work on dtv | C1 | High AI-prompt demand. |
| 18 | /guides/thailand-foreign-income-tax | Thai tax on foreign income: 180-day and remittance rules | thailand tax foreign income | C14 | Competitors are tax firms. A visa-linked angle is unique. |
| 19 | /guides/dtv-police-clearance | DTV police clearance certificate by country | dtv police clearance certificate | C1 | New. Almost no competition. |
| 20 | /compare/dtv-vs-retirement-visa | DTV vs retirement visa for over-50s | non o vs dtv over 50 | C9 | Unserved comparison. |
| 21 | /guides/open-bank-account-thailand | Opening a Thai bank account as a foreigner, by visa | open bank account thailand foreigner | C10 | Conflicting SERP. Dated reports win. |
| 22 | /visa-agents/how-to-choose | Thai visa agents: how to spot scams and choose safely | thailand visa agent scam | C13 | News hook (Aug 2026 raid). Trust moat. |
| 23 | /guides/tm30 | TM30 in Thailand explained | tm30 thailand | C10 | Steady demand. |
| 24 | /guides/re-entry-permit | Thailand re-entry permit: when you need one | re-entry permit thailand | C10 | |
| 25 | /guides/overstay-thailand | Thailand overstay fines and bans | overstay thailand fine | C10 | High demand. Pairs with the 30-day exemption news. |
| 26 | /visa-rules/retirement-visa/us | Thailand retirement visa for US citizens | thailand retirement visa for americans | C15 | First nationality page. Biggest market. |
| 27 | /visa-rules/retirement-visa/uk | Thailand retirement visa for UK citizens | thailand retirement visa uk | C15 | |
| 28 | /visa-rules/retirement-visa/australia | Thailand retirement visa for Australians | thailand retirement visa australians | C15 | |
| 29 | /muay-thai/dtv | Muay Thai DTV visa: verified gyms and costs | muay thai dtv visa | C12 | Commercial. Weak competition beyond gym pages. |
| 30 | /guides/ed-visa-cost | ED visa cost in Thailand: school fees and extension fees | ed visa cost | C2 | Forum-only SERP. |
| 31 | /compare/o-a-vs-non-o | O-A vs Non-O retirement visa | o-a visa vs non-o | C9 | Low competition. |
| 32 | /compare/privilege-vs-retirement | Thailand Privilege vs retirement visa | thailand privilege vs retirement visa | C9 | |
| 33 | /compare/marriage-vs-retirement | Marriage visa vs retirement visa in Thailand | marriage visa vs retirement visa | C9 | |
| 34 | /guides/tdac | Thailand Digital Arrival Card (TDAC): how to file and avoid fake sites | tdac thailand | C10 | VH demand. A scam-warning angle differentiates. |
| 35 | /embassies/thai-embassy-london | Royal Thai Embassy London: visa applications | thai embassy london visa | C15 | Template exists. Gated by check date. |
| 36 | /embassies/thai-consulate-los-angeles | Royal Thai Consulate-General Los Angeles: visas | thai consulate los angeles visa | C15 | DTV notice is from here. |
| 37 | /cities/chiang-mai | Long stay in Chiang Mai: visas, schools, camps, immigration | ed visa chiang mai | C2/C11 | Indexable once 3 verified providers exist (D14). |
| 38 | /cost-of-living/chiang-mai | Cost of living in Chiang Mai for long stays | cost of living chiang mai | C11 | Visa-linked budget angle. Needs sourced data. |
| 39 | /schools/chiang-mai | Thai language schools in Chiang Mai with ED visas (verified) | thai language school chiang mai | C12 | Directory moat. Gated by D14. |
| 40 | /guides/thailand-permanent-residence | Thailand permanent residence: who qualifies | permanent residence thailand | C3 | Corrects the retirement-to-PR myth. Long tail. |

---

## Uncertainty register

- DTV residence rule: "legal" vs "permanent" residence differs by mission. Police clearance validity is reported as 6 months by most sources. Status: mission notices, not a Royal Gazette instrument.
- 30-day exemption: country count reported as 59 or 60. Effective date reported as "about" 15 Sep 2026.
- O-A insurance: 3M THB is the best-supported figure (Thai PBS, Sep 2024). Not confirmed from an embassy page in this research.
- LTR WFT income: sources conflict on whether USD 80k still applies after the 2025 update. Check the BOI page.
- Privilege tier prices: conflicting (Bronze 650k, Gold 900k). Use the official price table.
- Seasoning periods (800k, 400k): office-level variation. Keep the confidence badge.
- ED visa and Muay Thai prices: forum-reported, often undated. Label as ranges, never as point prices.
- Fines (90-day report, overstay): standard figures, but not re-verified against official sources in this pass.
- Tax: no 2026 enacted change found. The worldwide-tax proposal is reportedly not enacted (July 2026).
- Search demand tiers are inferred, not measured.

## Sources consulted

- DTV rule change: https://www.issacompass.com/insights/thailand-dtv-apply-country-of-citizenship-or-residence-rule-change, https://dtvthaivisa.com/blog/dtv-visa-new-rules-31-august-2026, https://onestophuahin.com/thailand-updates-dtv-visa-rules-new-application-restrictions-and-criminal-record-checks-from-31-august-2026/, https://www.thailawonline.com/destination-thailand-visa-dtv-requirements/
- 30-day exemption: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-209.html, https://www.envoyglobal.com/news-alert/thailand-reduces-visa-exempt-stay-periods-starting-september-2026/, https://visasnews.com/en/thailand-to-officially-cut-visa-free-stay-to-30-days-on-september-15-2026/, https://siam-legal.com/travel-to-thailand/thailand-approves-end-of-60-day-visa-free-stay/
- Retirement comparisons: https://www.issacompass.com/insights/best-retirement-visas-for-thailand-which-option-is-right-for-you, https://www.thailandprivilege.co.th/why-thailand/thailand-privilege-visa-vs-ltr-visa, https://blog.wego.com/thailand-retirement-visa-ltr-and-o-a-visa-guide-for-expats/
- Tax: https://www.thailawonline.com/thailand-foreign-income-tax-2026-what-actually-applies/, https://thailandknowledge.com/living-in-thailand/thailand-tax-residency
- O-A insurance: https://www.thaipbsworld.com/?p=277343, https://thethaiger.com/insurance/health/retirees/
- Schools and Muay Thai: https://tslchiangmai.com/Education-Visa, https://www.nowmuaythai.com/blog/everything-you-need-to-know-about-DTV-Visa-in-2026, https://www.tigermuaythai.com/about/training-camp-expected-expenses-budget
- Scams: https://www.khaosodenglish.com/news/2026/08/17/thai-immigration-police-raid-visa-agency-over-fake-bank-statements/, https://thethaiger.com/news/bangkok/bangkok-visa-agency-raid-fake-bank-statements-europe, https://www.thailawonline.com/visa-agents-thailand-legal/
- Marriage: https://www.issacompass.com/insights/thai-marriage-visa-requirements-2026
- Banking: https://thethaiger.com/money/bank-accounts/, https://www.issacompass.com/insights/opening-a-thai-bank-account-as-a-foreign-resident-in-2026-which-visa-types-quali
- LTR: https://ltr.boi.go.th/documents/BOI-brochure%202025-LTR.pdf, https://assets.kpmg.com/content/dam/kpmg/th/pdf/2025/02/th-tax-news-flash-issue-151.pdf
- Cost of living: https://www.issacompass.com/insights/thailand-cost-of-living-by-city-in-2026-what-expats-actually-spend-in-bangkok-ch, https://expatsi.com/continents/asia/cost-of-living-thailand-bangkok-chiang-mai-islands/
- Forum demand signals: ask.in.th and asq.in.th thread listings (DTV, ED, 800k seasoning, marriage 400k, bank account, Muay Thai), r/Thailand FAQ mirror.
