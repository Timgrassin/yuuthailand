import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "privilege",
  intro:
    "Thailand Privilege, formerly Thailand Elite, is a paid membership run by the state-owned Thailand Privilege Card Co., Ltd. that comes with a Privilege Entry visa for 5 to 20 years. There is no income, age or bank-balance test: you pass a background check and pay once. It suits people who value simplicity over cost and do not need to work for a Thai employer.",
  whoFor: [
    "A retiree under 50 who cannot use the retirement visa yet and does not want to study or prove remote work.",
    "Someone with savings but irregular or hard-to-document income, who would fail the LTR or retirement money tests.",
    "A frequent traveller who wants airport fast-track, a liaison at immigration and up to a year per entry.",
    "A person who wants one payment and no yearly extension appointments for 5, 10, 15 or 20 years.",
    "A business owner who visits often but is employed or paid outside Thailand.",
  ],
  notFor: [
    "Anyone who needs to work for a Thai company: membership is not a work visa. See the [work visa](/visa-rules/work-visa).",
    "People looking for a tax break: membership does not come with the foreign-income exemption that some [LTR](/visa-rules/ltr-visa) categories carry.",
    "Budget-focused retirees aged 50 or more: the [retirement visa](/visa-rules/retirement-visa) costs a fraction and the money is shown, not spent.",
    "Remote workers who can show 500,000 THB: the [DTV](/visa-rules/dtv) gives 5 years for a 10,000 THB fee.",
    "Anyone who wants permanent residence later: membership years are reported not to count towards it.",
    "People who need a visa within weeks: the background check alone is quoted at about 4 to 6 weeks.",
  ],
  steps: [
    {
      title: "Choose a tier",
      body: "Compare tiers by length, price per year and perks in the rules table above. Check first whether Bronze is still accepting applications (see below). Reserve is by invitation only.",
    },
    {
      title: "Apply directly or through an authorised agent",
      body: "Apply on thailandprivilege.co.th or through one of its authorised sales agents. Check the agent is listed on the official site. Ask any agent to show the official price list and what, if anything, they charge on top.",
    },
    {
      title: "Submit the application form and passport",
      body: "You send the signed application form, a passport copy, a photo and the data-consent form. Applicants under 20 need a legal representative to sign.",
    },
    {
      title: "Wait for the background check",
      body: "The operator passes your details to Thai immigration and other agencies for screening. Thailand Privilege quotes about 4 to 6 weeks and has warned some cases take longer.",
    },
    {
      title: "Pay after approval",
      body: "You pay the membership fee only after the approval letter arrives, by the deadline it states. Fees are reported to be non-refundable once paid, so do not pay before you are sure.",
    },
    {
      title: "Get the Privilege Entry visa",
      body: "The operator tells you where the visa is placed: at a Thai embassy or consulate abroad, or at immigration in Thailand if you are already there. Membership and visa run for the tier's term.",
    },
    {
      title: "Use the liaison for 90-day reports and renewals",
      body: "You still file a [90-day report](/guides/90-day-report-thailand) every 90 days of continuous stay. The membership's liaison service can file it for you. Each entry gives up to one year; renew the stamp within your membership term.",
    },
  ],
  costs: [
    { item: "Bronze (5 years)", amount: "650,000 THB", note: "Promotional tier; closing date unconfirmed (30 Sep or 31 Dec 2026 reported)." },
    { item: "Gold (5 years)", amount: "900,000 THB" },
    { item: "Platinum (10 years)", amount: "1,500,000 THB" },
    { item: "Diamond (15 years)", amount: "2,500,000 THB" },
    { item: "Reserve (20 years)", amount: "5,000,000 THB", note: "By invitation only." },
    { item: "Application fee", amount: "Unconfirmed", note: "A 50,000 THB fee credited against membership is reported; sources conflict." },
    { item: "Family members", amount: "Varies by tier", note: "Add-on prices conflict across sources; ask the operator for a written quote." },
    { item: "Membership transfer", amount: "Varies", note: "The operator adjusted transfer fees from 15 June 2026." },
  ],
  mistakes: [
    "Paying an agent a deposit before approval. The membership fee is due only after the approval letter arrives.",
    "Relying on an agent's Bronze deadline. Agent sites give 30 September 2026 and 31 December 2026, sometimes on the same site. Ask the operator in writing.",
    "Assuming membership removes 90-day reporting. It does not; the liaison can only file it for you.",
    "Taking a job or Thai clients on the Privilege visa. It is not a work visa, and working needs a separate visa and work permit.",
    "Leaving Thailand without checking your stamp. Each entry gives up to one year; if you stay longer, you must renew the stamp in country.",
    "Expecting perks like points or limousine transfers on every tier. Agent sources report Bronze has no points and limousine service starts at higher tiers.",
    "Buying on per-year price alone. The Reserve and Diamond terms only pay off if you will actually live here that long.",
  ],
  sections: [
    {
      id: "what-membership-gives",
      heading: "What does Thailand Privilege give you, and what does it not?",
      body: `
| You get | You do not get |
|---|---|
| A Privilege Entry visa for the whole membership term | A right to work for a Thai employer or Thai clients |
| Up to one year per entry, renewable in country | An exemption from 90-day reporting |
| No income, age or bank-balance test | Any tax exemption or special tax rate |
| A liaison who can file 90-day reports and help at immigration | Credit towards permanent residence or citizenship (reported) |
| Airport fast-track and tier-based extras such as transfers and points | A refund if you leave early (fees are reported non-refundable) |

The perks list changes by tier and over time. Treat agent brochures as marketing and check the current benefit sheet on thailandprivilege.co.th.
`,
    },
    {
      id: "bronze-status",
      heading: "Is the Bronze membership still available?",
      body: `
We cannot confirm it. Bronze (650,000 THB for 5 years) launched as a promotion. Agent sites report its deadline was extended more than once: to 30 September 2026, then to 31 December 2026. Some agent pages still show the older date. We found no statement on thailandprivilege.co.th that settles it.

If Bronze matters to you, email the operator and ask for the closing date in writing. If Bronze has closed, Gold is the 5-year option. Follow updates in our [Bronze deadline guide](/guides/thailand-privilege-bronze-deadline) and the [change log](/visa-rules/changes).
`,
    },
    {
      id: "privilege-tax",
      heading: "Do Thailand Privilege members pay Thai tax?",
      body: `
Membership does not change your tax position. Thailand treats you as a tax resident if you spend 180 days or more in the country in a calendar year. Since 1 January 2024, tax residents can be taxed on foreign income they bring into Thailand.

The foreign-income exemption under Royal Decree 743 applies to three LTR categories. It is not extended to Privilege members. If you will live here most of the year and bring in foreign income, speak to a Thai tax adviser before you choose. See [tax for long-stay foreigners](/guides/thailand-tax-for-long-stay-foreigners).
`,
    },
    {
      id: "privilege-vs-alternatives",
      heading: "Is Thailand Privilege worth it compared with other long-stay visas?",
      body: `
It is worth it when you cannot or will not meet another visa's test. Divide the tier price by the years you will really use. Then compare:

- **Retirement visa (50+):** money held in a Thai bank, not spent, plus a 1,900 THB yearly extension.
- **DTV:** 10,000 THB for 5 years, if you work remotely and can show 500,000 THB.
- **LTR:** 50,000 THB for 10 years, if you meet a category test.

Thresholds and sources are on each visa page. For a side-by-side view, read [LTR vs Privilege vs DTV](/guides/ltr-vs-privilege-vs-dtv).
`,
    },
  ],
  faqs: [
    {
      question: "Is Thailand Elite the same as Thailand Privilege?",
      answer:
        "Yes. Thailand Elite was renamed Thailand Privilege. The operator is still the state-owned Thailand Privilege Card Co., Ltd., and the visa is the Privilege Entry visa.",
    },
    {
      question: "How long does the Thailand Privilege application take?",
      answer:
        "Thailand Privilege quotes about 4 to 6 weeks for the background check, and has warned some cases take longer. Add time for payment and visa placement. Apply at least two months before you need the visa.",
    },
    {
      question: "Can my family join on Thailand Privilege?",
      answer:
        "Yes, family members can hold their own memberships, and some tiers offer family pricing. Prices for family add-ons conflict across sources, so get a written quote from the operator.",
    },
    {
      question: "Can I use a Thailand Privilege agent?",
      answer:
        "Yes. The operator works through authorised sales agents. Check the agent appears on thailandprivilege.co.th and never pay the membership fee before your approval letter.",
    },
    {
      question: "Can I sell or transfer my Thailand Privilege membership?",
      answer:
        "Transfers exist, but they carry a fee and the rules depend on your tier. The operator adjusted transfer fees from 15 June 2026. Ask for the current terms in writing before you buy with resale in mind.",
    },
  ],
  sources: [
    { label: "Thailand Privilege tier comparison", url: "https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you" },
    { label: "Thailand Privilege 90-day report", url: "https://www.thailandprivilege.co.th/why-thailand/90-day-report" },
    { label: "Thailand Privilege Bronze application form", url: "https://cms.thailandprivilege.co.th/stocks/download/o0x0/n5/e7/rmpqn5e7ces/Application-Form-for-Bronze-Membership.pdf" },
    { label: "Thailand Privilege official site", url: "https://www.thailandprivilege.co.th" },
    { label: "The Thaiger, Thailand Privilege visa 2026 (secondary)", url: "https://thethaiger.com/visas/thailand-privilege/" },
    { label: "Bronze extended to 30 Sep 2026 (agent, secondary)", url: "https://www.thailandelitevisas.com/bronze-membership-extended-until-sept-30-2026/" },
    { label: "Bronze extended to 31 Dec 2026 (agent, secondary)", url: "https://thailand-elite.com/blog/thailand-privilege-bronze-membership-extension" },
    { label: "HLB Thailand, foreign income tax changes (secondary)", url: "https://www.hlbthai.com/thailands-foreign-income-tax-changes-now-in-force/" },
  ],
  updated: "2026-11-04",
  related: ["thailand-privilege-bronze-deadline", "ltr-vs-privilege-vs-dtv", "thailand-tax-for-long-stay-foreigners", "90-day-report-thailand"],
};
