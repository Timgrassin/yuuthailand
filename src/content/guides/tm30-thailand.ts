import type { Guide } from "../types";

export const guide: Guide = {
  slug: "tm30-thailand",
  kind: "guide",
  eyebrow: "Admin",
  title: "TM30 in Thailand: what it is, who files it and why your extension depends on it",
  metaTitle: "TM30 Thailand: who files it, fines and what if they refuse",
  description: "TM30 Thailand explained: the landlord's 24-hour residence notice, why extensions and 90-day reports need it, how to check it is filed, fines, and refusals.",
  answer:
    "TM30 is the notice that tells immigration where a foreigner is staying. Under Section 38 of the Immigration Act, the house master, owner or landlord must file it within 24 hours of your arrival. Hotels do it for you. Extensions and 90-day reports can be refused without it. A late filing can cost the landlord up to 2,000 THB.",
  tracks: ["dtv", "ed", "retirement", "retirement_oa", "ltr", "privilege", "marriage", "work"],
  published: "2026-11-04",
  updated: "2026-11-04",
  keyFacts: [
    { label: "Legal basis", value: "Section 38", note: "Immigration Act B.E. 2522" },
    { label: "Deadline", value: "24 hours", note: "after you arrive at the address" },
    { label: "Who files", value: "House master or landlord", note: "hotels file for guests" },
    { label: "Fine", value: "Up to 2,000 THB", note: "for a house master; reported" },
  ],
  sections: [
    {
      id: "what-is-tm30",
      heading: "What is TM30 in Thailand?",
      body: `
TM30 is the form used to notify immigration of the place where a foreigner is staying. Section 38 of the Immigration Act B.E. 2522 puts the duty on the **house master, owner or possessor of the dwelling, or hotel manager**. The notice is due within **24 hours** of the foreigner arriving.

It applies to every foreigner, on any visa, including tourists. Hotels and licensed guesthouses file it automatically through their own system. In a rented condo or house, the duty falls on your landlord or the person who controls the property.

Do not confuse it with the [90-day report](/guides/90-day-report-thailand). TM30 is filed by the property side when you arrive. The 90-day report is filed by you while you stay.
`,
    },
    {
      id: "why-it-matters",
      heading: "Why does TM30 matter for visa extensions?",
      body: `
Immigration uses the TM30 record to confirm your address. When you apply for an extension of stay or file a 90-day report, the office checks that a current TM30 exists for where you live.

- Many offices will not accept an extension application without a TM30 receipt. It is on the typical [retirement extension](/visa-rules/retirement-visa) document list.
- The online 90-day report can be rejected if your address has no TM30 on file.
- Some offices fine the foreigner, or refuse to process their application, until the landlord files.

The fine is usually small. The real cost is a delayed extension while your permission to stay runs down.
`,
    },
    {
      id: "when",
      heading: "When does a new TM30 need to be filed?",
      body: `
The law ties the duty to a foreigner **arriving** to stay at an address. In practice, expect a new TM30 when:

1. You move into a new home.
2. You return to your home from a trip abroad. Many offices treat this as a new arrival.
3. You stay at a different address in Thailand, such as a friend's house. Hotels handle this for you.

Offices differ on point 2 and on short domestic trips. Ask your local office how it applies the rule, and keep every receipt.

Timing matters most before an extension. If you plan to file a retirement, marriage or work extension, make sure a TM30 for your current address was filed after your latest return to Thailand. Check this a few weeks ahead, so your landlord has time to act before your permission to stay runs out.
`,
    },
    {
      id: "check",
      heading: "How do I check my TM30 has been filed?",
      body: `
- **Ask your landlord for the receipt.** For online filings it is a printout or PDF from the official TM30 system. For paper filings it is the slip returned by immigration.
- **Check the details.** Your name, passport number and the address must match your passport and lease.
- **Ask at immigration.** When you visit your office for any reason, ask the officer to confirm a TM30 is on file for your current address.
- **Watch for rejections.** If your online 90-day report is refused, a missing TM30 is a common reason.

The official online system is at tm30.immigration.go.th. Type the address yourself. Use only the .go.th domain.

Keep a simple folder with every TM30 receipt, your lease and your 90-day receipts. Immigration officers often ask for the latest TM30 at extensions, and a missing slip is easier to fix weeks ahead than on the day.
`,
    },
    {
      id: "documents",
      heading: "What documents are needed to file TM30?",
      body: `
For an in-person filing, offices commonly ask for:

- The completed TM30 form, signed by the house master or owner
- A copy of the owner's ID card (or passport, if the owner is a foreigner)
- A copy of the house registration (tabien baan) or the condo title deed
- A copy of the lease, if the person filing is a tenant
- Copies of the foreigner's passport photo page, visa and latest entry stamp

For online filing, the owner registers an account on the official system once, then adds each foreign resident. Ask for a copy of the confirmation every time.
`,
    },
    {
      id: "special-cases",
      heading: "Does TM30 apply if I own my condo or live with a Thai partner?",
      body: `
Yes. If you own your condo, you are the owner of the dwelling, so you file TM30 for yourself. If you live in your Thai spouse's or partner's home, the house master of that home files it. If you stay with friends, the person in charge of their home files it.

Staying in a hotel is the simplest case. The hotel files it, and you can ask the front desk for a copy if your office needs it.
`,
    },
    {
      id: "fines",
      heading: "What is the fine for not filing TM30?",
      body: `
Legal guides that cite Section 77 of the Immigration Act report a fine of **up to 2,000 THB** for a house master, owner or possessor who fails to file. Hotel managers face a higher range, reported as 2,000 to 10,000 THB.

An older 2019 article quotes 800 to 1,200 THB per foreigner. We could not confirm the current amount from an official Immigration Bureau page, so treat 2,000 THB as the upper figure for a landlord.
`,
    },
    {
      id: "landlord-refuses",
      heading: "What can I do if my landlord refuses to file TM30?",
      body: `
1. **Explain the risk to them.** The legal duty and the fine fall on the owner, not on you.
2. **Offer to do the work.** Prepare the form and documents so the landlord only has to sign or log in.
3. **Ask for the documents to file it yourself.** Most guides say many offices accept a tenant filing in person with a copy of the lease, a copy of the owner's ID card and a copy of the house registration (tabien baan). Online filing needs the owner's account.
4. **Ask your office first.** Some offices insist the owner or their representative files. Call before you go.
5. **Put it in your next lease.** Add a clause that the owner files TM30 within 24 hours of each arrival. If they refuse, consider another home: your extension depends on it.
`,
    },
  ],
  faqs: [
    {
      question: "Who is responsible for filing TM30?",
      answer: "The house master, owner or possessor of the property, or the hotel manager, under Section 38 of the Immigration Act. As a tenant you are not legally responsible, but you suffer the consequences if it is missing.",
    },
    {
      question: "Do I need a new TM30 after travelling abroad?",
      answer: "Many offices expect one, because the law ties the notice to a foreigner arriving at the address. Practice varies by office. Ask yours and file again after each trip if they require it.",
    },
    {
      question: "Can I file TM30 myself?",
      answer: "Many offices accept a tenant filing in person with a copy of the lease, the owner's ID and the house registration. Some insist the owner files. Online filing needs the owner's account, so you would need their cooperation.",
    },
    {
      question: "Do hotels file TM30 for me?",
      answer: "Yes. Hotels and licensed guesthouses must file it for their guests. Ask the front desk for a copy if you need it for a 90-day report or extension.",
    },
    {
      question: "Is TM30 the same as the 90-day report?",
      answer: "No. TM30 is the property side's notice that you have arrived at an address. The 90-day report is your own notice that you are still in Thailand after 90 days. Both may be checked at your extension.",
    },
  ],
  sources: [
    { label: "Immigration Bureau: other services (TM30)", url: "https://www.immigration.go.th/?page_id=2237" },
    { label: "Bangkok Immigration extension criteria", url: "https://bangkok.immigration.go.th/en/visa-extension/" },
    { label: "Reported by Forvis Mazars: notification of place of residence (TM30)", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/legal/notification-of-place-of-residence-form-tm30" },
    { label: "Reported by Thai Law Online: TM30 notification", url: "https://www.thailawonline.com/tm30-notification-in-thailand/" },
    { label: "Reported by RWT Law: house master duty within 24 hours", url: "https://www.rwtlaw.co.th/thailand-immigration-recently-ruled-for-house-master-owner-or-the-possessor-of-the-residence-where-the-alien-has-stayed-within-24-hours/" },
    { label: "SIIT International Affairs: TM30 residence report", url: "https://sites.google.com/view/siit-iacr/visa-information/tm-30-residence-report" },
  ],
  related: ["90-day-report-thailand", "how-to-stay-in-thailand-long-term", "retirement-visa-800k-bank-rules"],
  confidence: "medium",
};
