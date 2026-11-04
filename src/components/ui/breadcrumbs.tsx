import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <JsonLd data={graph(breadcrumbSchema(items))} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i ? <ChevronRight className="size-3.5 text-line-strong" aria-hidden /> : null}
            {i === items.length - 1 ? <span aria-current="page" className="text-ink-2">{it.name}</span> : <Link href={it.path} className="hover:text-primary">{it.name === "Staylong" ? "Home" : it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
