import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyRequestForm } from "@/components/blocks/request-forms";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.privacyRequest(), title: "Delete or get a copy of your data", description: "Ask Staylong to delete, correct or send you a copy of your personal data, or withdraw your consent. We reply within 30 days.", noindex: true });
}

export default function PrivacyRequestPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Privacy", path: routes.privacy() }, { name: "Request", path: routes.privacyRequest() }]} />} eyebrow="Privacy" title={"Delete or get a copy of your data"} lead={<AnswerBlock answer={"Tell us which email address you used and what you want. We send an acknowledgement to that address, then reply within 30 days."} />} />
      <Container className="max-w-xl py-12">
        <PrivacyRequestForm />
        <p className="mt-8 text-sm text-muted">{"To stop emails only, use the unsubscribe link in any Staylong email. Details of what we hold are in the "}<Link href={routes.privacy()} className="underline">{"privacy policy"}</Link>{"."}</p>
      </Container>
    </>
  );
}
