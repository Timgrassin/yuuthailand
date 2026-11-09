import { PageHero } from "@/components/marketing/page-hero";
import { ProviderList } from "@/components/blocks/provider-list";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState } from "@/components/ui/primitives";
import { getCities, getPrograms, getProviders } from "@/lib/data";
import { routes } from "@/lib/seo/routes";
import { TRACKS, trackName } from "@/lib/tracks";

export type ProviderFilters = { city?: string; track?: string; q?: string };

export async function ProvidersDirectory({ city, track, q }: ProviderFilters) {
  const [all, cities, programs] = await Promise.all([getProviders({ city }), getCities(), track ? getPrograms({ track }) : Promise.resolve([])]);
  const withTrack = track ? new Set(programs.map((g) => g.provider_id)) : null;
  const needle = q?.trim().toLowerCase();
  const list = all.filter((p) => (!withTrack || withTrack.has(p.id)) && (!needle || `${p.name_en} ${p.ref_code}`.toLowerCase().includes(needle)));

  return (
    <>
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }]} />} eyebrow="Directory" title={"Visa schools and providers in Thailand"} lead={<AnswerBlock answer={"Every provider on Staylong carries a status: Verified means we checked its licence, address and visa support documents. Contacted means checks are in progress. Unverified means listed from public records only. Verified listings show the date of our last check. No listing has completed these checks yet."} />} />
    <Container className="py-12">

      <form className="mt-8 grid gap-3 rounded-card border border-line bg-surface p-4 sm:grid-cols-4" role="search">
        <label className="flex flex-col text-sm font-semibold">{"City"}
          <select name="city" defaultValue={city ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal">
            <option value="">{"All cities"}</option>
            {cities.map((c) => <option key={c.id} value={c.slug}>{c.name_en}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-sm font-semibold">{"Visa type"}
          <select name="track" defaultValue={track ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal">
            <option value="">{"All"}</option>
            {TRACKS.map((t) => <option key={t} value={t}>{trackName(t, true)}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-sm font-semibold">{"Name or ref"}
          <input name="q" defaultValue={q ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal" />
        </label>
        <button className="h-11 self-end rounded-full bg-primary px-5 font-semibold text-primary-ink">{"Filter"}</button>
      </form>

      <div className="mt-8">
        {list.length ? (
          <ProviderList providers={list} heading={`${list.length} schools and providers`} moreHeading="All other listings" listName="Visa providers in Thailand" showCity />
        ) : (
          <EmptyState>{"No providers match yet. We add and verify providers every week."}</EmptyState>
        )}
      </div>
    </Container>
    </>
  );
}
