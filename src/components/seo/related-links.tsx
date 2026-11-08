import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import type { RelGroup } from "@/lib/seo/related";

// "Related on Staylong": topical internal links with descriptive anchors (see src/lib/seo/related.ts).
export function RelatedLinks({ groups, title = "Related on Staylong", bare = false }: { groups: RelGroup[]; title?: string; bare?: boolean }) {
  if (!groups.length) return null;
  const nav = (
      <nav aria-label={title} className="rounded-card border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-2xl">{title}</h2>
        <div className={`mt-6 grid gap-8 sm:grid-cols-2 ${bare ? "xl:grid-cols-3" : "lg:grid-cols-4"}`}>
          {groups.map((g) => (
            <div key={g.title} className="text-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g.title}</p>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-medium text-ink-2 hover:text-primary hover:underline">{l.label}</Link>
                    {l.sub ? <span className="block text-xs text-muted">{l.sub}</span> : null}
                  </li>
                ))}
                {g.more ? <li><Link href={g.more.href} className="font-semibold text-primary hover:underline">{g.more.label}</Link></li> : null}
              </ul>
            </div>
          ))}
        </div>
      </nav>
  );
  return bare ? <div className="mt-10">{nav}</div> : <Container className="pb-12">{nav}</Container>;
}
