# Staylong: founder to-do list

Updated 6 Nov 2026. Items are in priority order. DNS for staylong.co is at Namecheap (Domain List, staylong.co, Advanced DNS), not Vercel. The Vercel project is named `yuu`. Each one takes 2 to 20 minutes unless noted.

| # | Item | Time | Blocks |
|---|---|---|---|
| 1 | ~~Run the listings cleanup SQL~~ Done 6 Nov | 2 min | Clean names and slugs on 15 Bangkok pages |
| 2 | ~~Add `LEAD_IP_SALT` in Vercel~~ Done 6 Nov | 3 min | Private IP hashing for leads |
| 3 | ~~Google Search Console + sitemap~~ Done 6 Nov | 15 min | Google indexing |
| 4 | ~~Bing Webmaster Tools + sitemap~~ Done 6 Nov | 5 min | Bing, ChatGPT search, Copilot |
| 5 | Set up Resend: domain + DNS done 6 Nov; **API key left (steps 6-7)** | 5 min | Every email capture on the site |
| 6 | Book an expert reviewer | 1 to 3 days | "Pending expert review" badges, E-E-A-T |
| 7 | Legal review of consent text v1 (CSV ready: `docs/legal/consent-texts-v1.csv`) | 1 to 5 days | Lawful lead capture under PDPA |
| 8 | ~~Decide three open questions~~ Defaults applied 6 Nov; **run `cleanup-2026-11-06.sql`** | 2 min | Lead flow and directory quality |
| 9 | Upload the `/handoff` design files | 5 min | Final design tokens |
| 10 | Pick an owner email and move accounts | 30 min | Bus factor, billing |
| 11 | ~~Upgrade Supabase to Pro~~ Org already on Pro (checked 6 Nov); confirm backups | 2 min | Backups, no auto-pause |
| 12 | Check Apify spend | 2 min | Budget |

## Status 6 Nov 2026 (Claude)

- **2.** `LEAD_IP_SALT` added to Vercel project `yuu` as Sensitive, Production + Preview, with a "never change" comment. Production redeployed.
- **3.** Domain property `staylong.co` verified by TXT at Namecheap. Sitemap `https://staylong.co/sitemap.xml` submitted (1,106 URLs; Search Console first shows "Couldn't fetch" for new properties, recheck in a day). Indexing requested for `/`, `/visa-rules`, `/places`, `/immigration-offices`, `/tools`. Step 9 (add owner email) waits for item 10.
- **4.** Imported from Search Console as `https://staylong.co/`. Sitemap submitted. The same five URLs submitted.
- **5.** `staylong.co` added to Resend (Tokyo, ap-northeast-1). Records added at Namecheap: TXT `resend._domainkey` (DKIM), CNAME `rsend` and CNAME `send` (sending), TXT `_dmarc` `v=DMARC1; p=none;`. The receiving MX on `@` was not added: it would replace Namecheap email forwarding. **Your part:** steps 6 and 7 (create the `staylong-vercel` key with sending access and add `RESEND_API_KEY` in Vercel), then tell Claude "Resend done".
- **6.** Candidate shortlist and a draft email: `docs/reviewer-shortlist.md`. You send it.
- **7.** Consent texts exported to `docs/legal/consent-texts-v1.csv`. Ask the lawyer to also fix: `lead_form` v1 still says "Yuu" instead of Staylong, and `subscribe` v1 only covers visa-rule-change emails, not lead-magnet emails.
- **8.** Defaults applied. (1) A: lead details after accept, unchanged. (2) A: public lists, city and place pages and MCP `find_providers` now leave out unverified listings with no facts and no description (`src/lib/listing.ts`). That hides 3,335 of 4,194 listings; 859 stay listed. Pages still resolve, noindex. (3) A: delete SQL in `supabase/seed-data/cleanup-2026-11-06.sql` for Knight Visa Phuket, Knight Visa Udon Thani, Visatogo Khon Kaen. **Your part:** run it in the SQL Editor like item 1. Other Knight Visa and Visatogo branches (Bangkok, Korat, Ubon, Chiang Mai, Pattaya, Phuket, Bangkok Asia) were not named and are kept; all but Knight Visa Services Ubon (3 facts) are now hidden by (2). A future rescrape can re-import deleted places.
- **9.** Not done: the handoff files are not on this machine.
- **10.** Not done: needs your choice of mailbox provider and an account in your name.
- **11.** Organization "Private Projects" is already on Pro. Optional: confirm daily backups and rename the project `yuu` to `staylong` in the dashboard.
- **12.** Not done: Apify console needs your sign-in.

---

## 1. Run the listings cleanup SQL

Fixes 15 names and slugs, deletes 5 non-providers (a stadium, two immigration offices, an airline office, a travel agency), and resets one wrong price. It only touches Unverified rows.

