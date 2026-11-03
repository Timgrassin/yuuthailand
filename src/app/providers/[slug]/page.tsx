import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/blocks/lead-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Badge, Card, Container } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";
import { getAccreditations, getPrograms, getProvider, getProviderFaqs, getVerificationEvents } from "@/lib/data";
import { fmtDate, fmtNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, providerSchema } from "@/lib/seo/schema";
import { trackName } from "@/lib/tracks";

export const revalidate = 3600;

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) return {};
  const name = p.name_en;
  const city = p.city_name_en;
  return pageMetadata({
    path: routes.provider(slug),
    title: `${name}, ${city}: visa support, programs and verification`,
    description: p.summary_en ?? `${name} in ${city}. Verification status, programs and prices.`,
    noindex: p.status === "suspended",
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
          {p.description_en ? <div className="prose-yu mt-6 whitespace-pre-line">{p.description_en ?? ""}</div> : null}

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
                    {a.is_checked ? <Badge tone="verified">{"Checked"} {fmtDate(a.checked_at)}</Badge> : <Badge tone="unverified">{"Not checked"}</Badge>}
                  </li>
                ))}
              </ul>
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

          <Faq title={"Questions about this provider"} items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
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
