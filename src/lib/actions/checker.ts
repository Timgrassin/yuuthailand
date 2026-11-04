"use server";
import { redirect } from "next/navigation";
import { answersSchema } from "@/lib/checker/engine";
import { publicDb } from "@/lib/supabase/public";
import { routes } from "@/lib/seo/routes";

export type SaveState = { error?: "invalid" | "unavailable" };

// Q4: store answers plus the rules version at an unguessable id (save_checker_result, migration 0026).
export async function saveCheckerResult(_prev: SaveState, form: FormData): Promise<SaveState> {
  const parsed = answersSchema.safeParse(JSON.parse(String(form.get("answers") ?? "{}")));
  if (!parsed.success) return { error: "invalid" };
  const db = publicDb();
  if (!db) return { error: "unavailable" };
  const { data, error } = await db.rpc("save_checker_result", { p_answers: parsed.data });
  if (error || !data) return { error: "unavailable" };
  redirect(routes.checkerResult(String(data)) + "?saved=1");
}
