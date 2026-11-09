import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { notFound } from "next/navigation";
import { ProviderList } from "@/components/blocks/provider-list";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState } from "@/components/ui/primitives";
import Link from "next/link";
import { getCities, getCity, getProviders } from "@/lib/data";
import { isIndexableCity } from "@/lib/listing";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
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
    // D28: indexable once the city lists 5+ indexable listings (docs/seo.md, Programmatic pages).
    noindex: !isIndexableCity(providers),
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
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }, { name, path: routes.city(slug) }]} />} eyebrow="City directory" title={`Long-stay visa schools and providers in ${name}`} lead={<AnswerBlock answer={`Staylong lists ${providers.length} providers in ${name}, ${verified} of them verified. Each listing shows its verification status, and visa programs and THB prices where we have them.`} />} />
    <Container className="py-12">
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {(["ed", "dtv", "retirement"] as const).map((t) => (
          <Link key={t} href={routes.rule(TRACK_INFO[t].slug)} className="rounded-full border border-line bg-surface px-3 py-1 hover:border-primary">{trackName(t)}</Link>
        ))}
      </div>
      <div className="mt-8">
        {providers.length ? <ProviderList providers={providers} heading={`Schools and providers in ${name}`} moreHeading={`All other listings in ${name}`} listName={name} /> : <EmptyState>{`We are checking providers in ${name} now.`}</EmptyState>}
      </div>
    </Container>
    </>
  );
}
