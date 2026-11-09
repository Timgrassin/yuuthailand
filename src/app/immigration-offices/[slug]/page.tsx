import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Clock, ExternalLink, Phone, ShieldCheck } from "lucide-react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { PoiMap } from "@/components/map/poi-map";
import { CtaBand } from "@/components/marketing/cta-band";
import { KeyFacts } from "@/components/marketing/key-facts";
import { PageHero } from "@/components/marketing/page-hero";
import { BulletList } from "@/components/places/linked-text";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Card, Container } from "@/components/ui/primitives";
import { IMMIGRATION_OFFICES, PLACES, POI_META, distanceKm, geoConfirmed, getOffice, officePinNote, officesInCity } from "@/lib/places";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { firstFit } from "@/lib/seo/text";
import { breadcrumbSchema, faqSchema, graph, officeSchema } from "@/lib/seo/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return IMMIGRATION_OFFICES.map((o) => ({ slug: o.slug }));
}
type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const o = getOffice((await params).slug);
  if (!o) return {};
  return pageMetadata({
    path: routes.office(o.slug),
    title: firstFit(`${o.name}: hours, address and 90-day report tips`, `${o.name}: hours and 90-day reports`, `${o.name}: hours and address`, o.name),
    description: `Address, hours and queue tips for ${o.name}. Where to file 90-day reports, extensions and TM30 in ${o.city}.`,
    updatedAt: o.updated,
  });
}

