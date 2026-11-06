import { publicDb } from "@/lib/supabase/public";

// RFC 8058 one-click unsubscribe target for the List-Unsubscribe-Post header (D27).
// Mail providers POST here; browsers use /unsubscribe instead.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!UUID.test(token)) return new Response("invalid token", { status: 400 });
  const db = publicDb();
  if (!db) return new Response("unavailable", { status: 503 });
  const { error } = await db.rpc("unsubscribe", { p_token: token });
  if (error) return new Response("error", { status: 500 });
  return new Response("unsubscribed", { status: 200 });
}
