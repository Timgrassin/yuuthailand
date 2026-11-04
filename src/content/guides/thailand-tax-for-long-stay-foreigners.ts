import type { Guide } from "../types";

export const guide: Guide = {
  slug: "thailand-tax-for-long-stay-foreigners",
  kind: "guide",
  eyebrow: "Tax basics",
  title: "Thailand tax for long-stay foreigners: DTV, LTR, retirees and remitted income",
  metaTitle: "Thailand tax for foreigners on DTV, LTR and retirement",
  description: "Thailand tax for foreigners on a DTV, LTR or retirement visa: the 180-day test, tax on remitted foreign income since 2024, LTR exemptions and treaties.",
  answer:
    "You become a Thai tax resident if you spend 180 days or more in Thailand in a calendar year. Since 1 January 2024, residents can be taxed on foreign income they bring into Thailand, if it was earned from 2024 onward. Your visa does not change this, except the LTR, which gives exemptions by category.",
  tracks: ["dtv", "ltr", "retirement", "retirement_oa", "privilege"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "Residency test", value: "180 days", note: "in a calendar year" },
    { label: "Remittance rule", value: "From 1 Jan 2024", note: "Por. 161/2566 and 162/2566" },
    { label: "LTR Highly Skilled", value: "17% flat", note: "on Thai employment income" },
    { label: "Top progressive rate", value: "35%", note: "standard personal income tax" },
  ],
  sections: [
    {
      id: "not-advice",
      heading: "Before you read: this is not tax advice",
      body: `
This page explains the general rules in plain English, with sources. It is not tax advice. Thai tax on foreign income has changed recently, some points are still disputed, and your home country's rules and any tax treaty matter as much as Thailand's.

**Talk to a Thai tax adviser** (a licensed Thai accountant or tax lawyer) before you move money, and to an adviser in your home country about the other side. We have marked this page as low confidence because several points below rely on professional summaries rather than the full official text.
`,
    },
    {
      id: "residency",
      heading: "When am I a Thai tax resident?",
      body: `
You are a Thai tax resident for a year if you are in Thailand for **180 days or more** in that calendar year. The days do not need to be in a row. The Revenue Department's 2024 guide for foreigners and PwC's tax summary both use this test.

Your visa type does not decide it. A DTV holder who spends 200 days in Thailand is a resident. A retiree who spends 150 days is not. Some sources quote 183 days, which is the test in many other countries but not Thailand's.

If you are not a tax resident, foreign income you bring into Thailand is generally not taxed in Thailand.
`,
    },
    {
      id: "remittance",
      heading: "Does Thailand tax foreign income brought into the country?",
      body: `
Yes, for residents, since **1 January 2024**. Revenue Department instruction **Por. 161/2566** changed how Thailand reads section 41 of the Revenue Code. Foreign income from employment, a business abroad or property abroad, brought into Thailand by a resident, is now taxable in the year it is brought in, even if it was earned in an earlier year.

| Situation | General position |
|---|---|
| Income earned from 1 Jan 2024 and brought in while you are resident | Can be taxable in the year you bring it in |
| Income earned before 1 Jan 2024 | Not caught by the new rule (Por. 162/2566) |
| Foreign income you never bring into Thailand | Not taxed in Thailand under the current rules |
| You are not resident in the year you bring it in | Not taxed in Thailand on that foreign income |

One point is disputed. Some advisers say income is only caught if you were resident both in the year it was earned and the year it was brought in. Others read the rule more widely. This is exactly the kind of question to put to a Thai tax adviser.

Keep records that show when money was earned, especially savings from before 2024.
`,
    },
    {
      id: "rates",
      heading: "How much tax would I pay?",
      body: `
Taxable income for residents is charged at progressive rates from 0% to **35%**, after allowances and deductions. Income tax already paid abroad on the same income may be credited against Thai tax under a double tax treaty.

You report on the annual personal income tax return (form P.N.D. 90 for most people with foreign income). The Revenue Department publishes an English guide to that form.
`,
    },
    {
      id: "ltr",
      heading: "What tax exemptions does the LTR visa give?",
      body: `
The LTR is the only long-stay visa with its own tax rules, set by **Royal Decree No. 743**:

| LTR category | Tax treatment |
|---|---|
| Wealthy Global Citizen | Exemption on assessable foreign income from employment, business or property abroad, brought into Thailand |
| Wealthy Pensioner | Same exemption |
| Work-from-Thailand Professional | Same exemption |
| Highly Skilled Professional | Option of a **flat 17%** rate on employment income from a qualifying Thai employer, instead of the progressive scale. No foreign-income exemption |

The BOI confirms the split by category. Conditions apply. The decree describes the exempt income as income derived from abroad in the previous tax year, and you may still need to file a return that reports it. Check the details with the BOI and a Thai tax adviser. Compare the routes in [LTR vs Privilege vs DTV](/guides/ltr-vs-privilege-vs-dtv).
`,
    },
    {
      id: "dtv",
      heading: "Do I pay tax in Thailand on a DTV?",
      body: `
The DTV has **no special tax status**. It is a visa, not a tax regime. The normal rules apply:

- Under 180 days in Thailand in the year: you are not a tax resident, and foreign income you bring in is generally not taxed in Thailand.
- 180 days or more: you are a tax resident, and foreign income earned from 2024 and brought into Thailand can be taxable.

Many DTV holders stay well over 180 days a year, because each entry gives 180 days plus a possible 180-day extension. Count your days early in the year, not in December.

Remote work for foreign clients is allowed on the [DTV](/visa-rules/dtv), but that is an immigration permission. It does not exempt the income from tax. The same applies to [Thailand Privilege](/visa-rules/thailand-privilege) and [retirement visas](/visa-rules/retirement-visa): no special tax treatment.
`,
    },
    {
      id: "treaties",
      heading: "Does a tax treaty protect my pension or salary?",
      body: `
It may. Thailand has double tax agreements with around 61 countries, according to most professional sources. An older Revenue Department FAQ gives 57, so check the current list on rd.go.th.

Treaties decide which country may tax each type of income, such as a government pension, a private pension or a salary, and how foreign tax is credited. The answer depends on the exact treaty and your income type. We do not summarise individual treaties here, because a wrong reading is costly.
`,
    },
    {
      id: "proposals",
      heading: "Is Thailand changing the foreign income tax rules again?",
      body: `
Proposals have been reported, including a time window for tax-free remittances and wider taxation of worldwide income. Professional sources writing in July 2026 said neither had become law. Until a change is published officially, Por. 161/2566 and Por. 162/2566 remain the baseline.

We track confirmed changes with their dates on the [rule change log](/visa-rules/changes). For your own position, speak to a Thai tax adviser.
`,
    },
  ],
  faqs: [
    {
      question: "Do DTV holders pay tax in Thailand?",
      answer: "Only under the normal rules. If you spend 180 days or more in Thailand in a calendar year, you are a tax resident, and foreign income earned from 2024 that you bring into Thailand can be taxable. The DTV itself gives no tax exemption.",
    },
    {
      question: "Is my pension taxed in Thailand?",
      answer: "It can be if you are a Thai tax resident and bring pension income earned from 2024 into Thailand. A tax treaty between Thailand and your home country may give the taxing right to one country or allow a credit. Ask a Thai tax adviser to check your treaty.",
    },
    {
      question: "Are savings from before 2024 taxed when I bring them to Thailand?",
      answer: "Under Por. 162/2566, foreign income earned before 1 January 2024 is not caught by the new remittance rule. Keep records that prove when the money was earned.",
    },
    {
      question: "Does the LTR visa mean I pay no tax in Thailand?",
      answer: "Not entirely. Wealthy Global Citizens, Wealthy Pensioners and Work-from-Thailand Professionals get an exemption on qualifying foreign income brought into Thailand. Thai-source income is still taxed, and Highly Skilled Professionals get a 17% flat rate on Thai employment income rather than an exemption.",
    },
    {
      question: "Is the Thai tax residency test 180 or 183 days?",
      answer: "180 days in a calendar year. The days do not have to be consecutive. The 183-day test belongs to other countries' rules.",
    },
  ],
  sources: [
    { label: "Revenue Department: how do foreigners living in Thailand pay tax (2024)", url: "https://www.rd.go.th/fileadmin/user_upload/lorkhor/newspr/2024/FOREIGNERS_PAY_TAX2024.pdf" },
    { label: "Revenue Department: guide to the P.N.D. 90 return (2024)", url: "https://www.rd.go.th/fileadmin/download/english_form/2024/GUIDE_90_67_Complete.pdf" },
    { label: "Revenue Department: DTA FAQ", url: "https://www.rd.go.th/english/23520.html" },
    { label: "Royal Decree No. 743 (English translation, BOI)", url: "https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf" },
    { label: "BOI LTR overview, March 2026", url: "https://www.boi.go.th/upload/content/LTR-March_2026_Stcokholm.pdf" },
    { label: "KPMG flash alert 2023-189 (Por. 161/2566)", url: "https://kpmg.com/xx/en/home/insights/2023/10/flash-alert-2023-189.html" },
    { label: "KPMG flash alert 2023-238 (Por. 162/2566)", url: "https://kpmg.com/xx/en/our-insights/gms-flash-alert/flash-alert-2023-238.html" },
    { label: "PwC Worldwide Tax Summaries: Thailand significant developments", url: "https://taxsummaries.pwc.com/thailand/individual/significant-developments" },
    { label: "PwC Thai Tax 2025/26 booklet", url: "https://www.pwc.com/th/en/tax/assets/thai-tax/2025-2026/thai-tax-booklet-2025-26.pdf" },
    { label: "Reported by Thai Law Online: foreign income tax 2026, what actually applies", url: "https://www.thailawonline.com/thailand-foreign-income-tax-2026-what-actually-applies/" },
  ],
  related: ["ltr-vs-privilege-vs-dtv", "how-to-stay-in-thailand-long-term", "dtv-vs-ed-visa"],
  confidence: "low",
};
