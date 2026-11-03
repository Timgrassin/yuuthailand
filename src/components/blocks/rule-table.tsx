import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/primitives";
import type { Rule } from "@/lib/data";
import { fmtDate, fmtValue, pick } from "@/lib/format";

// Typed rule rows: value, plain-language note, source and effective date on every line.
export async function RuleTable({ rules, locale }: { rules: Rule[]; locale: string }) {
  const t = await getTranslations("common");
  const rows = rules.filter((r) => !r.key.startsWith("summary.") && !r.key.startsWith("docs."));
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-primary-soft text-primary">
          <tr>
            <th scope="col" className="p-3">{locale === "th" ? "เกณฑ์" : "Requirement"}</th>
            <th scope="col" className="p-3">{locale === "th" ? "ค่า" : "Value"}</th>
            <th scope="col" className="hidden p-3 md:table-cell">{t("source")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.id} id={r.key} className="align-top">
              <th scope="row" className="p-3 font-semibold">
                {pick(locale, r.label_en, r.label_th)}
                {r.confidence === "low" ? <Badge tone="warn" className="ml-2">{t("lowConfidence")}</Badge> : null}
              </th>
              <td className="p-3">
                <span className="font-semibold">{fmtValue(r, locale)}</span>
                {r.note_en ? <p className="mt-1 text-muted">{pick(locale, r.note_en, r.note_th)}</p> : null}
              </td>
              <td className="hidden p-3 text-muted md:table-cell">
                {r.source_url ? <a href={r.source_url} rel="noopener nofollow" target="_blank" className="text-primary underline">{new URL(r.source_url).hostname.replace(/^www\./, "")}</a> : null}
                <div className="text-xs">{t("effectiveFrom")} <time dateTime={r.effective_from}>{fmtDate(r.effective_from, locale)}</time></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
