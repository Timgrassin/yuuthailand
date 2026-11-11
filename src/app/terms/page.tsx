import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.terms(), title: "Terms of use", description: "The terms for using Staylong: information, not legal advice; how listings and requests to providers work; and reusing our content." });
}

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Terms", path: routes.terms() }]} />} eyebrow="Terms" title={"Terms of use"} lead={<AnswerBlock answer={"Staylong is free to use. It gives information about Thai visas and long-stay providers, not legal advice, and it cannot guarantee any visa. Only the Thai embassy or consulate and the Immigration Bureau decide."} />} />
      <Container className="max-w-3xl py-12">
        <div className="prose-yu">
          <h2>{"Information, not legal advice"}</h2>
          <p>{"We take visa rules from official sources and show each one with its source and date. Rules change, sources sometimes disagree and officers have discretion, so check with the embassy, consulate or Immigration Bureau before you apply or pay. The visa checker matches your answers to published rules; it is not a decision about your case."}</p>

          <h2>{"Listings"}</h2>
          <p>{"Most listings start from public data and are marked Unverified. A listing is Verified only after the checks described on "}<Link href={routes.methodology()}>{"how we verify"}</Link>{". Even then, we do not guarantee a provider's teaching, prices or visa support, and Google ratings shown on a listing are Google's, not ours. If something on a listing is wrong, "}<Link href={routes.forProviders()}>{"tell us"}</Link>{"."}</p>

          <h2>{"Requests to providers"}</h2>
          <p>{"When you send a request, we pass it to matching Verified providers as described in the "}<Link href={routes.privacy()}>{"privacy policy"}</Link>{". Providers are independent businesses. Any agreement, payment or refund is between you and the provider. Staylong does not take payments from applicants and does not file visa applications."}</p>

          <h2>{"Providers"}</h2>
          <p>{"Providers must not promise visa approval, must offer real courses with real attendance, and must never help create paper-only enrolments. We suspend listings that break these rules."}</p>

          <h2>{"Reusing our content"}</h2>
          <p>{"You may quote short parts of Staylong pages with a link to the page. Our "}<Link href="/mcp-server">{"MCP server"}</Link>{" is free for AI assistants and returns the page link with every answer so it can be cited. Do not copy whole pages or the listings database."}</p>

          <h2>{"Limits"}</h2>
          <p>{"We work to keep the site accurate and available, but it is provided as it is. As far as the law allows, Staylong is not responsible for losses that come from relying on its information or from dealings with a provider."}</p>

          <h2>{"Changes and contact"}</h2>
          <p>{"We may update these terms. The version on this page applies. Questions: hello@staylong.co."}</p>
        </div>
      </Container>
    </>
  );
}
