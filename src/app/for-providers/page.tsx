import type { Metadata } from "next";
import Link from "next/link";
import { ClaimForm } from "@/components/blocks/request-forms";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.forProviders(), title: "For schools, camps and visa agents", description: "Claim or correct your Staylong listing, get Verified, and receive requests from people planning a long stay in Thailand." });
}

const STEPS = [
  { title: "Claim your listing", body: "Send the form below. We check that you work for the business, usually by email at your own domain or a call to your listed number." },
  { title: "Get Verified", body: "We check your licence, premises, visa documents and published prices. Verification is free and cannot be bought." },
  { title: "Receive requests", body: "When someone's request matches your city and courses, we email you a summary without their contact details. Accept to get their name, email and phone, or decline with a short reason." },
];

export default async function ForProvidersPage({ searchParams }: { searchParams: Promise<{ listing?: string }> }) {
  const { listing } = await searchParams;
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "For providers", path: routes.forProviders() }]} />} eyebrow="For providers" title={"For schools, camps and visa agents"} lead={<AnswerBlock answer={"Staylong lists language schools, Muay Thai camps, cooking and massage schools and visa agents across Thailand. Claim your listing to correct it, get Verified, and receive requests from people planning a long stay."} />} />
      <Container className="max-w-3xl py-12">
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{`Step ${i + 1}`}</p>
              <h2 className="mt-2 text-lg font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="prose-yu mt-10">
          <h2>{"Fees"}</h2>
          <p>{"Listing and verification are free, and there is no fee today. We will publish pricing before any request becomes billable, and you will always see the price before you accept a request. See "}<Link href={routes.disclosures()}>{"how Staylong makes money"}</Link>{"."}</p>
          <h2>{"Our rules"}</h2>
          <p>{"Never promise a visa approval. Offer real courses with real attendance. Never help create a paper-only enrolment. Listings that break these rules are suspended. Read "}<Link href={routes.methodology()}>{"how we verify"}</Link>{"."}</p>
        </div>
        <section id="claim" className="mt-10 scroll-mt-24 rounded-card border border-line bg-surface p-6">
          <h2 className="text-xl font-bold">{"Claim or correct your listing"}</h2>
          <p className="mt-1 text-sm text-muted">{"Find your ref code (SL-XXXX-CITY) on your listing page, or paste its link."}</p>
          <div className="mt-5"><ClaimForm listing={listing?.slice(0, 300)} /></div>
        </section>
      </Container>
    </>
  );
}
