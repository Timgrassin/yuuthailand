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

// Search areas. city_slug must exist in public.cities (0021 + 0031). Several areas can feed one city
// (Bangkok metro). locationQuery lets the actor tile the whole area, so results are not capped at ~120.
export const AREAS: { city: string; location: string }[] = [
  { city: "bangkok", location: "Bangkok, Thailand" },
  { city: "bangkok", location: "Nonthaburi, Thailand" },
  { city: "bangkok", location: "Samut Prakan, Thailand" },
  { city: "chiang-mai", location: "Chiang Mai, Thailand" },
  { city: "phuket", location: "Phuket, Thailand" },
  { city: "pattaya", location: "Pattaya, Chonburi, Thailand" },
  { city: "pattaya", location: "Si Racha, Chonburi, Thailand" },
  { city: "hua-hin", location: "Hua Hin, Thailand" },
  { city: "koh-samui", location: "Ko Samui, Thailand" },
  { city: "koh-phangan", location: "Ko Pha-ngan, Thailand" },
  { city: "koh-tao", location: "Ko Tao, Thailand" },
  { city: "krabi", location: "Krabi, Thailand" },
  { city: "koh-lanta", location: "Ko Lanta, Thailand" },
  { city: "khon-kaen", location: "Khon Kaen, Thailand" },
  { city: "chiang-rai", location: "Chiang Rai, Thailand" },
  { city: "udon-thani", location: "Udon Thani, Thailand" },
  { city: "pai", location: "Pai, Mae Hong Son, Thailand" },
  { city: "hat-yai", location: "Hat Yai, Songkhla, Thailand" },
  { city: "korat", location: "Nakhon Ratchasima, Thailand" },
  { city: "nong-khai", location: "Nong Khai, Thailand" },
  { city: "rayong", location: "Rayong, Thailand" },
  { city: "surat-thani", location: "Surat Thani, Thailand" },
  { city: "kanchanaburi", location: "Kanchanaburi, Thailand" },
  { city: "ayutthaya", location: "Ayutthaya, Thailand" },
  { city: "lampang", location: "Lampang, Thailand" },
  { city: "ubon-ratchathani", location: "Ubon Ratchathani, Thailand" },
  { city: "nakhon-si-thammarat", location: "Nakhon Si Thammarat, Thailand" },
  { city: "trang", location: "Trang, Thailand" },
  { city: "koh-chang", location: "Ko Chang, Trat, Thailand" },
  { city: "phitsanulok", location: "Phitsanulok, Thailand" },
];
/** @deprecated kept for older callers; use AREAS. */
export const CITIES = AREAS.map((a) => ({ slug: a.city, query: a.location.split(",")[0] }));

export type ProviderType = "language_school" | "muay_thai_camp" | "visa_agent" | "cooking_school" | "massage_school";
// Every phrase runs in every area. The type here is only a fallback: classify() uses Google's category first.
export const SEARCHES: { q: string; type: ProviderType }[] = [
  { q: "Thai language school", type: "language_school" },
  { q: "language school", type: "language_school" },
  { q: "Thai lessons", type: "language_school" },
  { q: "language institute", type: "language_school" },
  { q: "ED visa school", type: "language_school" },
  { q: "Muay Thai", type: "muay_thai_camp" },
  { q: "Muay Thai camp", type: "muay_thai_camp" },
  { q: "Muay Thai gym", type: "muay_thai_camp" },
  { q: "boxing gym", type: "muay_thai_camp" },
  { q: "visa agent", type: "visa_agent" },
  { q: "visa service", type: "visa_agent" },
  { q: "visa consultant", type: "visa_agent" },
  { q: "immigration lawyer", type: "visa_agent" },
  { q: "retirement visa", type: "visa_agent" },
  { q: "Thai cooking school", type: "cooking_school" },
  { q: "cooking class", type: "cooking_school" },
  { q: "Thai massage school", type: "massage_school" },
  { q: "massage training course", type: "massage_school" },
];

// Type from Google's category and the name. Returns null for places that are not providers.
export function classify(categories: string[], title: string, fallback: ProviderType): ProviderType | null {
  const cat = categories.join(" | ").toLowerCase();
  const all = `${cat} ${title.toLowerCase()}`;
  if (/muay|boxing|kickbox|martial art|mma\b/.test(all)) return "muay_thai_camp";
  if (/cooking (school|class)|culinary/.test(all)) return "cooking_school";
  if (/massage/.test(all)) return /school|training|academy|institute|course/.test(all) ? "massage_school" : null;
  if (/visa|immigration (lawyer|attorney|consult)|lawyer|law firm|legal services|attorney/.test(all)) return "visa_agent";
  if (/language|tutor|english school|thai school|education cent|learning cent/.test(all)) return "language_school";
  if (/school|academy|institute|college/.test(cat) && fallback === "language_school") return "language_school";
  return null;
}

export function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

// English-only site (D15): drop Thai script and SEO tails such as "| Thai Language School Bangkok".
export function cleanName(raw: string) {
  return raw
    .replace(/\([^)]*[\u0E00-\u0E7F][^)]*\)/g, "")
    .replace(/[\u0E00-\u0E7F]+/g, "")
    .split(/\s+[|\u2013\u2014]\s+/)[0]
    .replace(/\s+[&-]\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[^A-Za-z0-9]+/, "")
    .trim();
}

// Quote matching shared by check-facts (local, no secrets) and apply-facts (pushes to the database).
export const normQuote = (s: string) => s.replace(/\s+/g, " ").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').trim().toLowerCase();
export type ExtractedFact = { key: string; label: string; value: string; quote: string };
export function verifiedFacts(facts: ExtractedFact[], siteText: string) {
  const body = normQuote(siteText);
  return facts.filter((x) => x.quote && x.quote.length >= 8 && body.includes(normQuote(x.quote)));
}
