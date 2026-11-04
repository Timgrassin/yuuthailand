import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container } from "@/components/ui/primitives";
import { GUIDES } from "@/content";
import { fmtDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export const metadata: Metadata = pageMetadata({ path: routes.guides(), title: "Thailand long-stay guides and comparisons", description: "Plain-English guides to Thai long-stay visas: comparisons, rule changes, checklists and how-tos, each dated and sourced." });

const GROUPS = [
  { kind: "change", title: "Rule changes" },
  { kind: "comparison", title: "Comparisons" },
  { kind: "guide", title: "Guides" },
  { kind: "checklist", title: "Checklists" },
] as const;

export default function GuidesIndex() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Guides", path: routes.guides() }]} />} eyebrow="Guides" title="Everything you need to stay longer, explained." lead="Comparisons, rule changes and step-by-step guides. Every page answers first, cites the official source and shows when we last checked it." />
      <Container className="space-y-14 py-14">
        {GROUPS.map((grp) => {
          const items = GUIDES.filter((g) => g.kind === grp.kind).sort((a, b) => b.updated.localeCompare(a.updated));
          if (!items.length) return null;
          return (
            <section key={grp.kind}>
              <h2 className="mb-6 text-3xl">{grp.title}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((g) => (
                  <Link key={g.slug} href={routes.guide(g.slug)} className="group">
                    <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:shadow-lift">
                      <p className="font-display text-xl leading-snug">{g.title}</p>
                      <p className="mt-3 line-clamp-3 text-sm text-ink-2">{g.description}</p>
                      <p className="mt-auto pt-4 text-xs text-muted">Checked {fmtDate(g.updated)}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
