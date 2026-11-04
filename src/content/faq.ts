// FAQ hub content. Facts follow docs/editorial-brief.md and supabase/seed-data/visa-rules.json.
// Answers are short and self-contained for quoting. Last researched 4 November 2026.

export type FaqCategory = "basics" | "dtv" | "education" | "retirement" | "ltr-privilege" | "family-work" | "admin" | "money-tax" | "life" | "scams-safety";

export type FaqItem = { id: string; category: FaqCategory; question: string; answer: string; link: string | null; popular?: boolean };

export const FAQ_CATEGORIES: { id: FaqCategory; title: string; intro: string }[] = [
  { id: "basics", title: "Basics: staying long term", intro: "How long you can stay without a visa, how to extend, what overstaying costs, and which long-stay routes exist." },
  { id: "dtv", title: "Destination Thailand Visa (DTV)", intro: "The 5-year DTV for remote workers and soft-power activities such as Muay Thai: money, documents, extensions and the 2026 rules." },
  { id: "education", title: "Education visa (ED) and schools", intro: "Studying Thai, Muay Thai or a degree on an ED visa: costs, attendance, extensions and how to check a school." },
  { id: "retirement", title: "Retirement visas (Non-O and O-A)", intro: "Retiring in Thailand at 50+: the 800,000 THB and 65,000 THB rules, insurance, Non-O versus O-A, and yearly extensions." },
  { id: "ltr-privilege", title: "LTR and Thailand Privilege", intro: "The 10-year Long-Term Resident visa and the paid Thailand Privilege (Elite) membership: who qualifies, what it costs, and how they compare." },
  { id: "family-work", title: "Family, marriage and work", intro: "Marriage and family visas, dependants, the Non-B work visa, work permits and permanent residence." },
  { id: "admin", title: "Admin: reports, permits and extensions", intro: "90-day reports, TM30, re-entry permits, the TDAC arrival card, extension fees and immigration offices." },
  { id: "money-tax", title: "Money and tax", intro: "Thai bank accounts, moving money, tax residency, the 2024 remittance rule and the cost of living." },
  { id: "life", title: "Daily life", intro: "Renting, buying a condo, healthcare and insurance, driving licences, schools and choosing a city." },
  { id: "scams-safety", title: "Scams and safety", intro: "Visa agent scams, fake schools and lookalike government sites, and what to do if something goes wrong." },
];

