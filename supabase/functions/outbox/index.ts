// Supabase Edge Function: send queued emails from public.outbox through Resend.
// Rows are queued by database functions (migrations 0034, 0035); this function only renders and sends them,
// so calling it needs no key (verify_jwt = false). pg_cron calls it every 5 minutes; the site also calls it
// right after a form is submitted so emails go out at once.
// Secrets: RESEND_API_KEY (required), EMAIL_FROM (default "Staylong <hello@staylong.co>"), SITE_URL.

type Row = { id: string; kind: string; to_email: string; payload: Record<string, unknown> };
type Mail = { subject: string; lines: string[]; button?: { label: string; url: string }; replyTo?: string };

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const str = (v: unknown) => (v === null || v === undefined || v === "" ? "" : String(v));

const TRACKS: Record<string, string> = {
  dtv: "Destination Thailand Visa (DTV)", ed: "Education visa (ED)", retirement: "Retirement visa (Non-O)", retirement_oa: "Retirement visa (O-A)",
  ltr: "Long-Term Resident visa (LTR)", privilege: "Thailand Privilege visa", marriage: "Marriage visa", work: "Work visa",
};
const KINDS: Record<string, string> = { delete: "delete your data", access: "a copy of your data", correct: "a correction to your data", withdraw: "withdrawal of your consent", other: "a privacy question" };

function serviceKey(): string | undefined {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    return Object.values(JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}") as Record<string, string>)[0];
  } catch {
    return undefined;
  }
}

function summary(p: Record<string, unknown>): string[] {
  return [
    `Visa: ${TRACKS[str(p.track)] ?? (str(p.track) || "Not sure yet")}`,
    `City: ${str(p.city) || "Not given"}`,
    `Nationality: ${str(p.nationality) || "Not given"}`,
    `Start: ${str(p.start_month) || "Not given"}`,
    `Message: ${str(p.message) || "None"}`,
  ];
}

function render(row: Row, site: string): Mail | null {
  const p = row.payload;
  const leadUrl = `${site}/lead/${str(p.token)}`;
  switch (row.kind) {
    case "provider_new_lead":
      return {
        subject: "New request from Staylong",
        lines: [`Hello ${str(p.provider)},`, "Someone asked Staylong for help, and your listing matches. Here is the request without contact details:", ...summary(p),
          "Accept to see their name, email and phone. Decline if it is not a fit and tell us why, and we will offer it to someone else.", "This link works for 7 days."],
        button: { label: "Open the request", url: leadUrl },
      };
    case "provider_reminder":
      return {
        subject: "Reminder: a request is waiting for you on Staylong",
        lines: [`Hello ${str(p.provider)},`, "A request sent to you 12 hours ago is still open. Please accept or decline it so the person is not left waiting.", ...summary(p)],
        button: { label: "Open the request", url: leadUrl },
      };
    case "provider_lead_contact":
      return {
        subject: `Contact details: ${str(p.name)}`,
        lines: [`Hello ${str(p.provider)},`, "Thank you for accepting. Please reply within one working day.", `Name: ${str(p.name)}`, `Email: ${str(p.email)}`,
          ...(p.phone ? [`Phone: ${str(p.phone)}`] : []), ...(p.whatsapp ? [`WhatsApp: ${str(p.whatsapp)}`] : []), ...(p.line_id ? [`LINE: ${str(p.line_id)}`] : []), ...summary(p),
          "Please never promise a visa approval. Only the embassy and Thai Immigration decide."],
        button: { label: "View the request", url: leadUrl },
        replyTo: str(p.email),
      };
    case "lead_received":
      return {
        subject: "We got your request",
        lines: [`Hi ${str(p.first_name) || "there"},`, "Thank you. Staylong received your request:", ...summary(p),
          Number(p.sent) > 0
            ? `We sent it to ${Number(p.sent)} verified provider${Number(p.sent) === 1 ? "" : "s"}, without your contact details. A provider sees your name, email and phone only if it accepts, and we will tell you when one does.`
            : "We only share requests with verified providers, and we are still verifying our first ones. Your request stays with Staylong for now. If a verified provider matches within 14 days, we will share it with them and tell you.",
          "Reply to this email if you want to change or cancel your request."],
      };
    case "lead_matched":
      return {
        subject: `${str(p.provider)} accepted your request`,
        lines: [`Hi ${str(p.first_name) || "there"},`, `${str(p.provider)} accepted your request and now has your contact details. Expect a reply from them soon.`,
          ...(p.website ? [`Their website: ${str(p.website)}`] : []), "Nobody can guarantee a visa. Only the embassy and Thai Immigration decide. Tell us by replying if anything goes wrong."],
      };
    case "privacy_request_received":
      return {
        subject: "We got your privacy request",
        lines: ["Hi,", `Staylong received your request for ${KINDS[str(p.kind)] ?? "a privacy question"}. We will reply to this address within 30 days.`, "If you did not send this request, reply and tell us."],
      };
    case "provider_claim_received":
      return {
        subject: "We got your listing claim",
        lines: ["Hello,", `Thank you for claiming ${str(p.listing)} on Staylong. We will email you about the next steps, usually within a few working days.`,
          "Until then, nothing changes on the listing."],
      };
    case "ops_new_lead":
      return { subject: `[Staylong] New lead, sent to ${str(p.sent)}`, lines: [`Lead ${str(p.id)}`, ...summary(p), `Sent to ${str(p.sent)} provider(s).`] };
    case "ops_delivery_stale":
      return { subject: `[Staylong] No reply after 24 hours: ${str(p.provider)}`, lines: [`Lead ${str(p.lead_id)} has waited 24 hours for ${str(p.provider)}.`] };
    case "ops_privacy_request":
      return { subject: `[Staylong] Privacy request: ${str(p.kind)}`, lines: [`Request ${str(p.id)} from ${str(p.email)}`, `Kind: ${str(p.kind)}`, `Details: ${str(p.details) || "None"}`,
        "Reply within 30 days. To delete everything for this address, run in the Supabase SQL editor:", `select public.erase_person('${str(p.email)}');`], replyTo: str(p.email) };
    case "ops_provider_claim":
      return { subject: `[Staylong] Listing claim: ${str(p.listing)}`, lines: [`Claim ${str(p.id)}`, `Listing: ${str(p.listing)}`, `Matched: ${str(p.matched) || "No match, check by hand"}`,
        `From: ${str(p.full_name)} (${str(p.role) || "no role given"})`, `Email: ${str(p.email)}`, `Phone: ${str(p.phone) || "None"}`, `Message: ${str(p.message) || "None"}`], replyTo: str(p.email) };
    default:
      return null;
  }
}

