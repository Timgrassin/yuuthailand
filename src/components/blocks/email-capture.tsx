"use client";
import { CheckCircle2, Mail } from "lucide-react";
import { useActionState, useEffect } from "react";
import { track } from "@/lib/analytics";
import { subscribe, type SubscribeState } from "@/lib/actions/lead";
import { copy } from "@/lib/copy";

type Props = {
  title: string;
  body: string;
  leadMagnet: string; // e.g. "cost_calculator_report"
  button?: string;
  tracks?: string[];
  meta?: Record<string, unknown>; // tool inputs/outputs to personalise the follow-up
  tone?: "card" | "dark";
};

// Lead capture used on tools, guides and visa pages. One field, honest promise, consent line.
export function EmailCapture({ title, body, leadMagnet, button = "Email it to me", tracks = [], meta = {}, tone = "card" }: Props) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, {});
  useEffect(() => { if (state.ok) track("sign_up", { method: "email", lead_magnet: leadMagnet }); }, [state.ok, leadMagnet]);
  const dark = tone === "dark";
  return (
    <div className={dark ? "rounded-card bg-night-mesh grain p-7 text-white shadow-lift" : "rounded-card border border-primary/20 bg-primary-soft/60 p-7"}>
      <div className="relative">
        <Mail className={`size-6 ${dark ? "text-accent" : "text-primary"}`} aria-hidden />
        <h2 className={`mt-3 text-2xl ${dark ? "text-white" : ""}`}>{title}</h2>
        <p className={`mt-2 text-[15px] ${dark ? "text-white/75" : "text-ink-2"}`}>{body}</p>
        {state.ok ? (
          <p role="status" className={`mt-5 flex items-center gap-2 font-semibold ${dark ? "text-white" : "text-verified"}`}><CheckCircle2 className="size-5" aria-hidden />{copy.subscription.checkInbox}</p>
        ) : (
          <form action={action} className="mt-5" data-clarity-mask="true">
            <input type="hidden" name="lead_magnet" value={leadMagnet} />
            <input type="hidden" name="tracks" value={tracks.join(",")} />
            <input type="hidden" name="meta" value={JSON.stringify(meta)} />
            <div aria-hidden className="hidden"><label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor={`email-${leadMagnet}`}>Email</label>
              <input id={`email-${leadMagnet}`} name="email" type="email" required autoComplete="email" spellCheck={false} placeholder="you@email.com" className="h-12 w-full min-w-0 rounded-[10px] sm:flex-1 border border-line-strong bg-surface px-5 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
              <button disabled={pending} className={`h-12 shrink-0 rounded-[10px] px-6 font-semibold disabled:opacity-50 ${dark ? "bg-white text-night" : "bg-primary text-primary-ink hover:bg-primary-2"}`}>{button}</button>
            </div>
            <p className={`mt-3 text-xs ${dark ? "text-white/60" : "text-muted"}`}>We also email you when these visa rules change. One click to unsubscribe. No spam.</p>
            {state.error ? <p role="alert" className="mt-2 text-sm text-suspended">{state.error === "invalid" ? "Please enter a valid email." : "Something went wrong. Please try again."}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}
