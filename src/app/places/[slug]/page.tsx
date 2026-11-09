import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Landmark, MapPin, Wallet } from "lucide-react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { ProviderCard } from "@/components/blocks/provider-card";
import { PoiMap } from "@/components/map/poi-map";
import { CtaBand } from "@/components/marketing/cta-band";
import { KeyFacts } from "@/components/marketing/key-facts";
import { PageHero } from "@/components/marketing/page-hero";
import { BulletList, LinkedText } from "@/components/places/linked-text";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Card, Container } from "@/components/ui/primitives";
import { getProviders } from "@/lib/data";
import { PLACES, POI_META, POI_ORDER, getPlace, placeMap, placesInCity, poiSource } from "@/lib/places";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { firstFit } from "@/lib/seo/text";
import { breadcrumbSchema, faqSchema, graph, placeSchema } from "@/lib/seo/schema";

export const revalidate = 86400;
export const dynamicParams = false;
export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}
type P = { params: Promise<{ slug: string }> };

const COST = { lower: "Lower", mid: "Mid-range", higher: "Higher" } as const;
const KIND = { neighbourhood: "Neighbourhood", town: "Town", island: "Island" } as const;

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = getPlace((await params).slug);
  if (!p) return {};
  const where = p.kind === "neighbourhood" ? `${p.name}, ${p.city}` : p.name;
  return pageMetadata({
    path: routes.place(p.slug),
    title: firstFit(`Living in ${where}: long-stay guide and map`, `Living in ${where}: guide and map`, `Living in ${where}`),
    description: `${p.tagline} Immigration, banks, hospitals and schools on one map, plus visa notes.`,
    updatedAt: p.updated,
  });
}

