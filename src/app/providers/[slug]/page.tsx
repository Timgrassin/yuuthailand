import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { LeadForm } from "@/components/blocks/lead-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedLinks } from "@/components/seo/related-links";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Badge, Container } from "@/components/ui/primitives";
import { TypeArt, typeLabel } from "@/components/blocks/provider-type";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";
import { Check, Clock, ExternalLink, Globe, MapPin, Phone, Quote, ShieldCheck, Star } from "lucide-react";
import { PoiMap } from "@/components/map/poi-map";
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

  const priceFrom = p.price_from_thb != null ? Number(p.price_from_thb) : programs.some((g) => g.price_thb != null) ? Math.min(...programs.filter((g) => g.price_thb != null).map((g) => Number(g.price_thb))) : null;
  const officeKm = office && here ? Math.round(distanceKm(here, office)) : null;
  const meta = [
    p.languages?.length ? p.languages.join(", ") : null,
    p.founded_year ? `founded ${p.founded_year}` : null,
  ].filter(Boolean);
  const means: Record<string, { title: string; body: string[] }> = {
    verified: { title: "What Verified means", body: ["We checked its licence registration, address, visa support documents and prices.", "It means the paperwork is real. It is not a visa promise."] },
    contacted: { title: "What Contacted means", body: ["We have contacted this provider and our checks of its licence, address and visa documents are in progress.", "Until they finish, treat it like an unverified listing."] },
    unverified: { title: "What Unverified means", body: ["We list this provider from public records: Google Maps and its own website. We have not checked its licence, address or visa documents.", "Check them yourself before you pay anything."] },
    suspended: { title: "What Suspended means", body: ["We suspended this listing. Contact details are hidden."] },
  };
  const mean = means[p.status] ?? means.unverified;
  const lastCheck = p.last_checked_at ?? p.verified_at;

  return (
    <Container className="max-w-7xl pb-16 pt-8">
      <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }, { name: city, path: routes.city(p.city_slug) }, { name, path: routes.provider(slug) }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] xl:gap-14">
        <div className="min-w-0">
          <header className="flex gap-5">
            <TypeArt type={p.provider_type} className="hidden size-20 sm:grid" iconClass="size-8" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={p.status} isPartner={p.is_partner} />
                {p.status === "verified" && !p.is_partner ? <Badge tone="unverified">Not a partner</Badge> : null}
                <span className="rounded-full bg-sunken px-2.5 py-1 text-xs font-semibold text-ink-2">Ref {p.ref_code}</span>
              </div>
              <h1 className="mt-3 text-[2.25rem] leading-[1.08] sm:text-5xl">{name}</h1>
              <p className="mt-2 text-[17px] text-muted">
                <Link href={routes.city(p.city_slug)} className="underline decoration-line-strong underline-offset-2 hover:text-primary">{city}</Link> · {typeLabel(p.provider_type)}{meta.length ? ` · ${meta.join(" · ")}` : ""}
                {p.google_rating != null ? <span className="whitespace-nowrap"> · <Star className="-mt-0.5 inline size-4 fill-accent text-accent" aria-hidden /> <span className="font-semibold text-ink">{p.google_rating}</span>{p.google_reviews ? ` (${fmtNumber(p.google_reviews)} Google reviews)` : ""}</span> : null}
              </p>
            </div>
          </header>
          <div className="mt-6 border-y border-line py-5">
            <AnswerBlock answer={`${statusText} ${p.summary_en ?? ""}`.trim()} checkedAt={lastCheck ?? undefined} />
          </div>
          {p.description_en ? <div className="prose-sl mt-6 whitespace-pre-line">{p.description_en}</div> : null}

          <section className="mt-10 grid gap-6 rounded-card border border-line bg-surface p-5 sm:p-6 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="flex items-center gap-2 text-xl"><ShieldCheck className="size-5 text-primary-2" aria-hidden />Verification</h2>
              <dl className="mt-3 divide-y divide-line text-[15px]">
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted">Status</dt><dd><StatusBadge status={p.status} /></dd></div>
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted">Reference no.</dt><dd className="font-semibold tracking-wide">{p.ref_code}</dd></div>
                {lastCheck ? <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted">We checked on</dt><dd className="font-semibold"><time dateTime={lastCheck}>{fmtDate(lastCheck)}</time></dd></div> : null}
                {accreditations.map((a) => (
                  <div key={a.id} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                    <dt className="text-muted">{a.body_en}{a.reference ? <span className="block text-xs">{a.reference}</span> : null}</dt>
                    <dd>{!a.is_checked ? <Badge tone="unverified">Not checked</Badge> : p.status === "verified" ? <Badge tone="verified">Checked {fmtDate(a.checked_at)}</Badge> : <Badge tone="contacted">Found on list {fmtDate(a.checked_at)}</Badge>}</dd>
                  </div>
                ))}
                {events.map((e) => (
                  <div key={e.id} className="flex justify-between gap-4 py-2.5"><dt className="text-muted"><time dateTime={e.created_at}>{fmtDate(e.created_at)}</time></dt><dd>{e.to_status ? <StatusBadge status={e.to_status} /> : e.event_type}</dd></div>
                ))}
              </dl>
              {accreditations.length && p.status !== "verified" ? <p className="mt-3 text-sm text-muted">Found on a published government list. This is not Verified status and does not show that this provider can support a visa. <Link href={`${routes.methodology()}#government-lists`} className="text-primary underline">About these lists</Link></p> : null}
            </div>
            <div className="rounded-[10px] bg-sunken p-5 text-[15px] text-ink-2">
              <p className="font-semibold text-ink">{mean.title}</p>
              {mean.body.map((b) => <p key={b} className="mt-2">{b}</p>)}
              <Link href={routes.methodology()} className="mt-3 inline-block font-semibold text-primary underline underline-offset-2">Read our methodology</Link>
            </div>
          </section>

          {programs.length ? (
            <section className="mt-12">
              <SecHead title="Programs" note={`${programs.length} on file${supportsVisa ? " · visa support listed" : ""}`} />
              <ul className="space-y-3 md:hidden">
                {programs.map((g) => (
                  <li key={g.id} className="rounded-card border border-line bg-surface p-4">
                    <p className="font-semibold">{g.name_en}</p>
                    <p className="mt-1 text-sm text-muted">{[trackName(g.track, true) + (g.supports_visa ? " ✓" : ""), g.duration_months ? `${g.duration_months} months` : null, g.hours_per_week ? `${g.hours_per_week} h a week` : null].filter(Boolean).join(" · ")}</p>
                    {g.price_thb != null ? <p className="mt-2 font-semibold">{fmtNumber(Number(g.price_thb))} THB{g.price_note_en ? <span className="block text-xs font-normal text-muted">{g.price_note_en}</span> : null}</p> : null}
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-hidden rounded-card border border-line bg-surface md:block">
                <table className="w-full text-left text-[15px]">
                  <thead className="border-b border-line text-[13px] text-muted"><tr>
                    <th className="px-4 py-3 font-semibold">Program</th><th className="px-4 py-3 font-semibold">Visa</th><th className="px-4 py-3 font-semibold">Length</th><th className="px-4 py-3 text-right font-semibold">Price</th>
                  </tr></thead>
                  <tbody className="divide-y divide-line">
                    {programs.map((g) => (
                      <tr key={g.id}>
                        <td className="px-4 py-3.5 font-semibold">{g.name_en}{g.hours_per_week ? <span className="block text-xs font-normal text-muted">{g.hours_per_week} hours a week</span> : null}</td>
                        <td className="px-4 py-3.5">{trackName(g.track, true)}{g.supports_visa ? <Check className="ml-1 inline size-4 text-verified" aria-label="supports visa" /> : null}</td>
                        <td className="px-4 py-3.5">{g.duration_months ? `${g.duration_months} months` : "–"}</td>
                        <td className="px-4 py-3.5 text-right font-semibold">{g.price_thb != null ? `${fmtNumber(Number(g.price_thb))} THB` : "–"}{g.price_note_en ? <span className="block text-xs font-normal text-muted">{g.price_note_en}</span> : null}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {facts.length ? (
            <section className="mt-12">
              <SecHead title={`Facts from ${name}'s website`} note={`${facts.length} quoted${p.data_checked_at ? ` · checked ${fmtDate(p.data_checked_at)}` : ""}`} />
              <p className="-mt-2 mb-4 text-sm text-muted">Every fact is quoted word for word from the provider&apos;s own site. Staylong has not verified them.</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.key} className="flex flex-col rounded-card border border-line bg-surface p-4">
                    <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">{f.label}</p>
                    <p className="mt-1 font-semibold text-ink">{f.value}</p>
                    <p className="mt-2 flex gap-2 border-t border-line pt-2 text-sm text-muted"><Quote className="mt-0.5 size-3.5 shrink-0" aria-hidden /><span>&ldquo;{f.quote}&rdquo; <a href={f.source_url} rel="noopener nofollow" target="_blank" className="underline underline-offset-2 hover:text-primary">source</a></span></p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {mapPoints.length || hours.length ? (
            <section className="mt-12">
              <SecHead title="Location and what is nearby" note={officeKm != null && office ? `${officeKm} km to ${office.name}` : undefined} />
              <div className={mapPoints.length && hours.length ? "grid gap-6 xl:grid-cols-[1fr_15rem]" : ""}>
                {mapPoints.length ? (
                  <div className="min-w-0">
                    <PoiMap points={mapPoints} categories={mapCats} center={[here!.lng, here!.lat]} zoom={14} height={380} showList={false} />
                    <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
                      {p.google_maps_url ? <a href={p.google_maps_url} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 font-semibold text-primary">Open in Google Maps <ExternalLink className="size-3.5" aria-hidden /></a> : null}
                      {place ? <Link href={routes.place(place.slug)} className="font-semibold text-primary underline">Living in {place.name}</Link> : null}
                    </p>
                  </div>
                ) : null}
                {hours.length ? (
                  <div className="rounded-card border border-line bg-surface p-5 self-start">
                    <h3 className="flex items-center gap-2 text-base"><Clock className="size-4 text-primary-2" aria-hidden />Opening hours</h3>
                    <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-sm">{hours.map((h) => <Fragment key={h.day}><dt className="font-semibold">{h.day}</dt><dd className="text-ink-2">{h.hours}</dd></Fragment>)}</dl>
                    <p className="mt-3 text-xs text-muted">From Google Maps{p.data_checked_at ? `, ${fmtDate(p.data_checked_at)}` : ""}. Holiday hours may differ.</p>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {others.length ? (
            <section className="mt-12">
              <SecHead title={`Other providers in ${city}`} note={here ? "Closest first" : undefined} />
              <ul className="grid gap-3 sm:grid-cols-2">{others.map(({ x, d }) => (
                <li key={x.id}>
                  <Link href={routes.provider(x.slug)} className="group flex items-center gap-3 rounded-card border border-line bg-surface p-3.5 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-lift">
                    <TypeArt type={x.provider_type} className="size-11" iconClass="size-5" />
                    <span className="min-w-0 flex-1"><span className="block truncate font-semibold group-hover:text-primary">{x.name_en}</span><span className="block text-xs text-muted">{typeLabel(x.provider_type)}{d != null ? ` · ${d < 1 ? "<1" : Math.round(d)} km away` : ""}</span></span>
                  </Link>
                </li>
              ))}</ul>
            </section>
          ) : null}

          <RelatedLinks bare title={`Visas and living near ${name}`} groups={relatedForProvider(p, programs.map((g) => g.track))} />

          <Faq title={"Questions about this provider"} items={allFaqs} />

          {p.status !== "verified" ? (
            <div className="mt-12 flex flex-col gap-4 rounded-card bg-night-mesh p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-xl text-white">Is this your school?</h2>
                <p className="mt-1.5 max-w-xl text-[15px] text-white/75">Claim the listing to correct details, add programs and prices, and get verified. Verified providers can receive requests from students.</p>
              </div>
              <Link href={`${routes.forProviders()}?listing=${encodeURIComponent(p.ref_code)}#claim`} className="inline-flex h-11 shrink-0 items-center justify-center rounded-[10px] bg-white px-5 font-semibold text-night hover:bg-white/90">Claim this listing</Link>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {p.show_ctas ? (
            <>
              <div className="rounded-card border border-line bg-surface p-5 shadow-lift">
                <p className="text-sm text-muted">Price from</p>
                <p className="mt-0.5 text-[28px] font-semibold leading-tight">{priceFrom != null ? <>{fmtNumber(priceFrom)} <span className="text-base font-normal text-muted">THB, as published</span></> : <span className="text-xl">Ask the provider</span>}</p>
                <dl className="mt-4 divide-y divide-line border-t border-line text-sm">
                  <div className="flex justify-between gap-3 py-2.5"><dt className="text-muted">Type</dt><dd className="font-semibold">{typeLabel(p.provider_type)}</dd></div>
                  <div className="flex justify-between gap-3 py-2.5"><dt className="text-muted">Google rating</dt><dd className="font-semibold">{p.google_rating != null ? `${p.google_rating} / 5` : "Not rated"}</dd></div>
                  {office ? <div className="flex justify-between gap-3 py-2.5"><dt className="text-muted">Immigration office</dt><dd className="text-right font-semibold"><Link href={routes.office(office.slug)} className="hover:text-primary">{office.city}</Link>{officeKm != null ? <span className="block text-xs font-normal text-muted">about {officeKm} km away</span> : null}</dd></div> : null}
                </dl>
                <div className="mt-4 grid gap-2">
                  {p.website ? <a href={p.website} rel="noopener nofollow" target="_blank" className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-line-strong font-semibold text-primary transition-colors hover:border-primary"><Globe className="size-4" aria-hidden />{new URL(p.website).hostname.replace(/^www\./, "")}</a> : null}
                  <div className="grid grid-cols-2 gap-2 empty:hidden">
                    {p.phone ? <a href={`tel:${p.phone}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-line-strong text-sm font-semibold text-primary transition-colors hover:border-primary"><Phone className="size-4" aria-hidden />Call</a> : null}
                    {p.google_maps_url ? <a href={p.google_maps_url} rel="noopener nofollow" target="_blank" className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-line-strong text-sm font-semibold text-primary transition-colors hover:border-primary"><MapPin className="size-4" aria-hidden />Map</a> : null}
                  </div>
                </div>
                {p.line_id || p.phone || p.address_en ? (
                  <ul className="mt-4 space-y-1 text-sm text-ink-2">
                    {p.phone ? <li>{p.phone}</li> : null}
                    {p.line_id ? <li>LINE: {p.line_id}</li> : null}
                    {p.address_en ? <li className="text-muted">{p.address_en}</li> : null}
                  </ul>
                ) : null}
              </div>
              <div className="rounded-card border border-line bg-surface p-5"><LeadForm providerId={p.id} cityId={p.city_id} compact /></div>
            </>
          ) : (
            <div className="rounded-card border border-line bg-surface p-5 text-sm text-muted">Contact details are hidden while this listing is suspended.</div>
          )}
        </aside>
      </div>
      <JsonLd data={graph(providerSchema({ slug: p.slug, name: p.name_en, description: p.summary_en, providerType: p.provider_type, city: p.city_name_en, address: p.address_en, lat: p.lat, lng: p.lng, website: p.website, phone: p.phone, email: p.email, verifiedAt: p.verified_at, updatedAt: p.updated_at, refCode: p.ref_code, showCtas: p.show_ctas, programs: programs.map((g) => ({ name: g.name_en, priceThb: g.price_thb, durationMonths: g.duration_months })) }))} />
    </Container>
  );
}

function SecHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h2 className="text-2xl">{title}</h2>
      {note ? <p className="text-sm text-muted">{note}</p> : null}
    </div>
  );
}
