export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Bangkok" });
}

export function fmtNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

const UNIT: Record<string, string> = {
  THB: "THB",
  USD: "USD",
  years: "years",
  months: "months",
  days: "days",
  THB_per_month: "THB a month",
  USD_per_year: "USD a year",
};

export function fmtValue(r: { value_num: number | null; value_json: unknown; unit: string | null }): string {
  const u = r.unit ? UNIT[r.unit] ?? r.unit : "";
  if (r.value_num != null) return r.unit === "percent" ? `${fmtNumber(Number(r.value_num))}%` : `${fmtNumber(Number(r.value_num))}${u ? ` ${u}` : ""}`;
  const v = r.value_json;
  if (v === true) return "Yes";
  if (v === false) return "No";
  if (v === "none") return "No requirement";
  if (v === "with_work_permit") return "Only with a work permit";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(" · ");
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("usd" in o) return `${fmtNumber(Number(o.usd))} USD${"thb" in o ? ` / ${fmtNumber(Number(o.thb))} THB` : ""}`;
    const show = (val: unknown): string =>
      typeof val === "number" ? fmtNumber(val) : Array.isArray(val) ? val.join(", ") : val && typeof val === "object" ? Object.entries(val).map(([a, b]) => `${a} ${show(b)}`).join("; ") : String(val);
    return Object.entries(o).map(([k, val]) => `${k.replace(/_/g, " ")}: ${show(val)}`).join(" · ");
  }
  return "";
}
