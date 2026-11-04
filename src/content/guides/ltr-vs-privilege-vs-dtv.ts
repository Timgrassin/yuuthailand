import type { Guide } from "../types";

export const guide: Guide = {
  slug: "ltr-vs-privilege-vs-dtv",
  kind: "comparison",
  eyebrow: "Comparison",
  title: "LTR vs Elite (Thailand Privilege) vs DTV: which long-stay visa fits if you have money?",
  metaTitle: "LTR vs Elite visa vs DTV: cost, tax, work and family",
  description: "LTR vs Elite visa vs DTV: cost over 5 and 10 years, work rights, tax position, 90-day or annual reporting and family rules, with official sources.",
  answer:
    "The LTR costs 50,000 THB for up to 10 years and gives tax relief, but you must qualify by income or assets. Thailand Privilege (Elite) needs no income test but costs 900,000 THB for 5 years on Gold. The DTV costs 10,000 THB for 5 years with 500,000 THB shown, and suits remote workers.",
  tracks: ["ltr", "privilege", "dtv"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "LTR fee", value: "50,000 THB", note: "issued in Thailand, up to 10 years" },
    { label: "Privilege Gold", value: "900,000 THB", note: "5 years, no income test" },
    { label: "DTV fee", value: "10,000 THB", note: "5 years, 500,000 THB shown" },
    { label: "LTR reporting", value: "Yearly", note: "instead of every 90 days" },
  ],
  sections: [
    {
      id: "at-a-glance",
      heading: "LTR vs Elite visa vs DTV at a glance",
      body: `
| | LTR (Long-Term Resident) | Thailand Privilege (Elite) | DTV |
|---|---|---|---|
| Who runs it | Board of Investment (BOI), then Immigration | Thailand Privilege Card Co., a state enterprise | Ministry of Foreign Affairs, then Immigration |
| How you qualify | Income, assets or a qualifying job, by category | Pay the membership fee and pass a background check | Show 500,000 THB plus remote work or a soft-power activity |
| Length | 10 years (5 + 5 after a re-check) | 5 to 20 years by tier | 5 years, 180 days per entry |
| Stay per entry | 5-year permission to stay | Up to 1 year per entry | 180 days, extendable once by 180 days |
| Address reporting | Once a year (TM.95) | Every 90 days, the operator can file | Every 90 days if you stay 90+ days in a row |
| Work | Depends on category (see below) | Not a work visa | Remote work for foreign employers or clients only |
| Tax relief | Yes, by category | None | None |
| Health insurance | USD 50,000, or an alternative | Not a membership condition | Not a DTV condition |

Every figure links to its source on the [LTR](/visa-rules/ltr-visa), [Thailand Privilege](/visa-rules/thailand-privilege) and [DTV](/visa-rules/dtv) rule pages.
`,
    },
    {
      id: "cost",
      heading: "What does each cost over 5 and 10 years?",
      body: `
Government and membership fees only. Insurance, translations, agent fees and travel are not included.

| Route | 5 years | 10 years | Notes |
|---|---|---|---|
| LTR | 50,000 THB | 50,000 THB plus any renewal cost | Fee for a visa issued at immigration in Thailand. Embassy fees can be higher. We could not confirm a separate fee for the 5-year renewal. |
| Privilege Bronze | 650,000 THB | Not offered as 10 years | Agents report Bronze was a time-limited tier ending 30 September or 31 December 2026. Confirm it is still on sale. |
| Privilege Gold | 900,000 THB | 1,800,000 THB if bought twice at today's price | Future prices are not guaranteed. |
| Privilege Platinum | Not sold as 5 years | 1,500,000 THB | One payment for 10 years. |
| DTV | About 19,500 THB | About 39,000 THB | 10,000 THB visa plus one 1,900 THB extension a year. A second DTV after 5 years is an assumption, not a guarantee. |

The DTV's 500,000 THB is not spent. You only have to show it. The LTR's financial tests are also proofs, not payments, except the Wealthy Global Citizen route, which needs USD 500,000 invested in Thailand.
`,
    },
    {
      id: "work",
      heading: "Can you work on an LTR, Elite or DTV visa?",
      body: `
- **LTR Highly Skilled Professional:** yes, for your Thai employer, with a digital work permit.
- **LTR Work-from-Thailand Professional:** you may work remotely for your qualifying overseas employer. You do not get a Thai work permit for local work.
- **LTR Wealthy Global Citizen and Wealthy Pensioner:** we could not confirm from BOI sources whether these categories can get a work permit. Ask the BOI before you plan to work.
- **Thailand Privilege:** not a work visa. Working would need a separate visa and work permit.
- **DTV:** remote work for foreign employers or foreign clients is its purpose. Work for Thai employers or the Thai market is not allowed.
`,
    },
    {
      id: "tax",
      heading: "Which visa is best for tax: LTR or Elite?",
      body: `
The LTR is the only one of the three with tax rules of its own, under Royal Decree No. 743:

- **Wealthy Global Citizen, Wealthy Pensioner and Work-from-Thailand Professional:** foreign-sourced income from employment, business or property abroad, brought into Thailand, is exempt from Thai personal income tax.
- **Highly Skilled Professional:** Thai employment income can be taxed at a **flat 17%**, instead of the progressive scale that rises to 35%. This category does not get the foreign-income exemption.

**Thailand Privilege and the DTV** give no tax status. Normal rules apply. If you spend 180 days or more in Thailand in a calendar year, you are a Thai tax resident. Foreign income earned from 1 January 2024 and brought into Thailand can then be taxable.

This is general information, not tax advice. Read our [Thailand tax guide for long-stay foreigners](/guides/thailand-tax-for-long-stay-foreigners) and speak to a Thai tax adviser about your own case.
`,
    },
    {
      id: "reporting",
      heading: "Do I need to do 90-day reports on the LTR?",
      body: `
No. LTR holders who stay in Thailand for a year without leaving file a **one-year report (TM.95)** instead of the 90-day report. The BOI says it is filed at the One Stop Service Center, in person or by someone you authorise. Leaving and re-entering resets the date.

Thailand Privilege members and DTV holders file the normal [90-day report](/guides/90-day-report-thailand). Privilege's own site says its liaison service can file it for members.

All three still need a [TM30](/guides/tm30-thailand) residence notice from your landlord or hotel.
`,
    },
    {
      id: "family",
      heading: "Can I bring my family on an LTR, Elite or DTV?",
      body: `
- **LTR:** a spouse and children under 20 can join as dependants. A 2025 plan to remove the cap on dependants and add parents was not confirmed as in force as of August 2026.
- **DTV:** a spouse and children under 20 can apply as dependants under the MFA rules. Embassies differ on whether they ask for extra funds per person.
- **Thailand Privilege:** each person needs a membership. The operator sells family options, but published add-on prices conflict, so ask the operator directly.
`,
    },
    {
      id: "which-one",
      heading: "LTR vs Elite visa: which should you choose?",
      body: `
**Choose the LTR if** you clear a category test: for example USD 80,000 a year of income, USD 80,000 of pension income for pensioners aged 50+, or USD 1 million in assets with USD 500,000 invested. It is the cheapest per year and the only one with tax relief.

**Choose Thailand Privilege if** you do not meet any income test, or want no paperwork beyond a background check, and are happy to pay upfront.

**Choose the DTV if** you work remotely for foreign clients, can show 500,000 THB, and do not need a stay longer than 180 days plus one extension per entry.

Not sure which you qualify for? Run the [visa checker](/checker) or see [how to stay in Thailand long term](/guides/how-to-stay-in-thailand-long-term).
`,
    },
  ],
  faqs: [
    {
      question: "Is the LTR visa cheaper than the Thailand Elite visa?",
      answer: "Yes, by a wide margin. The LTR fee is 50,000 THB for a visa issued in Thailand, while Privilege Gold costs 900,000 THB for 5 years. The catch is that the LTR needs you to pass an income, asset or job test.",
    },
    {
      question: "Does the Thailand Privilege visa give any tax benefits?",
      answer: "No. Membership gives no special tax status. If you spend 180 days or more in Thailand in a year, the normal tax residency and remittance rules apply.",
    },
    {
      question: "Who gets the LTR 17% flat tax rate?",
      answer: "Only Highly Skilled Professionals, on income from employment with a qualifying Thai employer. The other three LTR categories get an exemption on foreign income brought into Thailand instead.",
    },
    {
      question: "Do LTR holders need to report every 90 days?",
      answer: "No. LTR holders file a yearly report on form TM.95 if they stay a full year without leaving. Thailand Privilege and DTV holders still file the 90-day report.",
    },
    {
      question: "Can I switch from a DTV to an LTR later?",
      answer: "Yes, if you meet an LTR category. You apply for BOI endorsement on the LTR portal, then get the visa at an embassy or at immigration in Thailand. The DTV does not count towards any LTR test.",
    },
  ],
  sources: [
    { label: "BOI LTR visa issuance (fee and stay)", url: "https://ltr.boi.go.th/page/visa-issuance-info.html" },
    { label: "BOI LTR FAQ (TM.95 yearly report)", url: "https://ltr.boi.go.th/page/faq.html" },
    { label: "BOI LTR: how to manage your visa", url: "https://ltr.boi.go.th/page/how-to-manage.html" },
    { label: "BOI LTR brochure 2025", url: "https://ltr.boi.go.th/documents/BOI-brochure%202025-LTR.pdf" },
    { label: "BOI LTR overview, March 2026", url: "https://www.boi.go.th/upload/content/LTR-March_2026_Stcokholm.pdf" },
    { label: "Royal Decree No. 743 (English translation, BOI)", url: "https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf" },
    { label: "Thailand Privilege membership comparison", url: "https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you" },
    { label: "Thailand Privilege 90-day report", url: "https://www.thailandprivilege.co.th/why-thailand/90-day-report" },
    { label: "MFA DTV checklist", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf" },
    { label: "MFA new visa measures, 29 May 2024", url: "https://image.mfa.go.th/mfa/0/tDJBi9m15g/New_Measures_as_of_29_May_2024_-_1850_1.pdf" },
    { label: "PwC Thai Tax 2025/26 booklet (rates and remittance)", url: "https://www.pwc.com/th/en/tax/assets/thai-tax/2025-2026/thai-tax-booklet-2025-26.pdf" },
    { label: "Revenue Department: how foreigners in Thailand pay tax (2024)", url: "https://www.rd.go.th/fileadmin/user_upload/lorkhor/newspr/2024/FOREIGNERS_PAY_TAX2024.pdf" },
  ],
  related: ["thailand-tax-for-long-stay-foreigners", "how-to-stay-in-thailand-long-term", "dtv-vs-ed-visa"],
  confidence: "medium",
};
