import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container, SectionHeading } from "@/components/ui/primitives";
import { getEmbassy } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { embassySchema, graph } from "@/lib/seo/schema";
import { trackName } from "@/lib/tracks";

export const revalidate = 86400;
type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEmbassy(slug);
  if (!e) return {};
  return pageMetadata({ path: routes.embassy(slug), title: `${e.name_en}: Thai visa applications`, description: `Address, contacts and long-stay visa notes for the ${e.name_en}.`, noindex: !e.address || !e.last_checked_at });
}

export default async function EmbassyPage({ params }: P) {
  const { slug } = await params;
  const e = await getEmbassy(slug);
  if (!e) notFound();
  const name = e.name_en;
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Yuu", path: "/" }, { name: "Embassies", path: routes.embassies() }, { name, path: routes.embassy(slug) }]} />
      <SectionHeading as="h1" title={name} />
      <AnswerBlock answer={e.notes_en ?? `${e.name_en} in ${e.city} handles Thai visa applications for its area.${e.evisa_supported ? " Applications go through the Thai e-visa portal." : ""}`} checkedAt={e.last_checked_at ?? undefined} />
      <Card className="mt-6 text-sm">
        <dl className="grid gap-2 sm:grid-cols-[8rem_1fr]">
          {e.address ? (<><dt className="font-semibold">{"Address"}</dt><dd>{e.address}</dd></>) : null}
          {e.phone ? (<><dt className="font-semibold">{"Phone"}</dt><dd>{e.phone}</dd></>) : null}
          {e.website ? (<><dt className="font-semibold">Website</dt><dd><a href={e.website} rel="noopener nofollow" target="_blank" className="text-primary underline">{e.website}</a></dd></>) : null}
          {e.tracks.length ? (<><dt className="font-semibold">{"Visas"}</dt><dd>{e.tracks.map((t) => trackName(t, true)).join(", ")}</dd></>) : null}
        </dl>
      </Card>
      <JsonLd data={graph(embassySchema({ slug: e.slug, name: e.name_en, city: e.city, country: e.country_code, address: e.address, website: e.website, phone: e.phone }))} />
    </Container>
  );
}
