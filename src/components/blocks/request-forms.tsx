"use client";
import { useActionState } from "react";
import { respondToLead, submitPrivacyRequest, submitProviderClaim, type FormState } from "@/lib/actions/forms";

const input = "mt-1 h-11 w-full rounded-sm border border-line bg-bg px-3 font-normal";
const area = "mt-1 w-full rounded-sm border border-line bg-bg p-3 font-normal";
const button = "h-11 rounded-full bg-primary px-5 font-semibold text-primary-ink disabled:opacity-50";

const Honeypot = () => <div aria-hidden className="hidden"><label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>;

function ErrorLine({ state }: { state: FormState }) {
  if (!state.error) return null;
  const text = {
    invalid: "Please check the highlighted fields.",
    rate: "Too many requests from you today. Please email hello@staylong.co instead.",
    unavailable: "Something went wrong on our side. Please email hello@staylong.co instead.",
    expired: "This link has expired. Reply to the email and we will resend the request.",
  }[state.error];
  return <p role="alert" className="text-suspended">{text}</p>;
}

export function PrivacyRequestForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitPrivacyRequest, {});
  if (state.ok) return <p role="status" className="font-semibold text-verified">{"Request received. Check your inbox for our acknowledgement. We reply within 30 days."}</p>;
  const bad = (f: string) => state.fields?.includes(f);
  return (
    <form action={action} className="grid gap-3 text-sm" noValidate data-clarity-mask="true">
      <Honeypot />
      <label className="font-semibold">{"Email address you used on Staylong"}<input name="email" type="email" required autoComplete="email" className={input} aria-invalid={bad("email")} /></label>
      <label className="font-semibold">{"What do you want?"}
        <select name="kind" required className={input} defaultValue="delete" aria-invalid={bad("kind")}>
          <option value="delete">{"Delete my data"}</option>
          <option value="access">{"Send me a copy of my data"}</option>
          <option value="correct">{"Correct my data"}</option>
          <option value="withdraw">{"Withdraw my consent"}</option>
          <option value="other">{"Something else"}</option>
        </select>
      </label>
      <label className="font-semibold">{"Details (optional)"}<textarea name="details" rows={3} maxLength={2000} className={area} /></label>
      <ErrorLine state={state} />
      <button disabled={pending} className={button}>{"Send request"}</button>
    </form>
  );
}

export function ClaimForm({ listing }: { listing?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitProviderClaim, {});
  if (state.ok) return <p role="status" className="font-semibold text-verified">{"Claim received. Check your inbox for our acknowledgement. We reply within a few working days."}</p>;
  const bad = (f: string) => state.fields?.includes(f);
  return (
    <form action={action} className="grid gap-3 text-sm" noValidate data-clarity-mask="true">
      <Honeypot />
      <label className="font-semibold">{"Your listing: ref code, Staylong link or school name"}<input name="listing" required defaultValue={listing} className={input} aria-invalid={bad("listing")} placeholder="SL-7K3Q-BKK" /></label>
      <label className="font-semibold">{"Your name"}<input name="full_name" required autoComplete="name" className={input} aria-invalid={bad("full_name")} /></label>
      <label className="font-semibold">{"Your role"}<input name="role" autoComplete="organization-title" className={input} placeholder="Owner, manager, admissions" /></label>
      <label className="font-semibold">{"Work email (at your school's domain if you have one)"}<input name="email" type="email" required autoComplete="email" className={input} aria-invalid={bad("email")} /></label>
      <label className="font-semibold">{"Phone or LINE (optional)"}<input name="phone" autoComplete="tel" className={input} /></label>
      <label className="font-semibold">{"Anything to correct on the listing? (optional)"}<textarea name="message" rows={3} maxLength={2000} className={area} /></label>
      <p className="text-muted">{"We use these details only to check your claim and contact you about your listing."}</p>
      <ErrorLine state={state} />
      <button disabled={pending} className={button}>{"Send claim"}</button>
    </form>
  );
}

export function LeadResponse({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(respondToLead, {});
  return (
    <div className="grid gap-6 text-sm">
      <form action={action}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="action" value="accept" />
        <button disabled={pending} className={button}>{"Accept and see contact details"}</button>
      </form>
      <form action={action} className="grid gap-3 border-t border-line pt-6">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="action" value="decline" />
        <label className="font-semibold">{"Not a fit? Tell us why"}<textarea name="reason" rows={2} maxLength={500} required className={area} aria-invalid={state.fields?.includes("reason")} placeholder="Course full, wrong city, we do not offer this visa" /></label>
        <button disabled={pending} className="h-11 rounded-full border border-line-strong px-5 font-semibold hover:bg-sunken disabled:opacity-50">{"Decline"}</button>
      </form>
      <ErrorLine state={state} />
    </div>
  );
}
