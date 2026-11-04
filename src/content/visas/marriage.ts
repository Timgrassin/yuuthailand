import type { VisaContent } from "../types";

export const content: VisaContent = {
  track: "marriage",
  intro:
    "The marriage visa is a Non-Immigrant O visa for the foreign spouse of a Thai national, followed by one-year extensions of stay at your local immigration office. It has no age limit and a lower money test than the retirement visa, but officers check that the marriage is real: expect an interview, photos and sometimes a home visit. It is for couples who are legally married and actually live together in Thailand.",
  whoFor: [
    "A foreigner legally married to a Thai, with the marriage registered at a Thai district office (amphoe) or a foreign marriage recorded there.",
    "A couple living together in Thailand who can show 400,000 THB in a Thai bank or 40,000 THB a month in income.",
    "A spouse under 50 who cannot use the retirement visa.",
    "Someone over 50 who prefers the marriage route's lower money test to the retirement visa's 800,000 THB.",
    "A spouse who wants to work later: a marriage-based stay lets you apply for a work permit with a Thai employer.",
    "Someone thinking about permanent residence, which is reported to be open after several years of consecutive marriage extensions.",
  ],
  notFor: [
    "Couples with only a village or religious ceremony: without legal registration, immigration does not recognise the marriage.",
    "Partners who are engaged or in a de facto relationship: there is no fiancé or partner category.",
    "Couples who live apart, for example one in Bangkok and one abroad most of the year: officers check that you live together.",
    "Anyone who cannot keep the money in a Thai account in their own name for the months before filing.",
    "People in the middle of a separation: the extension ends with the marriage.",
  ],
  steps: [
    {
      title: "Register the marriage",
      body: "Marry at a Thai district office (amphoe) and get the marriage certificate (Kor Ror 3) and registration record (Kor Ror 2). If you married abroad, legalise and translate the certificate and record it at the amphoe (Kor Ror 22). Your embassy usually issues an affirmation of freedom to marry first.",
    },
    {
      title: "Get a Non-O visa",
      body: "Apply at a Royal Thai Embassy or Consulate, usually through thaievisa.go.th, with your marriage certificate, your spouse's ID and proof of funds. It gives 90 days on entry. Some immigration offices can convert another entry status to Non-O in Thailand if enough days remain; ask your office first.",
    },
    {
      title: "Season the money or document the income",
      body: "Put the 400,000 THB in a Thai account in your own name and leave it for at least 2 months before filing. Some offices ask for 3 months at renewals. If you use income, get your embassy's income letter or bank evidence of 40,000 THB a month.",
    },
    {
      title: "Prepare the extension file",
      body: "Gather the TM.7 form, passport, marriage certificate, your spouse's ID card and house registration, a bank letter and updated bank book, photos of you together at home, and a map to the house. Check that your landlord or spouse filed [TM30](/guides/tm30-thailand) for your address.",
    },
    {
      title: "Attend with your spouse",
      body: "Apply before your 90 days run out, at the immigration office for your address. Offices set their own filing window, so ask how early they accept files. Many offices require your Thai spouse to attend, and an officer may interview you both. Pay the 1,900 THB fee.",
    },
    {
      title: "Wait for the under-consideration stamp",
      body: "Many offices do not approve on the day. You get a stamp giving about 30 days while they check, which may include a home visit or a call to your spouse. Return on the date stamped to collect the one-year extension.",
    },
    {
      title: "Report every 90 days and get a re-entry permit",
      body: "File a [90-day report](/guides/90-day-report-thailand) every 90 days of continuous stay. Before any trip abroad, get a re-entry permit, or the extension is cancelled when you leave.",
    },
    {
      title: "Renew every year",
      body: "Repeat the extension each year before it expires, with fresh bank letters, photos and your spouse's documents.",
    },
  ],
  costs: [
    { item: "Non-O visa, single entry", amount: "About 2,000 THB", note: "Embassy fees are set in local currency and vary." },
    { item: "One-year extension of stay", amount: "1,900 THB", note: "Paid at each yearly renewal." },
    { item: "Re-entry permit", amount: "1,000 THB single, 3,800 THB multiple", note: "Reported fees; airports add a service charge." },
    { item: "Marriage registration and translations", amount: "Varies", note: "Embassy affirmation, certified translation and MFA legalisation fees depend on your country." },
    { item: "Funds held", amount: "400,000 THB or 40,000 THB a month", note: "Not a fee: the money stays yours, but must stay in the account." },
  ],
  mistakes: [
    "Moving the 400,000 THB in less than 2 months before filing. Officers count from the bank book, and some offices want 3 months at renewal.",
    "Keeping the money in a joint account or your spouse's account. It must be in your own name.",
    "Arriving without your Thai spouse at an office that requires them. Ask your office before the appointment.",
    "Using a foreign marriage certificate that was never recorded at a Thai amphoe. Get the Kor Ror 22 entry first.",
    "Leaving Thailand during the under-consideration period or without a re-entry permit. Both can cost you the extension.",
    "Bringing staged or old photos. Officers often ask for recent photos at the address and may visit.",
    "Forgetting that income from abroad needs proof the office accepts, such as an embassy letter or 12 months of transfers.",
  ],
  sections: [
    {
      id: "interview-and-home-visit",
      heading: "What happens at the marriage visa interview and home visit?",
      body: `
The extension is not only a money check. The officer decides whether the marriage is genuine and whether you live together. Practice varies by office, but secondary sources report the same pattern:

- **At the office:** both of you sign documents, and the officer may ask simple questions about how you met, where you live and your spouse's family.
- **Photos:** recent photos of you together inside and outside the house, with the house number visible.
- **Home visit or call:** during the under-consideration period, an officer may visit the address, take a photo of you there, or phone your spouse.
- **Witnesses:** some offices ask for neighbours or a village head to confirm you live there.

Answer consistently and keep the address on your documents the same as the place you live.
`,
    },
    {
      id: "initial-non-o-vs-extension",
      heading: "Initial Non-O visa vs one-year extension: what is the difference?",
      body: `
| | Initial Non-O visa | One-year extension of stay |
|---|---|---|
| Where | Royal Thai Embassy or Consulate abroad (or conversion at some offices in Thailand) | Your local immigration office in Thailand |
| What you get | 90 days on entry | One year, renewable each year |
| Money check | Set by each embassy | 400,000 THB held, 40,000 THB a month, or a combination |
| Interview | Rare | Common, with possible home visit |
| Fee | About 2,000 THB, varies by mission | 1,900 THB |

The embassy visa just gets you in. The yearly extension is where the full rules apply. Values and sources are in the rules table above.
`,
    },
    {
      id: "400k-or-40k",
      heading: "Should you use 400,000 baht in the bank or 40,000 baht a month?",
      body: `
Under Immigration Bureau Order 12/2568, as reported by ThaiLawOnline, you can use either test or a combination that adds up to 400,000 THB a year.

- **Savings route:** simpler to prove. Open a Thai account in your name, deposit, wait 2 months, then get a bank letter on the day you file. The money stays yours.
- **Income route:** better if you cannot park savings. You need an embassy income letter or proof of regular transfers, depending on your nationality and office.
- **Combination:** useful if your income is just below 40,000 THB a month. Ask your office how it calculates the total before relying on it.

If you are 50 or older, compare with the [retirement visa](/visa-rules/retirement-visa). It needs twice the money but no interview or spouse attendance.
`,
    },
  ],
  faqs: [
    {
      question: "Does my marriage need to be registered in Thailand?",
      answer:
        "Yes. Immigration recognises a marriage registered at a Thai district office, or a foreign marriage recorded there (Kor Ror 22). A ceremony without legal registration does not count.",
    },
    {
      question: "Does my Thai spouse have to come to immigration?",
      answer:
        "At many offices, yes. Your spouse signs documents and may be interviewed. Practice varies, so ask your local office before your appointment.",
    },
    {
      question: "What happens to my marriage visa if we divorce?",
      answer:
        "The extension is based on the marriage, so it ends with it. You must leave or switch to another visa basis. Talk to the immigration office or a Thai lawyer as soon as a divorce is likely.",
    },
    {
      question: "Can I get a marriage visa from inside Thailand?",
      answer:
        "Some immigration offices convert a visa exemption or tourist entry to a Non-O based on marriage, if enough days remain on your stay. Requirements vary by office. If your office will not convert, apply at a Thai embassy abroad.",
    },
    {
      question: "Can I get permanent residence through marriage to a Thai?",
      answer:
        "It is reported that you can apply after several consecutive years of one-year extensions, with income conditions and an annual quota. We could not confirm the current rules from an official source. Ask the Immigration Bureau before planning on it.",
    },
    {
      question: "Is the marriage visa easier than the retirement visa?",
      answer:
        "It needs half the money: 400,000 THB against 800,000 THB. But it adds an interview, spouse attendance and possible home visits. If you are over 50 and prefer less scrutiny, the retirement visa may be simpler.",
    },
  ],
  sources: [
    { label: "MFA Non-O staying with family", url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/10.Non-Immigrant_(O)_Staying_with_Family_Visas.pdf" },
    { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" },
    { label: "Bangkok Immigration extension of stay", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
    { label: "BOI OSOS FAQ, re-entry permit", url: "https://osos.boi.go.th/EN/faq-group/28/About-Re-entry-Permit/" },
    { label: "ThaiLawOnline, extension based on Thai spouse (secondary, cites Order 12/2568)", url: "https://www.thailawonline.com/visa-and-extension-based-on-thai-spouse/" },
    { label: "CM Locals, marriage visa (secondary)", url: "https://www.cmlocals.com/marriage-visa/" },
    { label: "Visa Manager, marriage visa (secondary)", url: "https://visamanager.io/visas/thailand-marriage-visa" },
  ],
  updated: "2026-11-04",
  related: ["how-to-stay-in-thailand-long-term", "90-day-report-thailand", "tm30-thailand", "thailand-tax-for-long-stay-foreigners"],
};
