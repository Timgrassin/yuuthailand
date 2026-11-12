import Link from "next/link";
import { Quote, Star } from "lucide-react";
import { TypeArt, typeLabel } from "@/components/blocks/provider-type";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Provider } from "@/lib/data";
import { fmtDate, fmtNumber } from "@/lib/format";
import { routes } from "@/lib/seo/routes";

export function ProviderCard({ p }: { p: Provider }) {
  const facts = p.facts?.length ?? 0;
  return (
    <Link href={routes.provider(p.slug)} className="group flex h-full gap-4 rounded-card border border-line bg-surface p-4 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-lift sm:p-5">
      <TypeArt type={p.provider_type} className="size-14 sm:size-16" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[17px] font-semibold leading-snug group-hover:text-primary">{p.name_en}</h3>
        <p className="mt-0.5 text-sm text-muted">{p.city_name_en} · {typeLabel(p.provider_type)}</p>
        <div className="mt-2.5"><StatusBadge status={p.status} isPartner={p.is_partner} /></div>
        {p.summary_en ? <p className="mt-2.5 line-clamp-2 text-sm text-ink-2">{p.summary_en}</p> : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-[13px] text-muted">
          {p.google_rating != null ? <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-accent text-accent" aria-hidden /><span className="font-semibold text-ink">{p.google_rating}</span>{p.google_reviews ? ` (${fmtNumber(p.google_reviews)})` : ""}</span> : null}
          {facts ? <span className="inline-flex items-center gap-1"><Quote className="size-3.5" aria-hidden />{facts} quoted {facts === 1 ? "fact" : "facts"}</span> : null}
          {p.price_from_thb != null ? <span>From <span className="font-semibold text-ink">{fmtNumber(Number(p.price_from_thb))} THB</span></span> : null}
          {p.last_checked_at ? <span>Checked {fmtDate(p.last_checked_at)}</span> : null}
        </div>
      </div>
    </Link>
  );
}
