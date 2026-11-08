import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "dtv",
  intro:
    "The Destination Thailand Visa (DTV) is a five-year, multiple-entry visa that lets you stay up to 180 days per entry. It is built for people who earn from outside Thailand, such as remote employees and freelancers, and for people joining a Thai soft-power activity like Muay Thai or cooking. You apply from abroad, at a Thai mission in your country of nationality or residence.",
  whoFor: [
    "A remote employee of a company outside Thailand who wants to work from Chiang Mai or Bangkok for half the year.",
    "A freelancer or consultant with foreign clients, a portfolio and savings that clear the funds test.",
    "Someone booking a long Muay Thai programme at a camp that can issue the soft-power paperwork the embassy asks for.",
    "A person who wants to come and go over several years without renewing a visa every year.",
    "A DTV holder's spouse or child under 20 joining them as a dependant.",
    "An over-50 who prefers flexible 180-day stays to keeping 800,000 THB in a Thai bank for a retirement extension.",
  ],
  notFor: [
    "Anyone planning to work for a Thai employer or invoice Thai clients. That needs a Non-B work visa and a work permit.",
    "Someone already in Thailand who hoped to switch to a DTV at an immigration office. You must apply at a Thai mission abroad.",
    "A traveller who cannot show the savings for about three months before applying.",
    "Someone who only wants to study Thai. The education visa is the intended route.",
    "A nationality-hopper planning to apply in a neighbouring country where they have no residence. Since 31 August 2026 that is no longer accepted.",
    "Anyone who wants to stay a full year without leaving. A DTV entry plus one extension tops out at 360 days, and then you must exit.",
  ],
  steps: [
    {
      title: "Choose your category",
      body: "Decide whether you apply as a remote worker or freelancer (workcation) or under a soft-power activity. The documents differ. A Muay Thai or cooking applicant needs a letter from the provider, not an employment contract.",
    },
    {
      title: "Confirm which mission you must use",
      body: "From 31 August 2026 you must apply at the Thai embassy or consulate covering the country where you are a national or a legal or permanent resident. Check that mission's DTV page, because the proof of residence it accepts varies.",
    },
    {
      title: "Prepare your bank statement",
      body: "Get a statement showing at least the required balance over roughly the last three months, in your own name. Some missions want the statement issued within the last 15 days, so order it last.",
    },
    {
      title: "Order a criminal record certificate",
      body: "Since 31 August 2026 a police certificate is required. Each mission sets its own age limit. London reportedly accepts an ACRO certificate up to 6 months old, while Los Angeles reportedly wants an FBI check under 3 months old.",
    },
    {
      title: "Gather proof of your activity",
      body: "Remote workers upload a foreign employment contract or company letter, or a freelance portfolio with client contracts. Soft-power applicants upload the acceptance letter with course dates, plus any registration documents the provider must supply.",
    },
    {
      title: "Apply on thaievisa.go.th and pay",
      body: "Create an account on the official Thai e-Visa portal, select your mission, upload PDFs and pay the fee in local currency. Use only the .go.th site: lookalike domains exist. Reported processing times run from about 5 to 15 working days.",
    },
    {
      title: "Receive the e-visa and enter Thailand",
      body: "The approved e-visa arrives by email. Print it and carry it with your passport. Each entry gives you up to 180 days.",
    },
    {
      title: "Extend once per entry if you need to",
      body: "Before your 180 days run out, file a TM.7 extension at your local immigration office. One extension of up to 180 days is allowed per entry, for 1,900 THB.",
    },
    {
      title: "Report your address every 90 days",
      body: "If you stay more than 90 days in a row, file a 90-day report online, in person or by post. Make sure your landlord or hotel has filed the TM.30 address notice, or offices may refuse your extension.",
    },
    {
      title: "Exit and re-enter for a new stay",
      body: "When your stay ends, leave Thailand. On your next entry within the five-year validity you get a fresh 180 days. Leaving does not cancel a multiple-entry visa.",
    },
  ],
  costs: [
    { item: "DTV visa fee", amount: "10,000 THB", note: "Charged in local currency, so the exact amount varies by mission and exchange rate." },
    { item: "In-country extension (180 days)", amount: "1,900 THB", note: "Once per entry, at an immigration office." },
    { item: "Criminal record certificate", amount: "Varies", note: "Set by your home police authority. Some missions also ask for translation or legalisation." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Usually not needed while your multiple-entry DTV is valid. Check with immigration if you leave during an extension." },
    { item: "90-day report", amount: "Free", note: "A late report is commonly fined 2,000 THB." },
  ],
  mistakes: [
    "Applying at a mission in a country where you are only visiting. Since 31 August 2026 you need nationality or residence there, with proof.",
    "Uploading a bank statement that shows a single large deposit just before applying. Officers look for a balance maintained over about three months.",
    "Using a police certificate that is older than the mission allows. Age limits differ, so check the exact mission page before ordering it.",
    "Submitting a soft-power letter without exact course dates, your passport number, or the mission it is addressed to. Agency and gym guides report rejections for vague letters.",
    "Booking a very short Muay Thai or cooking course. Reported minimum course lengths vary by mission, from a few months to a year, and are not published centrally.",
    "Taking Thai clients or a Thai employer. The DTV covers remote work for foreign employers and clients only.",
    "Filing on a lookalike visa site instead of thaievisa.go.th. Unofficial sites charge extra and can lose your data.",
    "Forgetting the 90-day report or the landlord's TM.30 filing, which can block the 180-day extension.",
  ],
  sections: [
    {
      id: "soft-power-muay-thai-letter",
      heading: "What letter does a Muay Thai camp need to issue for a DTV?",
      body: `
The soft-power route still needs the same savings as the remote-work route. What changes is the proof of purpose. Instead of an employment contract, you upload a letter from the activity provider.

For Muay Thai, official mission pages go further than an ordinary booking:

| Mission | What it asks for (as published) |
|---|---|
| Singapore embassy | A letter from the Muay Thai camp to the Board of Boxing Sport, and a letter from the Sports Authority of Thailand and the Ministry of Tourism and Sports |
| Los Angeles consulate | An official letter of acceptance and support from the Sports Authority of Thailand (SAT), plus documents from a SAT-certified boxing gym |
| London, Washington, Sydney | Reported to list an acceptance letter or proof of booking, without a stated duration |

Before you pay a camp, ask it four questions:

1. Is the gym registered with the Sports Authority of Thailand?
2. Can it supply the SAT or Board of Boxing Sport documents your mission asks for?
3. Will the letter state your full name, passport number, nationality and exact course dates?
4. Will it address the letter to your mission or to Thai e-Visa processing?

Course length is the most disputed point. Gym and agency guides cite minimums of 3, 6, 9 and 12 months for different missions. No official source sets one number. Choose a programme that covers most of your planned stay, and keep proof that you attend.

Staylong has not yet checked whether the camps it lists can issue these documents, so ask each camp before you pay. Every listing shows its status. See [schools and providers](/providers) and [how we verify](/how-we-verify).
`,
    },
    {
      id: "where-to-apply-after-august-2026",
      heading: "Where can I apply for a DTV after the August 2026 change?",
      body: `
Until 31 August 2026, many people applied in Vientiane, Kuala Lumpur or Phnom Penh during a short trip. That route has closed for most applicants. You now apply at the mission covering a country where you are a national or a legal or permanent resident, and you add a criminal record certificate.

What counts as residence is decided by each mission. Typical proof is a residence permit or a national ID card. Applications submitted and paid before 31 August 2026 are reported to be assessed under the old rules.

If you live in Thailand on another visa, you cannot apply for a DTV from inside the country. Plan a trip to your home country, or to a country where you hold residence. Read the full change in [DTV new rules from August 2026](/guides/dtv-new-rules-august-2026).
`,
    },
    {
      id: "plan-a-year-on-dtv",
      heading: "How does a typical year on a DTV work?",
      body: `
A DTV gives you up to 180 days per entry and one extension of up to 180 days. That creates two common patterns.

| Pattern | What you do | Admin |
|---|---|---|
| Split year | Stay up to 180 days, leave, come back later | 90-day report at day 90, nothing else |
| Long block | Stay 180 days, extend once, stay up to 180 more | 90-day reports, one TM.7 extension for 1,900 THB |

Either way, once you have spent 180 days or more in Thailand in a calendar year, you may be a Thai tax resident. Thailand taxes foreign income you bring in while resident. Ask a Thai tax adviser before you transfer earnings.
`,
    },
  ],
  faqs: [
    {
      question: "Can I apply for a DTV from inside Thailand?",
      answer: "No. The DTV is issued by Thai embassies and consulates abroad through the e-Visa portal. Since 31 August 2026 you must apply at the mission covering your country of nationality or residence. You cannot convert another visa to a DTV at a Thai immigration office.",
    },
    {
      question: "Do I need a police clearance for the DTV?",
      answer: "Yes, for applications from 31 August 2026. The certificate must come from your country of nationality or residence. Each mission sets how recent it must be, for example London reportedly up to 6 months and Los Angeles reportedly 3 months.",
    },
    {
      question: "How long does a DTV take to be approved?",
      answer: "Reported e-Visa processing times run from about 5 to 15 working days, and some missions take longer. Official timelines are set by each mission. Apply at least a month before you fly.",
    },
    {
      question: "Can my partner and children come with me on a DTV?",
      answer: "Yes. Your spouse and children under 20 can apply as dependants of the main DTV holder. Each dependant files a separate application linked to yours. See the [DTV with family guide](/guides/dtv-with-family) for what they must show.",
    },
    {
      question: "Why are DTV applications rejected?",
      answer: "Common reported reasons are a weak or undated employment letter, a bank balance not held long enough, applying at the wrong mission, and a vague soft-power letter. The [DTV rejected reasons guide](/guides/dtv-rejected-reasons) explains how to fix each one before you reapply.",
    },
    {
      question: "Is a Muay Thai DTV easier to get than a remote-work DTV?",
      answer: "Not necessarily. You still need the same savings, and some missions ask for Sports Authority of Thailand documents from the camp. The paperwork depends on whether your gym can issue the right letters.",
    },
  ],
  sources: [
    { label: "MFA DTV checklist", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf" },
    { label: "MFA new visa measures, 29 May 2024", url: "https://image.mfa.go.th/mfa/0/tDJBi9m15g/New_Measures_as_of_29_May_2024_-_1850_1.pdf" },
    { label: "Royal Thai Embassy Singapore, DTV soft-power activities", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-thai-soft-power-related-activities" },
    { label: "Royal Thai Consulate-General Los Angeles, DTV", url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/dtv-visa" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
    { label: "Bangkok Immigration, re-entry permit fees", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
    { label: "Immigration Bureau 90-day online report", url: "https://tm47.immigration.go.th" },
    { label: "Reported by Lexbangkok: DTV rules from 31 August 2026", url: "https://lexbangkok.com/destination-thailand-visa-dtv/" },
    { label: "Reported by The Thaiger: DTV extension fee", url: "https://thethaiger.com/visas/dtv/" },
  ],
  updated: "2026-11-04",
  related: [
    "dtv-new-rules-august-2026",
    "dtv-rejected-reasons",
    "dtv-with-family",
    "dtv-vs-ed-visa",
    "90-day-report-thailand",
    "how-to-stay-in-thailand-long-term",
  ],
};
