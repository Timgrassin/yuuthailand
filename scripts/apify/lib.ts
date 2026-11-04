// Shared helpers for the school pipeline. Secrets come from the environment only (GitHub Actions secrets).
export function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const url = env("SUPABASE_URL").replace(/\/$/, "");
  const key = env("SUPABASE_PUBLISHABLE_KEY");
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as T;
}

// Cities seeded in migration 0021, with the search label Google Maps understands.
export const CITIES: { slug: string; query: string }[] = [
  { slug: "bangkok", query: "Bangkok" },
  { slug: "chiang-mai", query: "Chiang Mai" },
  { slug: "phuket", query: "Phuket" },
  { slug: "pattaya", query: "Pattaya" },
  { slug: "hua-hin", query: "Hua Hin" },
  { slug: "koh-samui", query: "Koh Samui" },
  { slug: "krabi", query: "Krabi" },
  { slug: "khon-kaen", query: "Khon Kaen" },
  { slug: "chiang-rai", query: "Chiang Rai" },
  { slug: "udon-thani", query: "Udon Thani" },
];

// Search phrase -> provider_type. Mirrors the RoxSkin gym scraper: one Google Maps search per phrase per city.
export const SEARCHES: { q: string; type: "language_school" | "muay_thai_camp" | "visa_agent" }[] = [
  { q: "Thai language school", type: "language_school" },
  { q: "language school ED visa", type: "language_school" },
  { q: "Muay Thai camp", type: "muay_thai_camp" },
  { q: "Muay Thai gym training camp", type: "muay_thai_camp" },
  { q: "visa agent", type: "visa_agent" },
];

export function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
