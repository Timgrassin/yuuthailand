import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BellRing, BookOpenCheck, Briefcase, GraduationCap, Heart, Laptop, Landmark, Palmtree, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Faq } from "@/components/ui/faq";
import { Badge, Button, Card, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { getCities, getProviders, getRuleChanges, getRules } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import { TRACK_INFO, trackName, type Track } from "@/lib/tracks";
import { TOOLS } from "@/lib/tools";
import { visaFacts } from "@/lib/visa-facts";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/",
    title: "Staylong: Thailand long-stay visas, compared and checked",
    description: "Find the right Thailand long-stay visa in minutes. DTV, education, retirement, LTR and more, compared against current rules with official sources. Verified schools and providers.",
  });
}

const PERSONAS: { track: Track; who: string; icon: typeof Laptop }[] = [
  { track: "dtv", who: "Remote worker or freelancer", icon: Laptop },
  { track: "ed", who: "Learning Thai or Muay Thai", icon: GraduationCap },
  { track: "retirement", who: "Retiring at 50+", icon: Palmtree },
  { track: "ltr", who: "High earner or investor", icon: Landmark },
  { track: "marriage", who: "Married to a Thai", icon: Heart },
  { track: "work", who: "Hired by a Thai company", icon: Briefcase },
  { track: "privilege", who: "Want the least paperwork", icon: Sparkles },
  { track: "retirement_oa", who: "Retiring, applying from home", icon: BookOpenCheck },
];

const HOME_FAQ = [
  { question: "What is the easiest way to live in Thailand long term?", answer: "For most people it is the Destination Thailand Visa (DTV) if you work remotely and can show 500,000 THB, the retirement visa if you are 50+ with 800,000 THB, or Thailand Privilege if you would rather pay a membership fee than meet income tests. The checker compares all eight routes against your situation." },
  { question: "How does Staylong keep visa rules current?", answer: "Every rule has a value, an effective date and a link to the official source such as the Ministry of Foreign Affairs, the Immigration Bureau or the Board of Investment. Every change is logged publicly with its date and published as an RSS feed." },
  { question: "What does Verified mean on a school or provider?", answer: "Staylong checked the provider's licence, address and visa support documents, and shows the date of the last check. Verification cannot be bought. Partner is a separate commercial label shown only while a provider stays Verified." },
  { question: "Is Staylong a visa agent?", answer: "No. Staylong does not file visa applications. It explains the rules, compares options and connects you with verified schools and providers if you want help." },
];

