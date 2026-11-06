// Supabase Edge Function: send the double opt-in email for a pending subscriber (D27).
// Called by the Next.js server actions after `subscribe` succeeds. Runs with the service role, so the
// confirm token stays server side. The database decides whether to send (pending only, at most once per
// 10 minutes and 3 times a day), so calling this for any address cannot spam it.
// Secrets (Dashboard > Edge Functions > Secrets): RESEND_API_KEY (required to send),
// EMAIL_FROM (default "Staylong <hello@staylong.co>"), SITE_URL (default https://staylong.co).
// Deployed with verify_jwt = false: the publishable key is not a JWT.

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const LABELS: Record<string, string> = {
  cost_calculator_report: "your Thailand cost estimate",
  dtv_checklist: "the DTV checklist",
  exemption_dates: "your visa exemption dates",
  ninety_day_reminders: "90-day report reminders",
  overstay_options: "your overstay options",
  retirement_800k_plan: "the retirement visa 800,000 THB plan",
  tax_residency_tracker: "the tax residency tracker",
  provider_claim: "your listing claim",
  lead_form: "updates on your enquiry",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function serviceKey(): string | undefined {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}") as Record<string, string>;
    return Object.values(keys)[0];
  } catch {
    return undefined;
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let email = "";
  try {
    email = String((await req.json()).email ?? "").trim().toLowerCase();
  } catch {
    return json({ error: "body" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email) || email.length > 200) return json({ error: "email" }, 400);

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) return json({ sent: false, reason: "not_configured" });

  const url = Deno.env.get("SUPABASE_URL");
  const key = serviceKey();
  if (!url || !key) return json({ sent: false, reason: "no_service_key" }, 500);

  const headers: Record<string, string> = { apikey: key, "content-type": "application/json" };
  if (key.startsWith("eyJ")) headers.authorization = `Bearer ${key}`;
  const claim = await fetch(`${url}/rest/v1/rpc/claim_confirmation_email`, { method: "POST", headers, body: JSON.stringify({ p_email: email }) });
  if (!claim.ok) return json({ sent: false, reason: "claim_failed" }, 502);
  const rows = (await claim.json()) as { email: string; confirm_token: string; unsubscribe_token: string; lead_magnet: string | null }[];
  const row = rows[0];
  if (!row) return json({ sent: false, reason: "not_due" });

  const site = (Deno.env.get("SITE_URL") ?? "https://staylong.co").replace(/\/$/, "");
  const confirmUrl = `${site}/subscribe/confirm?token=${row.confirm_token}`;
  const unsubscribeUrl = `${site}/unsubscribe?token=${row.unsubscribe_token}`;
  const oneClickUrl = `${site}/api/unsubscribe?token=${row.unsubscribe_token}`;
  const what = LABELS[row.lead_magnet ?? ""] ?? "Staylong emails";

  const text = [
    "Hi,",
    "",
    `Someone, hopefully you, entered this address on staylong.co to get ${what}.`,
    "Please confirm it. We will not email you again until you do.",
    "",
    `Confirm: ${confirmUrl}`,
    "",
    "Once confirmed, we also email you when the Thai visa rules you looked at change. One click unsubscribes.",
    "If this was not you, ignore this email.",
    "",
    "Staylong, verified long-stay Thailand directory",
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#FAF8F3;font-family:Arial,Helvetica,sans-serif;color:#17201D">
<div style="max-width:520px;margin:0 auto;padding:32px 24px">
<p style="font-size:20px;font-weight:700;margin:0 0 24px">Staylong</p>
<p style="font-size:16px;line-height:1.55;margin:0 0 16px">Someone, hopefully you, entered this address on staylong.co to get ${esc(what)}. Please confirm it. We will not email you again until you do.</p>
<p style="margin:24px 0"><a href="${esc(confirmUrl)}" style="display:inline-block;background:#0F5246;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 22px;border-radius:10px">Confirm my email</a></p>
<p style="font-size:14px;line-height:1.5;color:#47514C;margin:0 0 12px">Once confirmed, we also email you when the Thai visa rules you looked at change. One click unsubscribes.</p>
<p style="font-size:14px;line-height:1.5;color:#47514C;margin:0 0 24px">If this was not you, ignore this email.</p>
<p style="font-size:13px;color:#626C67;margin:0">Staylong, verified long-stay Thailand directory · <a href="${esc(unsubscribeUrl)}" style="color:#626C67">Unsubscribe</a></p>
</div></body></html>`;

  const send = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: Deno.env.get("EMAIL_FROM") ?? "Staylong <hello@staylong.co>",
      to: [row.email],
      subject: "Confirm your email for Staylong",
      text,
      html,
      headers: { "List-Unsubscribe": `<${oneClickUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    }),
  });
  if (!send.ok) return json({ sent: false, reason: "resend_failed", status: send.status }, 502);
  return json({ sent: true });
});
