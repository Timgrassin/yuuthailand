export const pick = <T,>(locale: string, en: T, th: T | null | undefined): T => (locale === "th" && th != null && th !== "" ? th : en);

export function fmtDate(iso: string | null | undefined, locale: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale === "th" ? "th-TH" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Bangkok" });
}

export function fmtNumber(n: number, locale: string): string {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(n);
}

const UNIT: Record<string, { en: string; th: string }> = {
  THB: { en: "THB", th: "บาท" },
  USD: { en: "USD", th: "ดอลลาร์สหรัฐ" },
  years: { en: "years", th: "ปี" },
  months: { en: "months", th: "เดือน" },
  days: { en: "days", th: "วัน" },
  THB_per_month: { en: "THB a month", th: "บาทต่อเดือน" },
  USD_per_year: { en: "USD a year", th: "ดอลลาร์สหรัฐต่อปี" },
  percent: { en: "%", th: "%" },
};

export function fmtValue(r: { value_num: number | null; value_json: unknown; unit: string | null }, locale: string): string {
  const u = r.unit ? UNIT[r.unit]?.[locale === "th" ? "th" : "en"] ?? r.unit : "";
  if (r.value_num != null) return r.unit === "percent" ? `${fmtNumber(Number(r.value_num), locale)}%` : `${fmtNumber(Number(r.value_num), locale)}${u ? ` ${u}` : ""}`;
  const v = r.value_json;
  if (v === true) return locale === "th" ? "ใช่" : "Yes";
  if (v === false) return locale === "th" ? "ไม่ใช่" : "No";
  if (v === "none") return locale === "th" ? "ไม่มีเกณฑ์" : "No requirement";
  if (v === "with_work_permit") return locale === "th" ? "ได้ หากมีใบอนุญาตทำงาน" : "Only with a work permit";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(" · ");
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("usd" in o) return `${fmtNumber(Number(o.usd), locale)} USD${"thb" in o ? ` / ${fmtNumber(Number(o.thb), locale)} THB` : ""}`;
    return Object.entries(o)
      .map(([k, val]) => `${k.replace(/_/g, " ")}: ${typeof val === "number" ? fmtNumber(val, locale) : Array.isArray(val) ? val.join(", ") : typeof val === "object" && val ? Object.entries(val).map(([a, b]) => `${a} ${typeof b === "number" ? fmtNumber(b, locale) : String(b)}`).join("; ") : String(val)}`)
      .join(" · ");
  }
  return "";
}
