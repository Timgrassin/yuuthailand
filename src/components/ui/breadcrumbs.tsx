import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
      <JsonLd data={graph(breadcrumbSchema(items))} />
      <ol className="flex flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex gap-1">
            {i ? <span aria-hidden>/</span> : null}
            {i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path} className="hover:text-primary">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
