import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "ltr",
  intro:
    "The Long-Term Resident (LTR) visa is a 10-year visa run by Thailand's Board of Investment (BOI), granted as 5 years plus 5 more. It is built for people who clear a high bar: wealthy investors, pensioners with large passive income, remote staff of big foreign companies, and skilled hires in target industries. In return you get yearly instead of 90-day reporting, and tax and work-permit perks that depend on your category.",
  whoFor: [
    "A retiree aged 50 or more with a large pension, dividends or rental income, who wants 10 years without yearly extension paperwork.",
    "A remote employee of a listed company, or of an established private company with large revenue, who earns well above average and wants to live in Thailand legally.",
    "An engineer, researcher or manager hired by a Thai company in a target industry, who wants a digital work permit and a capped tax rate on Thai salary.",
    "An investor with at least USD 1 million in assets who is ready to put USD 500,000 into Thai bonds, property or a Thai company.",
    "Someone who brings foreign income into Thailand and wants the foreign-income tax exemption that three LTR categories carry.",
    "A family that wants a spouse and children under 20 covered by one long visa.",
  ],
  notFor: [
    "Freelancers and digital nomads with several small clients: the Work-from-Thailand category needs one qualifying employer. Look at the [DTV](/visa-rules/dtv) instead.",
    "Retirees whose income is mostly savings rather than passive income: the [retirement visa](/visa-rules/retirement-visa) has a much lower test.",
    "People who want to work for a Thai company while on the Wealthy Global Citizen, Wealthy Pensioner or Work-from-Thailand categories: only Highly Skilled Professionals get a work permit.",
    "Anyone who needs a visa in the next few weeks: the BOI review alone takes about 20 working days after your file is complete.",
    "People who cannot document income with tax returns and payslips: the BOI checks evidence, not declarations.",
    "Anyone who would rather pay than prove: [Thailand Privilege](/visa-rules/thailand-privilege) has no income or asset test.",
  ],
  steps: [
    {
      title: "Pick your category",
      body: "Choose one of the four categories: Wealthy Global Citizen, Wealthy Pensioner, Work-from-Thailand Professional or Highly Skilled Professional. Each has its own income, asset or employer test, shown in the rules table above. Pick the one your paperwork proves most easily, not the one that sounds best.",
    },
    {
      title: "Collect category documents",
      body: "Download the checklist for your category from ltr.boi.go.th. Expect passport, proof of income or assets for the last two years, health insurance of USD 50,000 or an accepted alternative, and a criminal record check. Employer letters and company financials are needed for Work-from-Thailand and Highly Skilled.",
    },
    {
      title: "Apply for BOI qualification endorsement online",
      body: "Create an account on the LTR portal at ltr.boi.go.th and upload your file. The BOI does not charge for this step. Add your spouse and children under 20 in the same application if they will come with you.",
    },
    {
      title: "Answer BOI follow-up requests",
      body: "The BOI says it reviews within 20 working days, counted from the day your file is complete, including any extra documents it asks for. Reply fast: each request for more evidence restarts the practical clock.",
    },
    {
      title: "Receive the endorsement letter",
      body: "If you qualify, the BOI issues an endorsement letter. It is valid for 60 days, so book your visa appointment as soon as it arrives.",
    },
    {
      title: "Get the LTR visa issued",
      body: "Within those 60 days, apply at a Royal Thai Embassy or Consulate abroad, often through thaievisa.go.th, or at an immigration office in Thailand. The fee is 50,000 THB in Thailand. Embassy fees are set in local currency and can be higher.",
    },
    {
      title: "Apply for the digital work permit (Highly Skilled only)",
      body: "Highly Skilled Professionals apply for a digital work permit after the visa is issued, through the BOI system. You may start work once the application is submitted. Other categories do not get a work permit.",
    },
    {
      title: "Report once a year",
      body: "LTR holders report their address to immigration once a year instead of every 90 days. Keep your landlord's [TM30](/guides/tm30-thailand) notification up to date, as offices still check it.",
    },
    {
      title: "Keep qualifying and renew at year 5",
      body: "Your visa and tax perks depend on still meeting your category test. After the first 5 years, immigration re-checks eligibility before granting the second 5.",
    },
  ],
  costs: [
    { item: "BOI qualification endorsement", amount: "Free", note: "BOI does not charge for the review." },
    { item: "LTR visa, issued in Thailand", amount: "50,000 THB", note: "Per person, covers the 10-year visa." },
    { item: "LTR visa, issued at an embassy", amount: "Varies by mission", note: "Set in local currency. The Thai Embassy in Washington lists USD 1,600." },
    { item: "Digital work permit (Highly Skilled)", amount: "3,000 THB per year", note: "Figure reported from BOI material; older BOI sources differ. Confirm before paying." },
    { item: "Health insurance", amount: "From USD 50,000 cover", note: "Premium depends on age and insurer. Thai social security or a USD 100,000 deposit held 12 months are accepted instead." },
    { item: "Translations, certified copies, police check", amount: "Varies", note: "Set by your home country and translator." },
  ],
  mistakes: [
    "Using an old checklist that still lists the USD 80,000 income test for Wealthy Global Citizens or the 5-year work-experience rule. Both were dropped in 2025 under BOI Announcement Por. 3/2568.",
    "Counting salary as passive income for the Wealthy Pensioner category. The BOI checklist counts pensions, dividends and rent, not employment income.",
    "Applying for Work-from-Thailand with an employer that is neither listed nor a private company with 3 years of operation and USD 50 million combined revenue. The employer test fails more files than the income test.",
    "Letting the 60-day endorsement letter expire before the visa is issued. You then have to ask BOI again.",
    "Buying a health policy below USD 50,000 or with less than the remaining term the checklist asks for.",
    "Assuming every category can work for a Thai company. Only Highly Skilled Professionals get a digital work permit; Work-from-Thailand holders work for their overseas employer only.",
    "Expecting the foreign-income tax exemption on the Highly Skilled category. That category gets the 17% flat rate on Thai salary instead.",
  ],
  sections: [
    {
      id: "which-ltr-category",
      heading: "Which LTR category fits you?",
      body: `
Most rejected files picked the wrong category. Match your evidence to the test:

| Your situation | Category | What BOI checks first |
|---|---|---|
| You have USD 1M+ in assets and will invest USD 500k in Thailand | Wealthy Global Citizen | Asset statements and proof of the Thai investment |
| You are 50+ and retired, living on pension, dividends or rent | Wealthy Pensioner | Two years of passive income evidence |
| You work remotely for a large foreign employer | Work-from-Thailand Professional | Your income, then your employer's listing or revenue |
| A Thai company or institution hires you in a target industry | Highly Skilled Professional | Your income or degree, and the employer's sector |

The exact thresholds and their sources are in the rules table above. If you fit two categories, pick the one that gives you what you need. Only Highly Skilled includes a Thai work permit. Three categories carry the foreign-income tax exemption; Highly Skilled does not.
`,
    },
    {
      id: "2025-ltr-changes",
      heading: "What changed for the LTR in 2025?",
      body: `
Thailand's Cabinet approved a set of LTR relaxations on 13 January 2025. The BOI put them into effect through Announcement Por. 3/2568:

- **Wealthy Global Citizen:** the USD 80,000 annual income test was dropped. Assets and the Thai investment remain.
- **Work-from-Thailand:** the employer revenue threshold fell from USD 150 million to USD 50 million over 3 years.
- **Highly Skilled and Work-from-Thailand:** the 5-year work-experience rule was removed.
- **Target industries:** widened beyond science and technology.

A change to allow more dependants, including parents, was announced but needs a Ministry of Interior instrument. As of August 2026 we could not confirm it was in force, so plan on spouse and children under 20 only.

Many agency pages still show the old figures. Use the BOI checklists dated 2025 on ltr.boi.go.th. Every rule change we track is logged on the [change log](/visa-rules/changes).
`,
    },
    {
      id: "ltr-tax",
      heading: "Does the LTR visa reduce your Thai tax?",
      body: `
It can, depending on your category. Since 1 January 2024, Thai tax residents (180 days or more in a calendar year) can be taxed on foreign income they bring into Thailand. Royal Decree 743 exempts remitted foreign income for Wealthy Global Citizens, Wealthy Pensioners and Work-from-Thailand Professionals, as reported by Thai tax firms.

Highly Skilled Professionals do not get that exemption. They pay a flat 17% on Thai employment income instead.

Sources differ on whether the exemption covers income earned in the same year it is brought in. Ask a Thai tax adviser before you move money. See our guide to [tax for long-stay foreigners](/guides/thailand-tax-for-long-stay-foreigners).
`,
    },
  ],
  faqs: [
    {
      question: "How long does the LTR visa take to get?",
      answer:
        "The BOI says it decides within 20 working days after your file is complete, including any extra documents it requests. You then have 60 days to get the visa issued at an embassy or an immigration office in Thailand. Plan on one to three months end to end.",
    },
    {
      question: "Can I bring my family on an LTR visa?",
      answer:
        "Yes. Your spouse and children under 20 can be added to your application. A wider dependant rule, including parents, was announced in 2025 but we could not confirm it is in force. Check the BOI portal before you apply.",
    },
    {
      question: "Is the LTR visa better than Thailand Privilege?",
      answer:
        "The LTR is cheaper and gives tax and work perks, but you must prove income or assets. Thailand Privilege costs far more upfront and has no income test, but no tax relief or work rights. Compare them in our [LTR vs Privilege vs DTV guide](/guides/ltr-vs-privilege-vs-dtv).",
    },
    {
      question: "Can Work-from-Thailand LTR holders take Thai clients?",
      answer:
        "No. The Work-from-Thailand category lets you work in Thailand for your qualifying overseas employer. It does not come with a Thai work permit, so Thai employers or clients are off limits.",
    },
    {
      question: "Do I need a Thai bank account for the LTR?",
      answer:
        "Not to qualify. The BOI checks foreign income or assets. Wealthy Global Citizens must make the USD 500,000 Thai investment, and the USD 100,000 deposit is one alternative to health insurance.",
    },
    {
      question: "Why was my LTR application rejected?",
      answer:
        "The usual reasons are gaps in income evidence, an employer that misses the revenue or listing test, or the wrong category. Read the BOI's reason, fix that one point and reapply. There is no BOI fee to apply again.",
    },
  ],
  sources: [
    { label: "BOI LTR brochure 2025", url: "https://ltr.boi.go.th/documents/BOI-brochure%202025-LTR.pdf" },
    { label: "BOI LTR visa issuance information", url: "https://ltr.boi.go.th/page/visa-issuance-info.html" },
    { label: "BOI Announcement Por. 3/2568 (EN)", url: "https://ltr.boi.go.th/documents/Announcement_of_the_Office_of_the_Board_of_Investment_No_Por_3_2568_(EN).pdf" },
    { label: "BOI checklist, Wealthy Global Citizens (6 Nov 2025)", url: "https://ltr.boi.go.th/documents/Required-docs-Wealthy-Global-Citizens-06-11-2025.pdf" },
    { label: "BOI checklist, Wealthy Pensioners (30 Jun 2025)", url: "https://ltr.boi.go.th/documents/Required-docs-Wealthy-Pensioners-30-06-2025.pdf" },
    { label: "BOI checklist, Work-from-Thailand (6 Nov 2025)", url: "https://ltr.boi.go.th/documents/Required-docs-Work-From-Thailand-Professional-06-11-2025.pdf" },
    { label: "BOI LTR presentation, March 2026", url: "https://www.boi.go.th/upload/content/LTR-March_2026_Stcokholm.pdf" },
    { label: "BOI press release on 2025 LTR changes", url: "https://boi.go.th/index.php?_module=news&from_page=press_releases2&language=en&page=press_releases_detail&topic_id=136393" },
    { label: "Royal Thai Embassy Washington, LTR visa", url: "https://washingtondc.thaiembassy.org/en/page/ltr" },
    { label: "Royal Thai Embassy Kuala Lumpur, LTR visa", url: "https://kualalumpur.thaiembassy.org/en/publicservice/long-term-resident-visa-ltr" },
    { label: "HLB Thailand, foreign income tax changes (secondary)", url: "https://www.hlbthai.com/thailands-foreign-income-tax-changes-now-in-force/" },
  ],
  updated: "2026-11-04",
  related: ["ltr-vs-privilege-vs-dtv", "thailand-tax-for-long-stay-foreigners", "how-to-stay-in-thailand-long-term", "thailand-visa-changes-2026"],
};
