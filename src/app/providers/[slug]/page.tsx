import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { LeadForm } from "@/components/blocks/lead-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedLinks } from "@/components/seo/related-links";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Badge, Card, Container } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";
import { Clock, ExternalLink, MapPin, Quote, Star } from "lucide-react";
import { PoiMap } from "@/components/map/poi-map";
import { KeyFacts } from "@/components/marketing/key-facts";
import { getAccreditations, getPrograms, getProvider, getProviderFaqs, getProviders, getVerificationEvents } from "@/lib/data";
import { IMMIGRATION_OFFICES, PLACES, POI_META, distanceKm, officePinNote, poisFor } from "@/lib/places";
import { fmtDate, fmtNumber } from "@/lib/format";
import { isIndexableListing } from "@/lib/listing";
import { pageMetadata } from "@/lib/seo/metadata";
import { relatedForProvider } from "@/lib/seo/related";
import { listingDescription, listingTitle } from "@/lib/seo/text";
import { routes } from "@/lib/seo/routes";
import { graph, providerSchema } from "@/lib/seo/schema";
import { trackName } from "@/lib/tracks";

export const revalidate = 3600;

// An empty list turns on incremental caching: each page is built on its first visit, then served from the CDN.
export function generateStaticParams() {
  return [];
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) return {};
  const name = p.name_en;
  const city = p.city_name_en;
  return pageMetadata({
    path: routes.provider(slug),
    title: listingTitle({ name, city, type: p.provider_type, slug, address: p.address_en }),
    description: listingDescription(p.summary_en ?? `${name} in ${city}. Verification status, programs and prices.`),
    // D14/D23: scraped listings stay noindex until verified, described or enriched with 3+ quoted facts.
    noindex: !isIndexableListing(p),
    updatedAt: p.updated_at,
  });
}

