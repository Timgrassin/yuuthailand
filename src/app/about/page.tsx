import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.about(), title: "About Staylong", description: "Staylong helps foreigners find a legal way to stay in Thailand long term: sourced visa rules, a free checker and providers with a clear verification status." });
}

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "About", path: routes.about() }]} />} eyebrow="About" title={"About Staylong"} lead={<AnswerBlock answer={"Staylong helps foreigners find a legal way to stay in Thailand longer than a visa-free visit. It compares the long-stay visas using dated, sourced rules, matches people to the visas they qualify for, and lists schools, camps and visa agents with a clear verification status."} />} />
      <Container className="max-w-3xl py-12">
        <div className="prose-yu">
          <h2>{"Why it exists"}</h2>
          <p>{"Thai visa information online is often out of date, copied from other sites, or written by agents selling a service. Staylong keeps every threshold in one rules table, with the official source and the date it took effect, and logs every change in public."}</p>
          <h2>{"What you can do here"}</h2>
          <ul>
            <li><Link href={routes.rules()}>{"Compare the eight long-stay visas"}</Link>{", from the DTV to retirement and the LTR."}</li>
            <li><Link href={routes.checker()}>{"Check which visas fit you"}</Link>{"."}</li>
            <li><Link href={routes.providers()}>{"Find schools, camps and visa agents"}</Link>{", each showing whether we have verified it."}</li>
            <li><Link href={routes.places()}>{"Choose where to live"}</Link>{" and find "}<Link href={routes.offices()}>{"your immigration office"}</Link>{"."}</li>
          </ul>
          <h2>{"What Staylong is not"}</h2>
          <p>{"Staylong is not a government website, a law firm or a visa agent. It does not file applications and cannot guarantee a visa."}</p>
          <h2>{"How it is funded"}</h2>
          <p>{"Staylong is free for applicants. See "}<Link href={routes.disclosures()}>{"how Staylong makes money"}</Link>{"."}</p>
          <h2>{"Contact"}</h2>
          <p>{"hello@staylong.co. Schools and agents: "}<Link href={routes.forProviders()}>{"claim or correct your listing"}</Link>{"."}</p>
        </div>
      </Container>
    </>
  );
}
