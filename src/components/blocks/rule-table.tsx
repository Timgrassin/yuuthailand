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
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.id} id={r.key} className="grid scroll-mt-24 gap-1.5 px-5 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:px-6">
            <div>
              <p className="text-[15px] font-medium text-ink-2">{r.label_en}</p>
              {r.confidence === "low" ? <Badge tone="warn" className="mt-2">{t.lowConfidence}</Badge> : null}
            </div>
            <div>
              <p className="text-[19px] font-semibold leading-snug text-ink tabular-nums">{fmtValue(r)}</p>
              {r.note_en ? <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{r.note_en}</p> : null}
              <p className="mt-2.5 flex flex-wrap items-center gap-2 text-sm text-ink-2">
                {r.source_url ? <a href={r.source_url} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1.5 underline decoration-line-strong underline-offset-4 hover:text-primary"><ExternalLink className="size-3.5" aria-hidden />{new URL(r.source_url).hostname.replace(/^www\./, "")}</a> : null}
                <span className="rounded-full border border-line px-2.5 py-0.5">{t.effectiveFrom} <time dateTime={r.effective_from}>{fmtDate(r.effective_from)}</time></span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
