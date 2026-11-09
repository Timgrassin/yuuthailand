import Link from "next/link";
import { ProviderCard } from "@/components/blocks/provider-card";
import { JsonLd } from "@/components/seo/json-ld";
import { copy } from "@/lib/copy";
import type { Provider } from "@/lib/data";
import { isIndexableListing } from "@/lib/listing";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";

const CARD_COUNT = 36;
const statusLabels: Record<string, string> = copy.status;

type Props = { providers: Provider[]; heading: string; moreHeading: string; listName: string; showCity?: boolean };

// The richest listings get full cards. The rest stay as plain links, so every listing is still one click from
// this page (docs/seo.md, Internal linking) without sending megabytes of card markup.
export function ProviderList({ providers, heading, moreHeading, listName, showCity }: Props) {
  const sorted = [...providers].sort((a, b) => Number(isIndexableListing(b)) - Number(isIndexableListing(a)));
  const cards = sorted.slice(0, CARD_COUNT);
  const rest = sorted.slice(CARD_COUNT);
  return (
    <>
      <h2 className="mb-4 text-2xl">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map((p) => <ProviderCard key={p.id} p={p} />)}</div>
      {rest.length ? (
        <>
          <h2 className="mb-4 mt-12 text-2xl">{moreHeading}</h2>
          <ul className="gap-8 text-sm sm:columns-2 lg:columns-3">
            {rest.map((p) => (
              <li key={p.id} className="break-inside-avoid py-1">
                <Link href={routes.provider(p.slug)} prefetch={false} className="text-primary underline">{p.name_en}</Link>{" "}
                <span className="text-xs text-muted">{showCity ? `${p.city_name_en} · ` : ""}{statusLabels[p.status] ?? statusLabels.unverified}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <JsonLd data={graph(itemListSchema(listName, cards.map((p) => ({ name: p.name_en, path: routes.provider(p.slug) })), providers.length))} />
    </>
  );
}
