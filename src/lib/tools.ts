// Free tools: each is a standalone page, a lead magnet and a citable answer.
export type ToolMeta = {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  description: string;
  answer: string;
  leadMagnet: string;
  emailTitle: string;
  emailBody: string;
  tracks: string[];
  related: string[]; // guide slugs
  faqs: { question: string; answer: string }[];
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "long-stay-cost-calculator",
    name: "Thailand long-stay cost calculator",
    short: "What each visa really costs over 1 to 10 years",
    metaTitle: "Thailand long-stay visa cost calculator (2026)",
    description: "Compare the real cost of the DTV, retirement, O-A, LTR, Privilege, marriage and work visas over 1 to 10 years, including extensions and re-entry permits.",
    answer: "Over five years, the DTV is usually the cheapest long stay at about 10,000 THB plus extensions. Retirement visas cost about 2,000 THB a year in fees. Thailand Privilege costs the most upfront, from 900,000 THB for Gold. The calculator adds extensions, re-entry permits and the money you must show.",
    leadMagnet: "cost_calculator_report",
    emailTitle: "Get this cost breakdown by email",
    emailBody: "We send your numbers, the assumptions behind them, and an alert if any fee changes.",
    tracks: ["dtv", "retirement", "retirement_oa", "ltr", "privilege", "marriage", "work", "ed"],
    related: ["how-to-stay-in-thailand-long-term", "ltr-vs-privilege-vs-dtv", "dtv-vs-ed-visa"],
    faqs: [
      { question: "Which Thailand long-stay visa is cheapest?", answer: "In government fees, the DTV is cheapest over five years: one 10,000 THB visa plus 1,900 THB per extension. It requires 500,000 THB in savings to be shown, but that money is not spent." },
      { question: "Does the money I show count as a cost?", answer: "No. Savings shown for the DTV, retirement or marriage routes stay yours. The calculator lists them separately so you can see the cash you need available versus the fees you pay." },
      { question: "Do I need a re-entry permit?", answer: "Yes, if you leave Thailand during an extension of stay and want to keep it. A single re-entry permit costs 1,000 THB and a multiple one costs 3,800 THB, as listed by Bangkok Immigration." },
      { question: "Are embassy fees the same everywhere?", answer: "No. Embassies charge local-currency equivalents that can differ from the THB fees used here. Check your mission's fee page before you budget." },
    ],
  },
  {
    slug: "retirement-800k-planner",
    name: "Retirement visa 800k bank planner",
    short: "The dates your 800,000 THB must be in the bank",
    metaTitle: "Retirement visa 800k bank planner: key dates",
    description: "Enter your filing date and get every date for the 800,000 THB retirement deposit: when to deposit, how long to keep it, the 400,000 THB floor and next year's top-up.",
    answer: "For a Thai retirement extension, deposit 800,000 THB at least 2 months before you file. Keep it there for 3 months after approval, then never let it drop below 400,000 THB. Top it back up to 800,000 THB at least 2 months before next year's filing. The planner turns this into dates.",
    leadMagnet: "retirement_800k_plan",
    emailTitle: "Email me my 800k dates",
    emailBody: "Get your timeline by email, with reminders before each deadline and alerts if the bank rules change.",
    tracks: ["retirement", "retirement_oa"],
    related: ["retirement-visa-800k-bank-rules", "non-o-vs-o-a-visa", "90-day-report-thailand"],
    faqs: [
      { question: "How long must 800,000 THB be in a Thai bank?", answer: "At least 2 months before you file for a retirement extension, and 3 months after it is approved. After that the balance must stay at 400,000 THB or more until you top it back up for the next filing." },
      { question: "Can I combine savings and income?", answer: "Yes. A Thai bank deposit plus annual income that together reach 800,000 THB is also accepted. The deposit part still has to follow the seasoning periods." },
      { question: "Does the money have to be in my own name?", answer: "Yes. The account must be a Thai bank account in your name. Joint accounts are handled differently by different offices, so confirm with yours." },
      { question: "Do all immigration offices apply the same rules?", answer: "The rules come from national orders, but offices vary in the documents they ask for, such as how recent the bank letter must be. Ask your office before you file." },
    ],
  },
  {
    slug: "90-day-report-calculator",
    name: "90-day report calculator",
    short: "Your next 90-day report date and filing window",
    metaTitle: "90-day report calculator Thailand: next due date",
    description: "Enter your arrival or last report date. Get your next 90-day report due date, the window to file (15 days before to 7 days after) and the next four dates.",
    answer: "Your next 90-day report is due 90 days after you arrived or last reported. You can file from 15 days before the due date until 7 days after it, online or in person. Leaving Thailand resets the count, so your first report after re-entry is due 90 days from that entry.",
    leadMagnet: "ninety_day_reminders",
    emailTitle: "Get a reminder before each report",
    emailBody: "We email you when your filing window opens, so you never pay a late fine.",
    tracks: ["dtv", "ed", "retirement", "retirement_oa", "marriage", "work", "privilege"],
    related: ["90-day-report-thailand", "tm30-thailand"],
    faqs: [
      { question: "When is my 90-day report due?", answer: "90 days after your last entry into Thailand or your last report, whichever is later. The calculator counts it for you." },
      { question: "Can I file my 90-day report early?", answer: "Yes, from 15 days before the due date. You can also file up to 7 days after it without a fine." },
      { question: "What if I leave Thailand before 90 days?", answer: "Leaving resets the count. Your next report is due 90 days after you re-enter." },
      { question: "Do LTR holders do 90-day reports?", answer: "No. LTR holders report once a year instead of every 90 days." },
    ],
  },
  {
    slug: "visa-exemption-calculator",
    name: "Visa exemption stay calculator",
    short: "Your last legal day on a 30-day visa exemption",
    metaTitle: "Thailand 30-day visa exemption calculator",
    description: "Enter your entry date and get your last legal day on Thailand's 30-day visa exemption, with or without the one 30-day extension.",
    answer: "Since 15 September 2026, most visa-exempt visitors get 30 days, and the entry day counts as day one. If you arrive on 1 March, your last day is 30 March. You can extend once by up to 30 days at an immigration office. The calculator shows both dates and your overstay risk.",
    leadMagnet: "exemption_dates",
    emailTitle: "Email me these dates",
    emailBody: "Get your last legal day and extension deadline by email, plus long-stay options if you want to stay longer.",
    tracks: ["dtv", "ed", "retirement"],
    related: ["thailand-visa-exemption-30-days", "how-to-stay-in-thailand-long-term", "dtv-new-rules-august-2026"],
    faqs: [
      { question: "Does the arrival day count on a visa exemption?", answer: "Yes. Thai immigration counts the day you arrive as day one, so a 30-day stay ends on day 30, not 30 days after arrival." },
      { question: "Can I extend a 30-day visa exemption?", answer: "Once, by up to 30 days, at an immigration office. The fee is reported as 1,900 THB." },
      { question: "How many times can I enter by land visa-free?", answer: "Land entries on the exemption are limited to two per calendar year for most nationalities, as reported after the September 2026 change." },
      { question: "What happens if I overstay?", answer: "The fine is 500 THB a day up to 20,000 THB, and longer overstays can bring an entry ban. Use the overstay calculator to see your exposure." },
    ],
  },
  {
    slug: "tax-residency-counter",
    name: "Thai tax residency day counter",
    short: "Count your days in Thailand against the 180-day test",
    metaTitle: "Thailand 180-day tax residency calculator",
    description: "Add your trips for the year and count your days in Thailand against the 180-day tax residency test. See how many days you have left.",
    answer: "You become a Thai tax resident if you spend 180 days or more in Thailand in a calendar year. Since 2024, residents can be taxed on foreign income they bring in, if it was earned from 2024 onward. Add your trips to count your days and see how close you are.",
    leadMagnet: "tax_residency_tracker",
    emailTitle: "Track this for me",
    emailBody: "We email your day count and a reminder before you reach 180 days, plus any Thai tax rule changes.",
    tracks: ["dtv", "ltr", "retirement", "privilege"],
    related: ["thailand-tax-for-long-stay-foreigners", "ltr-vs-privilege-vs-dtv"],
    faqs: [
      { question: "How many days make me a Thai tax resident?", answer: "180 days or more in Thailand within one calendar year, January to December." },
      { question: "Do arrival and departure days count?", answer: "Practice varies. This counter counts both arrival and departure days, which is the cautious approach. Ask a Thai tax adviser if you are close to 180." },
      { question: "Does my visa change my tax residency?", answer: "No, except the LTR, which has category-specific exemptions. Tax residency depends on days present, not visa type." },
      { question: "Am I taxed on all my foreign income?", answer: "Residents can be taxed on foreign income brought into Thailand that was earned from 1 January 2024 onward. Treaties may change the result. Get advice from a Thai tax adviser." },
    ],
  },
  {
    slug: "overstay-fine-calculator",
    name: "Thailand overstay fine calculator",
    short: "Your overstay fine and possible entry ban",
    metaTitle: "Thailand overstay fine calculator (500 THB a day)",
    description: "Enter your permitted stay end date and departure date. See your overstay fine (500 THB a day, capped at 20,000 THB) and the reported entry ban tiers.",
    answer: "Thailand fines overstayers 500 THB per day, capped at 20,000 THB. Overstays of more than 90 days can also bring an entry ban if you surrender, starting at one year and rising with the length of the overstay. Being arrested for overstay brings longer bans. Leave before your permitted date to avoid both.",
    leadMagnet: "overstay_options",
    emailTitle: "Send me my legal options",
    emailBody: "We email the long-stay routes that fit you, so you never need to overstay.",
    tracks: ["dtv", "ed", "retirement"],
    related: ["thailand-visa-exemption-30-days", "how-to-stay-in-thailand-long-term"],
    faqs: [
      { question: "How much is the overstay fine in Thailand?", answer: "500 THB for each day of overstay, up to a maximum of 20,000 THB." },
      { question: "Will I be banned for overstaying?", answer: "Reported tiers for people who surrender: over 90 days, 1 year; over 1 year, 3 years; over 3 years, 5 years; over 5 years, 10 years. If you are arrested, bans are longer. Check with the Immigration Bureau for your case." },
      { question: "Can I pay the fine at the airport?", answer: "Yes, overstay fines are usually paid at the immigration counter when you leave. Long overstays may be handled differently." },
      { question: "Does one day of overstay matter?", answer: "It costs 500 THB and is recorded. It can count against you in later visa applications, so leave or extend before your last day." },
    ],
  },
  {
    slug: "dtv-document-checklist",
    name: "DTV document checklist",
    short: "Your personal DTV document list, by category",
    metaTitle: "DTV visa document checklist 2026 (by category)",
    description: "Build your Destination Thailand Visa document checklist for remote work or soft power, including the police certificate and residence proof required since 31 August 2026.",
    answer: "For a DTV you need a passport valid 6 months, a bank statement showing 500,000 THB, proof of remote work or a soft-power enrolment letter, and since 31 August 2026 proof of residence in the country where you apply plus a criminal record certificate. Pick your category to build your list.",
    leadMagnet: "dtv_checklist",
    emailTitle: "Email me my checklist",
    emailBody: "Get your DTV checklist as an email you can tick off, plus alerts if the requirements change.",
    tracks: ["dtv"],
    related: ["dtv-new-rules-august-2026", "dtv-rejected-reasons", "dtv-with-family"],
    faqs: [
      { question: "What documents do I need for a DTV?", answer: "Passport, bank statement with 500,000 THB, proof of remote work or soft-power enrolment, proof of residence in the country you apply from, a criminal record certificate and a photo. Missions can ask for more." },
      { question: "What counts as proof of remote work?", answer: "Typically a foreign employment contract or employer letter, or for freelancers, client contracts and a portfolio. It should show the work is for clients outside Thailand." },
      { question: "How old can my police certificate be?", answer: "It depends on the mission. Some ask for one issued within 3 months, others 6 months. Check the mission for your country." },
      { question: "Do I need translations?", answer: "Documents not in English or Thai usually need a certified translation. Some missions also want legalisation or an apostille." },
    ],
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
