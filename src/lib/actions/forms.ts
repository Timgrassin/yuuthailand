"use server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { kickOutbox } from "@/lib/email/outbox";
import { publicDb } from "@/lib/supabase/public";

export type FormState = { ok?: boolean; error?: "invalid" | "unavailable" | "rate" | "expired"; fields?: string[] };

async function ipHash() {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  return ip ? createHash("sha256").update(ip + (process.env.LEAD_IP_SALT ?? "staylong")).digest("hex") : "";
}

const dbError = (code?: string): FormState["error"] => (code === "53400" ? "rate" : code === "22023" ? "invalid" : "unavailable");

const privacySchema = z.object({
  email: z.string().trim().email().max(200),
  kind: z.enum(["delete", "access", "correct", "withdraw", "other"]),
  details: z.string().trim().max(2000).optional(),
});

// PDPA requests (migration 0034). Stored, acknowledged by email, handled by hand within 30 days.
export async function submitPrivacyRequest(_prev: FormState, form: FormData): Promise<FormState> {
  if (form.get("company_website")) return { ok: true }; // honeypot
  const parsed = privacySchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "invalid", fields: parsed.error.issues.map((i) => String(i.path[0])) };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const { error } = await db.rpc("submit_privacy_request", { p_email: parsed.data.email, p_kind: parsed.data.kind, p_details: parsed.data.details ?? null, p_ip_hash: await ipHash() });
  if (error) return { error: dbError(error.code) };
  await kickOutbox();
  return { ok: true };
}

const claimSchema = z.object({
  listing: z.string().trim().min(2).max(300),
  full_name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
});

// Listing claims (migration 0034). Nothing changes on a listing until the team checks the claim.
export async function submitProviderClaim(_prev: FormState, form: FormData): Promise<FormState> {
  if (form.get("company_website")) return { ok: true };
  const parsed = claimSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "invalid", fields: parsed.error.issues.map((i) => String(i.path[0])) };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const { error } = await db.rpc("submit_provider_claim", { p: { ...parsed.data, ip_hash: await ipHash() } });
  if (error) return { error: dbError(error.code) };
  await kickOutbox();
  return { ok: true };
}

const token = z.string().regex(/^[0-9a-f]{64}$/);

// One-tap Accept and Decline for providers (migration 0035). The token in the emailed link is the only key.
export async function respondToLead(_prev: FormState, form: FormData): Promise<FormState> {
  const t = token.safeParse(form.get("token"));
  const action = form.get("action");
  if (!t.success || (action !== "accept" && action !== "decline")) return { error: "invalid" };
  const reason = String(form.get("reason") ?? "").trim();
  if (action === "decline" && reason.length < 3) return { error: "invalid", fields: ["reason"] };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const { error } = await db.rpc("respond_to_delivery", { p_token: t.data, p_action: action, p_reason: reason || null });
  if (error) return { error: error.message === "expired" ? "expired" : dbError(error.code) };
  await kickOutbox();
  redirect(`/lead/${t.data}`);
}
