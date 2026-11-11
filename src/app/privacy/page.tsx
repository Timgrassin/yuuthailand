import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: routes.privacy(), title: "Privacy policy", description: "What personal data Staylong collects, why, who sees it, how long we keep it and how to get it deleted under Thailand's PDPA." });
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Privacy", path: routes.privacy() }]} />} eyebrow="Privacy" title={"Privacy policy"} lead={<AnswerBlock answer={"Staylong collects personal data only when you send us something: an email address for updates, or a request to a school or provider. You can read the site without an account. We never sell your data, and you can ask us to delete it at any time."} />} />
      <Container className="max-w-3xl py-12">
        <div className="prose-yu">
          <h2>{"Who we are"}</h2>
          <p>{"Staylong (staylong.co) is an independent website about long stays in Thailand. It is the data controller for the personal data described here. Contact: hello@staylong.co."}</p>

          <h2>{"What we collect and why"}</h2>
          <h3>{"Email updates"}</h3>
          <p>{"When you enter your email on a tool, guide or visa page, we store the address, the page and topic you signed up from, the version of the consent text you agreed to and the time. We email you only after you confirm the address, and every email has a one-click unsubscribe link."}</p>
          <h3>{"Requests to schools and providers"}</h3>
          <p>{"When you send a request, we store your name, email, and any phone number, LINE ID, nationality, city, visa, start month and message you give us, plus your saved checker answers if you came from the checker. We also store the page you sent it from, your browser type, the consent text version and a one-way hash of your IP address, which we use only to stop spam and duplicate requests."}</p>
          <h3>{"Visa checker"}</h3>
          <p>{"If you save a checker result, we store your answers (such as age, savings and income bands) at a private link. We do not ask for your name or email to do this."}</p>
          <h3>{"Privacy requests and listing claims"}</h3>
          <p>{"If you send a privacy request or claim a listing, we store what you write in the form so we can reply."}</p>
          <h3>{"Analytics"}</h3>
          <p>{"Page views are counted without cookies. Google Analytics and Microsoft Clarity run only if you accept them. See "}<Link href={routes.cookies()}>{"cookies and analytics"}</Link>{"."}</p>
          <p>{"The legal basis for all of the above is your consent, which you can withdraw at any time."}</p>

          <h2>{"Who sees your data"}</h2>
          <ul>
            <li>{"Schools and providers: a request goes to at most three Verified providers that match it. They first see the request without your name, email, phone or LINE ID, and see those only if they accept. Please do not put contact details in your message."}</li>
            <li>{"Service providers that run the site for us: Supabase (database, hosted in Singapore), Vercel (website hosting), Resend (sending email), and, only if you accept analytics cookies, Google and Microsoft. Some of them process data outside Thailand."}</li>
            <li>{"Authorities, only where Thai law requires it."}</li>
          </ul>
          <p>{"We do not sell personal data or share it for advertising."}</p>

          <h2>{"How long we keep it"}</h2>
          <ul>
            <li>{"Requests to providers: 24 months, then deleted automatically, unless a provider reports that you enrolled."}</li>
            <li>{"Email addresses: until you unsubscribe. Addresses never confirmed are deleted after 30 days, and unsubscribed addresses 30 days after you leave."}</li>
            <li>{"Saved checker results: 24 months after the last time the link was opened."}</li>
            <li>{"Copies of emails we send: 30 days."}</li>
            <li>{"Privacy requests and listing claims: 24 months after we close them."}</li>
          </ul>

          <h2>{"Your rights"}</h2>
          <p>{"Under Thailand's Personal Data Protection Act you can ask to see or get a copy of your data, correct it, delete it, move it, restrict or object to its use, and withdraw your consent. Use the "}<Link href={routes.privacyRequest()}>{"privacy request form"}</Link>{" or email hello@staylong.co. We reply within 30 days. You can also complain to the Office of the Personal Data Protection Committee."}</p>

          <h2>{"Security"}</h2>
          <p>{"Data travels over HTTPS. The website itself holds no key that can read stored requests or email addresses: forms write through database functions that check and limit what they accept, and only the team can read the results."}</p>

          <h2>{"Changes"}</h2>
          <p>{"If we change how we use personal data, we update this page. If a change needs new consent, we ask for it before it applies to you."}</p>
        </div>
      </Container>
    </>
  );
}