export default async function OfficePage({ params }: P) {
  const o = getOffice((await params).slug);
  if (!o) notFound();
  const path = routes.office(o.slug);
  const crumbs = [{ name: "Staylong", path: "/" }, { name: "Immigration offices", path: routes.offices() }, { name: o.name, path }];
  const served = PLACES.filter((p) => p.citySlug === o.citySlug);
  const nearby = IMMIGRATION_OFFICES.filter((x) => x.slug !== o.slug).sort((a, b) => distanceKm(o, a) - distanceKm(o, b)).slice(0, 4);
  const sameCity = officesInCity(o.citySlug).filter((x) => x.slug !== o.slug);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.name}, ${o.address}`)}`;
  const answer = `${o.name} handles ${o.services.slice(0, 3).join(", ").toLowerCase()} and other immigration tasks for foreigners living in ${o.servesAreas.slice(0, 3).join(", ")}. ${o.hours ? `Reported hours: ${o.hours}.` : "Hours are not confirmed, so call before you go."}`;
  const faqs = [
    { question: `Where is ${o.name}?`, answer: `${o.address}.${o.confidence === "high" ? "" : " Office locations change: confirm the address before you travel."}` },
    { question: `What are the opening hours of ${o.name}?`, answer: o.hours ?? "We could not confirm the hours. Call the office or the Immigration hotline 1178 before you travel." },
    { question: `Can I do my 90-day report at ${o.name}?`, answer: o.services.some((s) => /90-day/i.test(s)) ? "Yes. You can also file online at tm47.immigration.go.th after your first in-person report, or send it by registered post." : "This office is not reported to take 90-day reports. Use the main office for your province." },
    { question: `Which areas does ${o.name} serve?`, answer: `It serves residents of ${o.servesAreas.join(", ")}. You must use the office for the province where you live.` },
    ...(o.appointmentSystem ? [{ question: `Do I need an appointment at ${o.name}?`, answer: o.appointmentSystem }] : []),
  ];

  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={crumbs} />}
        eyebrow={`Immigration office · ${o.city}`}
        title={o.name}
        lead={<AnswerBlock answer={answer} checkedAt={o.updated} sources={o.sources.slice(0, 2)} />}
      />
      <Container className="relative -mt-8">
        <KeyFacts facts={[
          { label: "Hours", value: o.hours ? o.hours.split(",")[0] : "Not confirmed", icon: Clock },
          { label: "Phone", value: o.phone ?? "Not listed", icon: Phone },
          { label: "Services", value: String(o.services.length), note: "listed tasks" },
          { label: "Data confidence", value: o.confidence[0].toUpperCase() + o.confidence.slice(1), note: "see sources", icon: ShieldCheck },
        ]} />
      </Container>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0 space-y-14">
          {o.confidence !== "high" ? <p className="flex gap-3 rounded-sm border border-accent/30 bg-accent-soft p-4 text-sm text-warn"><AlertTriangle className="size-5 shrink-0" aria-hidden />Some details for this office come from secondary sources or conflict. Confirm the address and hours before you travel.</p> : null}
          {!geoConfirmed(o) ? <p className="text-sm text-muted">The map pin is approximate. Use the address or the Google Maps link to navigate.</p> : null}
          <section>
            <h2 className="mb-5 text-3xl">Address and map</h2>
            <Card className="mb-5">
              <p className="text-ink-2">{o.address}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href={maps} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 font-semibold text-primary">Open in Google Maps <ExternalLink className="size-3.5" aria-hidden /></a>
                {o.website ? <a href={o.website} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 font-semibold text-primary">Official site <ExternalLink className="size-3.5" aria-hidden /></a> : null}
              </p>
            </Card>
            <PoiMap
              points={[o, ...nearby].map((x) => ({ id: x.slug, name: x.name, lat: x.lat, lng: x.lng, cat: x.slug === o.slug ? "this" : "other", sub: officePinNote(x), href: x.slug === o.slug ? undefined : routes.office(x.slug) }))}
              categories={[{ id: "this", label: "This office", color: POI_META.immigration.color }, { id: "other", label: "Other offices", color: "#868e96" }]}
              center={[o.lng, o.lat]} zoom={12} height={420} showList={false}
            />
          </section>
          <section>
            <h2 className="mb-5 text-3xl">Services</h2>
            <div className="flex flex-wrap gap-2">{o.services.map((s) => <span key={s} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm">{s}</span>)}</div>
            {o.appointmentSystem ? <p className="mt-5 text-ink-2"><strong className="text-ink">Queue and appointments.</strong> {o.appointmentSystem}</p> : null}
          </section>
          {o.tips.length ? <section><h2 className="mb-5 text-3xl">Tips from long-stayers</h2><BulletList items={o.tips} /></section> : null}
          {o.recentChanges.length ? <section><h2 className="mb-5 text-3xl">Recent changes</h2><BulletList items={o.recentChanges} /></section> : null}
          {served.length ? (
            <section>
              <h2 className="mb-5 text-3xl">Places this office serves</h2>
              <div className="grid gap-3 sm:grid-cols-2">{served.map((p) => <Link key={p.slug} href={routes.place(p.slug)}><Card className="h-full p-5 hover:border-primary/40"><p className="font-semibold">{p.name}</p><p className="mt-1 text-sm text-muted">{p.tagline}</p></Card></Link>)}</div>
            </section>
          ) : null}
          <Faq title={`${o.city} immigration: questions`} items={faqs} />
          <section className="rounded-card border border-line bg-surface p-6 text-sm">
            <h2 className="text-xl">Sources</h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5">{o.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}</ol>
            <p className="mt-4 text-xs text-muted">Last checked {o.updated} · Pending expert review</p>
          </section>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <EmailCapture title="Never miss a 90-day report" body={`Get a reminder before your report is due, plus alerts when ${o.city} immigration changes.`} leadMagnet={`office_${o.slug}`} button="Remind me" meta={{ office: o.slug, city: o.citySlug }} tracks={[]} />
          <Card>
            <h2 className="mb-3 text-lg">{sameCity.length ? `Other offices in ${o.city}` : "Nearest other offices"}</h2>
            <ul className="space-y-2 text-sm">{(sameCity.length ? sameCity : nearby).map((x) => <li key={x.slug}><Link href={routes.office(x.slug)} className="font-medium text-primary hover:underline">{x.name}</Link><span className="block text-xs text-muted">{x.city} · {Math.round(distanceKm(o, x))} km</span></li>)}</ul>
          </Card>
        </aside>
      </Container>
      <CtaBand title="Work out your next 90-day date" body="Enter your entry date and get every report window for the year." primary={{ href: routes.tool("90-day-report-calculator"), label: "Open the calculator" }} />
      <JsonLd data={graph(
        officeSchema({ path, name: o.name, city: o.city, address: o.address, lat: o.lat, lng: o.lng, phone: o.phone, website: o.website, hours: o.hours, exactGeo: geoConfirmed(o) }),
        breadcrumbSchema(crumbs),
        faqSchema(faqs),
      )} />
    </>
  );
}
