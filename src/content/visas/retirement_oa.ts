import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "retirement_oa",
  intro:
    "The O-A is a one-year, multiple-entry long-stay visa for people aged 50 or over, applied for at a Thai mission in your country of nationality or residence before you travel. It suits retirees who want a full year of permission from the day they land, and who can buy health insurance that meets the Thai minimum. After the first year you renew it in Thailand, much like the Non-O retirement route.",
  whoFor: [
    "A retiree aged 50 or over who wants a full year granted before leaving home.",
    "Someone who can meet the funds test from a home-country bank account rather than a Thai one.",
    "A healthy applicant who can buy health insurance at the required level at a reasonable price.",
    "A person who wants to come and go in the first year without buying re-entry permits.",
    "Someone with a clean police record and time to get documents legalised before applying.",
  ],
  notFor: [
    "Anyone under 50.",
    "Someone already in Thailand. The O-A is issued only by Thai missions abroad.",
    "A retiree who cannot get or afford qualifying health insurance, for example because of age or pre-existing conditions. The Non-O retirement route has no insurance test.",
    "Someone applying in a country where they are neither a national nor a resident.",
    "Anyone who wants to work. O-A status does not allow employment.",
  ],
  steps: [
    {
      title: "Check your mission's O-A page",
      body: "Find the Thai embassy or consulate that covers where you live and read its O-A page. Fees, document formats and whether you apply through thaievisa.go.th or in person differ by mission.",
    },
    {
      title: "Prepare the financial proof",
      body: "Get a bank statement and bank letter for the deposit route, an income certificate for the pension route, or both for a combination. Many missions accept a home-country account at this stage.",
    },
    {
      title: "Order a police certificate",
      body: "Get a criminal record check from your country of nationality or residence. The Hague mission, for example, wants it issued within 3 months and legalised.",
    },
    {
      title: "Get a medical certificate",
      body: "A doctor must certify that you are free of the diseases listed in Thai Ministerial Regulation No. 14 (B.E. 2535). The MFA requires the certificate to be no more than 3 months old.",
    },
    {
      title: "Buy qualifying health insurance",
      body: "Buy a policy that covers your whole stay at the required minimum. A Thai policy from a listed insurer works, or a foreign policy with the insurer's signed Foreign Insurance Certificate.",
    },
    {
      title: "Legalise and translate where asked",
      body: "Some missions want the police and medical certificates notarised and legalised, or apostilled. Book this early, since it can add weeks.",
    },
    {
      title: "Submit and pay",
      body: "Apply online or in person as your mission directs and pay the fee in local currency. Washington, for example, asks you to apply at least 20 working days before you travel.",
    },
    {
      title: "Enter Thailand",
      body: "Each entry while the visa is valid gives you up to one year of stay. Enter just before the visa expires and you can get close to two years before your first extension.",
    },
    {
      title: "Report every 90 days and file TM.30",
      body: "File 90-day reports while you stay, and make sure your address has a TM.30 notice on record.",
    },
    {
      title: "Extend in Thailand each year",
      body: "Before your permission ends, file a one-year extension at immigration with the funds evidence, a valid health policy at the required level and the 1,900 THB fee. Buy a re-entry permit for trips once you are on an extension.",
    },
  ],
  costs: [
    { item: "O-A visa fee (multiple entry)", amount: "5,000 THB", note: "MFA figure. Missions charge in local currency: Washington lists 200 USD." },
    { item: "Health insurance", amount: "Varies", note: "Depends on age, cover and insurer. Must meet the minimum for the whole stay." },
    { item: "Police and medical certificates", amount: "Varies", note: "Set by your police authority and doctor. Legalisation or apostille adds its own fees." },
    { item: "One-year extension in Thailand", amount: "1,900 THB", note: "From the second year." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Needed for trips once you are on an extension of stay." },
    { item: "90-day report", amount: "Free", note: "A late report is commonly fined 2,000 THB." },
  ],
  mistakes: [
    "Buying an old-style policy with 400,000 THB inpatient and 40,000 THB outpatient cover. That split is outdated for new O-A applications, which need the single overall minimum.",
    "Sending a foreign policy without the insurer's completed, signed and stamped Foreign Insurance Certificate.",
    "Insurance that ends before the stay does. The policy must cover the whole period you are granted.",
    "Ordering the police and medical certificates too early. Many missions want them under 3 months old on the day you apply.",
    "Skipping legalisation or apostille where the mission asks for it, which sends the file back.",
    "Applying in a country where you have no nationality or residence.",
    "Assuming the insurance rule ends after the first year. Secondary sources citing Immigration Order 12/2568 report it applies at each extension for people who entered on an O-A.",
  ],
  sections: [
    {
      id: "o-a-insurance-certificate",
      heading: "What health insurance does the O-A visa need?",
      body: `
You need medical cover at the minimum shown in the rules table on this page, valid for your whole stay. It must be one overall limit. The old split of 400,000 THB inpatient and 40,000 THB outpatient applied to some renewals before September 2022 and is outdated for new applications.

You have two ways to prove it:

| Route | What you submit |
|---|---|
| Thai insurer | A policy from a company on the Thai General Insurance Association (TGIA) long-stay list. The insurer issues a visa-compliant certificate. |
| Foreign insurer | The Foreign Insurance Certificate form from longstay.tgia.org, completed, signed and stamped by your insurer. Some missions also want the full policy. |

Check three things before you buy:

- The certificate states the cover amount and the period, and the period covers the whole stay.
- Your name and passport number match the passport you apply with.
- The policy is not limited to emergencies abroad in a way that excludes treatment in Thailand.

At extensions in Thailand, ThaiLawOnline reports that Immigration Order 12/2568 (23 January 2025) accepts foreign cover only if it is certified by that country's embassy in Thailand or notarised through your own foreign ministry. Some offices may still accept older terms. Ask your office before renewing.
`,
    },
    {
      id: "non-o-or-o-a",
      heading: "Non-O or O-A: which retirement route should I choose?",
      body: `
Both need you to be 50 or over and to meet the same money test. The difference is where you apply and what you carry.

| | O-A | Non-O plus extension |
|---|---|---|
| Where you apply | Thai mission in your home country | Mission abroad, or convert inside Thailand |
| First stay | Up to 1 year per entry | 90 days, then a 1-year extension |
| Health insurance | Required, at application and extensions | Not required |
| Police and medical certificates | Required | Not required for the extension |
| Visa fee | 5,000 THB (MFA) | 2,000 THB (varies by mission) |
| Funds at first application | Often a home bank account | Thai bank account for the extension |

Choose the O-A if you want certainty before you move and insurance is affordable for you. Choose the [Non-O retirement route](/visa-rules/retirement-visa) if insurance is expensive or hard to get, or if you are already in Thailand. Full comparison: [Non-O vs O-A visa](/guides/non-o-vs-o-a-visa).
`,
    },
  ],
  faqs: [
    {
      question: "Can I apply for an O-A visa in Thailand?",
      answer: "No. The O-A is issued only by Thai embassies and consulates abroad, in the country of your nationality or residence. If you are already in Thailand, the Non-O retirement route with an in-country extension is the usual option.",
    },
    {
      question: "Does the O-A insurance have to be from a Thai company?",
      answer: "No. You can use a Thai insurer on the TGIA long-stay list, or a foreign insurer that completes the Foreign Insurance Certificate. At extensions in Thailand, foreign cover may need extra certification, so check with your immigration office.",
    },
    {
      question: "What medical certificate do I need for the O-A visa?",
      answer: "A doctor's certificate showing you are free of the prohibited diseases in Thai Ministerial Regulation No. 14 (B.E. 2535). The MFA requires it to be no more than 3 months old. Some missions ask for it to be legalised.",
    },
    {
      question: "Which police check do I need for the O-A visa?",
      answer: "A criminal record certificate from your country of nationality or residence, for example an FBI check in the US or an ACRO certificate in the UK. Missions often want it issued within 3 months and legalised. Check your mission's page for the exact form.",
    },
    {
      question: "Can I stay almost two years on one O-A visa?",
      answer: "Each entry while the visa is valid gives up to one year. If you re-enter just before the visa expires, you can get another year from that date. After that, you extend in Thailand each year.",
    },
  ],
  sources: [
    { label: "MFA Non-Immigrant O-A requirements", url: "https://www.mfa.go.th/en/page/non-immigrant-visa-o-a?menu=5e1ff71bc4281a00c812e8e2" },
    { label: "MFA O-A (long stay) public service page", url: "https://mfa.go.th/en/publicservice/non-immigrant-visa-o-a-long-stay?cate=5d5bcb4e15e39c30600068d3" },
    { label: "MFA O-A and O-X checklist, 17 March 2024", url: "https://image.mfa.go.th/mfa/0/qcuTAU8W4b/Visa_requirement/Non_Imm_O-A__O-X_2024-03-17.pdf" },
    { label: "Royal Thai Embassy Washington, O-A", url: "https://washingtondc.thaiembassy.org/en/page/non-oa" },
    { label: "Royal Thai Embassy The Hague, O-A", url: "https://hague.thaiembassy.org/th/page/76475-non-immigrant-visa-o-a-(long-stay)" },
    { label: "Royal Thai Consulate-General Chicago, O-A and O-X", url: "https://cgchicago.thaiembassy.org/en/page/visa-oaox" },
    { label: "TGIA long-stay health insurance guidelines (O-A)", url: "https://longstay.tgia.org/guidelineoa" },
    { label: "TGIA Foreign Insurance Certificate form", url: "https://longstay.tgia.org/document/overseas_insurance_certificate.pdf" },
    { label: "Bangkok Immigration, extension of stay", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
    { label: "Bangkok Immigration, re-entry permit fees", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
    { label: "Reported by ThaiLawOnline: O-A insurance under Order 12/2568", url: "https://www.thailawonline.com/glossary/retirement-visa/" },
  ],
  updated: "2026-11-04",
  related: ["non-o-vs-o-a-visa", "retirement-visa-800k-bank-rules", "90-day-report-thailand", "how-to-stay-in-thailand-long-term"],
};
