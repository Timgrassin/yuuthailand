"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { publicDb } from "@/lib/supabase/public";

const token = z.string().uuid();

// Double opt-in (D27). The link in the email opens a page with a button, so mail scanners that
// prefetch links cannot confirm or unsubscribe on their own.
export async function confirmSubscription(form: FormData): Promise<void> {
  const t = token.safeParse(form.get("token"));
  const db = publicDb();
  let result = "invalid";
  if (t.success && db) {
    const { data, error } = await db.rpc("confirm_subscription", { p_token: t.data });
    if (!error && typeof data === "string") result = data;
  }
  redirect(`/subscribe/confirm?result=${result}`);
}

export async function unsubscribe(form: FormData): Promise<void> {
  const t = token.safeParse(form.get("token"));
  const db = publicDb();
  let ok = false;
  if (t.success && db) {
    const { data, error } = await db.rpc("unsubscribe", { p_token: t.data });
    ok = !error && data === true;
  }
  redirect(`/unsubscribe?result=${ok ? "done" : "invalid"}`);
}
