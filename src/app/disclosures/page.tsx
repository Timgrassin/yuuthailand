import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.disclosures(), title: "How Staylong makes money", description: "Staylong's paid relationships: none today. How provider fees and Partner labels will work, and what money can never buy." });
}

export default function DisclosuresPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Disclosures", path: routes.disclosures() }]} />} eyebrow="Disclosures" title={"How Staylong makes money"} lead={<AnswerBlock answer={"Staylong is free for people moving to Thailand. Today no provider pays us, no listing is a paid Partner and the site has no affiliate links. When that changes, paid relationships will be labelled and listed here."} />} />
      <Container className="max-w-3xl py-12">
        <div className="prose-yu">
          <h2>{"The plan"}</h2>
          <p>{"Schools, camps and visa agents will pay a fee when they accept a request sent through Staylong. Applicants will never pay us."}</p>
          <h2>{"What money cannot buy"}</h2>
          <ul>
            <li>{"Verified status. It depends only on the checks on "}<Link href={routes.methodology()}>{"how we verify"}</Link>{"."}</li>
            <li>{"Visa rules, guides or checker results. They come from official sources and our own research."}</li>
            <li>{"Hiding a Suspended status or a known problem."}</li>
          </ul>
          <h2>{"Partner labels"}</h2>
          <p>{"A provider may later pay to be a Partner. A Partner is always Verified, always shows the Partner label, and loses it if suspended. Partners never appear above a better match without that label."}</p>
          <h2>{"Third-party data"}</h2>
          <p>{"Google ratings and review counts on listings come from Google Maps and are shown with that attribution. Map data comes from OpenStreetMap."}</p>
          <p>{"Questions: hello@staylong.co."}</p>
        </div>
      </Container>
    </>
  );
}
