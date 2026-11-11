import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BicepsFlexed, BookOpenCheck, Briefcase, ChefHat, ExternalLink, FileCheck, GraduationCap, HandHeart, Heart, Landmark, Languages, Laptop, Palmtree, Sparkles, Tag } from "lucide-react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { CtaBand } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Faq } from "@/components/ui/faq";
import { Button, Container } from "@/components/ui/primitives";
import { getCities, getProviders, getRuleChanges, getRules } from "@/lib/data";
import { fmtDate, fmtNumber } from "@/lib/format";
import { groupChanges } from "@/lib/rule-changes";
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
    description: "Find the right Thailand long-stay visa in minutes. Compare DTV, education, retirement and LTR against current rules, with official sources.",
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

// Activities people come for. Counts are listed providers of that type; links go to the visa that covers it.
const ACTIVITIES: { label: string; type?: string; href: string; route: string; icon: typeof Laptop; art: string }[] = [
  { label: "Muay Thai", type: "muay_thai_camp", href: routes.rule(TRACK_INFO.dtv.slug), route: "DTV soft power", icon: BicepsFlexed, art: "art-teal" },
  { label: "Learning Thai", type: "language_school", href: routes.rule(TRACK_INFO.ed.slug), route: "Education visa", icon: Languages, art: "art-turmeric" },
  { label: "Thai cooking", type: "cooking_school", href: routes.rule(TRACK_INFO.dtv.slug), route: "DTV soft power", icon: ChefHat, art: "art-clay" },
  { label: "Thai massage", type: "massage_school", href: routes.rule(TRACK_INFO.dtv.slug), route: "DTV soft power", icon: HandHeart, art: "art-sage" },
  { label: "Remote work", href: routes.rule(TRACK_INFO.dtv.slug), route: "DTV workcation", icon: Laptop, art: "art-sky" },
  { label: "Visa agents", type: "visa_agent", href: routes.providers(), route: "Optional help", icon: FileCheck, art: "art-sand" },
];

const HOME_FAQ = [
  { question: "What is the easiest way to live in Thailand long term?", answer: "For most people it is the Destination Thailand Visa (DTV) if you work remotely and can show 500,000 THB, the retirement visa if you are 50+ with 800,000 THB, or Thailand Privilege if you would rather pay a membership fee than meet income tests. The checker compares all eight routes against your situation." },
  { question: "How does Staylong keep visa rules current?", answer: "Every rule has a value, an effective date and a link to the official source such as the Ministry of Foreign Affairs, the Immigration Bureau or the Board of Investment. Every change is logged publicly with its date and published as an RSS feed." },
  { question: "What does Verified mean on a school or provider?", answer: "Staylong checked the provider's licence, address and visa support documents, and shows the date of the last check. Verification cannot be bought. Partner is a separate commercial label shown only while a provider stays Verified." },
  { question: "Is Staylong a visa agent?", answer: "No. Staylong does not file visa applications. It explains the rules, compares options and can pass your request to verified schools and providers once they complete our checks." },
];

const host = (u?: string | null) => { try { return u ? new URL(u).hostname.replace(/^www\./, "") : null; } catch { return null; } };

