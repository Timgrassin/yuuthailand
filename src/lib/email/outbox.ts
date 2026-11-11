import "server-only";

// Asks the Supabase Edge Function `outbox` to send queued emails now (migrations 0034, 0035).
// pg_cron also calls it every 5 minutes, so a failure here only delays an email.
export async function kickOutbox(): Promise<void> {
  if (process.env.STAYLONG_FIXTURES === "1") return;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/functions/v1/outbox`, { method: "POST", headers: { apikey: key, "content-type": "application/json" }, body: "{}", signal: AbortSignal.timeout(8000) });
  } catch (e) {
    console.error("[outbox]", e);
  }
}
