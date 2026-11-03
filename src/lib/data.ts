import { cache } from "react";
import { publicDb } from "@/lib/supabase/public";

// Read model only (migration 0018 views + public tables). Every query fails soft to empty.
export type Provider = {
  id: string; slug: string; ref_code: string; name_en: string; name_th: string | null; provider_type: string;
  city_id: string; city_slug: string; city_name_en: string; city_name_th: string; status: string;
  verified_at: string | null; last_checked_at: string | null; is_partner: boolean; show_ctas: boolean;
  summary_en: string | null; summary_th: string | null; description_en: string | null; description_th: string | null;
  website: string | null; email: string | null; phone: string | null; line_id: string | null;
  address_en: string | null; address_th: string | null; lat: number | null; lng: number | null;
  founded_year: number | null; languages: string[]; logo_path: string | null; updated_at: string;
};
export type Program = {
  id: string; provider_id: string; provider_slug: string; slug: string; track: string; name_en: string; name_th: string | null;
  summary_en: string | null; summary_th: string | null; duration_months: number | null; hours_per_week: number | null;
  price_thb: number | null; price_note_en: string | null; price_note_th: string | null; supports_visa: boolean;
  sort_order: number; provider_status: string; is_partner: boolean; show_ctas: boolean;
};
export type City = { id: string; slug: string; code: string; name_en: string; name_th: string; province_en: string | null; province_th: string | null; lat: number | null; lng: number | null; sort_order: number; updated_at: string };
export type Rule = {
  id: string; key: string; track: string; label_en: string; label_th: string | null; value_num: number | null; value_json: unknown;
  unit: string | null; note_en: string | null; note_th: string | null; source_url: string | null; effective_from: string;
  effective_until: string | null; sort_order: number; confidence: "high" | "medium" | "low"; source_date: string | null;
  reviewed_at: string | null; reviewed_by: string | null; updated_at: string;
};
export type RuleChange = { id: number; rule_key: string; track: string; action: string; summary_en: string | null; summary_th: string | null; changed_at: string };
export type Embassy = {
  id: string; slug: string; country_code: string; kind: string; name_en: string; name_th: string | null; city: string;
  address: string | null; website: string | null; email: string | null; phone: string | null; evisa_supported: boolean | null;
  tracks: string[]; notes_en: string | null; notes_th: string | null; last_checked_at: string | null; updated_at: string;
};
export type Faq = { question: string; answer: string; locale: string; sort_order: number };
export type Accreditation = { id: string; body_en: string; body_th: string | null; reference: string | null; valid_from: string | null; valid_until: string | null; is_checked: boolean; checked_at: string | null };

async function q<T>(fn: (db: NonNullable<ReturnType<typeof publicDb>>) => PromiseLike<{ data: unknown; error: unknown }>): Promise<T[]> {
  const db = publicDb();
  if (!db) return [];
  try {
    const { data, error } = await fn(db);
    if (error) { console.error("[data]", error); return []; }
    return (data as T[]) ?? [];
  } catch (e) { console.error("[data]", e); return []; }
}

export const getCities = cache(() => q<City>((db) => db.from("cities").select("*").order("sort_order")));
export const getCity = cache(async (slug: string) => (await q<City>((db) => db.from("cities").select("*").eq("slug", slug).limit(1)))[0]);

export const getProviders = cache((f: { city?: string; status?: string } = {}) =>
  q<Provider>((db) => {
    let s = db.from("public_providers").select("*").neq("status", "suspended");
    if (f.city) s = s.eq("city_slug", f.city);
    if (f.status) s = s.eq("status", f.status);
    return s.order("is_partner", { ascending: false }).order("status", { ascending: true }).order("name_en");
  }),
);
export const getProvider = cache(async (slug: string) => (await q<Provider>((db) => db.from("public_providers").select("*").eq("slug", slug).limit(1)))[0]);

export const getPrograms = cache((f: { providerId?: string; track?: string } = {}) =>
  q<Program>((db) => {
    let s = db.from("public_programs").select("*");
    if (f.providerId) s = s.eq("provider_id", f.providerId);
    if (f.track) s = s.eq("track", f.track);
    return s.order("sort_order");
  }),
);

export const getProviderFaqs = cache((providerId: string, locale: string) =>
  q<Faq>((db) => db.from("provider_faqs").select("question, answer, locale, sort_order").eq("provider_id", providerId).eq("locale", locale).order("sort_order")),
);
export const getAccreditations = cache((providerId: string) =>
  q<Accreditation>((db) => db.from("provider_accreditations").select("id, body_en, body_th, reference, valid_from, valid_until, is_checked, checked_at").eq("provider_id", providerId).order("sort_order")),
);
export const getVerificationEvents = cache((providerId: string) =>
  q<{ id: number; event_type: string; from_status: string | null; to_status: string | null; created_at: string }>((db) =>
    db.from("public_verification_events").select("*").eq("provider_id", providerId).order("created_at", { ascending: false }).limit(10),
  ),
);

export const getRules = cache((track?: string) =>
  q<Rule>((db) => {
    let s = db.from("public_rules").select("*");
    if (track) s = s.eq("track", track);
    return s.order("track").order("sort_order");
  }),
);
export const getRuleChanges = cache((limit = 100) => q<RuleChange>((db) => db.from("public_rule_changes").select("*").order("changed_at", { ascending: false }).limit(limit)));

export const getRulesVersion = cache(async (): Promise<number> => {
  const db = publicDb();
  if (!db) return 0;
  const { data } = await db.rpc("current_rules_version");
  return Number(data ?? 0);
});

export const getEmbassies = cache(() => q<Embassy>((db) => db.from("embassies").select("*").order("country_code").order("sort_order")));
export const getEmbassy = cache(async (slug: string) => (await q<Embassy>((db) => db.from("embassies").select("*").eq("slug", slug).limit(1)))[0]);

export const getUsdRate = cache(async (): Promise<{ rate: number; asOf: string | null; fallback: boolean }> => {
  const rows = await q<{ thb_per_unit: number; as_of: string }>((db) => db.from("fx_latest").select("thb_per_unit, as_of").eq("currency", "USD").limit(1));
  // Fallback only for the checker's rough USD comparison. Seed fx_rates to replace it.
  return rows[0] ? { rate: Number(rows[0].thb_per_unit), asOf: rows[0].as_of, fallback: false } : { rate: 33, asOf: null, fallback: true };
});

// Last time anything on the rules side changed: the page-level "Last updated" date.
export function latestDate(rows: { updated_at: string }[]): string | undefined {
  return rows.reduce<string | undefined>((m, r) => (!m || r.updated_at > m ? r.updated_at : m), undefined);
}
