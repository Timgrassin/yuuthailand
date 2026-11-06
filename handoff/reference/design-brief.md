# Design brief: [BRAND], the verified guide to staying long in Thailand

## Your role
You are a senior product designer for trust-heavy consumer decisions (visas, finance, health). Design a mobile-first web experience that a nervous foreigner will trust with a visa decision worth months of their life and 500,000 THB of savings held in the bank as proof of funds.

## The product in one paragraph
[BRAND] helps foreigners find a legal way to stay in Thailand for months, not weeks. Since 15 September 2026, most passports get only 30 days visa-free, plus one 30-day extension. The main long-stay route is the Destination Thailand Visa (DTV): 5 years, multiple entry, 180 days per entry. People qualify through remote work (Workcation) or Thai soft power activities: Muay Thai training, Thai cooking courses, sports training, medical treatment, seminars and festivals. Soft-power applicants need a genuine, long enrollment (often 9 months or more) with a recognized provider. [BRAND] tells people which route fits them, what their specific embassy asks for, and which verified gyms, schools and clinics provide the right documents. We earn money when a provider receives a qualified enquiry, so the experience must turn confusion into a confident enquiry.

## Who we design for
1. Maya, 34, UX freelancer from Germany. She used to live on 60-day exemptions in Chiang Mai. The 30-day rule broke her routine. She earns abroad and wonders whether Workcation or Muay Thai is safer at the Berlin embassy.
2. Jake, 26, Australian. He wants 9 to 12 months of serious Muay Thai in Phuket and needs a gym whose paperwork gets approved.
3. Lina, 41, Dutch. She is starting a 10-month dental and rehab plan in Bangkok and wants to know if medical treatment qualifies.
4. The Rossi family, relocating to Bangkok: one parent holds the DTV, the spouse and two kids come as dependents.
5. Khun Nok, owner of a mid-size Muay Thai gym. She wants serious long-term students, not time-wasters, and reads enquiries on her phone in LINE.

Their emotional state: anxious, overloaded by contradictory Facebook group advice, afraid of a rejected application and a lost 10,000 THB fee. They want certainty, sources and one clear next step. Most browse on phones, often from abroad, in short sessions.

## Brand direction
Working name: [BRAND]. If no name is set, propose 5 names (short, ownable, no DTV in the name, easy for Thai providers to say), pick one and design with it.
Personality: calm authority with Thai warmth. Think of a well-run visa desk crossed with a great travel guide. Plain words, short sentences, numbers and dates instead of adjectives.
It must not look like a Thai government site: no Garuda, royal or ministry insignia, no official-looking seals, no flag-heavy layouts. We are independent and say so.
Avoid tourist cliches (tuk-tuks, elephants, temples at sunset), backpacker-cheap looks and glossy agency hype. Use real-feeling photos of training, kitchens and city life, sparingly.
Explore 2 visual directions on the home screen first, then commit to one for everything else.

## Screens to design
Design every screen at 390px mobile and 1440px desktop. Use realistic sample data with fictional provider names.

1. Home
   - Headline answers the real question, for example: Staying longer than 30 days? Find your legal route.
   - Primary action: start the route checker. Secondary: browse by activity and city.
   - Trust strip: verified providers count, embassy reports collected, rules last checked date.
   - What changed module: latest rule changes with dates and sources.
   - Browse grid: Muay Thai, Thai cooking, medical treatment, Workcation, visa agents, across Bangkok, Phuket, Chiang Mai, Pattaya and Koh Samui.

2. Route checker (one question per screen, 6 to 8 steps)
   - Steps: passport nationality; country you will apply from (the embassy follows citizenship or legal residence); income source; savings range against the 500,000 THB benchmark; what you want to do; preferred city; how long you want to stay; travelling with family.
   - Progress bar, back button, a short why-we-ask helper on each step, no account needed.
   - Results: routes ranked Strong, Possible or Not a fit, each with a one-sentence reason; embassy-specific notes with source links and last-verified dates; a personal document checklist; 3 matched providers; save or email results; a plain not-legal-advice line that does not read like fine print.

