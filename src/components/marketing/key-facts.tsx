import type { LucideIcon } from "lucide-react";

export type Fact = { label: string; value: string; note?: string; icon?: LucideIcon };

// The four numbers people come for, above the fold.
export function KeyFacts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line shadow-card lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="bg-surface p-5">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {f.icon ? <f.icon className="size-4 text-primary-2" aria-hidden /> : null}
            {f.label}
          </dt>
          <dd className="font-display mt-2 text-2xl leading-tight text-ink sm:text-[1.7rem]">{f.value}</dd>
          {f.note ? <dd className="mt-1 text-sm text-muted">{f.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}
