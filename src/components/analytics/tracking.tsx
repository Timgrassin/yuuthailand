"use client";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY, CONSENT_OPEN_EVENT, isPrivatePath } from "@/lib/analytics";
import { routes } from "@/lib/seo/routes";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const HAS_COOKIE_TOOLS = !!(GA_ID || CLARITY_ID);

type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_cl|CLID|ANONCHK|MR|MUID|SM)/.test(name)) continue;
    for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

const dropPrivate = <T extends { url: string }>(event: T): T | null => (isPrivatePath(new URL(event.url).pathname) ? null : event);

// D30: Vercel Analytics and Speed Insights use no cookies and always run. Google Analytics and Clarity load
// only after the visitor accepts, and never on private URLs.
export function Tracking() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);
  const isPrivate = isPrivatePath(pathname);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
    const show = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, show);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, show);
  }, []);

  // A visitor can move to a private URL without a page load, for example when the checker saves a result.
  useEffect(() => {
    if (!isPrivate) return;
    if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    window.clarity?.("stop");
  }, [isPrivate]);

  const decide = (next: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      /* the choice then lasts for this page only */
    }
    const withdrawn = choice === "granted" && next === "denied";
    setChoice(next);
    setOpen(false);
    if (withdrawn) {
      clearAnalyticsCookies();
      location.reload();
    }
  };

  const load = ready && choice === "granted" && !isPrivate;
  const showBanner = HAS_COOKIE_TOOLS && ready && !isPrivate && (open || choice === null);

  return (
    <>
      <Analytics beforeSend={dropPrivate} />
      <SpeedInsights beforeSend={dropPrivate} />
      {load && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {load && CLARITY_ID ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      ) : null}
      {showBanner ? (
        <div role="region" aria-label="Cookie choices" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-card border border-line bg-surface p-5 shadow-lift">
          <p className="text-sm text-ink-2">
            {"Can we use analytics cookies to see how people use Staylong? They include session replays, with form entries hidden. "}
            <Link href={routes.cookies()} className="text-primary underline">{"Cookie details"}</Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => decide("granted")} className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink hover:bg-primary-2">{"Accept"}</button>
            <button type="button" onClick={() => decide("denied")} className="h-10 rounded-full border border-line-strong px-5 text-sm font-semibold hover:bg-sunken">{"Decline"}</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className="underline">
      {"Cookie settings"}
    </button>
  );
}