3. Activity x city listing (example: Muay Thai programs for the DTV in Phuket)
   - Filters: program length (6, 9, 12+ months), monthly budget, level (beginner to fighter), accommodation included, DTV documents provided, accreditation (Sports Authority of Thailand, Ministry of Education), languages.
   - Mobile filters in a bottom sheet, desktop filters in a left rail. List and map toggle.
   - Card: name, area, verification state, price per month and total, minimum months, documents provided (icons and count), approvals reported by students, reply time, add to compare.
   - Sort: best match, price, most approvals reported, fastest reply. A comparison tray that stays visible while scrolling.

4. Provider profile
   - Hero with photos, verification badge, area, languages.
   - Verification panel: accreditation body, reference number, date we verified it, and what verified means (link to methodology).
   - Programs table with a total cost calculator: program, DTV fee, estimated insurance, optional accommodation. THB first, with an approximate USD or EUR toggle.
   - Documents this provider gives you: enrollment letter, payment receipt, training schedule, business license copy, and so on.
   - Embassy outcomes reported by students (approved or rejected, by embassy and month).
   - Reviews from verified students only, map, FAQs.
   - Sticky mobile CTA: Request enrollment pack. Secondary: chat on WhatsApp or LINE.

5. Compare (2 to 4 providers): rows for price, length, documents, accreditation, approvals reported, accommodation and reply time, with differences highlighted.

6. Embassy page (example: Royal Thai Embassy, London)
   - Requirements table, each line sourced and dated.
   - Known quirks: minimum course length, funds evidence, and the 31 Aug 2026 rules on proof of permanent residence and a criminal record certificate.
   - Reported processing times, an outcomes timeline, and a Report your outcome flow (3 steps, optional proof upload, moderation note).

7. Enquiry flow
   - Short form: name, email, WhatsApp or LINE, start month, program interest, embassy, and two consent checkboxes (share with up to 3 providers; receive rule-change alerts).
   - Confirmation: reference code, a timeline of what happens next (provider replies within X hours), and buttons to continue on WhatsApp or LINE with the code prefilled.

8. Rule changes timeline: dated entries, what changed, who it affects, source link, subscribe to alerts.

9. Guide article template: table of contents, key facts box, sourced claims, last reviewed date and reviewer, related providers module.

10. For providers
   - Landing page: why list, how billing per qualified enquiry works, claim your listing.
   - Provider portal lead inbox on mobile: new enquiry card with a fit summary, accept or decline with a reason, reply on LINE or WhatsApp in one tap, monthly statement.

11. Admin lead board (low fidelity is fine): columns New, Qualified, Sent, Accepted, Enrolled, Disputed.

## Components and states to define
- Verification badge states: Unverified, Contacted, Verified (with date), Partner (paid relationship, clearly labeled), Suspended.
- A last-checked chip and a source footnote style, used on every rule or requirement.
- Route result card in three states: Strong, Possible, Not a fit.
- Price display: THB primary, converted currency secondary.
- Filter chips, bottom sheet, map pins and clusters, stepper, comparison tray, sticky mobile CTA, alert banner for new rule changes.
- Empty state (no providers match), loading skeletons, error states, and form progress that survives a dropped connection.

## Content rules
- Plain English at a grade 8 reading level, sentences under 20 words.
- Never promise visa approval. Never say guaranteed. Never imply we are the government.
- Every rule statement shows its source and the date we checked it.
- Paid relationships carry a Partner label. A methodology page explains ranking.

## Accessibility and performance
WCAG 2.2 AA contrast, 16px minimum body text, 44px tap targets, visible focus states, no meaning carried by color alone. Design for fast pages: light imagery, one variable web font at most, no autoplay video.

## Deliverables
1. Two home screen directions, then the chosen direction applied to every screen above, mobile and desktop.
2. A design system: color tokens (light mode first), type scale, spacing, radius, shadows, iconography, and every component with its states.
3. Short handoff notes per screen: responsive behavior, interactions, empty and error states, and the data each element needs.
Name artboards so a developer can map them to routes (01-Home-Mobile, 01-Home-Desktop, and so on).
