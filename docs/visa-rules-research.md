# Visa rules research notes (compiled 2026-11-03)

## Method and an important limitation

WebFetch could not reach any site in this session. `ltr.boi.go.th`, `thailandprivilege.co.th` and `lexbangkok.com` all failed DNS resolution, because they are outside the session's network allowlist. Every value therefore comes from WebSearch (extended mode, mostly limited to official domains). WebSearch returns snippets of the official documents. I could not open the documents to read them in full. Most MFA and Immigration PDFs give no publication date in the snippets, so 97 of 111 rows have `source_date: null`. If `mfa.go.th`, `immigration.go.th`, `ltr.boi.go.th` and `thailandprivilege.co.th` are added to the allowlist, a second pass could confirm the dates.

How confidence was assigned:
- **high:** an official source states the value, and several 2025 or 2026 sources agree.
- **medium:** an official source that is undated or older, backed by 2025 or 2026 secondary sources; or an official source where embassies vary.
- **low:** the value comes from secondary sources only, the sources conflict, or the official text is old.

## Sources and what each confirmed

### DTV
- MFA DTV checklist, https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf: 500,000 THB, a 3-month bank statement, proof of remote work, and the soft-power categories.
- MFA "New Measures as of 29 May 2024", https://image.mfa.go.th/mfa/0/tDJBi9m15g/New_Measures_as_of_29_May_2024_-_1850_1.pdf: the 10,000 THB fee, 5-year validity, 180 days per entry, one extension, and dependants under 20.
- MFA Germany, "Types of Thai Visas as of 06 Oct 2025": restates the 500,000 THB requirement. This is the 2025 confirmation.
- Dubai embassy DTV PDF: a 3-month statement with a maintained balance of AED 50,000 / 500,000 THB, issued within 15 days of submission.
- Secondary sources from 2026 (thaiembassy.com, thethaiger.com, tdac.info, shelter.global):
  - Extensions cost 1,900 THB.
  - 90-day reporting applies.
  - Two new rules apply worldwide from 31 August 2026: the applicant must be a national or permanent resident of the country where they apply, and must provide a criminal record certificate. The Vientiane, Moscow and London missions are cited for this.

### ED
- MFA ED PDF, Immigration "FOR-EDUCATION-NON-ED" (2022): 2,000 THB in country, 90 days on entry, and the document list. Both official sources are old.
- Secondary sources from 2026: extensions run in 90-day blocks, attendance and Thai-language checks have applied since 2024, and Thai-language courses are reportedly no longer a DTV category.

### Retirement (Non-O plus extension)
- Bangkok Immigration extension page, https://bangkok.immigration.go.th/en/visa-extension/ (about 4 years old):
  - 800,000 THB held for 2 months before filing and 3 months after approval, then at least 400,000 THB at all times.
  - Or 65,000 THB per month.
  - Or a combination totalling 800,000 THB.
  - The extension fee is 1,900 THB.
- MFA "Non-O for Retirement" PDF: age 50+ and 90 days on entry.

### O-A
- MFA O-A page: age 50+; 800,000 THB, 65,000 THB per month, or a combination; 1 year per entry; 90-day reporting; no employment.
- MFA O-A/O-X checklist dated 2024-03-17: insurance of USD 100,000 or 3,000,000 THB.
- ThaiLawOnline (secondary) cites clause 2.22 of Immigration Bureau Order 12/2568, dated 23 January 2025. It sets a single USD 100,000 insurance threshold at extension. I used 2025-01-23 as `effective_from`.

### LTR (BOI)
- BOI 2025 brochure, Required-docs checklists for Wealthy Global Citizens and Work-from-Thailand (06 Nov 2025), and checklists for Wealthy Pensioners and Highly Skilled (30 Jun 2025):
  - Category thresholds.
  - Insurance: USD 50,000, or Thai social security, or a USD 100,000 deposit held 12 months.
- BOI Announcement Por. 3/2568, following the Cabinet resolution of 13 January 2025:
  - The Work-from-Thailand criteria.
  - The employer revenue threshold cut from USD 150M to USD 50M over 3 years.
- BOI press release (topic_id 136393): the 5-year work-experience requirement removed for Highly Skilled and Work-from-Thailand, and the target sectors widened.
- BOI LTR deck, "March 2026, Stockholm": annual reporting instead of 90-day, the USD 80,000 and USD 40,000 income tests for Highly Skilled, and the 17% flat tax.
- BOI visa issuance page: the 50,000 THB fee, and a 5-year stay plus 5 more.

