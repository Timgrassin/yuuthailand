import { copy } from "@/lib/copy";
import { Badge } from "./primitives";

export async function StatusBadge({ status, isPartner }: { status: string; isPartner?: boolean }) {
  const t = copy.status;
  const tone = (["verified", "contacted", "unverified", "suspended"].includes(status) ? status : "unverified") as "verified" | "contacted" | "unverified" | "suspended";
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      <Badge tone={tone}>
        {status === "verified" ? "✓ " : null}
        {t[tone]}
      </Badge>
      {isPartner && status === "verified" ? <Badge tone="partner">{t.partner}</Badge> : null}
    </span>
  );
}
