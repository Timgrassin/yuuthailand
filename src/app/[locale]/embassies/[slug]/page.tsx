import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container, SectionHeading } from "@/components/ui/primitives";
import { getEmbassy } from "@/lib/data";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { embassySchema, graph } from "@/lib/seo/schema";
import type { Locale } from "@/lib/seo/site";
import { trackName } from "@/lib/tracks";

export const revalidate = 86400;
type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const e = await getEmbassy(slug);
  if (!e) return {};
  return pageMetadata({ locale, path: routes.embassy(slug), title: pick(locale, `${e.name_en}: Thai visa applications`, `${e.name_th ?? e.name_en}: การยื่นวีซ่าไทย`), description: pick(locale, `Address, contacts and long-stay visa notes for the ${e.name_en}.`, `ที่อยู่ ช่องทางติดต่อ และข้อมูลวีซ่าพำนักระยะยาวของ${e.name_th ?? e.name_en}`), noindex: !e.address || !e.last_checked_at });
}

export default async function EmbassyPage({ params }: P) {
  const { locale, slug } = await params;
  const e = await getEmbassy(slug);
  if (!e) notFound();
  setRequestLocale(locale);
  const name = pick(locale, e.name_en, e.name_th);
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Embassies", "สถานทูต"), path: routes.embassies() }, { name, path: routes.embassy(slug) }]} />
      <SectionHeading as="h1" title={name} />
      <AnswerBlock locale={locale} answer={pick(locale, e.notes_en ?? `${e.name_en} in ${e.city} handles Thai visa applications for its area.${e.evisa_supported ? " Applications go through the Thai e-visa portal." : ""}`, e.notes_th)} checkedAt={e.last_checked_at ?? undefined} />
      <Card className="mt-6 text-sm">
        <dl className="grid gap-2 sm:grid-cols-[8rem_1fr]">
          {e.address ? (<><dt className="font-semibold">{pick(locale, "Address", "ที่อยู่")}</dt><dd>{e.address}</dd></>) : null}
          {e.phone ? (<><dt className="font-semibold">{pick(locale, "Phone", "โทรศัพท์")}</dt><dd>{e.phone}</dd></>) : null}
          {e.website ? (<><dt className="font-semibold">Website</dt><dd><a href={e.website} rel="noopener nofollow" target="_blank" className="text-primary underline">{e.website}</a></dd></>) : null}
          {e.tracks.length ? (<><dt className="font-semibold">{pick(locale, "Visas", "วีซ่า")}</dt><dd>{e.tracks.map((t) => trackName(t, locale, true)).join(", ")}</dd></>) : null}
        </dl>
      </Card>
      <JsonLd data={graph(embassySchema({ slug: e.slug, name: e.name_en, city: e.city, country: e.country_code, address: e.address, website: e.website, phone: e.phone }, locale))} />
    </Container>
  );
}
