import type { Metadata } from "next";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import Link from "next/link";
import { getEmbassies } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.embassies(), title: "Thai embassies and consulates for long-stay visas", description: "Where to apply for a Thai long-stay visa, by country, with e-visa support noted." });
}

export default async function EmbassiesPage() {
  const embassies = await getEmbassies();
  const byCountry = embassies.reduce<Record<string, typeof embassies>>((m, e) => ((m[e.country_code] ??= []).push(e), m), {});
  const dn = new Intl.DisplayNames(["en"], { type: "region" });
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Yuu", path: "/" }, { name: "Embassies", path: routes.embassies() }]} />
      <SectionHeading as="h1" title={"Thai embassies and consulates"} />
      <AnswerBlock answer={"Most long-stay visas are applied for at the Thai embassy or consulate covering your country, usually through the thaievisa.go.th e-visa portal. From 31 August 2026 DTV applicants must apply in their country of nationality or permanent residence."} sources={[{ label: "thaievisa.go.th", url: "https://www.thaievisa.go.th" }]} />
      <div className="mt-8">
        {embassies.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byCountry).map(([cc, list]) => (
              <Card key={cc}>
                <h2 className="font-bold">{dn.of(cc) ?? cc}</h2>
                <ul className="mt-2 space-y-1 text-sm">{list.map((e) => <li key={e.id}><Link href={routes.embassy(e.slug)} className="text-primary underline">{e.name_en}</Link> · {e.city}</li>)}</ul>
              </Card>
            ))}
          </div>
        ) : <EmptyState>{"The embassy directory is being compiled. Use thaievisa.go.th to find your mission."}</EmptyState>}
      </div>
    </Container>
  );
}
