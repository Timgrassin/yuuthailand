import type { Guide } from "../types";

export const guide: Guide = {
  slug: "dtv-vs-ed-visa",
  kind: "comparison",
  eyebrow: "Comparison",
  title: "DTV vs ED visa: which one should you get for a long stay in Thailand?",
  metaTitle: "DTV vs ED visa (2026): cost, work, stay and paperwork",
  description: "DTV or education visa? Compare savings, stay length, remote work, attendance checks and yearly paperwork side by side, with official sources.",
  answer:
    "Choose the DTV if you work remotely for foreign clients and can show 500,000 THB: it lasts 5 years with 180-day stays and needs no school. Choose the ED visa if you genuinely want to study Thai or Muay Thai at an approved school, have less savings, and accept attendance checks and 90-day extensions.",
  tracks: ["dtv", "ed"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "DTV savings", value: "500,000 THB", note: "held for about 3 months" },
    { label: "ED savings", value: "No fixed test", note: "plus course fees" },
    { label: "DTV stay", value: "180 days", note: "per entry, extendable once" },
    { label: "ED stay", value: "90 days", note: "extended in 90-day blocks" },
  ],
  sections: [
    {
      id: "side-by-side",
      heading: "DTV vs ED visa at a glance",
      body: `
| | Destination Thailand Visa (DTV) | Education visa (Non-ED) |
|---|---|---|
| Who it is for | Remote workers, freelancers, soft-power activities (Muay Thai, cooking, medical treatment) | Students at Ministry of Education approved schools and universities |
| Money test | 500,000 THB in savings | No fixed amount; embassies may ask for a bank statement |
| Upfront cost | 10,000 THB visa fee | Course fees, typically paid for 6 to 12 months, plus about 2,000 THB visa fee |
| Validity | 5 years, multiple entry | Tied to your course |
| Stay per entry | 180 days, extendable once by 180 days | 90 days, extended in 90-day blocks while enrolled |
| Remote work for foreign clients | Yes, that is its purpose | No |
| Attendance checks | None | Yes, at extensions; Thai-language tests are reported at some offices |
| 90-day reporting | Yes if you stay 90+ days in a row | Yes |
| Apply from | Your country of nationality or residence (since 31 Aug 2026) | Any Thai mission or in country, depending on your entry status |

All thresholds come from the [DTV rules](/visa-rules/dtv) and [ED rules](/visa-rules/education-visa) pages, where every value links to its official source.
`,
    },
    {
      id: "choose-dtv",
      heading: "Choose the DTV if",
      body: `
- You earn from outside Thailand and want to work legally from a laptop.
- You can show **500,000 THB** in a bank statement covering roughly the last three months.
- You want to come and go: five years of 180-day stays, with one extension per entry.
- You do not want weekly classes or attendance checks.

The DTV is also the route for **Muay Thai and other soft-power activities**. You enrol with a camp or course that can issue the right letter, and you do not need the remote-work proof.
`,
    },
    {
      id: "choose-ed",
      heading: "Choose the ED visa if",
      body: `
- You actually want to learn Thai, or study at a university or accredited course.
- You cannot show 500,000 THB, but can pay a course upfront.
- You are happy to attend classes and pass checks when you extend.

Language-school ED visas are under closer scrutiny than a few years ago. Officers check attendance at extensions, and some offices test basic Thai. A school that promises "no need to attend" is a red flag: see how Staylong [verifies schools](/how-we-verify).
`,
    },
    {
      id: "cost-over-a-year",
      heading: "What each costs over a year",
      body: `
For a one-year stay, the **DTV** costs the 10,000 THB visa fee plus 1,900 THB for each in-country extension. The 500,000 THB is not spent; it only needs to be shown.

The **ED visa** costs the course itself, plus the visa fee and a 1,900 THB fee for each 90-day extension. Over a year that is three or four extensions on top of tuition.

If the money test is the only thing stopping you from the DTV, compare the total ED cost (course plus extensions) against parking 500,000 THB for three months.
`,
    },
    {
      id: "switching",
      heading: "Can you switch from an ED visa to a DTV?",
      body: `
Yes, but you apply for the DTV as a new visa, at a Thai mission in your country of nationality or residence since the **31 August 2026** change. You cannot convert an ED visa to a DTV at an immigration office in Thailand. Plan the move around the end of your course and a trip home.
`,
    },
  ],
  faqs: [
    { question: "Can I study Thai on a DTV?", answer: "Yes, you can take classes while on a DTV. But a Thai-language course on its own is not the usual basis for a DTV; the soft-power category covers activities such as Muay Thai and cooking. If studying is your reason for staying, the ED visa is the intended route." },
    { question: "Can I work remotely on an ED visa?", answer: "No. The ED visa is for study. Working, including remote work for foreign clients, is not what it permits. Remote work is exactly what the DTV is designed for." },
    { question: "Which is cheaper, the DTV or the ED visa?", answer: "The DTV has a 10,000 THB fee but requires you to show 500,000 THB in savings. The ED visa has a lower visa fee and no fixed savings test, but you pay tuition and an extension fee every 90 days. If you can show the savings, the DTV usually costs less over a year." },
    { question: "Do both visas need 90-day reporting?", answer: "Yes. Both require a 90-day address report if you stay in Thailand for more than 90 days in a row." },
  ],
  sources: [
    { label: "MFA DTV checklist", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf" },
    { label: "MFA new visa measures, 29 May 2024", url: "https://image.mfa.go.th/mfa/0/tDJBi9m15g/New_Measures_as_of_29_May_2024_-_1850_1.pdf" },
    { label: "MFA Non-Immigrant ED requirements", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/NON-IMMIGRANT_VISA_(ED)_FOR_EDUCATION_-_To_study_or_take_academic_course_in_Thailand-newL.pdf" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
  ],
  related: [],
  confidence: "medium",
};
