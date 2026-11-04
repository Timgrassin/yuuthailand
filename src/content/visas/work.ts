import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "work",
  intro:
    "The work visa is a Non-Immigrant B visa plus a Thai work permit, sponsored by a Thai-registered employer. You enter on 90 days, get the work permit, then extend your stay one year at a time while the job lasts. It is for people hired by a Thai company, or running their own, who need to work legally in Thailand.",
  whoFor: [
    "A teacher, engineer, manager or specialist with a job offer from a Thai-registered company.",
    "A foreigner who owns or co-owns a Thai company and draws a salary from it.",
    "An employee of a BOI-promoted company, where the employer's capital and Thai-staff conditions are reported to be relaxed.",
    "A spouse of a Thai who wants to work, though many use a marriage-based stay plus work permit instead.",
    "Someone planning to stay several years, since yearly work extensions are a common path towards permanent residence.",
  ],
  notFor: [
    "Remote workers paid by foreign employers or clients: that is what the [DTV](/visa-rules/dtv) is for.",
    "Freelancers without a Thai company: a work permit is tied to one employer and one role.",
    "Highly paid hires in target industries who qualify for the [LTR](/visa-rules/ltr-visa) Highly Skilled category, which has a digital work permit and a 17% flat tax.",
    "People in reserved occupations: Thai law keeps some jobs for Thai nationals, and no permit is issued for them.",
    "Anyone whose employer is a small company without the paid-up capital and Thai staff immigration expects.",
  ],
  steps: [
    {
      title: "Get a job offer from a qualifying employer",
      body: "Confirm the company can sponsor you before you resign at home. Immigration generally expects 2 million THB paid-up capital per foreign worker, and agencies report a ratio of 4 Thai employees per foreigner. BOI-promoted companies follow their own rules.",
    },
    {
      title: "Collect employer documents",
      body: "The employer provides a job offer or letter of approval, company registration, business licence, shareholder list and financial statements. These make up most of your file, so ask HR for them early.",
    },
    {
      title: "Apply for the Non-B visa",
      body: "Apply at a Royal Thai Embassy or Consulate, usually through thaievisa.go.th. A single entry costs 2,000 THB and a one-year multiple entry 5,000 THB where offered. You get 90 days on entry.",
    },
    {
      title: "Apply for the work permit within 90 days",
      body: "Your employer files with the Department of Employment. Since 13 October 2025, applications are reported to go through the online e-Work Permit system. Do not start work until the permit is approved.",
    },
    {
      title: "Extend your stay for one year",
      body: "Before the 90 days end, apply at immigration with your work permit, TM.7, company documents, and proof of salary, tax and social security. The fee is 1,900 THB. Officers decide at their discretion, and some issue an under-consideration stamp first.",
    },
    {
      title: "Report every 90 days and get a re-entry permit",
      body: "File a [90-day report](/guides/90-day-report-thailand) every 90 days of continuous stay. Get a re-entry permit before travelling, or the extension is cancelled when you leave.",
    },
    {
      title: "Renew yearly and pay Thai tax",
      body: "Renew both the work permit and the extension each year. Immigration checks that tax and social security were paid on your salary, so keep payslips and filings.",
    },
  ],
  costs: [
    { item: "Non-B visa, single entry", amount: "2,000 THB", note: "3-month validity. Embassy fees vary." },
    { item: "Non-B visa, multiple entry", amount: "5,000 THB", note: "One-year validity, where offered." },
    { item: "Work permit application", amount: "100 THB", note: "Reported by secondary sources." },
    { item: "Work permit", amount: "750 THB up to 3 months, 1,500 THB up to 6 months, 3,000 THB up to 1 year", note: "Reported by secondary sources; confirm with the Department of Employment." },
    { item: "One-year extension of stay", amount: "1,900 THB", note: "Each year." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Reported fees; airports add a service charge." },
    { item: "Translations, medical certificate, photos", amount: "Varies", note: "Often paid by the employer." },
  ],
  mistakes: [
    "Starting work before the work permit is approved. Working without a permit is an offence for you and the employer.",
    "Doing a job not written on the permit, or working for a second company. The permit covers one employer, one role and one location.",
    "Accepting an offer from a company that cannot meet the capital or Thai-staff ratio. The visa fails at extension, not at the embassy.",
    "Resigning before the next visa is lined up. When the employer cancels the work permit, the extension usually ends and you are reported to have about 7 days to leave or change status.",
    "Entering on a visa exemption and expecting to get a work permit. You normally need a Non-B, or a stay type immigration accepts, first.",
    "Travelling without a re-entry permit, which cancels the one-year extension.",
    "Missing tax or social security payments. Immigration checks them at each renewal.",
  ],
  sections: [
    {
      id: "company-requirements",
      heading: "What does a Thai company need to sponsor a work visa?",
      body: `
Your eligibility depends on the employer more than on you. Immigration and labour officers look at the company first:

| Requirement | Typical rule | Source quality |
|---|---|---|
| Paid-up capital | 2 million THB per foreign worker | Bangkok Immigration criteria |
| Thai staff | 4 Thai employees per foreigner, registered for social security | Reported by agencies and law firms |
| Spouse of a Thai | Capital reported at 1 million THB, ratio halved | Reported only; not confirmed officially |
| Salary | Minimum by nationality, from 25,000 to 50,000 THB a month | Secondary sources, low confidence |
| Tax and social security | Paid on your salary | Checked at each renewal |

If your employer is small or newly registered, ask them to confirm these numbers with their accountant before you move.
`,
    },
    {
      id: "boi-vs-non-boi",
      heading: "BOI company vs ordinary company: what is the difference?",
      body: `
Companies promoted by the Board of Investment (BOI) get help bringing in foreign staff. Agency and law-firm sources report that the capital and Thai-staff conditions above are waived or relaxed for BOI-promoted companies. Their visa and work permit files go through the BOI's One Start One Stop centre and online system rather than the standard route.

For an ordinary company, the standard route applies: Non-B at an embassy, work permit at the Department of Employment, extension at immigration.

If you earn enough and the employer is in a target industry, also check the [LTR Highly Skilled category](/visa-rules/ltr-visa). It gives up to 10 years and a digital work permit.
`,
    },
    {
      id: "changing-jobs",
      heading: "What happens to your visa when you change jobs?",
      body: `
Your work permit and extension belong to the job. When you leave:

1. Your employer must notify the Department of Employment and cancel the permit.
2. Immigration then cancels the extension based on that job. Consultancies report you usually get about 7 days to leave or change visa status.
3. Your new employer applies for a new work permit and, in most cases, a new Non-B basis for your stay.

Some offices allow a transfer without leaving Thailand if the new job is ready before the old one ends. Plan the dates with both employers and do not resign before the new paperwork starts.
`,
    },
  ],
  faqs: [
    {
      question: "Can I get a work permit without a Non-B visa?",
      answer:
        "Usually not. The work permit is normally issued to people with a Non-B or another non-immigrant visa that immigration accepts, such as a marriage-based stay. Tourist entries and visa exemptions generally do not qualify.",
    },
    {
      question: "How long does a Thai work permit take?",
      answer:
        "Most applications are reported to take a few weeks once the employer's file is complete. Your employer files within your first 90 days. Start the paperwork before you arrive to stay inside that window.",
    },
    {
      question: "Can I teach English on a Non-B visa?",
      answer:
        "Yes, with a school that sponsors your Non-B and work permit. Teachers also need clearance from the Teachers' Council of Thailand or a temporary teaching waiver. Ask the school which it will arrange.",
    },
    {
      question: "Can I work for two companies in Thailand?",
      answer:
        "Not on one permit. A work permit names one employer and one role. Working elsewhere needs that employer added or a separate permit.",
    },
    {
      question: "Can I set up my own company and give myself a work visa?",
      answer:
        "Yes, if the company meets the capital, Thai-staff and tax conditions. Foreign ownership limits also apply. Use a Thai lawyer or accountant to set it up correctly.",
    },
  ],
  sources: [
    { label: "MFA Non-Immigrant B visa", url: "https://www.mfa.go.th/en/publicservice/non-immigrant-visa-b-for-business-and-work" },
    { label: "Immigration Bureau extension fee", url: "https://www.immigration.go.th/?p=14714" },
    { label: "Bangkok Immigration extension of stay", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
    { label: "BOI OSOS FAQ, re-entry permit", url: "https://osos.boi.go.th/EN/faq-group/28/About-Re-entry-Permit/" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
    { label: "The Thaiger, Thailand work permit 2026 (secondary)", url: "https://thethaiger.com/guides/visa-information/thailand-work-permit" },
    { label: "Thailand Law Office, work permit and Non-B extension (secondary)", url: "https://www.thailandlawoffice.com/legal-articles/2161" },
    { label: "FRANK Legal & Tax, visa when work permit is cancelled (secondary)", url: "https://franklegaltax.com/visa-issues-when-your-work-permit-is-cancelled/" },
  ],
  updated: "2026-11-04",
  related: ["how-to-stay-in-thailand-long-term", "90-day-report-thailand", "thailand-tax-for-long-stay-foreigners", "ltr-vs-privilege-vs-dtv"],
};
