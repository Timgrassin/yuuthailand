import "server-only";

// Asks the Supabase Edge Function `send-confirmation` to send the double opt-in email (D27).
// The function and the database decide whether an email is due; failures never block the form.
export async function requestConfirmationEmail(email: string): Promise<void> {
  if (process.env.STAYLONG_FIXTURES === "1") return;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/functions/v1/send-confirmation`, {
      method: "POST",
      headers: { apikey: key, "content-type": "application/json" },
      body: JSON.stringify({ email }),
      signal: AbortSignal.timeout(6000),
    });
  } catch (e) {
    console.error("[confirmation email]", e);
  }
}
