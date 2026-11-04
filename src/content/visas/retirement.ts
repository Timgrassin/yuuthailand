import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "retirement",
  intro:
    "The retirement route is a Non-Immigrant O visa for people aged 50 or over, followed by a one-year extension of stay that you renew at a Thai immigration office every year. It suits retirees who can keep money in a Thai bank or show a steady pension, and who are happy to handle a yearly renewal in person. Unlike the O-A, it needs no health insurance and no police or medical certificate for the in-country extension.",
  whoFor: [
    "A retiree aged 50 or over with savings they can leave in a Thai bank account for the year.",
    "A pensioner with a regular monthly income that meets the threshold and can be proven by an embassy letter or transfers.",
    "Someone already in Thailand on a visa exemption who wants to stay long term without flying home.",
    "A retiree who cannot easily get, or does not want, health insurance that meets the O-A level.",
    "A person aged 50+ whose younger spouse can join as a dependant.",
  ],
  notFor: [
    "Anyone under 50. Look at the DTV, education or marriage routes instead.",
    "Someone who wants to work or run a business in Thailand. Retirement status does not allow employment.",
    "A retiree who wants the money free to invest. The deposit must stay in a Thai bank and cannot drop below a floor.",
    "Someone hoping retirement extensions lead to permanent residence. They are not a route to PR.",
    "A person who wants to arrive with a full year already granted. The O-A visa, applied for abroad, does that.",
  ],
  steps: [
    {
      title: "Pick how you will prove funds",
      body: "Choose the deposit, the monthly income or a combination of both. If you plan to use income, check whether your embassy still issues income letters. If it does not, you will need to show 12 months of transfers into a Thai account.",
    },
    {
      title: "Get a Non-O visa or convert in Thailand",
      body: "Apply for a Non-O retirement visa at a Thai mission abroad through thaievisa.go.th. Or, if you entered visa-exempt, ask your local immigration office to change your status to Non-O on form TM.87. Conversion needs enough days left on your stay.",
    },
    {
      title: "Open a Thai bank account and season the money",
      body: "For the deposit route, the money must sit in a Thai bank account in your name for 2 months before you file the first extension. Plan this from your first week, because the clock starts when the funds land.",
    },
    {
      title: "Arrange your address paperwork",
      body: "Make sure your landlord or hotel has filed the TM.30 notice for your address. Immigration offices ask for the receipt, and some also ask for a rental contract and photos of your home.",
    },
    {
      title: "File the one-year extension",
      body: "Within the last 30 days of your 90-day Non-O stay, go to immigration with the TM.7 form, photo, passport, recent bank letter, updated bank book and the 1,900 THB fee. Some offices, such as Bangkok's Chaeng Watthana, reportedly accept applications up to 45 days ahead.",
    },
    {
      title: "Collect the extension stamp",
      body: "Some offices approve on the day, others ask you to come back for the final stamp. Keep the deposit untouched for 3 months after approval.",
    },
    {
      title: "Keep the balance above the floor",
      body: "After those 3 months you may use some of the money, but the balance must stay at or above 400,000 THB until the next renewal. Then it must be back at the full amount for the 2 months before you file again.",
    },
    {
      title: "Report every 90 days",
      body: "File a 90-day report while you stay. You can do it online after your first in-person report.",
    },
    {
      title: "Buy a re-entry permit before any trip",
      body: "Your one-year extension ends the moment you leave Thailand without a re-entry permit. Get one at immigration or the airport before you go.",
    },
    {
      title: "Renew every year",
      body: "Repeat the extension each year at the same office. The rules can change between renewals, so check the current thresholds before each one.",
    },
  ],
  costs: [
    { item: "Non-O visa at a Thai mission", amount: "2,000 THB single entry", note: "Charged in local currency. Varies by mission, and some list a higher multiple-entry fee." },
    { item: "Change of visa type in Thailand (to Non-O)", amount: "2,000 THB", note: "Reported fee for converting from visa-exempt or tourist status. Not every office offers it." },
    { item: "One-year extension of stay", amount: "1,900 THB", note: "Paid every year." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Multiple is worth it if you travel more than three times a year." },
    { item: "Bank letter", amount: "Set by your bank", note: "Needed for each application. Bank charges vary." },
    { item: "90-day report", amount: "Free", note: "A late report is commonly fined 2,000 THB." },
  ],
  mistakes: [
    "Moving the money into the account too late. It needs 2 months in the account before the first filing, so a late transfer pushes your whole timeline back.",
    "Spending from the deposit in the 3 months after approval, or letting it fall below the 400,000 THB floor later in the year.",
    "Assuming your embassy still issues an income letter. Some, including the US, UK and Australian embassies, are reported to have stopped, so you must show 12 months of transfers instead.",
    "Trying to convert on the last days of a 30-day visa exemption. Offices want a minimum number of days left, reported as 15 to 21.",
    "Flying out without a re-entry permit and losing the extension you spent months preparing for.",
    "Missing the TM.30 address notice. Offices often refuse to accept the extension file without it.",
    "Using an agent who offers a retirement extension 'without the money'. That can involve forged bank documents and puts your stay at risk.",
  ],
  sections: [
    {
      id: "convert-from-visa-exemption",
      heading: "Can I get a retirement visa from inside Thailand?",
      body: `
Yes, at many immigration offices. If you entered visa-exempt, you can apply to change your status to Non-O on form TM.87. Tourist visa holders use TM.86. The reported fee is 2,000 THB, and the change gives you a 90-day Non-O stay. You then file the one-year extension near the end of those 90 days.

The catch is timing. Since 15 September 2026 most visa-exempt visitors get 30 days on arrival, not 60. Offices reportedly want at least 15 to 21 days left on your stay when you file, and processing can take around 15 working days. That leaves little room.

| What you need | When |
|---|---|
| Arrive visa-exempt | Day 1 |
| Open a Thai bank account and deposit the funds | First week |
| File the Non-O conversion with enough days left | By about day 9 to 15 |
| Extend the exemption by 30 days if needed | Before day 30, 1,900 THB, at the officer's discretion |

The bank seasoning is the second catch. The deposit must be in the Thai account for 2 months before the one-year extension, not before the conversion. Plan the dates so the two months are complete before your 90-day Non-O stay runs out.

Not every office accepts conversions, and some send you to another office. Call ahead. Read how the 30-day rule works in [Thailand visa exemption 30 days](/guides/thailand-visa-exemption-30-days).
`,
    },
    {
      id: "money-timeline",
      heading: "How long must the 800,000 baht stay in the bank?",
      body: `
Bangkok Immigration's published criteria set a three-stage rule for the deposit route:

1. The full amount sits in a Thai bank account for **2 months before you file**.
2. It stays untouched for **3 months after the extension is approved**.
3. For the rest of the year, the balance never drops below **400,000 THB**.

Before your next renewal, top it back up so the full amount has been there for 2 months again. Offices interpret these rules a little differently, so the rules table on this page carries a confidence label. For worked examples, read [retirement visa 800k bank rules](/guides/retirement-visa-800k-bank-rules).
`,
    },
    {
      id: "non-o-or-o-a",
      heading: "Should I choose the Non-O or the O-A?",
      body: `
Both need the same money and the same age. The Non-O route is simpler on paperwork: no insurance, no police certificate and no medical certificate. The O-A gives you a full year from arrival but needs health insurance at every renewal. If you are healthy and can handle a first-year extension in Thailand, the Non-O route usually costs less. Compare them in [Non-O vs O-A visa](/guides/non-o-vs-o-a-visa).
`,
    },
  ],
  faqs: [
    {
      question: "Do I need health insurance for a Thai retirement extension?",
      answer: "Not on the Non-O route. Insurance is a requirement of the O-A visa, both when you apply and at extensions. Staylong still recommends cover, because hospital costs in Thailand are paid by you.",
    },
    {
      question: "Can I get a retirement visa without 800,000 baht?",
      answer: "Yes, legally, through the monthly income route or a combination of income and deposit. An agent offering a retirement extension with no money at all is a red flag, since that can involve forged documents.",
    },
    {
      question: "Can my spouse under 50 join me on a retirement visa?",
      answer: "Yes, a legally married spouse can usually join as a dependant on a Non-O extension based on your retirement. They cannot work on that status. Bring your marriage certificate, translated and legalised as your office asks.",
    },
    {
      question: "When can I file my retirement extension?",
      answer: "Most offices accept the file in the last 30 days of your current permission to stay. Some, such as Chaeng Watthana in Bangkok, reportedly accept it up to 45 days ahead. Check with your office before you go.",
    },
    {
      question: "Does a retirement visa lead to permanent residence?",
      answer: "No. Years on retirement extensions do not count towards Thai permanent residence. If you want PR, ask an immigration lawyer which status qualifies.",
    },
  ],
  sources: [
    { label: "Bangkok Immigration, extension of stay criteria", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
    { label: "MFA Non-O for retirement requirements", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/NON-O_for_Retirement_visa.pdf" },
    { label: "Royal Thai Consulate-General Los Angeles, Non-O retirement", url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/non-immigrant-type-o-retirement" },
    { label: "Bangkok Immigration, re-entry permit fees", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
    { label: "Reported by VisasNews: 30-day visa exemption from 15 September 2026", url: "https://visasnews.com/en/thailand-to-officially-cut-visa-free-stay-to-30-days-on-september-15-2026/" },
    { label: "Reported by Thai Visa Services: changing visa type in Thailand", url: "https://www.thai-visa-services.com/guides/changing-visa-type-in-thailand" },
    { label: "Reported by ThaiLawOnline: retirement extension (TM.7) guide", url: "https://www.thailawonline.com/extension-based-on-retirement-in-thailand/" },
  ],
  updated: "2026-11-04",
  related: [
    "retirement-visa-800k-bank-rules",
    "non-o-vs-o-a-visa",
    "thailand-visa-exemption-30-days",
    "90-day-report-thailand",
    "how-to-stay-in-thailand-long-term",
  ],
};
