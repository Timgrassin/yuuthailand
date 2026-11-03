"use server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { adminDb } from "@/lib/supabase/admin";

export type LeadState = { ok?: boolean; error?: "invalid" | "unavailable" | "rate" ; fields?: string[] };

const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  line_id: z.string().trim().max(60).optional().or(z.literal("")),
  nationality: z.string().trim().toUpperCase().length(2).optional().or(z.literal("")),
  track: z.string().trim().max(40).optional().or(z.literal("")),
  city_id: z.string().uuid().optional().or(z.literal("")),
  provider_id: z.string().uuid().optional().or(z.literal("")),
  checker_result_id: z.string().uuid().optional().or(z.literal("")),
  start_month: z.string().regex(/^\d{4}-\d{2}$/).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal("on"),
  marketing: z.literal("on").optional(),
  locale: z.enum(["en", "th"]),
  source_path: z.string().max(300).optional(),
});

const empty = (v?: string) => (v ? v : null);

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Honeypot: bots fill every field.
  if (form.get("company_website")) return { ok: true };
  const parsed = leadSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "invalid", fields: parsed.error.issues.map((i) => String(i.path[0])) };
  const d = parsed.data;
  const db = adminDb();
  if (!db) return { error: "unavailable" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = ip ? createHash("sha256").update(ip + (process.env.LEAD_IP_SALT ?? "yuu")).digest("hex") : null;

  // Rate limit: 5 requests per IP per hour.
  if (ipHash) {
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await db.from("leads").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
    if ((count ?? 0) >= 5) return { error: "rate" };
  }

  // Consent: point at the exact published text shown on the form.
  const { data: consent } = await db.from("consent_texts").select("id").eq("key", "lead_form").eq("locale", d.locale).not("published_at", "is", null).order("version", { ascending: false }).limit(1).single();
  if (!consent) return { error: "unavailable" };

  const { error } = await db.from("leads").insert({
    full_name: d.full_name,
    email: d.email,
    phone: empty(d.phone),
    line_id: empty(d.line_id),
    nationality: empty(d.nationality),
    track: empty(d.track),
    city_id: empty(d.city_id),
    checker_result_id: empty(d.checker_result_id),
    start_month: d.start_month ? `${d.start_month}-01` : null,
    message: empty(d.message),
    answers: d.provider_id ? { requested_provider_id: d.provider_id } : {},
    locale: d.locale,
    consent_text_id: consent.id,
    marketing_opt_in: d.marketing === "on",
    source_path: d.source_path ?? null,
    ip_hash: ipHash,
    user_agent: h.get("user-agent")?.slice(0, 300) ?? null,
  });
  if (error) { console.error("[lead]", error); return { error: "unavailable" }; }
  return { ok: true };
}