export default async function Home() {
  const [listed, cities, changeRows, rules] = await Promise.all([getProviders(), getCities(), getRuleChanges(60), getRules()]);
  const lastRuleUpdate = rules.map((r) => r.updated_at).sort().at(-1);
  const sources = new Set(rules.map((r) => host(r.source_url)).filter(Boolean)).size;
  const changes = groupChanges(changeRows).slice(0, 2);
  const sourceOf = (track: string, key: string) => rules.find((r) => r.track === track && r.key === key)?.source_url ?? null;
  const byType = (t?: string) => (t ? listed.filter((p) => p.provider_type === t).length : 0);
  const dtv = visaFacts(rules, "dtv");
  const ed = visaFacts(rules, "ed");
  const ret = visaFacts(rules, "retirement");
  const ltr = visaFacts(rules, "ltr");
  const latest = changes[0];

  return (
    <>
      {/* Latest change: one line, always from the change log */}
      {latest ? (
        <div className="border-b border-[#EAD49E] bg-accent-soft">
          <Container className="flex items-center justify-center gap-3 py-2.5 text-[15px] leading-snug">
            <span className="shrink-0 rounded-md bg-accent px-2 py-0.5 text-sm font-semibold text-ink">Update</span>
            <span className="min-w-0 truncate"><span className="hidden font-semibold sm:inline">{fmtDate(latest.changed_at)}: </span>{latest.summary}</span>
            <Link href={routes.ruleChanges()} className="shrink-0 font-semibold text-primary underline underline-offset-4">What changed</Link>
          </Container>
        </div>
      ) : null}

      {/* Hero */}
      <section className="bg-mesh grain relative overflow-hidden">
        <Container className="relative grid gap-12 pb-16 pt-12 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-ink-2">For stays of 3 months to 10 years</p>
            <h1 className="text-[2.6rem] leading-[1.03] tracking-[-0.025em] sm:text-[3.75rem]">Staying longer than 30 days? Find your legal route.</h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2 sm:text-[19px]">
              Answer six questions. See which of Thailand&apos;s eight long-stay visas fits you, what it costs, and what to prepare, checked against dated official rules.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href={routes.checker()}>Check my route <ArrowRight className="size-5" aria-hidden /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="#browse">Browse by activity and city</Link></Button>
            </div>
            <p className="text-sm text-ink-2">About 2 minutes · free · no account · not legal advice</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-primary/15 via-transparent to-accent/20 blur-2xl" aria-hidden />
            <div className="overflow-hidden rounded-card border border-line bg-surface shadow-lift">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                <h2 className="text-[19px] font-semibold tracking-normal">Your options at a glance</h2>
                {lastRuleUpdate ? <span className="whitespace-nowrap rounded-full border border-line px-2.5 py-0.5 text-sm text-ink-2">Updated {fmtDate(lastRuleUpdate)}</span> : null}
              </div>
              <ul className="divide-y divide-line">
                {[
                  { t: "dtv" as Track, sub: "Remote work or Muay Thai, cooking, courses", v: dtv.stay ? `${dtv.stay} per entry` : null, n: dtv.validity ? `valid ${dtv.validity}` : null },
                  { t: "ed" as Track, sub: "Enrolled at an approved school", v: ed.stay ? `${ed.stay} per entry` : null, n: "extendable while you study" },
                  { t: "retirement" as Track, sub: "Age 50+, savings or pension", v: ret.money ?? null, n: ret.moneyNote ?? null },
                  { t: "ltr" as Track, sub: "High earners, pensioners, investors", v: ltr.stay ?? null, n: ltr.money ? `${ltr.money} ${ltr.moneyNote ?? ""}`.trim() : null },
                ].map((x) => (
                  <li key={x.t}>
                    <Link href={routes.rule(TRACK_INFO[x.t].slug)} className="group flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-bg">
                      <span className="flex flex-col gap-0.5">
                        <span className="font-semibold group-hover:text-primary">{trackName(x.t, true)} visa</span>
                        <span className="text-sm text-ink-2">{x.sub}</span>
                      </span>
                      <span className="text-right">
                        <span className="block font-semibold tabular-nums">{x.v ?? "See rules"}</span>
                        {x.n ? <span className="block text-sm text-ink-2">{x.n}</span> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-bg px-5 py-3 text-sm text-ink-2">
                <span>DTV fee {dtv.fee ?? "–"} · proof of {dtv.money ?? "–"} savings</span>
                <Link href={routes.rules()} className="font-semibold text-primary underline underline-offset-4">Sources</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <section aria-label="Staylong in numbers" className="border-y border-line-strong bg-surface">
        <Container className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { n: fmtNumber(rules.length), l: "visa rules, each dated and linked to its source" },
            { n: fmtNumber(listed.length), l: "schools, camps and agents, each with a public status" },
            { n: lastRuleUpdate ? fmtDate(lastRuleUpdate) : "–", l: `rules last checked against ${sources} official sources` },
          ].map((s, i) => (
            <div key={s.l} className={`flex flex-col gap-1 py-6 pr-4 ${i ? "border-line lg:border-l lg:pl-6" : ""} ${i === 1 ? "border-l pl-4" : ""} ${i === 2 ? "col-span-2 border-t lg:col-span-1 lg:border-t-0" : ""}`}>
              <p className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] tabular-nums sm:text-[2rem]">{s.n}</p>
              <p className="text-sm text-ink-2">{s.l}</p>
            </div>
          ))}
          <div className="col-span-2 flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-5 lg:col-span-1 lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:pl-6">
            <Link href={routes.methodology()} className="font-semibold text-primary underline underline-offset-4">How we verify</Link>
            <Link href={routes.disclosures()} className="font-semibold text-primary underline underline-offset-4">How we make money</Link>
          </div>
        </Container>
      </section>

      {/* What changed */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl sm:text-[2.125rem]">What changed</h2>
            <Link href={routes.ruleChanges()} className="font-semibold text-primary underline underline-offset-4">All rule changes</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {changes.map((c, i) => {
              const src = sourceOf(c.tracks[0], c.rule_keys[0]);
              return (
                <article key={c.key} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card">
                  <div className="flex items-center gap-2">
                    {i === 0 ? <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-semibold text-ink">Latest</span> : null}
                    <time dateTime={c.changed_at} className="text-sm font-semibold tabular-nums">{fmtDate(c.changed_at)}</time>
                  </div>
                  <h3 className="text-[19px] font-semibold leading-snug tracking-normal">{c.summary}</h3>
                  <p className="text-[15px] text-ink-2">Affects: {c.tracks.map((t) => trackName(t)).join(", ")}{c.rule_keys.length > 1 ? `, ${c.rule_keys.length} rules` : ""}.</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 text-sm">
                    {src ? <a href={src} rel="noopener" className="inline-flex items-center gap-1.5 text-ink-2 underline underline-offset-4 hover:text-primary"><ExternalLink className="size-4" aria-hidden />{host(src)}</a> : <span />}
                    <Link href={routes.rule(TRACK_INFO[c.tracks[0] as Track]?.slug ?? "")} className="font-semibold text-primary">See the rule</Link>
                  </div>
                </article>
              );
            })}
            <div className="md:col-span-2 lg:col-span-1">
              <EmailCapture title="Get rule-change alerts" body="One email when a Thai visa rule changes. Nothing else." leadMagnet="rule_change_alerts" button="Subscribe" />
            </div>
          </div>
        </Container>
      </section>

      {/* Browse by activity */}
      <section id="browse" className="scroll-mt-24 pb-16 sm:pb-20">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl sm:text-[2.125rem]">Browse by activity</h2>
              <p className="mt-2 text-ink-2">What you want to do in Thailand decides which visa fits.</p>
            </div>
            <Link href={routes.providers()} className="font-semibold text-primary underline underline-offset-4">All schools and providers</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {ACTIVITIES.map((a) => {
              const n = byType(a.type);
              return (
                <Link key={a.label} href={a.href} className="group flex flex-col gap-3 rounded-card border border-line bg-surface p-3 pb-4 transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lift">
                  <span className={`tile-art ${a.art} flex h-24 items-end justify-end rounded-[10px] p-3 sm:h-28`}>
                    <a.icon className="size-9 text-ink/80 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="px-1">
                    <span className="block text-[17px] font-semibold leading-snug">{a.label}</span>
                    <span className="mt-0.5 block text-sm text-ink-2 tabular-nums">{a.type ? `${fmtNumber(n)} listed · ${a.route}` : a.route}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-ink-2">By city:</span>
            {cities.map((c) => <Link key={c.id} href={routes.city(c.slug)} className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-surface px-4 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white">{c.name_en}</Link>)}
          </div>
        </Container>
      </section>

      {/* How it works: the one dark band */}
      <section className="bg-night-mesh grain text-white">
        <Container className="relative grid gap-10 py-16 sm:py-20 md:grid-cols-3">
          <h2 className="sr-only">How it works</h2>
          {[
            { t: "Check your route", d: "Six questions. Each visa is ranked Likely, Possible or Unlikely, with the reason and the rule behind it.", href: routes.checker(), cta: "Start the checker" },
            { t: "See what to prepare", d: "Money tests, documents and fees, each sourced from the Thai government page and dated.", href: routes.rules(), cta: "Compare all eight visas" },
            { t: "Ask a provider", d: "Send one request. We pass it only to verified schools and providers, and they see your contact details only if they accept.", href: routes.providers(), cta: "Browse providers" },
          ].map((s, i) => (
            <div key={s.t} className="flex flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-[15px] font-bold text-ink">{i + 1}</span>
              <h3 className="text-xl text-white">{s.t}</h3>
              <p className="text-white/75">{s.d}</p>
              <Link href={s.href} className="mt-1 inline-flex items-center gap-1 font-semibold text-accent hover:text-white">{s.cta} <ArrowRight className="size-4" aria-hidden /></Link>
            </div>
          ))}
        </Container>
      </section>

      {/* All eight routes */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl sm:text-[2.125rem]">Which Thailand visa fits you?</h2>
            <p className="mt-3 text-lg text-ink-2">Start from your situation. Each route shows the money test, how long you can stay and what it costs.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map(({ track, who, icon: Icon }) => {
              const f = visaFacts(rules, track);
              return (
                <Link key={track} href={routes.rule(TRACK_INFO[track].slug)} className="group flex flex-col rounded-card border border-line bg-surface p-5 transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lift">
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon className="size-5" aria-hidden /></span>
                    <span className="text-sm text-ink-2">{who}</span>
                  </span>
                  <h3 className="mt-4 text-lg leading-snug tracking-normal">{trackName(track)}</h3>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                    <div><dt className="text-ink-2">Money</dt><dd className="text-base font-semibold tabular-nums">{f.money ?? "–"}</dd></div>
                    <div><dt className="text-ink-2">Stay</dt><dd className="text-base font-semibold tabular-nums">{f.stay ?? "–"}</dd></div>
                  </dl>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Quick compare */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-[2.125rem]">The three most popular long stays, side by side</h2>
            <p className="mt-3 text-lg text-ink-2">Most people choose between the DTV, the retirement visa and the LTR. Here is how they compare today.</p>
            <Button asChild variant="secondary" className="mt-6"><Link href={routes.rules()}>Compare all eight <ArrowRight className="size-4" aria-hidden /></Link></Button>
          </div>
          <div className="overflow-x-auto rounded-card border border-line">
            <table className="w-full min-w-[30rem] text-left text-[15px]">
              <thead className="bg-sunken"><tr><th className="p-4"><span className="sr-only">Requirement</span></th><th className="p-4">DTV</th><th className="p-4">Retirement</th><th className="p-4">LTR</th></tr></thead>
              <tbody className="divide-y divide-line">
                {[
                  ["Money test", dtv.money, ret.money, ltr.money],
                  ["Minimum age", dtv.age, ret.age, ltr.age],
                  ["Stay per entry", dtv.stay, ret.stay, ltr.stay],
                  ["Visa fee", dtv.fee, ret.fee, ltr.fee],
                  ["Can work in Thailand", dtv.work, ret.work, "Highly Skilled only"],
                ].map(([label, ...vals]) => (
                  <tr key={label}><th scope="row" className="p-4 font-medium text-ink-2">{label}</th>{vals.map((v, i) => <td key={i} className="p-4 font-semibold tabular-nums">{v ?? "–"}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Free tools */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl sm:text-[2.125rem]">Plan your stay with real numbers</h2>
            <Link href={routes.tools()} className="font-semibold text-primary underline underline-offset-4">All free tools</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.slice(0, 4).map((t) => (
              <Link key={t.slug} href={routes.tool(t.slug)} className="group flex flex-col rounded-card border border-line bg-surface p-5 transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lift">
                <span className="text-[17px] font-semibold leading-snug">{t.name}</span>
                <span className="mt-2 text-[15px] text-ink-2">{t.short}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Open the tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex max-w-3xl gap-3 rounded-card bg-sunken p-6">
            <Tag className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="flex flex-col gap-1.5 text-[15px]">
              <p className="font-semibold">How we make money</p>
              <p>Staylong is free for people moving to Thailand. Providers will pay a fee when they accept a request you send. Money never buys a Verified status, and paid Partners always carry a label.</p>
              <Link href={routes.disclosures()} className="font-semibold text-primary underline underline-offset-4">Read our disclosures</Link>
            </div>
          </div>
        </Container>
      </section>

      <Container><Faq title="Common questions" items={HOME_FAQ} /></Container>
      <CtaBand title="Know your options in two minutes." body="Answer six questions. See which visas fit, what they cost and what to prepare." primary={{ href: routes.checker(), label: "Start the checker" }} secondary={{ href: routes.rules(), label: "Compare visas" }} />
      <JsonLd data={graph(itemListSchema("Thailand long-stay visas", PERSONAS.map((p) => ({ name: trackName(p.track), path: routes.rule(TRACK_INFO[p.track].slug) }))))} />
    </>
  );
}
