import { ExternalLink } from "lucide-react";
import { copy } from "@/lib/copy";
import { Badge } from "@/components/ui/primitives";
import type { Rule } from "@/lib/data";
import { fmtDate, fmtValue } from "@/lib/format";

// Typed rule rows: value, plain-language note, source and effective date on every line.
export async function RuleTable({ rules }: { rules: Rule[] }) {
  const t = copy.common;
  const rows = rules.filter((r) => !r.key.startsWith("summary.") && !r.key.startsWith("docs."));
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.id} id={r.key} className="grid scroll-mt-24 gap-2 px-6 py-5 sm:grid-cols-[14rem_1fr]">
            <div>
              <p className="font-semibold text-ink">{r.label_en}</p>
              {r.confidence === "low" ? <Badge tone="warn" className="mt-2">{t.lowConfidence}</Badge> : null}
            </div>
            <div>
              <p className="font-display text-xl text-ink">{fmtValue(r)}</p>
              {r.note_en ? <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{r.note_en}</p> : null}
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                {r.source_url ? <a href={r.source_url} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">{new URL(r.source_url).hostname.replace(/^www\./, "")}<ExternalLink className="size-3" aria-hidden /></a> : null}
                <span>{t.effectiveFrom} <time dateTime={r.effective_from}>{fmtDate(r.effective_from)}</time></span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
