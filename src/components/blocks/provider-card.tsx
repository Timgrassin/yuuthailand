import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Provider } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { routes } from "@/lib/seo/routes";

export function ProviderCard({ p }: { p: Provider }) {
  return (
    <Link href={routes.provider(p.slug)} className="group block h-full">
      <Card className="flex h-full flex-col gap-2 transition-colors group-hover:border-primary">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug">{p.name_en}</h3>
          <span className="text-xs text-muted">{p.ref_code}</span>
        </div>
        <p className="text-sm text-muted">{p.city_name_en}</p>
        {p.summary_en ? <p className="line-clamp-2 text-sm">{p.summary_en ?? ""}</p> : null}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <StatusBadge status={p.status} isPartner={p.is_partner} />
          {p.last_checked_at ? <span className="text-xs text-muted">{"Checked"} {fmtDate(p.last_checked_at)}</span> : null}
        </div>
      </Card>
    </Link>
  );
}
