import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "ed",
  intro:
    "The education visa (Non-Immigrant ED) lets you live in Thailand while you study at a school or university approved by the Ministry of Education. It suits people who genuinely want to learn Thai, train in an accredited course or take a degree, and who will turn up to class. You enter for 90 days and extend in blocks while you stay enrolled.",
  whoFor: [
    "A learner who wants to reach real Thai fluency through a year of in-person classes at a licensed language school.",
    "A degree or exchange student admitted to a Thai university.",
    "Someone on a long, accredited vocational course, such as cooking or Muay Thai at a registered school.",
    "A person who cannot show DTV-level savings but can pay a course upfront.",
    "An over-50 who wants to study and does not want the retirement funds test.",
  ],
  notFor: [
    "Anyone who wants a visa without attending class. Attendance is checked and schools report it to immigration.",
    "Remote workers and freelancers. Working, including for foreign clients, is not permitted. The DTV is the route for remote work.",
    "Someone who wants online-only classes. Reported guidance is that online-only programmes cannot sponsor an ED visa.",
    "Someone who travels often and cannot commit to a weekly class timetable.",
    "Someone who would rather not sit a basic Thai test at an extension. Some offices quiz language students.",
  ],
  steps: [
    {
      title: "Choose a licensed school",
      body: "Pick a school that holds a Ministry of Education licence for the course, and ask for proof before you pay. Private language schools are licensed under the Private School Act and supervised by the Office of the Private Education Commission (OPEC).",
    },
    {
      title: "Enrol and pay the course",
      body: "Most language schools sell packages covering several months up to about a year. Get a written breakdown of what the fee covers, because immigration fees are often excluded.",
    },
    {
      title: "Wait for the Ministry approval letter",
      body: "The school registers you with the Ministry of Education and issues an approval letter. Schools report this takes about 2 to 4 weeks.",
    },
    {
      title: "Collect the school document pack",
      body: "Expect an acceptance or enrolment letter signed by an authorised person with a copy of their ID, the school licence, a syllabus and a timetable. Missions also ask for a bank statement and photos.",
    },
    {
      title: "Apply at a Thai mission or convert in Thailand",
      body: "Apply through thaievisa.go.th at your mission abroad. If you are already in Thailand on a visa exemption or tourist visa, some immigration offices let you change status in country, depending on how many days you have left.",
    },
    {
      title: "Enter and start classes",
      body: "The ED visa gives 90 days on entry. Attend from the first week and keep your attendance record, since you will need it at every extension.",
    },
    {
      title: "Extend every 90 days",
      body: "Before each 90-day stay ends, file a TM.7 at immigration with a fresh school letter and attendance record, and pay 1,900 THB. Be ready for questions in basic Thai.",
    },
    {
      title: "File 90-day reports and TM.30",
      body: "Report your address if you stay 90 days in a row without leaving. Check your landlord has filed the TM.30 notice for your address.",
    },
    {
      title: "Get a re-entry permit before trips",
      body: "Leaving Thailand without a re-entry permit cancels your extension of stay. Buy one at immigration or the airport before you fly.",
    },
  ],
  costs: [
    { item: "ED visa fee", amount: "2,000 THB", note: "Based on older official sources. Missions charge in local currency, so it varies." },
    { item: "Tuition", amount: "Set by the school", note: "Compare what is included. Immigration fees are often extra." },
    { item: "Extension of stay (each 90 days)", amount: "1,900 THB", note: "Three or four extensions over a year of study." },
    { item: "Change of visa type in Thailand", amount: "2,000 THB", note: "Reported fee for converting from visa-exempt or tourist status. Not all offices accept it." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Needed to keep your extension when you leave." },
  ],
  mistakes: [
    "Choosing a school because it promises you do not need to attend. Schools report attendance, and immigration cross-checks it at extensions.",
    "Not checking the school's Ministry of Education licence. An unregistered school cannot support an ED visa.",
    "Falling below the school's attendance threshold. Guides most often cite about 80% of classes, though figures vary.",
    "Signing up for an online-only course and expecting a visa from it.",
    "Taking remote work while on an ED visa. Work is not permitted, and this includes foreign clients.",
    "Leaving Thailand without a re-entry permit and losing the current extension.",
    "Leaving the extension to the last day. School letters can take days to issue, so ask early.",
  ],
  sections: [
    {
      id: "check-school-approved",
      heading: "How do I check a school is Ministry of Education approved?",
      body: `
No official public list of ED-eligible language schools is published in one place. You have to check the school yourself. Ask for these documents before you pay:

| Document | What to check |
|---|---|
| School licence | Issued under the Private School Act, showing the school name and address you will attend |
| Course approval | The course you buy is the course on the licence, not a different programme |
| Ministry approval letter for you | Issued after enrolment, in your name, about 2 to 4 weeks later |
| Signed enrolment letter | Signed by an authorised person, with a copy of their ID card or passport |

Red flags:

- The school sells "visa only" packages or says attendance is optional.
- It cannot show a licence, or the address on the licence is a different branch.
- It will only teach online.
- It quotes a "100% approval rate". Approval is decided by the mission and immigration, not the school.

If a school loses its registration, immigration reportedly gives students about 30 days to move to another registered school or leave Thailand. Choosing a well-established school protects you from that.

Staylong has not yet verified the schools it lists, so ask each school for its licence yourself. Every listing shows its status. See [schools and providers](/providers) and [how we verify](/how-we-verify).
`,
    },
    {
      id: "attendance-and-thai-test",
      heading: "What are the ED visa attendance rules?",
      body: `
Schools running non-degree courses report monthly enrolment and attendance, and immigration cross-checks it, under rules reported from 2025. Enforcement has risen: secondary sources report thousands of ED visas cancelled after attendance checks since 2025.

The exact threshold is not published in an official source Staylong could confirm. Guides cite different measures:

- About 80% of scheduled classes (most often cited).
- A minimum number of class hours per week, from 4 to 8, depending on the source.

Some immigration offices also ask language students simple questions in Thai at the extension. Treat the course as real study and the test is not a problem. Keep your timetable, attendance sheet and textbook with you on extension day.
`,
    },
    {
      id: "ed-or-dtv",
      heading: "Should I get an ED visa or a DTV?",
      body: `
If you can show the DTV savings and you work remotely, the DTV usually costs less over a year and has no attendance checks. If you want to learn Thai, lack the savings, and will attend class, the ED visa is the honest fit.

Remote work on an ED visa is not allowed. If that is your plan, choose the DTV. Read the full comparison in [DTV vs ED visa](/guides/dtv-vs-ed-visa).
`,
    },
  ],
  faqs: [
    {
      question: "Is there an age limit for the ED visa?",
      answer: "No official upper age limit applies to the education visa. Over-50s can study on it, though officers may ask why you are not using the retirement route. If you qualify for retirement, compare both on the [retirement visa page](/visa-rules/retirement-visa).",
    },
    {
      question: "Can I get an ED visa for online classes?",
      answer: "Reported guidance is that online-only programmes cannot sponsor an ED visa. You must attend in person at the licensed school. Attendance is reported to immigration.",
    },
    {
      question: "How long can I stay in Thailand on a language-school ED visa?",
      answer: "You enter for 90 days and extend in 90-day blocks while you stay enrolled and attend. How many years a language student can continue is not set in an official source Staylong could confirm. Each extension is at the officer's discretion.",
    },
    {
      question: "Do I have to take a Thai test at immigration?",
      answer: "Some offices ask language students basic questions in Thai at extensions. It is not a formal published exam. Regular attendance is the best preparation.",
    },
    {
      question: "Can I change schools on an ED visa?",
      answer: "Yes, but your permission to stay is tied to your school. You need a new enrolment and Ministry approval from the new school, and you should tell immigration. Ask both schools to plan the switch before your current extension ends.",
    },
  ],
  sources: [
    { label: "MFA Non-Immigrant ED requirements", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/NON-IMMIGRANT_VISA_(ED)_FOR_EDUCATION_-_To_study_or_take_academic_course_in_Thailand-newL.pdf" },
    { label: "Immigration Bureau, Non-ED extension (2022)", url: "https://www.immigration.go.th/wp-content/uploads/2022/02/3.FOR-EDUCATION-NON-ED.pdf" },
    { label: "Royal Thai Embassy London, education visa", url: "https://london.thaiembassy.org/en/page/education-visa" },
    { label: "Royal Thai Consulate-General Los Angeles, Non-Immigrant ED", url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/non-immigrant-type-ed-to-study" },
    { label: "Bangkok Immigration, re-entry permit fees", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
    { label: "Reported by The Thaiger: education visa rules and extensions", url: "https://thethaiger.com/visas/education/" },
    { label: "Reported by ThaiLawOnline: ED visa rules 2026", url: "https://www.thailawonline.com/student-visa-in-thailand/" },
  ],
  updated: "2026-11-04",
  related: ["dtv-vs-ed-visa", "90-day-report-thailand", "thailand-visa-exemption-30-days", "how-to-stay-in-thailand-long-term"],
};