export default async function Home() {
  const [providers, cities, changes, rules] = await Promise.all([getProviders({ status: "verified" }), getCities(), getRuleChanges(4), getRules()]);
  const lastRuleUpdate = rules.map((r) => r.updated_at).sort().at(-1);
  const sources = new Set(rules.map((r) => r.source_url && new URL(r.source_url).hostname)).size;
  const dtv = visaFacts(rules, "dtv");
  const ret = visaFacts(rules, "retirement");
  const ltr = visaFacts(rules, "ltr");

  return (
    <>
      {/* Hero */}
      <section className="bg-mesh grain border-b border-line">
        <Container className="relative grid gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Badge tone="neutral" className="mb-6"><BadgeCheck className="size-3.5" aria-hidden />{rules.length} rules, each with an official source</Badge>
            <h1 className="text-[2.75rem] leading-[1.02] sm:text-[4.25rem]">Live in Thailand longer, <em className="font-normal not-italic text-primary">without the visa guesswork.</em></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Staylong compares Thailand&apos;s eight long-stay visas against current, dated rules, and lists schools and providers we have actually checked.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href={routes.checker()}>Check my visa options <ArrowRight className="size-4" aria-hidden /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href={routes.rules()}>Compare all 8 visas</Link></Button>
            </div>
            <p className="mt-6 text-sm text-muted">Free. Six questions. No sign-up.{lastRuleUpdate ? ` Rules last updated ${fmtDate(lastRuleUpdate)}.` : ""}</p>
          </div>

          {/* Illustrative result card */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rotate-2 rounded-[32px] bg-primary/10" aria-hidden />
            <Card className="rounded-[26px] p-0 shadow-lift">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <p className="text-sm font-semibold">Example result</p>
                <Badge tone="unverified">Age 34 · remote worker · 600k THB</Badge>
              </div>
              <ul className="divide-y divide-line">
                {[
                  { t: "dtv" as Track, v: "Likely fit", tone: "verified" as const, d: `${dtv.money ?? "500,000 THB"} savings · ${dtv.stay ?? "180 days"} per entry` },
                  { t: "ed" as Track, v: "Possible", tone: "warn" as const, d: "Needs enrolment at an approved school" },
                  { t: "ltr" as Track, v: "Unlikely", tone: "unverified" as const, d: "Needs about $80,000 a year income" },
                ].map((x) => (
                  <li key={x.t} className="flex items-start justify-between gap-4 px-6 py-4">
                    <div>
                      <p className="font-semibold">{trackName(x.t)}</p>
                      <p className="mt-0.5 text-sm text-muted">{x.d}</p>
                    </div>
                    <Badge tone={x.tone}>{x.v}</Badge>
                  </li>
                ))}
              </ul>
              <div className="rounded-b-[26px] bg-sunken/70 px-6 py-4 text-sm text-ink-2">Every line links to the rule and its official source.</div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <div className="border-b border-line bg-surface">
        <Container className="grid grid-cols-2 gap-6 py-8 text-center sm:grid-cols-4">
          {[
            { n: "8", l: "long-stay visa routes" },
            { n: String(rules.length), l: "dated, sourced rules" },
            { n: String(sources), l: "official and primary sources" },
            { n: "0", l: "paid-for Verified badges" },
          ].map((s) => (
            <div key={s.l}><p className="font-display text-4xl text-ink">{s.n}</p><p className="mt-1 text-sm text-muted">{s.l}</p></div>
          ))}
        </Container>
      </div>

      {/* Personas */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Find your route" title="Which Thailand visa fits you?" intro="Start from your situation. Each route shows the money test, how long you can stay and what it costs." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map(({ track, who, icon: Icon }) => {
              const f = visaFacts(rules, track);
              return (
                <Link key={track} href={routes.rule(TRACK_INFO[track].slug)} className="group">
                  <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-lift">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon className="size-5" aria-hidden /></span>
                    <p className="mt-5 text-sm text-muted">{who}</p>
                    <h3 className="mt-1 text-xl leading-snug">{trackName(track)}</h3>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                      <div><dt className="text-muted">Money</dt><dd className="font-semibold">{f.money ?? "–"}</dd></div>
                      <div><dt className="text-muted">Stay</dt><dd className="font-semibold">{f.stay ?? "–"}</dd></div>
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary">See requirements <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Free tools */}
      <Section className="pt-0">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Free tools" title="Plan your stay with real numbers" className="mb-0" />
            <Link href={routes.tools()} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">All tools <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.slice(0, 4).map((t) => (
              <Link key={t.slug} href={routes.tool(t.slug)} className="group">
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-lift">
                  <p className="font-display text-lg leading-snug">{t.name}</p>
                  <p className="mt-2 text-sm text-ink-2">{t.short}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quick compare */}
      <Section className="border-y border-line bg-surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Side by side" title="The three most popular long stays, in one table" intro="Most people end up choosing between the DTV, the retirement visa and the LTR. Here is how they compare today." className="mb-6" />
            <Button asChild variant="secondary"><Link href={routes.rules()}>Compare all eight <ArrowRight className="size-4" aria-hidden /></Link></Button>
          </div>
          <div className="overflow-hidden rounded-card border border-line shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunken text-ink"><tr><th className="p-4" /><th className="p-4">DTV</th><th className="p-4">Retirement</th><th className="p-4">LTR</th></tr></thead>
              <tbody className="divide-y divide-line bg-surface">
                {[
                  ["Money test", dtv.money, ret.money, ltr.money],
                  ["Minimum age", dtv.age, ret.age, ltr.age],
                  ["Stay per entry", dtv.stay, ret.stay, ltr.stay],
                  ["Visa fee", dtv.fee, ret.fee, visaFacts(rules, "ltr").fee],
                  ["Can work in Thailand", dtv.work, ret.work, "Highly Skilled only"],
                ].map(([label, ...vals]) => (
                  <tr key={label}><th scope="row" className="p-4 font-medium text-muted">{label}</th>{vals.map((v, i) => <td key={i} className="p-4 font-semibold">{v ?? "–"}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Why different */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Why Staylong" title="Built for the questions agents and forums get wrong" />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: BookOpenCheck, t: "Every rule is dated and sourced", d: "Each requirement shows the value, the date it took effect and a link to the Thai government page it comes from. Unconfirmed values are labelled." },
              { icon: BadgeCheck, t: "Providers we actually checked", d: "Schools, Muay Thai camps and agents carry a status and the date of our last check. Verification cannot be bought." },
              { icon: BellRing, t: "A public log of every change", d: "When a rule moves, it is logged with the date and pushed to the RSS feed. Saved checker results tell you if the rules changed since you checked." },
            ].map((x) => (
              <Card key={x.t} className="p-7">
                <x.icon className="size-7 text-primary-2" aria-hidden />
                <h3 className="mt-5 text-xl">{x.t}</h3>
                <p className="mt-3 text-ink-2">{x.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Changes + cities */}
      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-3">Change log</Eyebrow>
            <h2 className="text-3xl">Latest rule changes</h2>
            <ol className="mt-6 space-y-3">
              {changes.map((c) => (
                <li key={c.id} className="flex gap-4 rounded-sm border border-line bg-surface p-4">
                  <time dateTime={c.changed_at} className="w-24 shrink-0 text-sm text-muted">{fmtDate(c.changed_at)}</time>
                  <span className="text-sm"><strong>{trackName(c.track, true)}</strong> · {c.summary_en ?? c.rule_key}</span>
                </li>
              ))}
            </ol>
            <Link href={routes.ruleChanges()} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Full change log <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <div>
            <Eyebrow className="mb-3">Directory</Eyebrow>
            <h2 className="text-3xl">Schools and providers by city</h2>
            <p className="mt-3 text-ink-2">{providers.length ? `${providers.length} verified providers so far.` : "The first providers are being verified now."} Language schools for the ED visa, Muay Thai camps for the DTV, and visa agents.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {cities.map((c) => <Link key={c.id} href={routes.city(c.slug)} className="rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">{c.name_en}</Link>)}
            </div>
          </div>
        </Container>
      </Section>

      <Container><Faq title="Common questions" items={HOME_FAQ} /></Container>
      <CtaBand title="Know your options in two minutes." body="Answer six questions. See which visas fit, what they cost and what to prepare." primary={{ href: routes.checker(), label: "Start the checker" }} secondary={{ href: routes.rules(), label: "Compare visas" }} />
      <JsonLd data={graph(itemListSchema("Thailand long-stay visas", PERSONAS.map((p) => ({ name: trackName(p.track), path: routes.rule(TRACK_INFO[p.track].slug) }))))} />
    </>
  );
}
