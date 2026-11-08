import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container } from "@/components/ui/primitives";
import { COUNTRIES, people } from "@/content/countries";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export const metadata: Metadata = pageMetadata({ path: routes.countries(), title: "Thailand long-stay visas by nationality", description: "Country-by-country guides for Americans, Brits, Australians, Canadians, Germans and more: which Thai mission, police certificate and income proof you need." });

export default function CountriesHub() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "By nationality", path: routes.countries() }]} />} eyebrow="By nationality" title="Long-stay visa rules for your passport." lead="Since 31 August 2026 you apply for a DTV in your own country. Each guide shows the right mission, police certificate, income proof and visa-free days." />
      <Container className="grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((c) => (
          <Link key={c.slug} href={routes.country(c.slug)} className="group">
            <Card className="flex h-full items-center gap-4 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lift">
              <span className="text-3xl" aria-hidden>{String.fromCodePoint(...[...c.iso2.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65))}</span>
              <span><span className="block font-display text-lg">{c.name}</span><span className="text-sm text-muted">For {people(c)}</span></span>
            </Card>
          </Link>
        ))}
      </Container>
    </>
  );
}
