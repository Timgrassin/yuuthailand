"use server";
import { redirect } from "next/navigation";
import { answersSchema } from "@/lib/checker/engine";
import { getRulesVersion } from "@/lib/data";
import { adminDb } from "@/lib/supabase/admin";
import { localePath, type Locale } from "@/lib/seo/site";
import { routes } from "@/lib/seo/routes";

export type SaveState = { error?: "invalid" | "unavailable" };

// Q4: store answers plus the rules version at an unguessable id.
export async function saveCheckerResult(_prev: SaveState, form: FormData): Promise<SaveState> {
  const locale = (form.get("locale") === "th" ? "th" : "en") as Locale;
  const parsed = answersSchema.safeParse(JSON.parse(String(form.get("answers") ?? "{}")));
  if (!parsed.success) return { error: "invalid" };
  const db = adminDb();
  if (!db) return { error: "unavailable" };
  const { data, error } = await db
    .from("checker_results")
    .insert({ answers: parsed.data, rules_version: await getRulesVersion(), locale })
    .select("id")
    .single();
  if (error || !data) return { error: "unavailable" };
  redirect(localePath(routes.checkerResult(data.id), locale) + "?saved=1");
}