1. Open the SQL file on GitHub: https://github.com/Timgrassin/yuuthailand/blob/main/supabase/seed-data/cleanup-2026-11-05.sql
2. Click the "Copy raw file" icon (two squares, top right of the file).
3. Open the Supabase SQL Editor: https://supabase.com/dashboard/project/fbopazqtgbukzdgbwlzf/sql/new
4. Paste into the editor.
5. Click **Run** (or press Cmd+Enter).
6. Expected result: "Success. No rows returned".
7. Tell me "cleanup done". I will check the rows and confirm.

---

## 2. Add `LEAD_IP_SALT` in Vercel

Lead IPs are stored as a SHA-256 hash. Without this variable the salt is a public default, so the hash can be reversed.

1. On your Mac, open Terminal and run `openssl rand -hex 32`. Copy the output.
2. Open https://vercel.com/dashboard, select the **yuu** project.
3. Go to **Settings**, then **Environment Variables**.
4. Key: `LEAD_IP_SALT`. Value: the string from step 1.
5. Environments: tick **Production** and **Preview**. Tick **Sensitive**.
6. Click **Save**.
7. Go to **Deployments**, open the top Production deployment, click the three dots, then **Redeploy**.
8. Never change this value later. A new salt breaks duplicate-lead detection for old leads.

---

## 3. Google Search Console and sitemap

1. Open https://search.google.com/search-console and sign in with the Google account that will own the site.
2. Click **Add property**. Choose **Domain** (left box). Enter `staylong.co`. Click **Continue**.
3. Google shows a TXT record starting with `google-site-verification=`. Click **Copy**.
4. Add the TXT record where the domain's DNS lives:
   1. Namecheap, **Domain List**, `staylong.co`, **Advanced DNS**, **Add New Record**.
   2. Name: leave empty (or `@`). Type: `TXT`. Value: the copied string. TTL: default. Click **Add**.
5. Back in Search Console, click **Verify**. If it fails, wait 10 minutes and click Verify again.
6. In the left menu, click **Sitemaps**. Enter `sitemap.xml` and click **Submit**. Status should read "Success".
7. In the left menu, click **URL inspection**. Paste `https://staylong.co/` and click **Request indexing**.
8. Repeat step 7 for these pages, which carry the most traffic potential:
   1. `https://staylong.co/visa-rules`
   2. `https://staylong.co/places`
   3. `https://staylong.co/immigration-offices`
   4. `https://staylong.co/tools`
9. Settings, **Users and permissions**: add the owner email from item 10 as Owner.

---

## 4. Bing Webmaster Tools and sitemap

Bing feeds ChatGPT search, Copilot and DuckDuckGo. This matters for AI citations.

1. Open https://www.bing.com/webmasters and sign in.
2. Choose **Import from Google Search Console** (needs item 3 done). Approve access. Select `staylong.co`. Click **Import**.
3. If import is not offered: **Add site**, enter `https://staylong.co`, choose **DNS / CNAME** verification and add the record the same way as item 3, step 4.
4. Open **Sitemaps**, click **Submit sitemap**, enter `https://staylong.co/sitemap.xml`.
5. Open **URL Submission** and submit `https://staylong.co/`.

---

## 5. Set up Resend

Email captures are stored but no email is sent. Every lead magnet on the site depends on this.

1. Open https://resend.com/signup and sign up with the owner email from item 10.
2. Go to **Domains**, click **Add Domain**. Enter `staylong.co`. Region: **Tokyo (ap-northeast-1)**, the closest to Bangkok.
3. Resend shows 3 to 4 DNS records (MX, TXT for SPF, TXT for DKIM, optional DMARC).
4. Add each record in Namecheap: **Domain List**, `staylong.co`, **Advanced DNS**, **Add New Record**. Copy Name, Type, Value and Priority exactly as Resend shows them.
5. Back in Resend, click **Verify DNS Records**. Wait until every record shows "Verified" (5 to 60 minutes).
6. Go to **API Keys**, click **Create API Key**. Name: `staylong-vercel`. Permission: **Sending access**. Domain: `staylong.co`. Click **Add**. Copy the key (starts with `re_`). Resend shows it once.
7. In Vercel: **Settings**, **Environment Variables**. Key: `RESEND_API_KEY`. Value: the key. Environments: **Production** only. Tick **Sensitive**. Save.
8. Do not paste the key in chat. Tell me "Resend done". I will build the sending code (welcome email per lead magnet, double opt-in) and redeploy.

---

## 6. Book an expert reviewer

Visa pages show "Pending expert review" until a named expert signs off. Google and AI engines weight named reviewers heavily for visa and legal topics. A reminder fires in this session on 10 Nov 2026 at 09:00 Bangkok time.

1. Shortlist 2 Thai immigration lawyers or licensed visa consultants. Good sources: Thai Bar Association members who publish in English, firms already on the site with verified facts, or LinkedIn search "Thailand immigration lawyer".
2. Offer a fixed fee for one review pass. Scope: about 12 visa tracks and the rules table.
3. Send them two links:
   1. Research file: https://github.com/Timgrassin/yuuthailand/blob/main/docs/visa-rules-research.md
   2. Live rules: https://staylong.co/visa-rules
4. Ask for three things back:
   1. A list of corrections, one line per rule (rule name, current value, correct value, source).
   2. Their full name, role and firm, exactly as they want it shown.
   3. Written OK to show their name on the site.
