import type { Metadata } from "next";
import { AnswerBlock } from "@/components/seo/answer-block";
import Link from "next/link";
import { Badge, Button, Card, Container, SectionHeading } from "@/components/ui/primitives";
import { getCities, getProviders, getRuleChanges, getRules } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { TRACKS, TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/",
    // Thai headline needs a native speaker check (CLAUDE.md Open).
    title: "Yuu: Verified long-stay visa schools and rules in Thailand",
    description: "Check which Thai long-stay visa fits you and find verified schools and providers. Every rule is dated and sourced.",
  });
}

export default async function Home() {
  const [providers, cities, changes, rules] = await Promise.all([getProviders({ status: "verified" }), getCities(), getRuleChanges(5), getRules()]);
  const lastRuleUpdate = rules.map((r) => r.updated_at).sort().at(-1);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <Badge tone="neutral">{"Rules checked against official sources"}</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {"Stay longer in Thailand. Know the rules. Pick a provider you can trust."}
          </h1>
          <div className="mt-6 max-w-2xl text-lg text-muted">
            <AnswerBlock
              answer={"Yuu compares Thailand's eight long-stay visa routes, from the DTV to retirement and LTR, against current rules with official sources and dates. It lists schools and providers with a verification status and the date we last checked them."}
              checkedAt={lastRuleUpdate}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href={routes.checker()}>{"Check my visa options"}</Link></Button>
            <Button asChild size="lg" variant="secondary"><Link href={routes.providers()}>{"Browse verified providers"}</Link></Button>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading title={"Thailand long-stay visas compared"} intro={"Eight routes. Each page shows the money, age and paperwork tests with a source on every line."} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t) => (
            <Link key={t} href={routes.rule(TRACK_INFO[t].slug)} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <h3 className="font-bold">{trackName(t)}</h3>
                <p className="mt-2 text-sm text-muted">{TRACK_INFO[t].desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <SectionHeading title={"Verified providers"} intro={"We call, visit and check documents before a provider gets the Verified badge."} />
        {providers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.slice(0, 6).map((p) => (
              <Link key={p.id} href={routes.provider(p.slug)}><Card className="h-full hover:border-primary"><p className="font-bold">{p.name_en}</p><p className="text-sm text-muted">{p.city_name_en}</p></Card></Link>
            ))}
          </div>
        ) : (
          <Card className="text-muted">{"The first verified providers are being checked now. Browse by city below."}</Card>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link key={c.id} href={routes.city(c.slug)} className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm hover:border-primary">{c.name_en}</Link>
          ))}
        </div>
      </Container>

      <Container className="pb-6">
        <SectionHeading title={"Latest rule changes"} />
        <ul className="divide-y divide-line rounded-card border border-line bg-surface">
          {changes.map((c) => (
            <li key={c.id} className="flex flex-wrap justify-between gap-2 p-4 text-sm">
              <span><strong>{trackName(c.track, true)}</strong>: {c.summary_en ?? c.rule_key}</span>
              <time dateTime={c.changed_at} className="text-muted">{fmtDate(c.changed_at)}</time>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm"><Link href={routes.ruleChanges()} className="text-primary underline">{"Full change log"}</Link></p>
      </Container>
    </>
  );
}