### Privilege
- Official comparison page: Bronze 650k THB for 5 years, Gold 900k for 5 years, Platinum 1.5M for 10 years, Diamond 2.5M for 15 years, Reserve 5M for 20 years (invitation only).
- Official 90-day report page: 90-day reporting still applies, and the liaison can file it.
- Bronze application form: a 5-year multiple-entry visa, up to 1 year per entry, and a legal representative for applicants under 20.
- The official homepage mentions a transfer-fee adjustment effective 15 June 2026. It does not change the tier fees.

### Marriage
- ThaiLawOnline (secondary, cites Order 12/2568): 400,000 THB held 2 months, or 40,000 THB per month, or a combination; the fee is 1,900 THB.
- MFA Non-O "staying with family" PDF: 90 days on entry.

### Work (Non-B)
- MFA Non-B page: 2,000 THB single entry (3 months) or 5,000 THB multiple entry (1 year); 90 days on entry; work permit within 90 days; a one-year extension with the work permit; funds of 20,000 THB per person or 40,000 THB per family.
- Immigration extension page: the 1,900 THB fee.
- Bangkok Immigration criteria: 2M THB paid-up capital.
- Secondary sources: salary minimums by nationality.

## Recent changes, 2024 to 2026
- **2024-05-29:** DTV announced. Launched 2024-07-15, which I used as `effective_from`.
- **2024 (month unconfirmed):** Spot checks and Thai-language tests started for ED language-school extensions. Secondary sources only.
- **2025-01-13:** Cabinet approved the LTR relaxations, implemented by BOI Announcement Por. 3/2568:
  - Wealthy Global Citizens: the USD 80,000 income test was dropped.
  - Work-from-Thailand: the employer revenue threshold fell from USD 150M to USD 50M.
  - Highly Skilled and Work-from-Thailand: the 5-year work-experience rule was removed.
  - Target sectors were widened to non-STEM fields.
  - Removing the cap on dependants and adding parents is pending a Ministry of Interior instrument. As of August 2026 it was not confirmed as in force.
- **2025-01-23:** Immigration Bureau Order 12/2568 replaced Order 242/2566. It is the current criteria table for extensions, and covers O-A insurance at USD 100,000. Seen only through a secondary source.
- **2026-06-15:** Thailand Privilege transfer-fee adjustment (not the tier prices).
- **2026-08-31:** DTV applicants must apply in their country of nationality or permanent residence and provide a criminal record certificate. Applications submitted before that date are assessed under the old rules.
- **2026-09-30 or 2026-12-31:** Reported end of the Bronze promotional tier. Sources conflict, and Bronze may already be closed.

## Low confidence or unconfirmed values
- `dtv eligibility.min_age` (20): official text only confirms that dependants must be under 20. The age for main applicants comes from secondary sources.
- `ed fee.visa` (2,000 THB) and `ed stay.extension_days` (90): the official sources are old, and the attendance rules conflict (80% of classes vs 20 hours a month). Attendance was left out of the JSON.
- `retirement fee.visa`, `marriage fee.visa` and `retirement_oa fee.visa`: fees vary by embassy.
- `privilege fee.membership.bronze` and `validity.years.bronze`: whether Bronze is still available is unconfirmed.
- `privilege eligibility.min_age`: some sources say there is no minimum. The form requires a legal representative for applicants under 20.
- `privilege allows.work` (false): I found no source stating it either way.
- `marriage allows.work` ("with_work_permit"): not confirmed from an official source.
- `work eligibility.min_funds` (20,000 THB): this is an embassy figure, and the official source is old.
- `work eligibility.min_income_month`: the salary tiers by nationality (50k / 35k / 25k THB) come from secondary sources, and the 35k tier mapping is unclear.

## Not captured (could not confirm)
- **Privilege:**
  - VAT: sources conflict on whether the tier fees include it.
  - Application fee: 50,000 THB, but sources conflict on whether it is refundable or credited against the membership fee.
  - Family-member add-on prices: conflicting.
  - Annual points: only promotional sources.
- **Retirement (Non-O):** whether health insurance is required for the extension in country. I believe it is not, but did not confirm.
- **LTR:**
  - Whether Wealthy Global Citizen and Wealthy Pensioner holders can get a work permit.
  - The digital work permit fee: BOI sources conflict (400 THB vs 3,000 THB per year).
  - The current cap on dependants.
- **ED:** the attendance threshold, and the maximum total years on language-school EDs.
- **Marriage:** the Thai-spouse reduction of the capital requirement to 1M THB for Non-B. Not confirmed from an official source.
