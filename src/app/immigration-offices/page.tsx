import type { Metadata } from "next";
import Link from "next/link";
import { PoiMap } from "@/components/map/poi-map";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container } from "@/components/ui/primitives";
import { IMMIGRATION_OFFICES, geoConfirmed, officePinNote } from "@/lib/places";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  path: routes.offices(),
  title: `Thai immigration offices: ${IMMIGRATION_OFFICES.length} offices, hours and map`,
  description: "Where to do your 90-day report, visa extension and TM30 in Bangkok, Chiang Mai, Phuket, Pattaya, Hua Hin, the islands and more. Addresses, hours and queue tips.",
  updatedAt: "2026-11-04",
});

export default function OfficesHub() {
  const cities = [...new Set(IMMIGRATION_OFFICES.map((o) => o.city))];
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Immigration offices", path: routes.offices() }]} />}
        eyebrow={`${IMMIGRATION_OFFICES.length} offices`}
        title="Thai immigration offices, mapped."
        lead={<AnswerBlock answer="You must use the immigration office for the province where you live. It handles 90-day reports, extensions of stay, re-entry permits and TM30 issues. Offices move and hours change, so check the office page and call before you travel." checkedAt="2026-11-04" />}
      />
      <Container className="py-14">
        <PoiMap
          points={IMMIGRATION_OFFICES.map((o) => ({ id: o.slug, name: o.name, lat: o.lat, lng: o.lng, cat: geoConfirmed(o) ? "confirmed" : "approx", sub: officePinNote(o), href: routes.office(o.slug) }))}
          categories={[{ id: "confirmed", label: "Pin from listing", color: "#b4232c" }, { id: "approx", label: "Approximate pin", color: "#c08a06" }]}
          center={[100.6, 13.2]} zoom={5} height={560}
        />
      </Container>
      <Container className="space-y-10 pb-16">
        {cities.map((city) => (
          <section key={city}>
            <h2 className="mb-4 text-2xl">{city}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {IMMIGRATION_OFFICES.filter((o) => o.city === city).map((o) => (
                <Link key={o.slug} href={routes.office(o.slug)}>
                  <Card className="h-full p-5 hover:border-primary/40">
                    <p className="font-semibold">{o.name}</p>
                    <p className="mt-1 text-sm text-ink-2">{o.address}</p>
                    <p className="mt-2 text-xs text-muted">{o.hours ?? "Hours not confirmed"}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </Container>
      <CtaBand title="When is your next 90-day report?" body="Get every report window for the year from your entry date." primary={{ href: routes.tool("90-day-report-calculator"), label: "Open the calculator" }} />
      <JsonLd data={graph(itemListSchema("Thai immigration offices", IMMIGRATION_OFFICES.map((o) => ({ name: o.name, path: routes.office(o.slug) }))))} />
    </>
  );
}
