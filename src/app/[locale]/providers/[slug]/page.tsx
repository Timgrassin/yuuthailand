import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LeadForm } from "@/components/blocks/lead-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Badge, Card, Container } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { Link } from "@/i18n/navigation";
import { getAccreditations, getPrograms, getProvider, getProviderFaqs, getVerificationEvents } from "@/lib/data";
import { fmtDate, fmtNumber, pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, providerSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/seo/site";
import { trackName } from "@/lib/tracks";

export const revalidate = 3600;

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getProvider(slug);
  if (!p) return {};
  const name = pick(locale, p.name_en, p.name_th);
  const city = pick(locale, p.city_name_en, p.city_name_th);
  return pageMetadata({
    locale,
    path: routes.provider(slug),
    title: pick(locale, `${name}, ${city}: visa support, programs and verification`, `${name} ${city}: การรองรับวีซ่า หลักสูตร และการตรวจสอบ`),
    description: pick(locale, p.summary_en ?? `${name} in ${city}. Verification status, programs and prices.`, p.summary_th ?? `${name} ใน${city} สถานะการตรวจสอบ หลักสูตร และราคา`),
    noindex: p.status === "suspended",
    updatedAt: p.updated_at,
  });
}

export default async function ProviderPage({ params }: P) {
  const { locale, slug } = await params;
  const p = await getProvider(slug);
  if (!p) notFound();
  setRequestLocale(locale);
  const [programs, faqs, accreditations, events] = await Promise.all([getPrograms({ providerId: p.id }), getProviderFaqs(p.id, locale), getAccreditations(p.id), getVerificationEvents(p.id)]);
  const name = pick(locale, p.name_en, p.name_th);
  const city = pick(locale, p.city_name_en, p.city_name_th);
  const statusLine: Record<string, [string, string]> = {
    verified: ["Yuu has verified this provider's licence, address and visa support documents.", "Yuu ตรวจสอบใบอนุญาต ที่อยู่ และเอกสารรองรับวีซ่าของผู้ให้บริการรายนี้แล้ว"],
    contacted: ["Yuu has contacted this provider and verification is in progress.", "Yuu ติดต่อผู้ให้บริการรายนี้แล้ว และอยู่ระหว่างการตรวจสอบ"],
    unverified: ["Yuu lists this provider from public records. It is not verified yet.", "Yuu แสดงผู้ให้บริการรายนี้จากข้อมูลสาธารณะ ยังไม่ได้ตรวจสอบ"],
    suspended: ["Yuu has suspended this listing. Contact details are hidden.", "Yuu ระงับรายการนี้ ข้อมูลติดต่อถูกซ่อน"],
  };
  const [sEn, sTh] = statusLine[p.status] ?? statusLine.unverified;

  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Providers", "ผู้ให้บริการ"), path: routes.providers() }, { name: city, path: routes.city(p.city_slug) }, { name, path: routes.provider(slug) }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} isPartner={p.is_partner} />
            <span className="text-sm text-muted">{pick(locale, "Ref", "รหัส")} {p.ref_code}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{name}</h1>
          <p className="text-muted"><Link href={routes.city(p.city_slug)} className="underline">{city}</Link> · {p.provider_type.replace(/_/g, " ")}</p>
          <div className="mt-6">
            <AnswerBlock locale={locale} answer={`${pick(locale, sEn, sTh)} ${pick(locale, p.summary_en ?? "", p.summary_th)}`.trim()} checkedAt={p.last_checked_at ?? p.verified_at ?? undefined} />
          </div>
          {pick(locale, p.description_en, p.description_th) ? <div className="prose-yu mt-6 whitespace-pre-line">{pick(locale, p.description_en ?? "", p.description_th)}</div> : null}

          {programs.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Programs", "หลักสูตร")}</h2>
              <div className="overflow-x-auto rounded-card border border-line bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-soft text-primary"><tr>
                    <th className="p-3">{pick(locale, "Program", "หลักสูตร")}</th><th className="p-3">{pick(locale, "Visa", "วีซ่า")}</th><th className="p-3">{pick(locale, "Length", "ระยะเวลา")}</th><th className="p-3">{pick(locale, "Price", "ราคา")}</th>
                  </tr></thead>
                  <tbody className="divide-y divide-line">
                    {programs.map((g) => (
                      <tr key={g.id}>
                        <td className="p-3 font-semibold">{pick(locale, g.name_en, g.name_th)}{g.hours_per_week ? <span className="block text-xs font-normal text-muted">{g.hours_per_week} {pick(locale, "hours a week", "ชั่วโมงต่อสัปดาห์")}</span> : null}</td>
                        <td className="p-3">{trackName(g.track, locale, true)}{g.supports_visa ? " ✓" : ""}</td>
                        <td className="p-3">{g.duration_months ? `${g.duration_months} ${pick(locale, "months", "เดือน")}` : "–"}</td>
                        <td className="p-3">{g.price_thb != null ? `${fmtNumber(Number(g.price_thb), locale)} ${pick(locale, "THB", "บาท")}` : "–"}{g.price_note_en ? <span className="block text-xs text-muted">{pick(locale, g.price_note_en, g.price_note_th)}</span> : null}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {accreditations.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Licences and accreditation", "ใบอนุญาตและการรับรอง")}</h2>
              <ul className="space-y-2">
                {accreditations.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{pick(locale, a.body_en, a.body_th)}</span>
                    {a.reference ? <span className="text-sm text-muted">{a.reference}</span> : null}
                    {a.is_checked ? <Badge tone="verified">{pick(locale, "Checked", "ตรวจแล้ว")} {fmtDate(a.checked_at, locale)}</Badge> : <Badge tone="unverified">{pick(locale, "Not checked", "ยังไม่ตรวจ")}</Badge>}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {events.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Verification history", "ประวัติการตรวจสอบ")}</h2>
              <ol className="space-y-2 text-sm">
                {events.map((e) => (
                  <li key={e.id}><time dateTime={e.created_at} className="text-muted">{fmtDate(e.created_at, locale)}</time> · {e.to_status ? <StatusBadge status={e.to_status} /> : e.event_type}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm"><Link href={routes.methodology()} className="text-primary underline">{pick(locale, "How we verify", "วิธีการตรวจสอบของเรา")}</Link></p>
            </section>
          ) : null}

          <Faq title={pick(locale, "Questions about this provider", "คำถามเกี่ยวกับผู้ให้บริการรายนี้")} items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          {p.show_ctas ? (
            <>
              <Card>
                <h2 className="mb-3 font-bold">{pick(locale, "Contact", "ติดต่อ")}</h2>
                <ul className="space-y-1 text-sm">
                  {p.website ? <li><a href={p.website} rel="noopener nofollow" target="_blank" className="text-primary underline">{new URL(p.website).hostname}</a></li> : null}
                  {p.phone ? <li><a href={`tel:${p.phone}`}>{p.phone}</a></li> : null}
                  {p.line_id ? <li>LINE: {p.line_id}</li> : null}
                  {pick(locale, p.address_en, p.address_th) ? <li className="text-muted">{pick(locale, p.address_en ?? "", p.address_th)}</li> : null}
                </ul>
              </Card>
              <Card><LeadForm locale={locale} providerId={p.id} cityId={p.city_id} compact /></Card>
            </>
          ) : (
            <Card className="text-sm text-muted">{pick(locale, "Contact details are hidden while this listing is suspended.", "ข้อมูลติดต่อถูกซ่อนขณะที่รายการนี้ถูกระงับ")}</Card>
          )}
        </aside>
      </div>
      <JsonLd data={graph(providerSchema({ slug: p.slug, name: p.name_en, description: p.summary_en, providerType: p.provider_type, city: p.city_name_en, address: p.address_en, lat: p.lat, lng: p.lng, website: p.website, phone: p.phone, email: p.email, verifiedAt: p.verified_at, updatedAt: p.updated_at, refCode: p.ref_code, showCtas: p.show_ctas, programs: programs.map((g) => ({ name: g.name_en, priceThb: g.price_thb, durationMonths: g.duration_months })) }, locale))} />
    </Container>
  );
}