export const FAQ: FaqItem[] = [
  {
    id: "how-can-i-stay-in-thailand-long-term",
    category: "basics",
    question: "How can I stay in Thailand long term?",
    answer:
      "Get a long-stay visa that matches your profile. Remote workers use the DTV (180 days per entry), people aged 50+ use the retirement visa (one year, renewable), students use the ED visa, and spouses of Thais use the marriage visa. Thailand Privilege sells 5 to 20 years for a one-off fee.",
    link: "/guides/how-to-stay-in-thailand-long-term",
    popular: true,
  },
  {
    id: "what-is-the-easiest-visa-to-live-in-thailand-for-a-year",
    category: "basics",
    question: "What is the easiest visa to live in Thailand for a year?",
    answer:
      "It depends on your age and money. At 50+ with 800,000 THB, the retirement visa gives one year at a time. With 500,000 THB and remote income, the DTV gives 180 days per entry plus one 180-day extension. Without either, a genuine ED visa or Thailand Privilege are the usual options.",
    link: "/checker",
  },
  {
    id: "how-long-can-i-stay-in-thailand-without-a-visa",
    category: "basics",
    question: "How long can I stay in Thailand without a visa?",
    answer:
      "Since 15 September 2026, tourists from 60 countries and territories, including the US, UK, Australia and the EU, get 30 days visa-free. It was 60 days before that date. You can extend once by up to 30 days at an immigration office.",
    link: "/guides/thailand-visa-exemption-30-days",
    popular: true,
  },
  {
    id: "is-the-thailand-visa-exemption-30-or-60-days",
    category: "basics",
    question: "Is the Thailand visa exemption 30 or 60 days?",
    answer:
      "It is 30 days for entries from 15 September 2026. The 60-day exemption ended on 14 September 2026, after four Interior Ministry announcements were published in the Royal Gazette on 31 August 2026. People who entered before the change keep the stay stamped in their passport.",
    link: "/guides/thailand-visa-exemption-30-days",
  },
  {
    id: "can-i-extend-my-30-day-visa-exemption",
    category: "basics",
    question: "Can I extend my 30-day visa exemption?",
    answer:
      "Yes, once, by up to 30 days, at an immigration office in Thailand before your stamp expires. Approval is at the officer's discretion. The fee is widely reported as 1,900 THB. That gives a maximum of about 60 days on one entry.",
    link: "/tools/visa-exemption-calculator",
    popular: true,
  },
  {
    id: "how-many-times-can-i-enter-thailand-by-land-without-a-visa",
    category: "basics",
    question: "How many times can I enter Thailand by land without a visa?",
    answer:
      "Twice per calendar year for most nationalities on the 30-day exemption, from 15 September 2026. Nationals of Malaysia, Brunei, Indonesia and Singapore are not subject to the limit. Air arrivals are not capped the same way, but officers can still question frequent entries.",
    link: "/guides/thailand-visa-exemption-30-days",
  },
  {
    id: "can-i-do-border-runs-to-live-in-thailand",
    category: "basics",
    question: "Can I do border runs to live in Thailand?",
    answer:
      "Not reliably. Since 15 September 2026 each visa-exempt entry gives 30 days, land entries are capped at two a year, and officers can refuse entry if you appear to be living in Thailand on exemptions. For stays of several months, get a DTV, ED, retirement or marriage visa.",
    link: "/guides/thailand-visa-exemption-30-days",
  },
  {
    id: "do-i-need-an-onward-ticket-to-enter-thailand",
    category: "basics",
    question: "Do I need an onward ticket to enter Thailand?",
    answer:
      "Airlines and immigration can ask visa-exempt travellers for proof of onward travel and funds, and checks vary by airline and officer. If you hold a long-stay visa such as a DTV or O-A, the visa itself shows your permitted stay. Carry a booking you can show if asked.",
    link: "/guides/thailand-visa-exemption-30-days",
  },
  {
    id: "what-is-the-overstay-fine-in-thailand",
    category: "basics",
    question: "What is the overstay fine in Thailand?",
    answer:
      "500 THB per day, capped at 20,000 THB, according to Royal Thai Embassy guidance. The cap is reached at about 40 days. You pay at an immigration office or at the airport when you leave. Overstays beyond 90 days, or being arrested, can also bring a re-entry ban.",
    link: "/tools/overstay-fine-calculator",
    popular: true,
  },
  {
    id: "will-i-be-banned-from-thailand-if-i-overstay",
    category: "basics",
    question: "Will I be banned from Thailand if I overstay?",
    answer:
      "Under the rules embassies publish, surrendering after more than 90 days of overstay brings a 1-year ban, rising to 3, 5 and 10 years for longer overstays. If you are arrested instead, the ban is reported as 5 years for under 1 year of overstay and 10 years beyond that.",
    link: "/tools/overstay-fine-calculator",
  },
  {
    id: "is-a-one-day-overstay-a-problem-in-thailand",
    category: "basics",
    question: "Is a one-day overstay a problem in Thailand?",
    answer:
      "A short overstay usually means a 500 THB per day fine paid at departure. The Royal Thai Embassy in Washington says that if you pay and leave, you can return later without a black mark. It still goes on your record, so avoid it, and never overstay while living here.",
    link: "/tools/overstay-fine-calculator",
  },
  {
    id: "can-i-change-from-a-tourist-entry-to-a-long-stay-visa-inside-thailand",
    category: "basics",
    question: "Can I change from a tourist entry to a long-stay visa inside Thailand?",
    answer:
      "Sometimes. Many immigration offices accept a change to a Non-O visa on form TM.87 while you still have time left on your stay, with a 2,000 THB fee widely reported. The DTV cannot be issued inside Thailand. With only 30 days on the exemption, apply early or get the visa before you fly.",
    link: "/guides/non-o-vs-o-a-visa",
  },
  {
    id: "which-thai-visa-lets-me-work-remotely",
    category: "basics",
    question: "Which Thai visa lets me work remotely?",
    answer:
      "The DTV is built for remote work for a foreign employer or foreign clients. The LTR Work-from-Thailand category also allows it for staff of large overseas companies. Tourist entries, ED, retirement and Privilege visas are not designed for work, and Thai clients or employers need a work permit.",
    link: "/visa-rules/dtv",
  },
  {
    id: "do-i-need-a-visa-to-retire-in-thailand",
    category: "basics",
    question: "Do I need a visa to retire in Thailand?",
    answer:
      "Yes. Visa-exempt entry gives only 30 days. Retirees usually hold a Non-O retirement visa extended yearly, an O-A visa applied for abroad, the LTR Wealthy Pensioner visa or a Thailand Privilege membership. The Non-O and O-A routes need you to be 50+ and show 800,000 THB or 65,000 THB a month.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "what-changed-in-thai-visa-rules-in-2026",
    category: "basics",
    question: "What changed in Thai visa rules in 2026?",
    answer:
      "Two big changes. From 31 August 2026, DTV applicants must apply in their country of nationality or permanent residence and provide a criminal record certificate. From 15 September 2026, the visa exemption fell from 60 to 30 days, with land entries capped at two a year.",
    link: "/guides/thailand-visa-changes-2026",
  },
  {
    id: "what-is-the-dtv-visa",
    category: "dtv",
    question: "What is the DTV visa?",
    answer:
      "The Destination Thailand Visa (DTV) is a 5-year multiple-entry visa launched on 15 July 2024. Each entry gives up to 180 days, extendable once by 180 days in Thailand. It is for remote workers with foreign income and people joining soft-power activities such as Muay Thai, and needs 500,000 THB in funds.",
    link: "/visa-rules/dtv",
    popular: true,
  },
  {
    id: "how-much-money-do-i-need-for-a-dtv",
    category: "dtv",
    question: "How much money do I need for a DTV?",
    answer:
      "At least 500,000 THB, or the local equivalent, in a bank account in your name. Most missions want a statement covering about the last 3 months, and exact rules vary by embassy. Investment statements and crypto are usually not accepted as the main proof.",
    link: "/visa-rules/dtv",
    popular: true,
  },
  {
    id: "how-much-does-the-dtv-visa-cost",
    category: "dtv",
    question: "How much does the DTV visa cost?",
    answer:
      "The base fee is 10,000 THB, and missions abroad charge a local-currency equivalent that can differ. The one in-country extension of 180 days costs the standard 1,900 THB immigration fee. The visa fee is reportedly not refunded if your application is refused.",
    link: "/visa-rules/dtv",
  },
  {
    id: "can-i-work-remotely-on-a-dtv",
    category: "dtv",
    question: "Can I work remotely on a DTV?",
    answer:
      "Yes, for a foreign employer or foreign clients. That is the main purpose of the workcation category. You may not work for a Thai employer or sell services to the Thai market without a work permit. If you stay 180 days or more in a year, Thai tax residency rules also apply.",
    link: "/visa-rules/dtv",
    popular: true,
  },
  {
    id: "how-long-can-i-stay-in-thailand-on-a-dtv",
    category: "dtv",
    question: "How long can I stay in Thailand on a DTV?",
    answer:
      "Up to 180 days per entry, and you can extend each entry once by up to 180 days at immigration, at the officer's discretion. That allows close to a year per entry. The visa is valid for 5 years with multiple entries, so you can leave and come back for a fresh 180 days.",
    link: "/visa-rules/dtv",
  },
  {
    id: "can-i-extend-my-dtv-inside-thailand",
    category: "dtv",
    question: "Can I extend my DTV inside Thailand?",
    answer:
      "Yes, once per entry, by up to 180 days, at an immigration office before your current stay ends. The fee is the standard 1,900 THB. Bring your passport, form TM.7, a photo and proof you still meet the DTV purpose. A second extension on the same entry is not available.",
    link: "/visa-rules/dtv",
  },
  {
    id: "can-i-apply-for-a-dtv-in-a-neighbouring-country",
    category: "dtv",
    question: "Can I apply for a DTV in a neighbouring country?",
    answer:
      "Only if you are a national or permanent resident there. Since 31 August 2026 you must apply at the Thai mission covering your country of nationality or permanent residence. Vientiane and Ho Chi Minh City have confirmed this, so third-country DTV runs no longer work for most people.",
    link: "/guides/dtv-new-rules-august-2026",
    popular: true,
  },
  {
    id: "do-i-need-a-police-clearance-for-the-dtv",
    category: "dtv",
    question: "Do I need a police clearance for the DTV?",
    answer:
      "Yes, for applications submitted from 31 August 2026. Each mission sets its own age limit for the certificate. London asks for one issued within 6 months, and US missions want an FBI check issued within 3 months. Applications submitted before that date follow the old rules.",
    link: "/guides/dtv-new-rules-august-2026",
  },
  {
    id: "can-i-apply-for-a-dtv-from-inside-thailand",
    category: "dtv",
    question: "Can I apply for a DTV from inside Thailand?",
    answer:
      "No. The DTV is issued by Thai missions abroad through the official e-Visa system at thaievisa.go.th. Since 31 August 2026 the mission must cover your country of nationality or permanent residence, so you normally apply from home before you travel.",
    link: "/guides/dtv-new-rules-august-2026",
  },
  {
    id: "what-documents-do-i-need-for-a-dtv",
    category: "dtv",
    question: "What documents do I need for a DTV?",
    answer:
      "A passport valid at least 6 months, a bank statement showing 500,000 THB for about 3 months, and proof of remote work or a soft-power enrolment letter. Since 31 August 2026 you also need a criminal record certificate and proof of nationality or residence for the mission. Missions may add more.",
    link: "/tools/dtv-document-checklist",
  },
  {
    id: "why-do-dtv-applications-get-rejected",
    category: "dtv",
    question: "Why do DTV applications get rejected?",
    answer:
      "Reported most often: funds that do not show 500,000 THB held for about three months, and weak proof of remote work. Since 31 August 2026, applying at the wrong mission or with an out-of-date police certificate is also common. Fix the gap and reapply with a new fee.",
    link: "/guides/dtv-rejected-reasons",
  },
  {
    id: "can-i-reapply-for-a-dtv-after-a-rejection",
    category: "dtv",
    question: "Can I reapply for a DTV after a rejection?",
    answer:
      "Yes. We found no official waiting period. Fix the reason for refusal first, then submit a new application with a new fee at the mission covering your nationality or permanent residence. The 10,000 THB fee from the refused application is reportedly not returned.",
    link: "/guides/dtv-rejected-reasons",
  },
  {
    id: "can-i-get-a-dtv-through-muay-thai-training",
    category: "dtv",
    question: "Can I get a DTV through Muay Thai training?",
    answer:
      "Yes, through the soft-power category. You need an enrolment letter from a Muay Thai gym the mission accepts, plus the 500,000 THB funds test. A course of about 6 months is widely reported as the minimum, and some missions are reported to want 9 months or longer.",
    link: "/visa-rules/dtv",
    popular: true,
  },
  {
    id: "how-long-must-a-muay-thai-course-be-for-a-dtv",
    category: "dtv",
    question: "How long must a Muay Thai course be for a DTV?",
    answer:
      "There is no single official figure. About 6 months is the most widely reported minimum, matching one 180-day entry, and some embassies are reported to ask for 9 months or a year. Check your mission's DTV page before you pay a gym for a course.",
    link: "/visa-rules/dtv",
  },
  {
    id: "can-my-family-come-with-me-on-a-dtv",
    category: "dtv",
    question: "Can my family come with me on a DTV?",
    answer:
      "Yes. Your legal spouse and children under 20 can apply as dependants. Each person files their own application and pays the 10,000 THB fee. Missions differ on whether each dependant must show 500,000 THB, so plan for funds per person unless your mission confirms otherwise.",
    link: "/guides/dtv-with-family",
  },
  {
    id: "can-my-unmarried-partner-get-a-dtv-as-my-dependant",
    category: "dtv",
    question: "Can my unmarried partner get a DTV as my dependant?",
    answer:
      "No. The DTV dependant route covers a legal spouse and children under 20. An unmarried partner needs their own DTV, with their own 500,000 THB funds and qualifying purpose, or another visa.",
    link: "/guides/dtv-with-family",
  },
  {
    id: "is-there-an-age-limit-for-the-dtv",
    category: "dtv",
    question: "Is there an age limit for the DTV?",
    answer:
      "Several 2026 guides say main applicants must be 20 or older, but the official MFA text only confirms that dependent children must be under 20. Treat the 20-year minimum as reported, not confirmed. There is no upper age limit in the official criteria.",
    link: "/visa-rules/dtv",
  },
  {
    id: "do-i-need-a-90-day-report-on-a-dtv",
    category: "dtv",
    question: "Do I need a 90-day report on a DTV?",
    answer:
      "Only if you stay more than 90 days in a row. Then you report your address on form TM.47 every 90 days. If you leave Thailand and re-enter before day 90, the count resets and no report is due.",
    link: "/tools/90-day-report-calculator",
  },
  {
    id: "is-the-dtv-being-cancelled",
    category: "dtv",
    question: "Is the DTV being cancelled?",
    answer:
      "No cancellation has been announced. The DTV was tightened on 31 August 2026 with the residence and police certificate rules, but its 10,000 THB fee, 500,000 THB funds test, 5-year validity and 180-day stays did not change.",
    link: "/visa-rules/changes",
  },
  {
    id: "dtv-or-ed-visa-which-is-better",
    category: "dtv",
    question: "DTV or ED visa: which is better?",
    answer:
      "For most people with 500,000 THB and remote income, the DTV: 180 days per entry, no classes and remote work allowed. The ED visa suits people who genuinely want to study, have less savings and accept attendance checks and 90-day extensions at 1,900 THB each.",
    link: "/guides/dtv-vs-ed-visa",
    popular: true,
  },
  {
    id: "what-is-the-ed-visa-in-thailand",
    category: "education",
    question: "What is the ED visa in Thailand?",
    answer:
      "The Non-Immigrant ED visa is for study at an approved school or university, including Thai language, Muay Thai and cooking schools. It admits you for 90 days, and language students extend in 90-day blocks while enrolled and attending. It does not allow work.",
    link: "/visa-rules/education-visa",
    popular: true,
  },
  {
    id: "how-much-does-an-ed-visa-cost",
    category: "education",
    question: "How much does an ED visa cost?",
    answer:
      "A single-entry ED visa is about 2,000 THB, with embassy fees varying. Each 90-day extension costs 1,900 THB. Language school packages are reported at roughly 25,000 to 70,000 THB per year, so the school fee is most of the cost.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "can-i-work-on-an-ed-visa",
    category: "education",
    question: "Can I work on an ED visa?",
    answer:
      "No. The ED visa does not permit employment, and it is not designed for remote work either. If you want to work remotely, the DTV is the intended route. Working in Thailand needs a separate visa and a work permit.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "how-do-ed-visa-extensions-work",
    category: "education",
    question: "How do ED visa extensions work?",
    answer:
      "Language students usually extend every 90 days at immigration with a fresh school letter and an attendance record, paying 1,900 THB each time. Degree students can extend for the length of the programme. Officers check attendance, and some offices test basic Thai.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "do-i-have-to-attend-classes-on-an-ed-visa",
    category: "education",
    question: "Do I have to attend classes on an ED visa?",
    answer:
      "Yes. Schools report attendance and immigration cross-checks it at extensions. Falling below the school's attendance threshold can lead to a refused extension. A school that says attendance is optional is selling a visa, not a course.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "can-i-get-an-ed-visa-to-learn-thai",
    category: "education",
    question: "Can I get an ED visa to learn Thai?",
    answer:
      "Yes. Thai language study at a school approved by the Ministry of Education is the most common ED route. Private language schools are licensed under the Private School Act and supervised by the Office of the Private Education Commission (OPEC). Expect a basic Thai check at some extensions.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "can-i-get-an-ed-visa-for-muay-thai",
    category: "education",
    question: "Can I get an ED visa for Muay Thai?",
    answer:
      "Yes, at a Muay Thai school that holds the approvals needed to issue study visas. You then extend while enrolled and attending. Many people now use the DTV soft-power route instead, which gives 180 days per entry but needs 500,000 THB in funds.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "can-i-apply-for-an-ed-visa-inside-thailand",
    category: "education",
    question: "Can I apply for an ED visa inside Thailand?",
    answer:
      "Some immigration offices accept a change to ED status on form TM.87 if you still have time on your current stay and the school supports it, but practice varies by office. Most students apply at a Thai mission abroad through the e-Visa portal with the school's enrolment documents.",
    link: "/visa-rules/education-visa",
  },
  {
    id: "do-ed-visa-holders-need-a-90-day-report",
    category: "education",
    question: "Do ED visa holders need a 90-day report?",
    answer:
      "Yes, for any stay longer than 90 consecutive days. Because language students usually extend every 90 days, the extension often falls near the report date, but they are separate filings on separate forms.",
    link: "/tools/90-day-report-calculator",
  },
  {
    id: "can-i-open-a-bank-account-on-an-ed-visa",
    category: "education",
    question: "Can I open a bank account on an ED visa?",
    answer:
      "Usually more easily than on a DTV. Several 2026 bank guides list the ED among the long-stay visas banks accept, along with Non-B, Non-O and LTR. Branch rules still vary, so bring your school letter and proof of address.",
    link: null,
  },
  {
    id: "how-do-i-check-that-a-thai-language-school-is-real",
    category: "education",
    question: "How do I check that a Thai language school is real?",
    answer:
      "Ask for its OPEC licence or Ministry of Education approval, check its physical address and ask for a class timetable. Visit if you can. A school that sells visa-only packages, says you need not attend or guarantees extensions is a red flag.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "can-my-children-get-student-visas-for-thai-schools",
    category: "education",
    question: "Can my children get student visas for Thai schools?",
    answer:
      "Yes. Children enrolled at a Thai or international school can hold an ED visa on the school's documents. Children of a DTV holder under 20 can instead come as DTV dependants. Check which option your school supports before you apply.",
    link: "/guides/dtv-with-family",
  },
  {
    id: "what-are-the-requirements-for-a-thai-retirement-visa",
    category: "retirement",
    question: "What are the requirements for a Thai retirement visa?",
    answer:
      "You must be 50 or older and show 800,000 THB in a Thai bank, or income of 65,000 THB a month, or a combination totalling 800,000 THB a year. You then renew a one-year extension at immigration each year for 1,900 THB and file 90-day reports.",
    link: "/visa-rules/retirement-visa",
    popular: true,
  },
  {
    id: "how-long-must-the-800-000-baht-stay-in-the-bank",
    category: "retirement",
    question: "How long must the 800,000 baht stay in the bank?",
    answer:
      "Under Bangkok Immigration criteria, the 800,000 THB must sit in a Thai bank for 2 months before you file and stay untouched for 3 months after approval. After that it must never drop below 400,000 THB. Some offices are stricter in practice, so ask yours.",
    link: "/guides/retirement-visa-800k-bank-rules",
    popular: true,
  },
  {
    id: "can-i-use-income-instead-of-800-000-baht",
    category: "retirement",
    question: "Can I use income instead of 800,000 baht?",
    answer:
      "Yes. You can show monthly income of at least 65,000 THB, usually with an embassy income letter or proof of regular transfers from abroad, depending on your nationality and office. You can also combine income and savings to reach 800,000 THB a year.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "can-i-combine-savings-and-income-for-the-retirement-visa",
    category: "retirement",
    question: "Can I combine savings and income for the retirement visa?",
    answer:
      "Yes. A Thai bank deposit plus annual income that together total at least 800,000 THB is accepted. For example, 400,000 THB in the bank plus 400,000 THB of yearly income. Offices differ on the paperwork and how long the deposit must be held.",
    link: "/tools/retirement-800k-planner",
  },
  {
    id: "do-i-need-health-insurance-for-the-retirement-visa",
    category: "retirement",
    question: "Do I need health insurance for the retirement visa?",
    answer:
      "Not for the standard Non-O retirement visa and its yearly extension in Thailand. You do need it for the O-A visa: at least USD 100,000 or 3,000,000 THB of cover for the whole stay. Insurance is still strongly advisable, because private hospital bills can be large.",
    link: "/guides/non-o-vs-o-a-visa",
    popular: true,
  },
  {
    id: "what-is-the-difference-between-non-o-and-o-a",
    category: "retirement",
    question: "What is the difference between Non-O and O-A?",
    answer:
      "The O-A is applied for abroad and gives one year on arrival, but needs health insurance of USD 100,000 or 3,000,000 THB, a police certificate and a medical certificate. The Non-O needs less paperwork and can start in Thailand, but gives 90 days before your first one-year extension.",
    link: "/guides/non-o-vs-o-a-visa",
  },
  {
    id: "how-much-health-insurance-does-the-o-a-visa-need",
    category: "retirement",
    question: "How much health insurance does the O-A visa need?",
    answer:
      "At least USD 100,000 or 3,000,000 THB of cover for the whole stay. The older 40,000 THB outpatient and 400,000 THB inpatient rule is superseded. Immigration Order 12/2568 of 23 January 2025 is reported to apply the same threshold to O-A extensions in Thailand.",
    link: "/visa-rules/o-a-visa",
  },
  {
    id: "how-much-does-a-thai-retirement-visa-cost",
    category: "retirement",
    question: "How much does a Thai retirement visa cost?",
    answer:
      "A single-entry Non-O visa is typically 2,000 THB and a multiple-entry O-A about 5,000 THB, with embassy fees varying. Each one-year extension in Thailand costs 1,900 THB. Add re-entry permits if you travel: 1,000 THB single or 3,800 THB multiple.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "can-i-get-a-retirement-visa-from-inside-thailand",
    category: "retirement",
    question: "Can I get a retirement visa from inside Thailand?",
    answer:
      "Yes, at many offices. You change your status to Non-O on form TM.87 while time remains on your stay, with a 2,000 THB fee widely reported, then apply for the one-year extension. The visa exemption is now 30 days for many passports, so start early.",
    link: "/guides/non-o-vs-o-a-visa",
  },
  {
    id: "can-i-get-a-retirement-visa-without-800-000-baht",
    category: "retirement",
    question: "Can I get a retirement visa without 800,000 baht?",
    answer:
      "Legally, yes, through the income route of 65,000 THB a month or a combination of income and savings totalling 800,000 THB a year. Agent offers that skip the money test usually rely on borrowed funds or forged documents, and the risk falls on you.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "can-i-work-on-a-retirement-visa",
    category: "retirement",
    question: "Can I work on a retirement visa?",
    answer:
      "No. Retirement status does not permit employment in Thailand, paid or unpaid. If you want to work, you need a different visa and a work permit. Remote work on a retirement extension is not a recognised purpose either.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "what-is-the-best-visa-to-retire-in-thailand",
    category: "retirement",
    question: "What is the best visa to retire in Thailand?",
    answer:
      "For most people aged 50+, the Non-O retirement visa with yearly extensions: 800,000 THB or 65,000 THB a month, no insurance needed. The O-A suits people applying from home. The LTR suits pensions of USD 80,000 a year. Privilege suits people who prefer to pay and skip the tests.",
    link: "/guides/non-o-vs-o-a-visa",
  },
  {
    id: "can-my-younger-wife-join-me-on-my-retirement-visa",
    category: "retirement",
    question: "Can my younger wife join me on my retirement visa?",
    answer:
      "A spouse under 50 can usually get a dependant Non-O extension based on your retirement stay, with your marriage certificate and proof you support them. Rules and documents vary by office. If your spouse is Thai, a marriage-based extension may be cheaper, at 400,000 THB.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "which-bank-account-should-i-use-for-the-800-000-baht",
    category: "retirement",
    question: "Which bank account should I use for the 800,000 baht?",
    answer:
      "Many retirees use a Thai savings account, because the bank book shows the balance history clearly. Offices differ on fixed deposit accounts. Ask your immigration office and your bank which account type they accept before you lock the money in.",
    link: "/guides/retirement-visa-800k-bank-rules",
  },
  {
    id: "can-i-use-a-foreign-bank-account-for-the-retirement-extension",
    category: "retirement",
    question: "Can I use a foreign bank account for the retirement extension?",
    answer:
      "No, for the savings route the 800,000 THB must be in a Thai bank in your name. Foreign accounts can support the income route, through an embassy letter or records of transfers from abroad, depending on your office and nationality.",
    link: "/guides/retirement-visa-800k-bank-rules",
  },
  {
    id: "how-much-money-do-i-need-to-retire-in-thailand",
    category: "retirement",
    question: "How much money do I need to retire in Thailand?",
    answer:
      "The visa minimum is 800,000 THB in the bank or 65,000 THB a month. A realistic living budget is reported at about 40,000 to 90,000 THB a month, depending on the city, your housing and your health insurance costs.",
    link: "/tools/long-stay-cost-calculator",
  },
  {
    id: "do-i-need-a-re-entry-permit-on-a-retirement-extension",
    category: "retirement",
    question: "Do I need a re-entry permit on a retirement extension?",
    answer:
      "Yes, if you leave Thailand during your one-year extension. Without one, the extension ends when you exit and you start again. A single permit costs 1,000 THB and a multiple permit 3,800 THB, at an immigration office or the airport.",
    link: "/guides/90-day-report-thailand",
  },
  {
    id: "is-the-retirement-extension-guaranteed-each-year",
    category: "retirement",
    question: "Is the retirement extension guaranteed each year?",
    answer:
      "No. The one-year extension is granted at the officer's discretion each year. You must meet the funds rules every time, including the 400,000 THB floor between renewals, and have your 90-day reports and TM30 in order.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "what-is-the-ltr-visa",
    category: "ltr-privilege",
    question: "What is the LTR visa?",
    answer:
      "The Long-Term Resident (LTR) visa is a 10-year visa run by the Board of Investment, granted as 5 years plus 5 more. It has four categories: Wealthy Global Citizens, Wealthy Pensioners, Work-from-Thailand Professionals and Highly Skilled Professionals. The fee is 50,000 THB when issued in Thailand.",
    link: "/visa-rules/ltr-visa",
    popular: true,
  },
  {
    id: "who-qualifies-for-the-ltr-visa",
    category: "ltr-privilege",
    question: "Who qualifies for the LTR visa?",
    answer:
      "Most categories need personal income of USD 80,000 a year, or USD 40,000 plus extra criteria. Wealthy Pensioners need passive income of USD 80,000 a year, or USD 40,000 plus USD 250,000 invested in Thailand. Wealthy Global Citizens need USD 1 million in assets and USD 500,000 invested.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "does-the-ltr-work-from-thailand-visa-need-usd-80-000-income",
    category: "ltr-privilege",
    question: "Does the LTR Work-from-Thailand visa need USD 80,000 income?",
    answer:
      "Yes, an average of USD 80,000 a year over the last 2 years, or USD 40,000 to 80,000 with a master's degree, your own IP or Series A funding. Your employer must be listed, or a private company running 3+ years with USD 50 million revenue over 3 years.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "did-the-ltr-visa-get-easier-in-2025",
    category: "ltr-privilege",
    question: "Did the LTR visa get easier in 2025?",
    answer:
      "Yes. The Cabinet approved relaxations on 13 January 2025. The income test for Wealthy Global Citizens was dropped, the employer revenue test for Work-from-Thailand fell from USD 150 million to USD 50 million, and the 5-year work-experience rule was removed.",
    link: "/visa-rules/changes",
  },
  {
    id: "do-ltr-holders-do-90-day-reports",
    category: "ltr-privilege",
    question: "Do LTR holders do 90-day reports?",
    answer:
      "No. LTR holders report once a year instead of every 90 days, on form TM.95. That is one of the main practical benefits over other long-stay visas.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "what-health-insurance-does-the-ltr-need",
    category: "ltr-privilege",
    question: "What health insurance does the LTR need?",
    answer:
      "Health insurance of at least USD 50,000 with 10 or more months remaining, or Thai social security coverage, or a USD 100,000 deposit held for at least 12 months.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "does-the-ltr-visa-mean-no-tax-in-thailand",
    category: "ltr-privilege",
    question: "Does the LTR visa mean no tax in Thailand?",
    answer:
      "Not entirely. Wealthy Global Citizens, Wealthy Pensioners and Work-from-Thailand Professionals get an exemption on qualifying foreign income brought into Thailand. Thai-source income is still taxed. Highly Skilled Professionals pay a 17% flat rate on Thai employment income instead.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "can-i-work-on-an-ltr-visa",
    category: "ltr-privilege",
    question: "Can I work on an LTR visa?",
    answer:
      "Highly Skilled Professionals get a digital work permit to work for their Thai employer. Work-from-Thailand Professionals may work remotely for their overseas employer but are not issued a Thai work permit. Pensioners and Wealthy Global Citizens are not work categories.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "what-is-thailand-privilege-thailand-elite",
    category: "ltr-privilege",
    question: "What is Thailand Privilege (Thailand Elite)?",
    answer:
      "Thailand Privilege, formerly Thailand Elite, is a paid membership run by a state-owned company that includes a long-stay visa. You pay a one-off fee, from 650,000 THB for Bronze (5 years) to 5,000,000 THB for Reserve (20 years). There is no income, age or bank balance test.",
    link: "/visa-rules/thailand-privilege",
  },
  {
    id: "how-much-is-the-thailand-privilege-visa",
    category: "ltr-privilege",
    question: "How much is the Thailand Privilege visa?",
    answer:
      "Bronze 650,000 THB for 5 years, Gold 900,000 THB for 5 years, Platinum 1,500,000 THB for 10 years, Diamond 2,500,000 THB for 15 years and Reserve 5,000,000 THB for 20 years, by invitation. Each entry allows a stay of up to one year.",
    link: "/visa-rules/thailand-privilege",
  },
  {
    id: "is-thailand-privilege-worth-it",
    category: "ltr-privilege",
    question: "Is Thailand Privilege worth it?",
    answer:
      "It is worth it if you cannot or do not want to meet income or age tests and will stay several years. If you are 50+ with 800,000 THB, the retirement visa costs far less per year. Bronze works out to 130,000 THB a year, Platinum to 150,000 THB.",
    link: "/guides/ltr-vs-privilege-vs-dtv",
    popular: true,
  },
  {
    id: "when-does-the-thailand-privilege-bronze-tier-end",
    category: "ltr-privilege",
    question: "When does the Thailand Privilege Bronze tier end?",
    answer:
      "Bronze, at 650,000 THB for 5 years, is reported to be open until 31 December 2026. That date comes from sales agents, not a public operator notice, and the deadline has moved four times since launch. Check with the operator before you pay.",
    link: "/guides/thailand-privilege-bronze-deadline",
  },
  {
    id: "can-i-work-on-a-thailand-privilege-visa",
    category: "ltr-privilege",
    question: "Can I work on a Thailand Privilege visa?",
    answer:
      "No. Thailand Privilege is not a work visa. Working in Thailand needs a separate visa and a work permit. The membership also gives no special tax status, so normal tax residency rules apply at 180 days.",
    link: "/visa-rules/thailand-privilege",
  },
  {
    id: "ltr-privilege-or-dtv-which-should-i-choose",
    category: "ltr-privilege",
    question: "LTR, Privilege or DTV: which should I choose?",
    answer:
      "If you clear the income or asset tests, the LTR gives 10 years for 50,000 THB. If you cannot, Privilege sells 5 to 20 years from 650,000 THB with no tests. If you work remotely with 500,000 THB in savings, the DTV costs 10,000 THB for 5 years.",
    link: "/guides/ltr-vs-privilege-vs-dtv",
  },
  {
    id: "what-are-the-marriage-visa-requirements-in-thailand",
    category: "family-work",
    question: "What are the marriage visa requirements in Thailand?",
    answer:
      "You need a legal marriage to a Thai national, registered in Thailand or a registered foreign marriage, plus 400,000 THB in a Thai bank or income of 40,000 THB a month. The one-year extension costs 1,900 THB and is renewed yearly, usually after an interview and sometimes a home visit.",
    link: "/visa-rules/marriage-visa",
    popular: true,
  },
  {
    id: "how-long-must-the-400-000-baht-be-in-the-bank-for-a-marriage-extension",
    category: "family-work",
    question: "How long must the 400,000 baht be in the bank for a marriage extension?",
    answer:
      "At least 2 months before you file, according to most guides. Some offices ask for 3 months at renewals. Keep the money in a Thai account in your own name, and ask your office for its current practice.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "can-i-work-on-a-marriage-visa",
    category: "family-work",
    question: "Can I work on a marriage visa?",
    answer:
      "Yes, with a work permit. Marriage-based stay does not itself allow work, but holders can apply for a work permit with a Thai employer, and employer requirements are often lighter than for other foreigners.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "marriage-visa-or-retirement-visa-if-i-am-over-50-and-married-to-a-thai",
    category: "family-work",
    question: "Marriage visa or retirement visa if I am over 50 and married to a Thai?",
    answer:
      "The marriage route needs half the money, 400,000 THB instead of 800,000 THB, but more paperwork, an interview and sometimes a home visit. The retirement route has simpler documents. Choose based on your savings and how much paperwork you accept.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "can-i-get-a-marriage-visa-if-we-married-abroad",
    category: "family-work",
    question: "Can I get a marriage visa if we married abroad?",
    answer:
      "Yes, if the foreign marriage is registered in Thailand. You usually have it translated and legalised, then registered at a district office (amphur). Immigration expects to see the Thai registration, Kor Ror 22, or the Thai marriage certificate, Kor Ror 3.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "can-i-stay-in-thailand-with-my-thai-child",
    category: "family-work",
    question: "Can I stay in Thailand with my Thai child?",
    answer:
      "Yes. A foreign parent of a Thai child can get a Non-O visa and a one-year extension to support or care for the child. Requirements are close to the marriage extension, including a funds test. Ask your immigration office for its document list.",
    link: "/visa-rules/marriage-visa",
  },
  {
    id: "what-is-the-non-b-visa",
    category: "family-work",
    question: "What is the Non-B visa?",
    answer:
      "The Non-Immigrant B visa is for people hired by a Thai-registered company or running their own Thai company. It gives 90 days to obtain a work permit. With the permit, immigration can extend your stay for one year at a time for 1,900 THB.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "how-do-i-get-a-work-permit-in-thailand",
    category: "family-work",
    question: "How do I get a work permit in Thailand?",
    answer:
      "Your Thai employer applies with you, usually after you enter on a Non-B visa. The employer generally needs 2 million THB paid-up capital per foreign worker for the one-year extension, and the salary threshold depends on nationality, reported at 50,000 THB a month for Western passports.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "can-i-work-in-thailand-without-a-work-permit",
    category: "family-work",
    question: "Can I work in Thailand without a work permit?",
    answer:
      "No. Working for a Thai employer or the Thai market without a permit is illegal and can lead to fines and deportation. Remote work for foreign employers is allowed on the DTV and the LTR Work-from-Thailand category.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "can-i-start-a-business-in-thailand-as-a-foreigner",
    category: "family-work",
    question: "Can I start a business in Thailand as a foreigner?",
    answer:
      "Yes, but foreign ownership is restricted in many sectors. Most small foreign-run businesses use a Thai limited company, and you need a Non-B visa and a work permit to work in it. Get advice from a Thai business lawyer before you invest.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "can-my-family-join-me-on-a-work-visa",
    category: "family-work",
    question: "Can my family join me on a work visa?",
    answer:
      "Yes. A spouse and children can get dependant Non-O visas and extensions linked to your work-based stay, with marriage and birth certificates. Dependants cannot work unless they get their own work permit.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "can-i-teach-english-in-thailand",
    category: "family-work",
    question: "Can I teach English in Thailand?",
    answer:
      "Yes, with a Non-B visa and a work permit arranged by the school. Teaching on a tourist entry, ED visa or DTV is not allowed. Schools usually also ask for a degree, and requirements for teacher licences vary.",
    link: "/visa-rules/work-visa",
  },
  {
    id: "can-i-get-permanent-residence-in-thailand",
    category: "family-work",
    question: "Can I get permanent residence in Thailand?",
    answer:
      "Possibly, after at least 3 consecutive years on yearly extensions based on work, business or a Thai family. Retirement extensions do not count. Places are limited by an annual quota per nationality. A 7,600 THB application fee and a permit fee of 191,400 THB, or 95,700 THB for a Thai spouse, are reported.",
    link: null,
  },
  {
    id: "can-i-get-thai-citizenship",
    category: "family-work",
    question: "Can I get Thai citizenship?",
    answer:
      "Naturalisation is possible but rare and slow. It generally follows years of permanent residence, Thai language ability and other criteria, and spouses of Thai nationals have a separate route. Few long-stay foreigners take this path.",
    link: null,
  },
  {
    id: "what-is-a-90-day-report",
    category: "admin",
    question: "What is a 90-day report?",
    answer:
      "If you stay in Thailand more than 90 days in a row, you must report your address to immigration every 90 days on form TM.47. You can file from 15 days before to 7 days after the due date, online, in person, by mail or through an authorised person.",
    link: "/guides/90-day-report-thailand",
    popular: true,
  },
  {
    id: "what-happens-if-i-miss-my-90-day-report",
    category: "admin",
    question: "What happens if I miss my 90-day report?",
    answer:
      "If you report late yourself, the fine is 2,000 THB. If you are caught without reporting, the Immigration Bureau gives 5,000 THB. File as soon as you can and keep the receipt for your next extension.",
    link: "/tools/90-day-report-calculator",
  },
  {
    id: "can-i-do-the-90-day-report-online",
    category: "admin",
    question: "Can I do the 90-day report online?",
    answer:
      "Yes, through the official system at tm47.immigration.go.th, within the filing window. Many guides advise doing your first report in person. Late reports usually have to be filed at an immigration office.",
    link: "/guides/90-day-report-thailand",
  },
  {
    id: "does-leaving-thailand-reset-the-90-day-report",
    category: "admin",
    question: "Does leaving Thailand reset the 90-day report?",
    answer:
      "Yes. Leaving Thailand and re-entering resets the count, so your next report is due 90 days after your new entry. An extension of stay does not reset the dates. Only exits do.",
    link: "/tools/90-day-report-calculator",
  },
  {
    id: "what-is-tm30",
    category: "admin",
    question: "What is TM30?",
    answer:
      "TM30 is the notice that tells immigration where a foreigner is staying. Under Section 38 of the Immigration Act, the house master, owner or landlord must file it within 24 hours of your arrival. Hotels do it for you. Extensions and 90-day reports can be refused without it.",
    link: "/guides/tm30-thailand",
    popular: true,
  },
  {
    id: "who-files-tm30-me-or-my-landlord",
    category: "admin",
    question: "Who files TM30, me or my landlord?",
    answer:
      "The owner, house master or hotel manager is legally responsible. A late filing can cost them up to 2,000 THB, as reported. Many offices also accept a tenant filing in person with the lease, the owner's ID and the house registration.",
    link: "/guides/tm30-thailand",
  },
  {
    id: "do-i-need-a-new-tm30-after-travelling-abroad",
    category: "admin",
    question: "Do I need a new TM30 after travelling abroad?",
    answer:
      "Many offices expect one, because the law ties the notice to a foreigner arriving at the address. Practice varies by office. Ask yours, and file again after each trip if they require it.",
    link: "/guides/tm30-thailand",
  },
  {
    id: "do-i-need-a-re-entry-permit",
    category: "admin",
    question: "Do I need a re-entry permit?",
    answer:
      "Yes, if you are on an extension of stay or a single-entry visa and plan to leave and come back. Without one, the extension is cancelled when you exit. A single permit costs 1,000 THB and a multiple permit 3,800 THB.",
    link: "/guides/90-day-report-thailand",
    popular: true,
  },
  {
    id: "does-a-dtv-holder-need-a-re-entry-permit",
    category: "admin",
    question: "Does a DTV holder need a re-entry permit?",
    answer:
      "Not for normal travel, because the DTV is a multiple-entry visa and each entry gives a new 180-day stay. If you have extended your stay in Thailand, ask immigration whether you need a permit to keep that extension when you leave.",
    link: "/visa-rules/dtv",
  },
  {
    id: "what-is-the-tdac-and-is-it-mandatory",
    category: "admin",
    question: "What is the TDAC and is it mandatory?",
    answer:
      "The Thailand Digital Arrival Card (TDAC) is the online arrival form every foreign visitor must complete, including long-stay visa holders. Submit it free on tdac.immigration.go.th within 3 days before arrival, counting the arrival day. Other sites that charge a fee are not official.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "how-much-does-a-visa-extension-cost-in-thailand",
    category: "admin",
    question: "How much does a visa extension cost in Thailand?",
    answer:
      "The standard extension of stay fee is 1,900 THB, for retirement, marriage, work, DTV and ED extensions alike. A change of visa type on form TM.87 is widely reported at 2,000 THB. Re-entry permits cost 1,000 THB single or 3,800 THB multiple.",
    link: null,
  },
  {
    id: "what-documents-do-i-need-for-a-one-year-extension",
    category: "admin",
    question: "What documents do I need for a one-year extension?",
    answer:
      "Usually your passport, form TM.7 with a photo, proof of address including TM30, the financial proof for your category and copies of key passport pages. Retirement needs a Thai bank letter or income letter, and marriage needs Thai marriage and family documents. Local offices may ask for more.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "when-should-i-apply-for-my-yearly-extension",
    category: "admin",
    question: "When should I apply for my yearly extension?",
    answer:
      "Most offices commonly accept applications up to 30 days before your current permission ends, and many expats apply early in that window. Check your office, because some accept 45 days. If an extra document is needed, you may be given a follow-up date.",
    link: "/visa-rules/retirement-visa",
  },
  {
    id: "which-immigration-office-do-i-use",
    category: "admin",
    question: "Which immigration office do I use?",
    answer:
      "The office covering the province where you live, such as Chaeng Watthana for Bangkok. You cannot usually choose another province's office. Each office sets its own practices for documents, queues and appointments, so check its page or ask locally.",
    link: null,
  },
  {
    id: "what-is-a-certificate-of-residence-and-how-do-i-get-one",
    category: "admin",
    question: "What is a certificate of residence and how do I get one?",
    answer:
      "It is a letter from immigration confirming your address, often requested for bank accounts and driving licences. You apply at your local immigration office with your passport and TM30 proof. A fee of about 500 THB is reported, and some offices issue it the same day.",
    link: null,
  },
  {
    id: "can-an-agent-do-my-immigration-paperwork",
    category: "admin",
    question: "Can an agent do my immigration paperwork?",
    answer:
      "Yes. Licensed agents can file 90-day reports and help with documents, and you can authorise someone to file a TM.47 for you. For extensions you usually still attend in person. Never let an agent supply bank documents, which is how forgery cases start.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "what-does-under-consideration-mean-on-my-extension",
    category: "admin",
    question: "What does 'under consideration' mean on my extension?",
    answer:
      "Some offices stamp your passport 'under consideration' and give a return date, often about 30 days later, while they check your case. You may stay in Thailand while it is pending. Return on the date given to collect the final stamp.",
    link: null,
  },
  {
    id: "how-do-i-apply-for-a-thai-visa-from-abroad",
    category: "admin",
    question: "How do I apply for a Thai visa from abroad?",
    answer:
      "Through the official Thai e-Visa portal at thaievisa.go.th, which serves most Thai missions. Each embassy and consulate covers set countries or regions, and since 31 August 2026 DTV applications must go to the mission covering your nationality or permanent residence.",
    link: "/checker",
  },
  {
    id: "can-foreigners-open-a-bank-account-in-thailand",
    category: "money-tax",
    question: "Can foreigners open a bank account in Thailand?",
    answer:
      "Yes, usually with a long-stay visa such as Non-O, Non-B, ED or LTR, a proof of Thai address and a Thai phone number. You must go in person. Branch rules vary, and some ask for a certificate of residence or a letter from your embassy or employer.",
    link: null,
  },
  {
    id: "can-i-open-a-thai-bank-account-on-a-dtv",
    category: "money-tax",
    question: "Can I open a Thai bank account on a DTV?",
    answer:
      "It is inconsistent. Several 2026 reports say Bangkok Bank and Kasikorn treat the DTV as a tourist-category visa and refuse it, while some branches still open accounts with extra documents. Plan to use foreign accounts until you have confirmed a branch in writing.",
    link: null,
    popular: true,
  },
  {
    id: "do-i-pay-tax-in-thailand-as-a-foreigner",
    category: "money-tax",
    question: "Do I pay tax in Thailand as a foreigner?",
    answer:
      "You become a Thai tax resident if you spend 180 days or more in Thailand in a calendar year. Residents can be taxed on Thai income and on foreign income earned from 1 January 2024 that they bring into Thailand. Non-residents pay tax only on Thai-source income.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
    popular: true,
  },
  {
    id: "is-foreign-income-taxed-in-thailand",
    category: "money-tax",
    question: "Is foreign income taxed in Thailand?",
    answer:
      "Only if you are a tax resident, with 180 days or more in a calendar year, and you remit income earned from 1 January 2024 onward into Thailand. This comes from Revenue Department instructions Por. 161/2566 and 162/2566. A tax treaty may give relief. Ask a Thai tax adviser.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "do-dtv-holders-pay-tax-in-thailand",
    category: "money-tax",
    question: "Do DTV holders pay tax in Thailand?",
    answer:
      "Only under the normal rules. If you spend 180 days or more in Thailand in a calendar year, you are a tax resident, and foreign income earned from 2024 that you bring into Thailand can be taxable. The DTV itself gives no tax exemption.",
    link: "/tools/tax-residency-counter",
  },
  {
    id: "is-my-pension-taxed-in-thailand",
    category: "money-tax",
    question: "Is my pension taxed in Thailand?",
    answer:
      "It can be if you are a Thai tax resident and bring pension income earned from 2024 into Thailand. A tax treaty between Thailand and your home country may give the taxing right to one country or allow a credit. Ask a Thai tax adviser to check your treaty.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
    popular: true,
  },
  {
    id: "are-savings-from-before-2024-taxed-when-i-bring-them-to-thailand",
    category: "money-tax",
    question: "Are savings from before 2024 taxed when I bring them to Thailand?",
    answer:
      "Under Por. 162/2566, foreign income earned before 1 January 2024 is not caught by the remittance rule. Keep records that prove when the money was earned, such as a 31 December 2023 balance and home-country tax returns.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "is-the-thai-tax-residency-test-180-or-183-days",
    category: "money-tax",
    question: "Is the Thai tax residency test 180 or 183 days?",
    answer:
      "180 days in a calendar year, from 1 January to 31 December. The days do not have to be consecutive, and arrival and departure days are commonly counted. The 183-day test belongs to other countries' rules.",
    link: "/tools/tax-residency-counter",
  },
  {
    id: "has-thailand-passed-the-new-remittance-tax-exemption",
    category: "money-tax",
    question: "Has Thailand passed the new remittance tax exemption?",
    answer:
      "Not as of mid-2026, as reported by Thai law firms. A Revenue Department draft would exempt foreign income brought in during the year it was earned or the following year, but it was not law. Por. 161/2566 and 162/2566 remain the operative rules.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "what-is-the-top-income-tax-rate-in-thailand",
    category: "money-tax",
    question: "What is the top income tax rate in Thailand?",
    answer:
      "35%, the top band of the standard progressive personal income tax. Lower bands apply to lower income, and the first slice of net income is tax-free. LTR Highly Skilled Professionals pay a 17% flat rate on Thai employment income instead.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "when-do-i-file-a-thai-tax-return",
    category: "money-tax",
    question: "When do I file a Thai tax return?",
    answer:
      "Personal income tax returns for a calendar year are due by 31 March of the next year, with a short extra period usually given for online filing. Residents with remitted foreign income use the same return. Get a Thai tax ID first and ask a Thai tax adviser about your case.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "how-should-i-move-money-to-thailand",
    category: "money-tax",
    question: "How should I move money to Thailand?",
    answer:
      "Use a bank transfer or a licensed money transfer service into your Thai account, and keep records of where the money came from. For a condo purchase, the funds must arrive in foreign currency with a Foreign Exchange Transaction form. Records also matter for the 2024 remittance tax rule.",
    link: "/guides/thailand-tax-for-long-stay-foreigners",
  },
  {
    id: "what-is-the-cost-of-living-in-thailand-for-a-foreigner",
    category: "money-tax",
    question: "What is the cost of living in Thailand for a foreigner?",
    answer:
      "A realistic long-stay budget is reported at about 40,000 to 90,000 THB a month, depending on the city, rent and health insurance. Bangkok and Phuket cost most, Chiang Mai and smaller cities less. Rent is the biggest variable.",
    link: "/tools/long-stay-cost-calculator",
    popular: true,
  },
  {
    id: "is-chiang-mai-cheaper-than-bangkok",
    category: "money-tax",
    question: "Is Chiang Mai cheaper than Bangkok?",
    answer:
      "Yes, typically 20% to 40% cheaper, as reported in 2026 cost-of-living surveys, mostly because rent is lower. Food and transport differ less. Bangkok has more hospitals, flights and jobs, which some people find worth the extra cost.",
    link: "/tools/long-stay-cost-calculator",
  },
  {
    id: "how-much-is-a-muay-thai-camp-per-month",
    category: "money-tax",
    question: "How much is a Muay Thai camp per month?",
    answer:
      "Training alone is reported at about 7,000 to 15,000 THB a month at many gyms. All-inclusive camps with accommodation and food can reach about 80,000 THB a month. If you need a DTV, add the 10,000 THB visa fee and the 500,000 THB funds test.",
    link: "/tools/long-stay-cost-calculator",
  },
  {
    id: "can-i-use-a-foreign-card-for-everyday-spending-in-thailand",
    category: "money-tax",
    question: "Can I use a foreign card for everyday spending in Thailand?",
    answer:
      "Yes, but Thai ATMs commonly charge foreign cards a fixed fee per withdrawal, and Thai QR payments usually need a Thai bank app. Many long-stay foreigners open a Thai account once they have a qualifying visa.",
    link: null,
  },
  {
    id: "can-foreigners-rent-a-condo-in-thailand",
    category: "life",
    question: "Can foreigners rent a condo in Thailand?",
    answer:
      "Yes, on any visa. Leases are commonly 6 or 12 months, with a deposit of about two months' rent reported as standard. Make sure your landlord can file TM30 for you, because you need it for 90-day reports and extensions.",
    link: "/guides/tm30-thailand",
  },
  {
    id: "can-foreigners-buy-property-in-thailand",
    category: "life",
    question: "Can foreigners buy property in Thailand?",
    answer:
      "Foreigners can own a condo unit freehold, as long as foreign ownership in the building stays within 49% of the total unit area. Foreigners cannot own land. Houses are usually held through a registered land lease of up to 30 years, with the building in your name.",
    link: null,
    popular: true,
  },
  {
    id: "what-happens-if-a-condos-49-foreign-quota-is-full",
    category: "life",
    question: "What happens if a condo's 49% foreign quota is full?",
    answer:
      "You cannot buy that unit freehold as a foreigner. The common alternative is a registered leasehold, usually 30 years. Renewal options in the contract are not guaranteed by statute, so get a Thai property lawyer to review the deal.",
    link: null,
  },
  {
    id: "does-buying-property-give-me-a-visa-in-thailand",
    category: "life",
    question: "Does buying property give me a visa in Thailand?",
    answer:
      "No. Owning a condo gives no visa or residence right. The LTR Wealthy Global Citizen category counts property toward its USD 500,000 Thai investment, and the Wealthy Pensioner alternative needs USD 250,000 invested. Otherwise you still need a normal long-stay visa.",
    link: "/visa-rules/ltr-visa",
  },
  {
    id: "do-i-need-health-insurance-to-live-in-thailand",
    category: "life",
    question: "Do I need health insurance to live in Thailand?",
    answer:
      "It is only compulsory for some visas: the O-A (USD 100,000 or 3,000,000 THB of cover) and the LTR (USD 50,000 or an alternative). It is strongly advisable for everyone, because private hospital costs can be high and coverage gets harder to buy as you age.",
    link: "/visa-rules/o-a-visa",
  },
  {
    id: "how-much-does-health-insurance-cost-for-retirees-in-thailand",
    category: "life",
    question: "How much does health insurance cost for retirees in Thailand?",
    answer:
      "It varies widely by age, cover and insurer. Guides report yearly premiums from a few thousand baht for a young, healthy 50-year-old to 40,000 THB or more as you age. Many policies exclude pre-existing conditions, so compare cover before price.",
    link: "/visa-rules/o-a-visa",
  },
  {
    id: "is-healthcare-in-thailand-good-for-expats",
    category: "life",
    question: "Is healthcare in Thailand good for expats?",
    answer:
      "Private hospitals in Bangkok, Chiang Mai, Phuket and Pattaya are widely used by expats and medical tourists, with English-speaking staff. Costs are lower than in the US but add up for major treatment, which is why insurance matters. Rural public hospitals are cheaper but busier.",
    link: null,
  },
  {
    id: "can-i-use-my-foreign-driving-licence-in-thailand",
    category: "life",
    question: "Can I use my foreign driving licence in Thailand?",
    answer:
      "As a visitor, carry your home licence with an International Driving Permit issued before you travel. If you live in Thailand on a long-stay visa, get a Thai licence from the Department of Land Transport. Riding a motorbike needs a motorbike endorsement.",
    link: null,
  },
  {
    id: "how-do-i-get-a-thai-driving-licence",
    category: "life",
    question: "How do I get a Thai driving licence?",
    answer:
      "Apply at a Department of Land Transport office with your passport and long-stay visa, a certificate of residence or proof of address, and a medical certificate. Expect training and tests that vary by office. Holders of a valid foreign licence or IDP often have a simpler process, as reported.",
    link: null,
  },
  {
    id: "are-there-international-schools-for-expat-children-in-thailand",
    category: "life",
    question: "Are there international schools for expat children in Thailand?",
    answer:
      "Yes. Bangkok, Chiang Mai, Phuket and other cities have international schools teaching British, American or IB programmes. Fees vary widely. Children can study on an ED visa or as DTV, work or retirement dependants, depending on your own visa.",
    link: "/guides/dtv-with-family",
  },
  {
    id: "which-city-is-best-for-long-term-living-in-thailand",
    category: "life",
    question: "Which city is best for long-term living in Thailand?",
    answer:
      "It depends on your priorities. Bangkok has the best hospitals, jobs and flights. Chiang Mai is cheaper and popular with remote workers and retirees. Phuket and Koh Samui suit beach life at higher prices. Hua Hin and Pattaya are popular with retirees.",
    link: "/tools/long-stay-cost-calculator",
  },
  {
    id: "can-i-get-a-thai-sim-card-as-a-foreigner",
    category: "life",
    question: "Can I get a Thai SIM card as a foreigner?",
    answer:
      "Yes, with your passport at an operator shop or the airport. Register it in your own name, because Thai banks need a phone number in your name for app verification, and you will use it for official messages.",
    link: null,
  },
  {
    id: "is-it-safe-to-live-in-thailand-as-a-foreigner",
    category: "life",
    question: "Is it safe to live in Thailand as a foreigner?",
    answer:
      "Most long-stay foreigners live in Thailand without serious problems. The real risks are road accidents, especially on motorbikes, and scams, including fake visa agents and lookalike government sites. Keep your visa status clean, because overstays and 90-day lapses cause more trouble than crime does.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "can-i-bring-my-pet-to-thailand",
    category: "life",
    question: "Can I bring my pet to Thailand?",
    answer:
      "Yes, with an import permit from the Department of Livestock Development, a microchip, rabies vaccination and a health certificate. Requirements and timelines depend on your origin country. Check the current rules before you book flights.",
    link: null,
  },
  {
    id: "are-thai-visa-agents-legal",
    category: "scams-safety",
    question: "Are Thai visa agents legal?",
    answer:
      "Yes. Using a licensed agent to prepare documents and queue at immigration is legal. Using one that supplies fake bank statements, promises a guaranteed visa or sells a school place with no classes is not. In August 2026 police raided a Bangkok agency over forged bank documents linked to more than 400 clients.",
    link: "/guides/thai-visa-agent-scams",
    popular: true,
  },
  {
    id: "how-do-i-spot-a-visa-agent-scam",
    category: "scams-safety",
    question: "How do I spot a visa agent scam?",
    answer:
      "Red flags: a guaranteed approval, a no-money retirement deal, a school with optional attendance, payment only in cash or crypto, no office address and pressure to decide fast. Official decisions are always at the officer's discretion, so nobody can guarantee a visa.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "what-is-the-official-thai-e-visa-website",
    category: "scams-safety",
    question: "What is the official Thai e-Visa website?",
    answer:
      "thaievisa.go.th, run for the Ministry of Foreign Affairs. Thai government sites end in .go.th. Sites such as thaievisa.org are not official, even if they look similar, and may charge extra fees for the same forms.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "are-there-fake-tdac-arrival-card-websites",
    category: "scams-safety",
    question: "Are there fake TDAC arrival card websites?",
    answer:
      "Yes. Thai authorities have warned about lookalike sites that charge fees for the arrival card. The official TDAC is free on tdac.immigration.go.th. Any site asking for payment is not the government service.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "is-a-visa-agent-that-guarantees-approval-a-scam",
    category: "scams-safety",
    question: "Is a visa agent that guarantees approval a scam?",
    answer:
      "It is a red flag. Approval is always at the discretion of the embassy or immigration officer, so no agent can guarantee it. A refund promise does not undo a refusal or a forgery finding on your record.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "is-it-safe-to-use-a-no-money-retirement-visa-service",
    category: "scams-safety",
    question: "Is it safe to use a 'no money' retirement visa service?",
    answer:
      "No. These services usually rely on borrowed funds placed in your account briefly or on forged bank letters. If the documents are found to be false, the risk is yours: refusal, cancellation and possible criminal charges. The legal alternatives are the 65,000 THB income route or a combination.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "what-should-i-do-if-a-visa-agent-scammed-me",
    category: "scams-safety",
    question: "What should I do if a visa agent scammed me?",
    answer:
      "Keep every message, receipt and document. Report fraud to the Thai police or the cyber police hotline 1441, and contact your bank or card issuer. If a forged document went into an application, get independent legal advice quickly.",
    link: "/guides/thai-visa-agent-scams",
  },
  {
    id: "how-do-i-check-a-muay-thai-gym-before-booking-a-dtv-course",
    category: "scams-safety",
    question: "How do I check a Muay Thai gym before booking a DTV course?",
    answer:
      "Ask whether the gym is registered with Thailand's Boxing Sport Board, which DTV guides report missions check, check its address and reviews, and ask for a sample DTV letter. Confirm with your mission that it accepts that gym's letter and course length before you pay a deposit.",
    link: "/visa-rules/dtv",
  },
  {
    id: "can-i-get-in-trouble-for-an-agents-fake-documents",
    category: "scams-safety",
    question: "Can I get in trouble for an agent's fake documents?",
    answer:
      "Yes. You sign the application, so a forged bank letter or fake enrolment counts against you, not only the agent. Consequences can include refusal, cancellation of your stay and a black mark that affects future visas. Check every document yourself before it is filed.",
    link: "/guides/thai-visa-agent-scams",
  },
];

