# Consent texts v2: draft for legal review

Drafted 6 Nov 2026 by Claude for the PDPA lawyer to correct. Not published. v1 stays frozen for existing leads and subscribers; the lawyer's corrected wording is published as v2 (see `docs/founder-todo.md`, item 7).

v1 is in `consent-texts-v1.csv`.

## Problems with v1

1. `lead_form` v1 names the old brand "Yuu" three times.
2. `subscribe` v1 only covers emails about visa rule changes. Every tool, guide, visa and country page offers a named lead magnet (a checklist or guide by email, D20), and Resend will send a welcome email per lead magnet. v1 does not cover those emails.
3. Neither text says where data is stored or who processes it.

## Draft: `lead_form` v2

> I agree that Staylong may share my name, contact details and request with up to three providers listed on Staylong so they can reply to this request. Staylong keeps this data for 24 months and deletes it sooner if I ask by replying to any Staylong email. I can withdraw my consent at any time.

## Draft: `subscribe` v2

> Email me what I asked for on this page, and tell me when Thailand long-stay visa rules change. Staylong uses my email address only for this and does not share it. I can unsubscribe with one click in any email.

## Facts the lawyer needs

- Controller: Staylong (staylong.co). Legal entity and address: [FOUNDER TO FILL].
- Database: Supabase, Singapore region (ap-southeast-1).
- Email sending: Resend, Tokyo region (ap-northeast-1). Resend is a US company.
- Hosting: Vercel, functions in Singapore (sin1).
- Lead IPs are stored only as a salted SHA-256 hash, used to detect duplicate leads.
- Providers see a lead's contact details only after they accept the delivery (D10).
- Subscribers confirm by clicking a link in a first email (double opt-in) before any other email is sent.

## Questions for the lawyer

1. Do the two texts meet PDPA consent requirements as worded? Please correct the wording.
2. Do cross-border transfers to Singapore, Japan and the US need a separate line in the consent text, or is the privacy notice enough?
3. Does Staylong need a Data Protection Officer?
4. Is a Thai-language privacy notice required, given the site is English-only (D15)?
5. Is a 24-month retention period for leads acceptable?