export default async function PlacePage({ params }: P) {
  const p = getPlace((await params).slug);
  if (!p) notFound();
  const { pois, offices, points, cats } = placeMap(p);
  const siblings = placesInCity(p.citySlug).filter((x) => x.slug !== p.slug);
  const others = siblings.length ? siblings : PLACES.filter((x) => x.slug !== p.slug && x.kind === p.kind).slice(0, 6);
  const providers = (await getProviders({ city: p.citySlug }).catch(() => [])).filter((x) => x.status !== "suspended").slice(0, 6);
  const count = (c: string) => pois.filter((x) => x.cat === c).length;
  const path = routes.place(p.slug);
  const crumbs = [{ name: "Staylong", path: "/" }, { name: "Places", path: routes.places() }, { name: p.name, path }];

  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={crumbs} />}
        eyebrow={`${KIND[p.kind]} · ${p.city}`}
        title={p.name}
        lead={<AnswerBlock answer={p.answer} checkedAt={p.updated} sources={p.sources.slice(0, 2)} />}
      />
      <Container className="relative -mt-8">
        <KeyFacts facts={[
          { label: "Type", value: KIND[p.kind], note: p.city, icon: MapPin },
          { label: "Cost level", value: COST[p.costLevel], note: `for ${p.city}`, icon: Wallet },
          { label: "Immigration", value: offices[0]?.city ?? p.city, note: offices.length > 1 ? `${offices.length} offices` : "nearest office", icon: Landmark },
          { label: "Mapped places", value: String(pois.length + offices.length), note: pois.length ? "banks, hospitals, schools" : "pins on the map", icon: Building2 },
        ]} />
      </Container>

      <Container className="py-14">
        <h2 className="mb-2 text-3xl">Map of {p.name}</h2>
        <p className="mb-6 text-ink-2">Immigration, banks, hospitals, coworking, gyms and schools. Tap a layer to hide it, tap a pin for details.</p>
        <PoiMap points={points} categories={cats} center={[p.lng, p.lat]} zoom={p.zoom} />
        <p className="mt-3 text-xs text-muted">
          <a href={poiSource.url} rel="noopener nofollow" target="_blank" className="underline">{poiSource.label}</a>
          {poiSource.fetchedAt ? ` · fetched ${poiSource.fetchedAt}` : ""}. Listings come from OpenStreetMap and are not verified by Staylong.
        </p>
      </Container>

      <Container className="grid gap-12 pb-14 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0 space-y-14">
          <section className="grid gap-6 sm:grid-cols-2">
            <Card><h2 className="mb-4 text-xl">Best for</h2><BulletList items={p.bestFor} /></Card>
            <Card><h2 className="mb-4 text-xl">Not ideal for</h2><BulletList items={p.notIdealFor} tone="muted" /></Card>
          </section>
          <section>
            <h2 className="mb-4 text-3xl">What it is like</h2>
            <p className="leading-relaxed text-ink-2">{p.vibe}</p>
            <h3 className="mb-2 mt-8 font-sans text-lg font-semibold">Getting around</h3>
            <p className="leading-relaxed text-ink-2">{p.gettingAround}</p>
            <h3 className="mb-2 mt-8 font-sans text-lg font-semibold">Weather</h3>
            <p className="leading-relaxed text-ink-2">{p.climateNote}</p>
          </section>
          <section>
            <h2 className="mb-4 text-3xl">Immigration office for {p.name}</h2>
            <Card>
              <p className="font-semibold">{p.immigrationOffice.name}</p>
              <p className="mt-2 text-ink-2"><LinkedText text={p.immigrationOffice.note} /></p>
              {offices.length ? <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">{offices.map((o) => <Link key={o.slug} href={routes.office(o.slug)} className="font-semibold text-primary underline">{o.name}: hours and tips</Link>)}</p> : null}
            </Card>
          </section>
          <section>
            <h2 className="mb-4 text-3xl">Visa notes for long stays</h2>
            <BulletList items={p.visaNotes} />
            <p className="mt-5 text-sm"><Link href={routes.checker()} className="font-semibold text-primary underline">Check which visa fits you</Link> · <Link href={routes.tool("90-day-report-calculator")} className="text-primary underline">90-day report calculator</Link></p>
          </section>
          {pois.length ? (
            <section>
              <h2 className="mb-5 text-3xl">Banks, hospitals and services nearby</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {POI_ORDER.filter((c) => count(c)).map((c) => (
                  <Card key={c} className="min-w-0 p-5">
                    <h3 className="mb-3 flex items-center gap-2 font-sans text-base font-semibold"><span className="size-2.5 rounded-full" style={{ background: POI_META[c].color }} aria-hidden />{POI_META[c].plural} <span className="text-sm font-normal text-muted">{count(c)}</span></h3>
                    <ul className="space-y-1.5 text-sm text-ink-2">
                      {pois.filter((x) => x.cat === c).slice(0, 8).map((x) => <li key={x.id} className="truncate">{x.website ? <a href={x.website} rel="noopener nofollow" target="_blank" className="hover:text-primary hover:underline">{x.name}</a> : x.name}{x.street ? <span className="text-muted"> · {x.street}</span> : null}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
          {providers.length ? (
            <section>
              <h2 className="mb-5 text-3xl">Schools and camps in {p.city}</h2>
              <div className="grid gap-4 sm:grid-cols-2">{providers.map((x) => <ProviderCard key={x.id} p={x} />)}</div>
              <p className="mt-4 text-sm"><Link href={routes.city(p.citySlug)} className="font-semibold text-primary underline">All providers in {p.city}</Link></p>
            </section>
          ) : null}
          <Faq title={`Living in ${p.name}: questions`} items={p.faqs} />
          <section className="rounded-card border border-line bg-surface p-6 text-sm">
            <h2 className="text-xl">Sources</h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5">{[...p.sources, poiSource].map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}</ol>
            <p className="mt-4 text-xs text-muted">Last checked {p.updated} · Pending expert review. Immigration offices move: confirm before you travel.</p>
          </section>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <EmailCapture title={`The ${p.name} move-in checklist`} body="Immigration, bank, SIM and TM30 steps for your first two weeks, by email." leadMagnet={`place_${p.slug}`} button="Send the checklist" meta={{ place: p.slug, city: p.citySlug }} />
          {others.length ? (
            <Card>
              <h2 className="mb-3 text-lg">{siblings.length ? `More in ${p.city}` : "Similar places"}</h2>
              <ul className="space-y-2 text-sm">{others.map((x) => <li key={x.slug}><Link href={routes.place(x.slug)} className="font-medium text-primary hover:underline">{x.name}</Link><span className="block text-xs text-muted">{x.tagline}</span></li>)}</ul>
            </Card>
          ) : null}
        </aside>
      </Container>
      <CtaBand title="Moving here for the long term?" body="Six questions tell you which visa fits, checked against current rules." primary={{ href: routes.checker(), label: "Run the visa checker" }} />
      <JsonLd data={graph(
        placeSchema({ path, name: p.name, city: p.city, description: p.tagline, lat: p.lat, lng: p.lng }),
        breadcrumbSchema(crumbs),
        faqSchema(p.faqs),
      )} />
    </>
  );
}
