import type { Guide } from "../types";

export const guide: Guide = {
  slug: "dtv-rejected-reasons",
  kind: "guide",
  eyebrow: "Guide",
  title: "DTV visa rejected? The common reasons and how to fix each one",
  metaTitle: "DTV visa rejected: 7 common reasons and how to fix them",
  description:
    "DTV visa rejected? Common refusal reasons: funds statement, remote-work proof, soft-power letter, wrong mission, police certificate age and documents.",
  answer:
    "Most DTV refusals come down to paperwork. Typical reasons: a bank statement that does not show 500,000 THB held for about three months, weak proof of remote work, a soft-power letter that is not specific, or since 31 August 2026, the wrong mission or an out-of-date police certificate. Fix the gap, then reapply at the right mission.",
  tracks: ["dtv"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "Funds", value: "500,000 THB", note: "statement covering about 3 months" },
    { label: "Visa fee", value: "10,000 THB", note: "reported non-refundable" },
    { label: "Police certificate", value: "Required since 31 Aug 2026", note: "age limit set by each mission" },
    { label: "Where to apply", value: "Nationality or permanent residence", note: "since 31 Aug 2026" },
  ],
  sections: [
    {
      id: "why-refused",
      heading: "Why do DTV applications get rejected?",
      body: `
Thai missions do not have to explain a refusal, and most give no detail. The reasons below come from mission checklists plus patterns reported by applicants and agencies. We tie each one to the rule it breaks.

| Reason | Rule behind it | Fix in one line |
|---|---|---|
| Funds too new, too low or wrong format | 500,000 THB, statement for about 3 months | Wait until the balance has sat for the full period |
| Weak remote-work proof | Remote work for foreign employer or clients | Contract or employer letter plus income evidence |
| Vague soft-power letter | Enrolment in a qualifying activity | Letter naming course, dates, hours and provider registration |
| Wrong mission | Apply where you are a national or permanent resident (from 31 Aug 2026) | Apply at your home or residence mission |
| Police certificate too old or wrong type | Criminal record certificate (from 31 Aug 2026) | Get the type and age your mission names |
| Photo, translation or scan problems | Mission document standards | Re-scan, translate, follow the mission's format |

The official thresholds live on the [DTV rules page](/visa-rules/dtv).
`,
    },
    {
      id: "funds",
      heading: "Was my bank statement the reason my DTV was refused?",
      body: `
It is the most reported reason. The MFA checklist asks for at least **500,000 THB** in funds. Most missions want a statement covering roughly the **last 3 months**. Rules vary by mission:

- **Washington** lists a balance of at least 500,000 THB (about USD 16,000) for **each month**.
- **Budapest** asks for a **6-month** official statement and rejects crypto and investment statements.
- **Singapore** accepts only Singapore and Thai savings account statements. Investment and CPF accounts do not count.

**Common mistakes:**

- A large deposit made just before applying.
- A balance that dips below the threshold during the period.
- Crypto, brokerage or retirement accounts as the main proof.
- A screenshot instead of an official, bank-issued statement.

**Fix:** keep the money in an ordinary bank account in your name for the full period your mission asks for. Then download an official statement close to your submission date.
`,
    },
    {
      id: "remote-work",
      heading: "What remote-work proof does the DTV need?",
      body: `
The workation category is for remote work for a **foreign** employer or foreign clients. "I work online" is not enough.

Strong evidence usually includes:

1. An employment contract or employer letter, saying you can work remotely from Thailand.
2. For freelancers: client contracts, invoices and a portfolio or business registration.
3. Bank entries that show the income arriving.

Some German missions are reported to ask specifically for proof that working from Thailand is permitted. Work for Thai companies or Thai clients does not qualify, because the DTV is not a Thai work permit.
`,
    },
    {
      id: "soft-power",
      heading: "Why was my Muay Thai or soft-power DTV rejected?",
      body: `
The soft-power route needs an enrolment or acceptance letter for an activity such as Muay Thai, Thai cooking or medical treatment. Letters fail when they are generic.

A strong letter states:

- The provider's legal name, address and registration.
- Your name and passport number.
- The course, its start and end dates, and weekly hours.
- Proof that you paid, or the payment terms.

Sources disagree on the minimum course length (6, 9 or 12 months are all claimed) and on whether a Thai-language course alone still qualifies. We could not confirm either from an official source. Ask your mission before you pay a provider. If you mainly want to study Thai, the [education visa](/visa-rules/education-visa) is the intended route: see [DTV vs ED visa](/guides/dtv-vs-ed-visa).
`,
    },
    {
      id: "wrong-mission",
      heading: "Can a DTV be refused for applying at the wrong embassy?",
      body: `
Yes, since **31 August 2026**. You must apply at the mission covering your country of nationality or permanent residence. Vientiane accepts only Lao nationals and permanent residents. Ho Chi Minh City accepts only holders of a Vietnamese residence card.

Hotel bookings, leases and tourist stamps do not prove permanent residence. See [DTV new rules 2026](/guides/dtv-new-rules-august-2026) for what each mission accepts.
`,
    },
    {
      id: "police-certificate",
      heading: "How old can my police certificate be for the DTV?",
      body: `
Each mission sets its own limit:

| Mission | Certificate | Age limit |
|---|---|---|
| London | ACRO or Irish police certificate | Issued within 6 months of submission |
| Los Angeles and Washington | FBI certificate | Issued within 3 months |
| Oslo | Norwegian or Icelandic police certificate | Required for applicants over 20 |

If your mission is not listed, check its DTV page. Order the certificate first, because it can take weeks, and submit while it is still in date.
`,
    },
    {
      id: "documents",
      heading: "Can photos or translations cause a DTV rejection?",
      body: `
Yes. Agencies report refusals or requests for more documents for:

- Documents not in English or Thai with no translation.
- Blurry scans, cropped pages or missing passport pages.
- Photos that do not meet the size or background rules.
- Missing legalisation where the mission requires it. Thailand uses consular legalisation, not the apostille system.

Use the mission's checklist as your file index. Name each upload clearly, for example "bank-statement-jun-aug.pdf". Check every page is readable on a phone screen before you submit. An officer who cannot read a page will usually ask for it again or refuse.
`,
    },
    {
      id: "reapply",
      heading: "What should you do after a DTV rejection?",
      body: `
1. Read the refusal message for any clue about the missing item.
2. Fix that item first: wait out the funds period, get a better letter, or a new police certificate.
3. Reapply at the correct mission with a new fee. The 10,000 THB fee is widely reported as non-refundable.
4. Consider a verified agent if you were refused more than once. Staylong lists [schools and providers with their status](/providers) and explains [how we verify them](/how-we-verify).

Avoid anyone who promises "guaranteed approval" or offers to supply bank statements. Forged documents can lead to a ban.
`,
    },
  ],
  faqs: [
    {
      question: "What is the most common reason for a DTV rejection?",
      answer:
        "Reported most often: funds that do not show 500,000 THB held for the period the mission asks for, usually about three months. Weak proof of remote work is a close second. Since 31 August 2026, applying at the wrong mission is also common.",
    },
    {
      question: "Can I reapply for a DTV after being rejected?",
      answer:
        "Yes. We found no official waiting period. Fix the reason first, then submit a new application with a new fee at the mission covering your nationality or permanent residence.",
    },
    {
      question: "Is the DTV fee refunded if my application is rejected?",
      answer:
        "Reportedly not. Agencies and applicants consistently say the 10,000 THB government fee, or its local equivalent, is not returned after a refusal, and a new application needs a new fee. We found no official statement either way.",
    },
    {
      question: "Can I use crypto or investments as DTV proof of funds?",
      answer:
        "Usually not as main proof. Budapest and Singapore say they do not accept investment statements, and agencies report crypto being refused. Use an ordinary bank account in your name.",
    },
    {
      question: "Does Thai language study count for the DTV soft-power route?",
      answer:
        "Sources disagree, and we found no official confirmation either way. Ask your mission first. If studying Thai is your main reason to stay, the education visa is the intended route.",
    },
  ],
  sources: [
    { label: "MFA DTV checklist", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf" },
    { label: "Royal Thai Embassy Washington: DTV", url: "https://washingtondc.thaiembassy.org/en/page/dtv-visa" },
    { label: "Royal Thai Embassy Budapest: DTV", url: "https://budapest.thaiembassy.org/en/publicservice/destination-thailand-visa-dtv" },
    { label: "Royal Thai Embassy Singapore: DTV spouse and children", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-spouse-and-children-under-20-years-old" },
    { label: "Royal Thai Embassy London: adjustment of DTV supporting documents", url: "https://london.thaiembassy.org/en/content/adjustment-of-supporting-docdtv" },
    { label: "Royal Thai Consulate-General Los Angeles: visa information", url: "https://thaiconsulatela.thaiembassy.org/en/page/visa-information" },
    { label: "Royal Thai Embassy Oslo: DTV", url: "https://oslo.thaiembassy.org/en/page/dtv" },
    { label: "Royal Thai Embassy Vientiane: applying for a visa", url: "https://vientiane.thaiembassy.org/en/page/applying-for-a-visa" },
    { label: "Reported: DTV rejection reasons (thai-visa-services.com)", url: "https://www.thai-visa-services.com/dtv-visa/dtv-rejected-reasons-2026" },
    { label: "Reported: why DTV applications get rejected (Issa Compass)", url: "https://www.issacompass.com/insights/why-did-my-destination-thailand-visa-application-get-rejected" },
  ],
  related: ["dtv-new-rules-august-2026", "dtv-with-family", "dtv-vs-ed-visa"],
  confidence: "medium",
};
