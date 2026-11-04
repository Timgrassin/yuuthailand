// LOCAL DESIGN FIXTURES. Used only when STAYLONG_FIXTURES=1 (never set on Vercel).
// Rules come from the real seed file; providers are FAKE (D8).
import rulesSeed from "../../supabase/seed-data/visa-rules.json";

const now = "2026-11-03T09:00:00Z";
let i = 0;
const id = () => `00000000-0000-4000-8000-${String(++i).padStart(12, "0")}`;

type SeedRule = { key: string; track: string; label_en: string; value_num: number | null; value_json: unknown; unit: string | null; note_en: string; source_url: string; source_date: string | null; effective_from: string | null; confidence: string };

export const fxRules = (rulesSeed as SeedRule[]).map((r, n) => ({
  id: id(), key: r.key, track: r.track, label_en: r.label_en, value_num: r.value_num, value_json: r.value_json, unit: r.unit, note_en: r.note_en,
  source_url: r.source_url, effective_from: r.effective_from ?? "2026-11-03", effective_until: null, sort_order: n * 10, confidence: r.confidence,
  source_date: r.source_date, reviewed_at: null, reviewed_by: null, updated_at: now,
}));

const CITY = [["bangkok", "BKK", "Bangkok"], ["chiang-mai", "CNX", "Chiang Mai"], ["phuket", "HKT", "Phuket"], ["pattaya", "UTP", "Pattaya"], ["hua-hin", "HHQ", "Hua Hin"], ["koh-samui", "USM", "Koh Samui"]];
export const fxCities = CITY.map(([slug, code, name], n) => ({ id: id(), slug, code, name_en: name, province_en: null, lat: null, lng: null, sort_order: n, updated_at: now }));

const P = (slug: string, name: string, type: string, city: number, status: string, partner = false) => ({
  id: id(), slug, ref_code: `SL-FAKE-${fxCities[city].code}`, name_en: name, provider_type: type, city_id: fxCities[city].id, city_slug: fxCities[city].slug, city_name_en: fxCities[city].name_en,
  status, verified_at: status === "verified" ? now : null, last_checked_at: now, is_partner: partner, show_ctas: status !== "suspended",
  summary_en: `FAKE ${type.replace(/_/g, " ")} used for design previews.`, description_en: null, website: "https://example.com", email: null, phone: "+66 2 000 0000", line_id: "fake",
  address_en: "FAKE address", lat: null, lng: null, founded_year: 2015, languages: ["en"], logo_path: null, updated_at: now,
});
export const fxProviders = [
  P("fake-sukhumvit-thai-school", "FAKE Sukhumvit Thai School", "language_school", 0, "verified", true),
  P("fake-patong-muay-thai", "FAKE Patong Muay Thai Camp", "muay_thai_camp", 2, "verified"),
  P("fake-nimman-language-centre", "FAKE Nimman Language Centre", "language_school", 1, "contacted"),
  P("fake-bkk-visa-agency", "FAKE Bangkok Visa Agency", "visa_agent", 0, "unverified"),
];
export const fxChanges = [
  { id: 4, rule_key: "eligibility.apply_from_residence_country", track: "dtv", action: "insert", summary_en: "DTV applicants must apply in their country of nationality or residence", changed_at: "2026-08-31T00:00:00Z" },
  { id: 3, rule_key: "insurance.min_coverage", track: "retirement_oa", action: "update", summary_en: "O-A insurance set at USD 100,000", changed_at: "2025-01-23T00:00:00Z" },
  { id: 2, rule_key: "eligibility.employer_revenue.work_from_thailand", track: "ltr", action: "update", summary_en: "LTR Work-from-Thailand employer revenue cut to USD 50M", changed_at: "2025-01-13T00:00:00Z" },
  { id: 1, rule_key: "summary.suits", track: "dtv", action: "insert", summary_en: "Initial rule set published", changed_at: "2026-11-03T00:00:00Z" },
];
export const fxPrograms = [
  { id: id(), provider_id: fxProviders[0].id, provider_slug: fxProviders[0].slug, slug: "thai-12", track: "ed", name_en: "FAKE Thai 12 months", summary_en: null, duration_months: 12, hours_per_week: 4, price_thb: 32000, price_note_en: null, supports_visa: true, sort_order: 1, provider_status: "verified", is_partner: true, show_ctas: true },
  { id: id(), provider_id: fxProviders[1].id, provider_slug: fxProviders[1].slug, slug: "mt-6", track: "dtv", name_en: "FAKE Muay Thai 6 months", summary_en: null, duration_months: 6, hours_per_week: 10, price_thb: 60000, price_note_en: null, supports_visa: true, sort_order: 1, provider_status: "verified", is_partner: false, show_ctas: true },
];

export function fixtureTable(table: string): unknown[] | null {
  if (process.env.STAYLONG_FIXTURES !== "1") return null;
  switch (table) {
    case "public_rules": return fxRules;
    case "cities": return fxCities;
    case "public_providers": return fxProviders;
    case "public_rule_changes": return fxChanges;
    case "public_programs": return fxPrograms;
    default: return [];
  }
}
