import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/analytics/tracking";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.cookies(), title: "Cookies and analytics on Staylong", description: "Which analytics tools Staylong uses, what they collect and how to change your choice.", noindex: true });
}

export default function CookiesPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Cookies", path: routes.cookies() }]} />} eyebrow="Privacy" title={"Cookies and analytics"} lead={<AnswerBlock answer={"Staylong counts visits with tools that use no cookies. Analytics cookies and session replays run only if you accept them, and you can change your choice at any time."} />} />
      <Container className="max-w-3xl py-12">
        <div className="prose-yu">
          <h2>{"Always on, no cookies"}</h2>
          <p>{"Vercel Web Analytics counts page views, and Vercel Speed Insights measures how fast pages load. Neither sets a cookie."}</p>
          <h2>{"Only if you accept"}</h2>
          <ul>
            <li>{"Google Analytics shows which pages people visit, where they come from and which forms they complete."}</li>
            <li>{"Microsoft Clarity records how people scroll and click on a page, as session replays and heatmaps."}</li>
          </ul>
          <p>{"Both set cookies. Entries in our visa checker, email and request forms are hidden from session replays, and we send analytics only the fact that a form was completed, not what you typed."}</p>
          <h2>{"Pages we never track with these tools"}</h2>
          <p>{"Email confirmation pages, unsubscribe pages and saved checker results are excluded, because their links are private to you."}</p>
          <h2>{"Change your choice"}</h2>
          <p><CookieSettingsButton />{". Questions: hello@staylong.co."}</p>
        </div>
      </Container>
    </>
  );
}