5. Forward the reply to me as-is. I will apply corrections in `rules`, set `reviewed_at` and `reviewed_by`, and replace `[REVIEWER NAME]` and `[ROLE]`.

---

## 7. Legal review of consent text v1

Leads and email captures pin a consent text version. v1 is a draft and is not legally reviewed. Thailand's PDPA applies.

1. Open the Supabase SQL Editor: https://supabase.com/dashboard/project/fbopazqtgbukzdgbwlzf/sql/new
2. Run: `select key, version, body from public.consent_texts order by key, version;`
3. Click **Export**, then **Download CSV**.
4. Send the CSV to a Thai lawyer who handles PDPA. The reviewer from item 6 may cover this. Ask for:
   1. Corrected text for each key.
   2. Whether Staylong needs a Data Protection Officer or a privacy notice in Thai.
5. Forward the corrected text to me. I will publish it as v2. v1 stays frozen for existing leads, by design.

---

## 8. Decide three open questions

Reply with the letter for each. Defaults are in bold and apply if you say nothing.

1. **D10, lead contact details.** Providers see a lead's email and phone:
   1. **A. Only after they accept the delivery (current build).**
   2. B. Immediately on delivery.
2. **Off-audience listings.** About half of the 4,144 scraped listings do not serve foreigners: kids' tutoring, study-abroad agents, outbound visas, corporate law. They are noindex but still show in city lists and the MCP `find_providers` tool.
   1. **A. Hide listings with 0 facts from public lists and the MCP tool. Keep them in the database for later.**
   2. B. Delete them.
   3. C. Leave as is.
3. **Knight Visa (Phuket, Udon) and Visatogo Khon Kaen.** Flagged earlier as off-audience.
   1. **A. Delete.**
   2. B. Keep.

---

## 9. Upload the `/handoff` design files

The site uses placeholder tokens (Fraunces, Inter, ink, jade, saffron) until the design handoff lands.

1. Open https://github.com/Timgrassin/yuuthailand
2. Click **Add file**, then **Upload files**.
3. Drag the whole handoff folder in. The path must start with `handoff/`, for example `handoff/yuu.css`. If GitHub drops the folder name, rename the folder to `handoff` locally and drag the folder, not its contents.
4. Commit message: `Add design handoff`. Choose **Commit directly to the main branch**. Click **Commit changes**.
5. Tell me "handoff uploaded". I will apply `yuu.css` to `src/app/globals.css` and redeploy.

---

## 10. Pick an owner email and move accounts

Every service is on personal logins today. Use one role address so the business is not tied to one inbox.

1. Create a mailbox such as `ops@staylong.co`. Fastest: Google Workspace (https://workspace.google.com), add domain `staylong.co`, add its MX records in Namecheap the same way as item 5, step 4 (this replaces Namecheap email forwarding). Do this before item 5 so Resend's MX records do not clash: Resend uses the `send` subdomain, Workspace uses the root.
2. Add the address as owner or admin on each service:
   1. GitHub: https://github.com/Timgrassin/yuuthailand/settings/access, **Add people**. Or move the repo to a GitHub organization: **Settings**, **Danger Zone**, **Transfer**.
   2. Vercel: team **Settings**, **Members**, **Invite**, role **Owner**.
   3. Supabase: https://supabase.com/dashboard/org/_/team, **Invite**, role **Owner**.
   4. Resend: **Settings**, **Team**, **Invite**.
   5. LINE Official Account: https://manager.line.biz, **Settings**, **Permissions**, **Add**, role **Admin**.
   6. Apify: **Settings**, **Organization**, **Members**.
   7. Google Search Console and Bing: see item 3, step 9.
3. Turn on 2FA for the new address on every service.

---

## 11. Upgrade Supabase to Pro at launch

Free projects pause after 7 days without traffic and have no daily backups.

1. Open https://supabase.com/dashboard/org/_/billing
2. Select the organization that owns project `yuu` (ref `fbopazqtgbukzdgbwlzf`).
3. Click **Change subscription plan**, choose **Pro** (USD 25 per month plus compute). Confirm.
4. Open the project, go to **Database**, **Backups**, and confirm daily backups are listed.
5. Optional: **Settings**, **General**, rename the project from `yuu` to `staylong`.

---

## 12. Check Apify spend

The 5 Nov full scrape ran 31 Google Maps actor runs.

1. Open https://console.apify.com/billing
2. Read **Current usage** for this month.
3. Set a limit: **Billing**, **Limits**, set a monthly maximum (for example USD 100). This stops a runaway rescrape.
4. Future rescrapes are manual only (`schools.yml`). Nothing runs on a schedule.

---

## Handled by Claude, no action needed

`fx_rates` is empty, so the checker uses a 33 THB per USD fallback. Claude will seed it from the Bank of Thailand reference rate.

The MCP registry name `io.github.Timgrassin/staylong` can move to `co.staylong/staylong` later. It needs one key pair stored as a GitHub secret. Ask Claude when you want it.