export const FAQ_SOURCES: { label: string; url: string }[] = [
  { label: "Thai e-Visa portal (Ministry of Foreign Affairs)", url: "https://www.thaievisa.go.th" },
  { label: "MFA: DTV checklist", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf" },
  { label: "MFA: new visa measures as of 29 May 2024 (DTV)", url: "https://image.mfa.go.th/mfa/0/tDJBi9m15g/New_Measures_as_of_29_May_2024_-_1850_1.pdf" },
  { label: "MFA: Non-Immigrant O for retirement", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/NON-O_for_Retirement_visa.pdf" },
  { label: "MFA: Non-Immigrant O-A (long stay)", url: "https://www.mfa.go.th/en/page/non-immigrant-visa-o-a?menu=5e1ff71bc4281a00c812e8e2" },
  { label: "MFA: O-A and O-X requirements (insurance)", url: "https://image.mfa.go.th/mfa/0/qcuTAU8W4b/Visa_requirement/Non_Imm_O-A__O-X_2024-03-17.pdf" },
  { label: "MFA: Non-Immigrant ED", url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/NON-IMMIGRANT_VISA_(ED)_FOR_EDUCATION_-_To_study_or_take_academic_course_in_Thailand-newL.pdf" },
  { label: "MFA: Non-Immigrant O for family", url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/10.Non-Immigrant_(O)_Staying_with_Family_Visas.pdf" },
  { label: "MFA: Non-Immigrant B for business and work", url: "https://www.mfa.go.th/en/publicservice/non-immigrant-visa-b-for-business-and-work" },
  { label: "Bangkok Immigration: extension of stay criteria", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
  { label: "Bangkok Immigration: re-entry permit", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
  { label: "BOI One Start One Stop: re-entry permit FAQ", url: "https://osos.boi.go.th/EN/faq-group/28/About-Re-entry-Permit/" },
  { label: "Immigration Bureau: 90-day report online (TM.47)", url: "https://tm47.immigration.go.th" },
  { label: "Immigration Bureau: official TDAC FAQ", url: "https://tdac.immigration.go.th/manual/en/faq.html" },
  { label: "TAT Newsroom: 30-day and 15-day visa exemption rules from 15 September 2026", url: "https://www.tatnews.org/2026/09/thailand-introduces-new-30-day-and-15-day-visa-exemption-rules-from-15-september/" },
  { label: "Royal Thai Embassy Washington: visa information", url: "https://washingtondc.thaiembassy.org/en/page/visa-information" },
  { label: "Royal Thai Embassy Washington: overstay regulations", url: "https://washingtondc.thaiembassy.org/en/page/advice-on-thailand-visa-overstay-regulations" },
  { label: "Royal Thai Embassy Canberra: overstay regulations", url: "https://canberra.thaiembassy.org/en/content/overstay-regulations-3" },
  { label: "Royal Thai Embassy London: DTV supporting documents", url: "https://london.thaiembassy.org/en/content/adjustment-of-supporting-docdtv" },
  { label: "Royal Thai Embassy Singapore: DTV spouse and children", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-spouse-and-children-under-20-years-old" },
  { label: "BOI: LTR brochure 2025", url: "https://ltr.boi.go.th/documents/BOI-brochure%202025-LTR.pdf" },
  { label: "BOI: LTR visa issuance", url: "https://ltr.boi.go.th/page/visa-issuance-info.html" },
  { label: "BOI Announcement Por. 3/2568 (LTR relaxations)", url: "https://ltr.boi.go.th/documents/Announcement_of_the_Office_of_the_Board_of_Investment_No_Por_3_2568_(EN).pdf" },
  { label: "Thailand Privilege: membership packages", url: "https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you" },
  { label: "Revenue Department: foreigners paying tax (2024)", url: "https://www.rd.go.th/fileadmin/user_upload/lorkhor/newspr/2024/FOREIGNERS_PAY_TAX2024.pdf" },
  { label: "Thai government portal: overstay fines", url: "https://www.thailand.go.th/event-detail/001_01_211" },
];
