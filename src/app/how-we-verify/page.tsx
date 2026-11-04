import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.methodology(), title: "How Staylong verifies visa schools and providers", description: "What each status means, what we check, how often, and how partners are kept separate from verification." });
}

const STEPS: string[] = [
  "Licence: we match the provider against its Ministry of Education or Department of Business Development registration.",
  "Address: we confirm the premises exist and operate at the listed address.",
  "Visa support: we check the provider can issue the documents the visa needs, such as an enrolment letter and school approval letter.",
  "Prices: we record published prices in THB and the date we saw them.",
  "Re-check: we re-check verified providers at least every six months and after any complaint.",
];

export default async function MethodPage() {
  return (
    <>
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "How we verify", path: routes.methodology() }]} />} eyebrow="Method" title={"How Staylong verifies providers"} lead={<AnswerBlock answer={"Staylong gives a provider the Verified status only after checking its licence, address, visa support documents and prices. Verification cannot be bought. Partner is a separate commercial label, shown only while a provider stays Verified, and it is removed if the provider is suspended."} />} />
    <Container className="max-w-3xl py-12">
      <div className="prose-yu mt-8">
        <h2>{"What each status means"}</h2>
        <ul className="!list-none !pl-0 space-y-3">
          <li><StatusBadge status="verified" /> {"All checks below passed. The date of the last check is on the listing."}</li>
          <li><StatusBadge status="contacted" /> {"We reached the provider and checks are in progress."}</li>
          <li><StatusBadge status="unverified" /> {"Listed from public records. We have not checked it yet."}</li>
          <li><StatusBadge status="suspended" /> {"A check failed or a serious complaint is open. Contact details and the Partner label are hidden."}</li>
        </ul>
        <h2>{"What we check"}</h2>
        <ol>{STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
        <h2>{"How visa rules are kept current"}</h2>
        <p>{"Every rule has a value, an effective date and a link to the official source, such as the Ministry of Foreign Affairs, the Immigration Bureau or the Board of Investment. Every change is logged publicly with its date."}</p>
      </div>
    </Container>
    </>
  );
}
