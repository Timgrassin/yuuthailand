import type { Guide } from "../types";

export const guide: Guide = {
  slug: "90-day-report-thailand",
  kind: "guide",
  eyebrow: "Admin",
  title: "90-day report in Thailand: who must file, when, and how",
  metaTitle: "90 day report Thailand: window, online filing and fines",
  description: "90 day report Thailand: who must report, the 15-days-before to 7-days-after window, online vs in person, the first report, fines and what resets it.",
  answer:
    "If you stay in Thailand more than 90 days in a row, you must report your address to immigration every 90 days on form TM.47. You can file from 15 days before to 7 days after the due date, online or in person. Reporting late costs 2,000 THB. Leaving Thailand resets the count.",
  tracks: ["dtv", "ed", "retirement", "retirement_oa", "privilege", "marriage", "work", "ltr"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "Form", value: "TM.47", note: "notification of staying over 90 days" },
    { label: "Filing window", value: "15 days before to 7 days after", note: "the due date" },
    { label: "Late fine", value: "2,000 THB", note: "if you report late yourself" },
    { label: "LTR holders", value: "Yearly", note: "TM.95 instead of TM.47" },
  ],
  sections: [
    {
      id: "who",
      heading: "Who has to do a 90-day report in Thailand?",
      body: `
Any foreigner who stays in Thailand for **more than 90 consecutive days** must notify immigration of their current address. It applies whatever your visa:

- DTV holders who stay 90+ days in a row
- Education, retirement, O-A, marriage and work visa holders
- Thailand Privilege members (the operator can file for you)

It is separate from the [TM30](/guides/tm30-thailand), which your landlord files when you move in. Both are needed. Immigration uses the TM30 to know where you live, and the 90-day report confirms you are still there.

**LTR holders are the exception.** They file a one-year report (TM.95) instead. See the LTR section below.
`,
    },
    {
      id: "window",
      heading: "When is my 90-day report due?",
      body: `
Your first report is due 90 days after your **latest entry** into Thailand. After that, each report is due 90 days after the previous one.

| Situation | Count 90 days from |
|---|---|
| You just arrived | Your latest entry stamp |
| You already filed a report | The date on your last 90-day receipt |
| You left Thailand and came back | Your new entry stamp |

You can file from **15 days before** the due date to **7 days after** it without a fine. The next due date is printed on your receipt. Keep the slip in your passport.

Extensions of stay do not reset the clock. Only a new entry does.
`,
    },
    {
      id: "how",
      heading: "How do I do a 90-day report online?",
      body: `
Immigration runs an online system for TM.47 at **tm47.immigration.go.th**. Bangkok Immigration publishes a manual for it.

1. Open the official site by typing the address yourself. Do not use a paid lookalike.
2. Enter your passport details, visa type, latest entry date and current address.
3. Submit inside the 15-days-before window. Do not leave it to the last day.
4. Wait for the status to show approved. This can take a few days.
5. Save or print the approval, which shows your next due date.

If the online system rejects your report, or shows "pending" as the deadline nears, go to your local immigration office in person before the 7-day grace period ends. Late reports generally cannot be filed online.

You can also report **in person** at your local immigration office, or send **someone you authorise** with your passport copies and a signed form. Thailand Privilege members can ask the operator's liaison service.
`,
    },
    {
      id: "first-report",
      heading: "Does the first 90-day report have to be in person?",
      body: `
Sources disagree. Many guides say your first report after a new visa or entry must be in person, and online filing only works for later reports. Others say some offices accept online reports from the start.

The safe approach: do your first report **in person** at the office that covers your address. Bring your passport, the TM.47 form, a copy of your TM30 receipt and copies of your passport photo page, visa and entry stamp. Then use the online system for later reports.
`,
    },
    {
      id: "documents",
      heading: "What do I need for an in-person 90-day report?",
      body: `
Bring these to your local immigration office:

- Your passport, with the visa or extension stamp and your latest entry stamp
- A completed and signed **TM.47** form (Bangkok Immigration publishes the form as a PDF)
- Copies of your passport photo page, visa or extension stamp and latest entry stamp
- Your previous 90-day receipt, if you have one
- Your TM30 receipt, or another proof of address if your office asks for it

If someone files for you, add a signed letter authorising them and a copy of their ID. Offices differ on extras, so check your office's own page before you go.

Common mistakes to avoid:

- **Counting from the wrong date.** After a trip abroad, the count starts from your new entry stamp, not your last receipt.
- **Filing online on the last day.** Online reports can stay pending for days. File early in the window.
- **Missing TM30.** If your landlord never filed it, your report can be refused.
- **Using a lookalike site.** Only the .go.th address is official, and the online report is free.
- **Assuming an extension resets it.** It does not.
`,
    },
    {
      id: "fines",
      heading: "What is the fine for a late 90-day report?",
      body: `
The Immigration Bureau's page sets two levels:

| Situation | Fine |
|---|---|
| You report late, of your own accord | 2,000 THB |
| You are caught without having reported | 5,000 THB |

Bangkok Immigration's own page gives a different figure for the second case: not less than 4,000 THB plus up to 200 THB for each day until you report. The official pages conflict, so treat **5,000 THB** as the likely amount if you are caught.

A late report also adds friction to your next extension. Pay the fine, file the report and keep the receipt.
`,
    },
    {
      id: "reset",
      heading: "Does leaving Thailand reset the 90-day report?",
      body: `
Yes. When you leave and re-enter, the count starts again from your new entry stamp. Any report that was pending when you left falls away.

This is why DTV holders who travel every few months may never need to file. It is also why you should check your latest entry stamp, not an old receipt, after any trip.

If you are on an extension of stay, leaving without a **re-entry permit** ends that extension. A 90-day report does not protect it.
`,
    },
    {
      id: "ltr",
      heading: "How is LTR reporting different?",
      body: `
LTR holders who stay in Thailand for a full year without leaving file a **one-year report on form TM.95**, not the 90-day TM.47. The BOI says it is filed with Immigration at the One Stop Service Center, in person or by someone you authorise.

The window is the same: from 15 days before to 7 days after the date on your notification card. Leaving and returning resets the next report to one year after your latest return. TM30 still applies. Compare the routes in [LTR vs Privilege vs DTV](/guides/ltr-vs-privilege-vs-dtv).
`,
    },
  ],
  faqs: [
    {
      question: "What happens if I miss my 90-day report?",
      answer: "If you go to immigration and report late yourself, the fine is 2,000 THB. If you are caught without reporting, the Immigration Bureau page gives 5,000 THB. File as soon as you can and keep the receipt.",
    },
    {
      question: "Can I do my 90-day report online?",
      answer: "Yes, through the official TM.47 system at tm47.immigration.go.th, within the filing window. Many guides advise filing your first report in person. Late reports usually have to be made at an office.",
    },
    {
      question: "Do I need a 90-day report on a DTV?",
      answer: "Only if you stay in Thailand for more than 90 days in a row. If you leave and re-enter before day 90, the count resets and no report is due.",
    },
    {
      question: "Does a visa extension reset the 90-day report?",
      answer: "No. An extension of stay does not change your reporting dates. Only leaving Thailand and re-entering resets the count.",
    },
    {
      question: "Can someone else do my 90-day report for me?",
      answer: "Yes. A person you authorise, or an agent, can file in person with copies of your passport and the signed TM.47 form. Thailand Privilege members can use the operator's liaison service.",
    },
  ],
  sources: [
    { label: "Immigration Bureau: notification of staying over 90 days", url: "https://www.immigration.go.th/?page_id=1666" },
    { label: "Bangkok Immigration: 90-day report", url: "https://bangkok.immigration.go.th/en/90days-report/" },
    { label: "Bangkok Immigration: TM.47 online manual", url: "https://bangkok.immigration.go.th/en/tm47online-manual/" },
    { label: "Form TM.47 (PDF)", url: "https://bangkok.immigration.go.th/wp-content/uploads/Form-TM-47.pdf" },
    { label: "Royal Thai Consulate-General Los Angeles: staying over 90 days", url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/foreigners-staying-in-thailand-more-than-90-days" },
    { label: "BOI LTR FAQ (TM.95 yearly report)", url: "https://ltr.boi.go.th/page/faq.html" },
    { label: "BOI LTR: how to manage your visa", url: "https://ltr.boi.go.th/page/how-to-manage.html" },
    { label: "Thailand Privilege 90-day report", url: "https://www.thailandprivilege.co.th/why-thailand/90-day-report" },
    { label: "Bangkok Immigration re-entry permit", url: "https://bangkok.immigration.go.th/en/re-entry-permit/" },
  ],
  related: ["tm30-thailand", "how-to-stay-in-thailand-long-term", "ltr-vs-privilege-vs-dtv"],
  confidence: "medium",
};
