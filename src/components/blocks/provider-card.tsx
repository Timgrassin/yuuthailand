import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Provider } from "@/lib/data";
import { fmtDate, pick } from "@/lib/format";
import { routes } from "@/lib/seo/routes";

export function ProviderCard({ p, locale }: { p: Provider; locale: string }) {
  return (
    <Link href={routes.provider(p.slug)} className="group block h-full">
      <Card className="flex h-full flex-col gap-2 transition-colors group-hover:border-primary">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug">{pick(locale, p.name_en, p.name_th)}</h3>
          <span className="text-xs text-muted">{p.ref_code}</span>
        </div>
        <p className="text-sm text-muted">{pick(locale, p.city_name_en, p.city_name_th)}</p>
        {pick(locale, p.summary_en, p.summary_th) ? <p className="line-clamp-2 text-sm">{pick(locale, p.summary_en ?? "", p.summary_th)}</p> : null}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <StatusBadge status={p.status} isPartner={p.is_partner} />
          {p.last_checked_at ? <span className="text-xs text-muted">{locale === "th" ? "ตรวจ" : "Checked"} {fmtDate(p.last_checked_at, locale)}</span> : null}
        </div>
      </Card>
    </Link>
  );
}
