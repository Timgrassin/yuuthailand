"use server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { requestConfirmationEmail } from "@/lib/email/confirmation";
import { kickOutbox } from "@/lib/email/outbox";
import { publicDb } from "@/lib/supabase/public";

export type LeadState = { ok?: boolean; error?: "invalid" | "unavailable" | "rate"; fields?: string[] };

const opt = (s: z.ZodString) => s.optional().or(z.literal(""));
const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: opt(z.string().trim().max(40)),
  line_id: opt(z.string().trim().max(60)),
  nationality: opt(z.string().trim().toUpperCase().length(2)),
  track: opt(z.string().trim().max(40)),
  city_id: opt(z.string().uuid()),
  provider_id: opt(z.string().uuid()),
  checker_result_id: opt(z.string().uuid()),
  start_month: opt(z.string().regex(/^\d{4}-\d{2}$/)),
  message: opt(z.string().trim().max(2000)),
  consent: z.literal("on"),
  marketing: z.literal("on").optional(),
  source_path: z.string().max(300).optional(),
});

async function client() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  return {
    ip_hash: ip ? createHash("sha256").update(ip + (process.env.LEAD_IP_SALT ?? "staylong")).digest("hex") : "",
    user_agent: h.get("user-agent")?.slice(0, 300) ?? "",
    referer: h.get("referer") ?? "",
  };
}

// Leads go through submit_lead (migration 0026): consent, validation and rate limits live in the database.
export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  if (form.get("company_website")) return { ok: true }; // honeypot
  const parsed = leadSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "invalid", fields: parsed.error.issues.map((i) => String(i.path[0])) };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const c = await client();
  const { error } = await db.rpc("submit_lead", { p: { ...parsed.data, source_path: parsed.data.source_path || new URL(c.referer || "http://x/").pathname, ip_hash: c.ip_hash, user_agent: c.user_agent } });
  if (error) return { error: error.code === "53400" ? "rate" : error.code === "22023" ? "invalid" : "unavailable" };
  if (parsed.data.marketing === "on") await requestConfirmationEmail(parsed.data.email); // submit_lead subscribed them as pending
  await kickOutbox(); // acknowledgement to the person, alert to the team, and any provider emails (migration 0035)
  return { ok: true };
}

export type SubscribeState = { ok?: boolean; error?: "invalid" | "unavailable" };

// Email capture for tools and guides. Stores the lead magnet and context for segmentation.
export async function subscribe(_prev: SubscribeState, form: FormData): Promise<SubscribeState> {
  if (form.get("company_website")) return { ok: true };
  const email = z.string().trim().email().max(200).safeParse(form.get("email"));
  if (!email.success) return { error: "invalid" };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const c = await client();
  let meta: Record<string, unknown> = {};
  try { meta = JSON.parse(String(form.get("meta") ?? "{}")); } catch { meta = {}; }
  const tracks = String(form.get("tracks") ?? "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8);
  const { error } = await db.rpc("subscribe", {
    p_email: email.data,
    p_source_path: c.referer ? new URL(c.referer).pathname : null,
    p_lead_magnet: String(form.get("lead_magnet") ?? "") || null,
    p_tracks: tracks,
    p_meta: meta,
  });
  if (error) return { error: error.code === "22023" ? "invalid" : "unavailable" };
  await requestConfirmationEmail(email.data); // double opt-in (D27): only pending subscribers get it
  return { ok: true };
}