function html(m: Mail): string {
  const body = m.lines.map((l) => `<p style="font-size:15px;line-height:1.55;margin:0 0 12px">${esc(l)}</p>`).join("");
  const btn = m.button ? `<p style="margin:20px 0"><a href="${esc(m.button.url)}" style="display:inline-block;background:#0F5246;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 22px;border-radius:10px">${esc(m.button.label)}</a></p>` : "";
  return `<!doctype html><html><body style="margin:0;background:#FAF8F3;font-family:Arial,Helvetica,sans-serif;color:#17201D"><div style="max-width:560px;margin:0 auto;padding:32px 24px"><p style="font-size:20px;font-weight:700;margin:0 0 24px">Staylong</p>${body}${btn}<p style="font-size:13px;color:#626C67;margin:24px 0 0">Staylong, Thailand long-stay visas and providers. Not a law firm or a government agency.</p></div></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const url = Deno.env.get("SUPABASE_URL");
  const key = serviceKey();
  if (!resendKey) return json({ sent: 0, reason: "not_configured" });
  if (!url || !key) return json({ sent: 0, reason: "no_service_key" }, 500);
  const headers: Record<string, string> = { apikey: key, "content-type": "application/json" };
  if (key.startsWith("eyJ")) headers.authorization = `Bearer ${key}`;
  const rpc = (fn: string, body: unknown) => fetch(`${url}/rest/v1/rpc/${fn}`, { method: "POST", headers, body: JSON.stringify(body) });

  const claim = await rpc("claim_outbox", { p_limit: 20 });
  if (!claim.ok) return json({ sent: 0, reason: "claim_failed", status: claim.status }, 502);
  const rows = (await claim.json()) as Row[];
  const site = (Deno.env.get("SITE_URL") ?? "https://staylong.co").replace(/\/$/, "");
  const from = Deno.env.get("EMAIL_FROM") ?? "Staylong <hello@staylong.co>";
  let sent = 0;
  for (const row of rows) {
    const m = render(row, site);
    if (!m) {
      await rpc("finish_outbox", { p_id: row.id, p_error: `unknown kind ${row.kind}` });
      continue;
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json", "idempotency-key": row.id },
      body: JSON.stringify({ from, to: [row.to_email], subject: m.subject, text: [...m.lines, ...(m.button ? [`${m.button.label}: ${m.button.url}`] : [])].join("\n\n"), html: html(m), ...(m.replyTo ? { reply_to: m.replyTo } : {}) }),
    });
    await rpc("finish_outbox", { p_id: row.id, p_error: res.ok ? null : `resend ${res.status}: ${(await res.text()).slice(0, 300)}` });
    if (res.ok) sent++;
  }
  return json({ sent, claimed: rows.length });
});
