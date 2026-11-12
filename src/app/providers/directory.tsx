import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProviderList } from "@/components/blocks/provider-list";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge, Container, EmptyState } from "@/components/ui/primitives";
import { getCities, getPrograms, getProviders } from "@/lib/data";
import { fmtNumber } from "@/lib/format";
import { routes } from "@/lib/seo/routes";
import { TRACKS, trackName } from "@/lib/tracks";

export type ProviderFilters = { city?: string; track?: string; q?: string };

const field = "mt-1.5 h-11 w-full rounded-[10px] border border-line-strong bg-surface px-3 text-[15px] font-normal text-ink";

export async function ProvidersDirectory({ city, track, q }: ProviderFilters) {
  const [all, cities, programs] = await Promise.all([getProviders({ city }), getCities(), track ? getPrograms({ track }) : Promise.resolve([])]);
  const withTrack = track ? new Set(programs.map((g) => g.provider_id)) : null;
  const needle = q?.trim().toLowerCase();
  const list = all.filter((p) => (!withTrack || withTrack.has(p.id)) && (!needle || `${p.name_en} ${p.ref_code}`.toLowerCase().includes(needle)));
  const listed = all; // getProviders already drops hidden listings (isListed).
  const verified = listed.filter((p) => p.status === "verified").length;
  const withFacts = listed.filter((p) => (p.facts?.length ?? 0) > 0).length;
  const filtered = Boolean(city || track || needle);
  const cityName = cities.find((c) => c.slug === city)?.name_en;

  return (
    <Container className="max-w-7xl pb-16 pt-8">
      <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Providers", path: routes.providers() }]} />
      <header className="max-w-3xl">
        <h1 className="text-[2.25rem] leading-[1.08] sm:text-5xl">Visa schools and providers in Thailand</h1>
        <p className="mt-3 text-[17px] text-muted">
          {fmtNumber(listed.length)} listings{city ? ` in ${cityName ?? city}` : ""} · {fmtNumber(verified)} Verified · {fmtNumber(withFacts)} with facts quoted from their own site
        </p>
        <div className="mt-6 border-y border-line py-5">
          <AnswerBlock answer={"Every provider on Staylong carries a status: Verified means we checked its licence, address and visa support documents. Contacted means checks are in progress. Unverified means listed from public records only. Verified listings show the date of our last check. No listing has completed these checks yet."} />
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <form role="search" className="rounded-card border border-line bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg"><SlidersHorizontal className="size-4 text-primary-2" aria-hidden />Filters</h2>
              {filtered ? <Link href={routes.providers()} className="text-sm font-semibold text-primary hover:underline">Clear all</Link> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <label className="block text-sm font-semibold">City
                <select name="city" defaultValue={city ?? ""} className={field}>
                  <option value="">All cities</option>
                  {cities.map((c) => <option key={c.id} value={c.slug}>{c.name_en}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold">Visa type
                <select name="track" defaultValue={track ?? ""} className={field}>
                  <option value="">All</option>
                  {TRACKS.map((t) => <option key={t} value={t}>{trackName(t, true)}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold">Name or ref
                <span className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 mt-[3px] size-4 -translate-y-1/2 text-muted" aria-hidden />
                  <input name="q" type="search" defaultValue={q ?? ""} placeholder="e.g. SL-" spellCheck={false} autoComplete="off" className={`${field} pl-9`} />
                </span>
              </label>
            </div>
            <button className="mt-5 h-11 w-full rounded-[10px] bg-primary px-5 font-semibold text-primary-ink transition-colors hover:bg-primary-2">Show results</button>
          </form>
          <div className="mt-4 hidden rounded-card bg-sunken p-5 text-sm text-ink-2 lg:block">
            <p className="font-semibold text-ink">What the labels mean</p>
            <ul className="mt-3 space-y-2.5">
              <li><Badge tone="verified">Verified</Badge> <span className="mt-1 block">Licence, address and visa documents checked.</span></li>
              <li><Badge tone="contacted">Contacted</Badge> <span className="mt-1 block">Checks in progress.</span></li>
              <li><Badge tone="unverified">Unverified</Badge> <span className="mt-1 block">From public records only.</span></li>
            </ul>
            <Link href={routes.methodology()} className="mt-4 inline-block font-semibold text-primary underline underline-offset-2">How we verify</Link>
          </div>
        </aside>

        <div>
          {list.length ? (
            <ProviderList
              narrow
              providers={list}
              heading={
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="text-xl">{fmtNumber(list.length)} {filtered ? "listings match" : "schools and providers"}</h2>
                  <p className="text-sm text-muted">Listings with checked or quoted facts come first. <Link href={routes.disclosures()} className="underline underline-offset-2 hover:text-primary">How we make money</Link></p>
                </div>
              }
              moreHeading="All other listings"
              listName="Visa providers in Thailand"
              showCity
            />
          ) : (
            <EmptyState>No providers match yet. We add and verify providers every week.</EmptyState>
          )}
        </div>
      </div>
    </Container>
  );
}
