import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { notFound } from "next/navigation";
import { ProviderCard } from "@/components/blocks/provider-card";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState } from "@/components/ui/primitives";
import Link from "next/link";
import { getCities, getCity, getProviders } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import { TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCity(slug);
  if (!c) return {};
  const providers = await getProviders({ city: slug });
  const name = c.name_en;
  return pageMetadata({
    path: routes.city(slug),
    title: `Visa schools and long-stay providers in ${name}`,
    description: `${providers.length} schools and providers in ${name} with verification status, programs and prices.`,
    // docs/seo.md: thin city pages stay out of the index until 3 verified providers.
    noindex: providers.filter((p) => p.status === "verified").length < 3,
  });
}

export default async function CityPage({ params }: P) {
  const { slug } = await params;
  const c = await getCity(slug);
  if (!c) notFound();
  const providers = await getProviders({ city: slug });
  const verified = providers.filter((p) => p.status === "verified").length;
  const name = c.name_en;
  return (
    <>
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }, { name, path: routes.city(slug) }]} />} eyebrow="City directory" title={`Long-stay visa schools and providers in ${name}`} lead={<AnswerBlock answer={`Staylong lists ${providers.length} providers in ${name}, ${verified} of them verified. Each listing shows its visa programs, prices in THB and the date Staylong last checked it.`} />} />
    <Container className="py-12">
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {(["ed", "dtv", "retirement"] as const).map((t) => (
          <Link key={t} href={routes.rule(TRACK_INFO[t].slug)} className="rounded-full border border-line bg-surface px-3 py-1 hover:border-primary">{trackName(t)}</Link>
        ))}
      </div>
      <div className="mt-8">
        {providers.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{providers.map((p) => <ProviderCard key={p.id} p={p} />)}</div> : <EmptyState>{`We are checking providers in ${name} now.`}</EmptyState>}
      </div>
      {providers.length ? <JsonLd data={graph(itemListSchema(name, providers.map((p) => ({ name: p.name_en, path: routes.provider(p.slug) }))))} /> : null}
    </Container>
    </>
  );
}