export default async function ProviderPage({ params }: P) {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) notFound();
  const [programs, faqs, accreditations, events] = await Promise.all([getPrograms({ providerId: p.id }), getProviderFaqs(p.id), getAccreditations(p.id), getVerificationEvents(p.id)]);
  const name = p.name_en;
  const city = p.city_name_en;
  const statusLine: Record<string, string> = {
    verified: "Staylong has verified this provider's licence, address and visa support documents.",
    contacted: "Staylong has contacted this provider and verification is in progress.",
    unverified: "Staylong lists this provider from public records. It is not verified yet.",
    suspended: "Staylong has suspended this listing. Contact details are hidden.",
  };
  const statusText = statusLine[p.status] ?? statusLine.unverified;
  const facts = p.facts ?? [];
  const hours = p.opening_hours ?? [];
  const here = p.lat != null && p.lng != null ? { lat: Number(p.lat), lng: Number(p.lng) } : null;
  const office = here ? [...IMMIGRATION_OFFICES].sort((a, b) => distanceKm(here, a) - distanceKm(here, b))[0] : IMMIGRATION_OFFICES.find((o) => o.citySlug === p.city_slug);
  const place = here ? [...PLACES].sort((a, b) => distanceKm(here, a) - distanceKm(here, b))[0] : undefined;
  const nearPois = here && place ? poisFor(place.slug).filter((x) => distanceKm(here, x) < 3) : [];
  const others = (await getProviders({ city: p.city_slug }).catch(() => [])).filter((x) => x.id !== p.id && x.status !== "suspended")
    .map((x) => ({ x, d: here && x.lat != null && x.lng != null ? distanceKm(here, { lat: Number(x.lat), lng: Number(x.lng) }) : null }))
    // Indexable neighbours first, so link equity reaches pages that can rank; then by distance.
    .sort((a, b) => Number(isIndexableListing(b.x)) - Number(isIndexableListing(a.x)) || (a.d ?? 1e9) - (b.d ?? 1e9)).slice(0, 6);
  const supportsVisa = programs.some((g) => g.supports_visa);
  const autoFaqs = [
    ...(p.address_en ? [{ question: `Where is ${name}?`, answer: `${name} is at ${p.address_en}.` }] : []),
    ...(p.google_rating != null ? [{ question: `What is ${name}'s Google rating?`, answer: `${p.google_rating} out of 5 from ${fmtNumber(p.google_reviews ?? 0)} Google reviews, as of ${fmtDate(p.data_checked_at ?? p.updated_at)}.` }] : []),
    ...(hours.length ? [{ question: `What are ${name}'s opening hours?`, answer: hours.map((h) => `${h.day}: ${h.hours}`).join(". ") + "." }] : []),
    { question: `Can ${name} support a visa?`, answer: supportsVisa ? `Yes. At least one program at ${name} is listed as visa-supporting. Confirm the school's licence before you pay.` : `Staylong has no visa-supporting program on file for ${name}. Ask the provider directly and check its licence.` },
    ...(office ? [{ question: `Which immigration office is closest to ${name}?`, answer: `${office.name}${here ? `, about ${Math.round(distanceKm(here, office))} km away` : ""}. ${office.address}.` }] : []),
  ];
  const allFaqs = [...faqs.map((f) => ({ question: f.question, answer: f.answer })), ...autoFaqs];
  const mapPoints = here ? [
    { id: "this", name, lat: here.lat, lng: here.lng, cat: "this", sub: p.address_en ?? undefined },
    ...(office ? [{ id: `imm-${office.slug}`, name: office.name, lat: office.lat, lng: office.lng, cat: "immigration", sub: officePinNote(office), href: routes.office(office.slug) }] : []),
    ...others.filter((o) => o.x.lat != null && o.x.lng != null).map((o) => ({ id: o.x.id, name: o.x.name_en, lat: Number(o.x.lat), lng: Number(o.x.lng), cat: "provider", sub: o.x.provider_type.replace(/_/g, " "), href: routes.provider(o.x.slug) })),
    ...nearPois.map((x) => ({ id: x.id, name: x.name, lat: x.lat, lng: x.lng, cat: x.cat, sub: x.street || undefined, href: x.website || undefined })),
  ] : [];
  const mapCats = [
    { id: "this", label: name.length > 24 ? "This listing" : name, color: "#c08a06" },
    { id: "immigration", label: "Immigration", color: POI_META.immigration.color },
    { id: "provider", label: "Other providers", color: "#5f3dc4" },
    ...(["bank", "hospital", "coworking", "gym", "supermarket"] as const).map((c) => ({ id: c, label: POI_META[c].plural, color: POI_META[c].color })),
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }, { name: city, path: routes.city(p.city_slug) }, { name, path: routes.provider(slug) }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} isPartner={p.is_partner} />
            <span className="text-sm text-muted">{"Ref"} {p.ref_code}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{name}</h1>
          <p className="text-muted"><Link href={routes.city(p.city_slug)} className="underline">{city}</Link> · {p.provider_type.replace(/_/g, " ")}</p>
          <div className="mt-6">
            <AnswerBlock answer={`${statusText} ${p.summary_en ?? ""}`.trim()} checkedAt={p.last_checked_at ?? p.verified_at ?? undefined} />
          </div>
          <div className="mt-8">
            <KeyFacts facts={[
              { label: "Google rating", value: p.google_rating != null ? `${p.google_rating} / 5` : "Not rated", note: p.google_reviews ? `${fmtNumber(p.google_reviews)} reviews` : undefined, icon: Star },
              { label: "Type", value: p.provider_type.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()), note: city },
              { label: "Price from", value: p.price_from_thb != null ? `${fmtNumber(Number(p.price_from_thb))} THB` : programs.some((g) => g.price_thb != null) ? `${fmtNumber(Math.min(...programs.filter((g) => g.price_thb != null).map((g) => Number(g.price_thb))))} THB` : "Ask", note: "as published" },
              { label: "Immigration", value: office ? office.city : city, note: office && here ? `${Math.round(distanceKm(here, office))} km to office` : "nearest office", icon: MapPin },
            ]} />
          </div>
          {p.description_en ? <div className="prose-yu mt-6 whitespace-pre-line">{p.description_en ?? ""}</div> : null}

          {facts.length ? (
            <section className="mt-10">
              <h2 className="mb-2 text-2xl font-bold">Facts from {name}&apos;s website</h2>
              <p className="mb-4 text-sm text-muted">Every fact below is quoted word for word from the provider&apos;s own site{p.data_checked_at ? `, checked ${fmtDate(p.data_checked_at)}` : ""}. Staylong has not verified them.</p>
              <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
                {facts.map((f) => (
                  <div key={f.key} className="grid gap-2 px-5 py-4 sm:grid-cols-[11rem_1fr]">
                    <p className="font-semibold">{f.label}</p>
                    <div>
                      <p className="text-ink">{f.value}</p>
                      <p className="mt-1 flex gap-2 text-sm text-muted"><Quote className="mt-0.5 size-3.5 shrink-0" aria-hidden /><span>&ldquo;{f.quote}&rdquo; <a href={f.source_url} rel="noopener nofollow" target="_blank" className="underline">source</a></span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {hours.length ? (
            <section className="mt-10">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold"><Clock className="size-6 text-primary-2" aria-hidden />Opening hours</h2>
              <dl className="grid max-w-md grid-cols-[8rem_1fr] gap-y-1.5 text-sm">{hours.map((h) => <Fragment key={h.day}><dt className="font-semibold">{h.day}</dt><dd className="text-ink-2">{h.hours}</dd></Fragment>)}</dl>
              <p className="mt-2 text-xs text-muted">From Google Maps{p.data_checked_at ? `, ${fmtDate(p.data_checked_at)}` : ""}. Holiday hours may differ.</p>
            </section>
          ) : null}

          {mapPoints.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">Location and what is nearby</h2>
              <PoiMap points={mapPoints} categories={mapCats} center={[here!.lng, here!.lat]} zoom={14} height={420} showList={false} />
              <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
                {p.google_maps_url ? <a href={p.google_maps_url} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 font-semibold text-primary">Open in Google Maps <ExternalLink className="size-3.5" aria-hidden /></a> : null}
                {place ? <Link href={routes.place(place.slug)} className="font-semibold text-primary underline">Living in {place.name}</Link> : null}
              </p>
            </section>
          ) : null}

          {programs.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{"Programs"}</h2>
              <div className="overflow-x-auto rounded-card border border-line bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-soft text-primary"><tr>
                    <th className="p-3">{"Program"}</th><th className="p-3">{"Visa"}</th><th className="p-3">{"Length"}</th><th className="p-3">{"Price"}</th>
                  </tr></thead>
                  <tbody className="divide-y divide-line">
                    {programs.map((g) => (
                      <tr key={g.id}>
                        <td className="p-3 font-semibold">{g.name_en}{g.hours_per_week ? <span className="block text-xs font-normal text-muted">{g.hours_per_week} {"hours a week"}</span> : null}</td>
                        <td className="p-3">{trackName(g.track, true)}{g.supports_visa ? " ✓" : ""}</td>
                        <td className="p-3">{g.duration_months ? `${g.duration_months} ${"months"}` : "–"}</td>
                        <td className="p-3">{g.price_thb != null ? `${fmtNumber(Number(g.price_thb))} ${"THB"}` : "–"}{g.price_note_en ? <span className="block text-xs text-muted">{g.price_note_en}</span> : null}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {accreditations.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{"Licences and accreditation"}</h2>
              <ul className="space-y-2">
                {accreditations.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{a.body_en}</span>
                    {a.reference ? <span className="text-sm text-muted">{a.reference}</span> : null}
                    {!a.is_checked ? <Badge tone="unverified">{"Not checked"}</Badge> : p.status === "verified" ? <Badge tone="verified">{"Checked"} {fmtDate(a.checked_at)}</Badge> : <Badge tone="contacted">{"Found on list"} {fmtDate(a.checked_at)}</Badge>}
                  </li>
                ))}
              </ul>
              {p.status === "verified" ? null : <p className="mt-3 text-sm text-muted">{"Found on a published government list. This is not Verified status and does not show that this provider can support a visa. "}<Link href={`${routes.methodology()}#government-lists`} className="text-primary underline">{"About these lists"}</Link></p>}
            </section>
          ) : null}

          {events.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{"Verification history"}</h2>
              <ol className="space-y-2 text-sm">
                {events.map((e) => (
                  <li key={e.id}><time dateTime={e.created_at} className="text-muted">{fmtDate(e.created_at)}</time> · {e.to_status ? <StatusBadge status={e.to_status} /> : e.event_type}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm"><Link href={routes.methodology()} className="text-primary underline">{"How we verify"}</Link></p>
            </section>
          ) : null}

          {others.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">Other providers in {city}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">{others.map(({ x, d }) => <li key={x.id}><Link href={routes.provider(x.slug)} className="block rounded-card border border-line bg-surface p-4 hover:border-primary/40"><span className="font-semibold">{x.name_en}</span><span className="block text-xs text-muted">{x.provider_type.replace(/_/g, " ")}{d != null ? ` · ${d < 1 ? "<1" : Math.round(d)} km away` : ""}</span></Link></li>)}</ul>
            </section>
          ) : null}

          <RelatedLinks bare title={`Visas and living near ${name}`} groups={relatedForProvider(p, programs.map((g) => g.track))} />

          <Faq title={"Questions about this provider"} items={allFaqs} />

          {p.status !== "verified" ? (
            <Card className="mt-10">
              <h2 className="text-xl font-bold">Is this your school?</h2>
              <p className="mt-2 text-sm text-ink-2">Claim the listing to correct details, add programs and prices, and get verified. Verified providers receive student enquiries.</p>
              <Link href={`${routes.methodology()}#claim`} className="mt-3 inline-block text-sm font-semibold text-primary underline">Claim or correct this listing</Link>
            </Card>
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          {p.show_ctas ? (
            <>
              <Card>
                <h2 className="mb-3 font-bold">{"Contact"}</h2>
                <ul className="space-y-1 text-sm">
                  {p.website ? <li><a href={p.website} rel="noopener nofollow" target="_blank" className="text-primary underline">{new URL(p.website).hostname}</a></li> : null}
                  {p.phone ? <li><a href={`tel:${p.phone}`}>{p.phone}</a></li> : null}
                  {p.line_id ? <li>LINE: {p.line_id}</li> : null}
                  {p.address_en ? <li className="text-muted">{p.address_en ?? ""}</li> : null}
                </ul>
              </Card>
              <Card><LeadForm providerId={p.id} cityId={p.city_id} compact /></Card>
            </>
          ) : (
            <Card className="text-sm text-muted">{"Contact details are hidden while this listing is suspended."}</Card>
          )}
        </aside>
      </div>
      <JsonLd data={graph(providerSchema({ slug: p.slug, name: p.name_en, description: p.summary_en, providerType: p.provider_type, city: p.city_name_en, address: p.address_en, lat: p.lat, lng: p.lng, website: p.website, phone: p.phone, email: p.email, verifiedAt: p.verified_at, updatedAt: p.updated_at, refCode: p.ref_code, showCtas: p.show_ctas, programs: programs.map((g) => ({ name: g.name_en, priceThb: g.price_thb, durationMonths: g.duration_months })) }))} />
    </Container>
  );
}
