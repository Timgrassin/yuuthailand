import type { Metadata } from "next";
import Link from "next/link";
import { PoiMap } from "@/components/map/poi-map";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container } from "@/components/ui/primitives";
import { PLACES, poisFor } from "@/lib/places";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  path: routes.places(),
  title: `Where to live in Thailand: ${PLACES.length} long-stay places mapped`,
  description: "Neighbourhoods, towns and islands for long stays in Thailand, each with its immigration office, banks, hospitals, coworking and schools on an interactive map.",
  updatedAt: "2026-11-04",
});

const KINDS = [
  { id: "neighbourhood", label: "Neighbourhoods", color: "#0b5e4f" },
  { id: "town", label: "Towns", color: "#c08a06" },
  { id: "island", label: "Islands", color: "#1971c2" },
];

export default function PlacesHub() {
  const cities = [...new Set(PLACES.map((p) => p.city))];
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Places", path: routes.places() }]} />}
        eyebrow={`${PLACES.length} places · ${cities.length} areas`}
        title="Where to live in Thailand long term."
        lead="Every place below has a map of its immigration office, banks, hospitals, coworking spaces, gyms and schools, plus visa notes for people staying months or years."
      />
      <Container className="py-14">
        <PoiMap
          points={PLACES.map((p) => ({ id: p.slug, name: p.name, lat: p.lat, lng: p.lng, cat: p.kind, sub: p.tagline, href: routes.place(p.slug) }))}
          categories={KINDS} center={[100.6, 13.2]} zoom={5} height={560}
        />
      </Container>
      <Container className="space-y-12 pb-16">
        {cities.map((city) => (
          <section key={city}>
            <h2 className="mb-5 text-3xl">{city}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLACES.filter((p) => p.city === city).map((p) => (
                <Link key={p.slug} href={routes.place(p.slug)}>
                  <Card className="h-full p-5 hover:border-primary/40">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{p.kind}</p>
                    <p className="mt-1 font-display text-xl">{p.name}</p>
                    <p className="mt-2 text-sm text-ink-2">{p.tagline}</p>
                    {poisFor(p.slug).length ? <p className="mt-3 text-xs text-muted">{poisFor(p.slug).length} mapped services</p> : null}
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <p className="text-sm"><Link href={routes.offices()} className="font-semibold text-primary underline">All immigration offices on one map</Link></p>
      </Container>
      <CtaBand title="Not sure which visa you need?" body="Six questions, checked against current rules." primary={{ href: routes.checker(), label: "Run the visa checker" }} />
      <JsonLd data={graph(itemListSchema("Long-stay places in Thailand", PLACES.map((p) => ({ name: p.name, path: routes.place(p.slug) }))))} />
    </>
  );
}
