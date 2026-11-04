"use client";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, Panel, addMonths, fromISO, inputCls, longDate, toISO, todayISO } from "./ui";

export function BankPlanner({ beforeMonths = 2, afterMonths = 3, floor = 400000, amount = 800000 }: { beforeMonths?: number; afterMonths?: number; floor?: number; amount?: number }) {
  const [filing, setFiling] = useState(toISO(addMonths(new Date(), 3)));
  const f = fromISO(filing);
  const steps = [
    { date: addMonths(f, -beforeMonths), title: `Deposit ${amount.toLocaleString("en-US")} THB`, body: `Latest date to have the full amount in a Thai bank account in your name, ${beforeMonths} months before filing.` },
    { date: f, title: "File your extension", body: "Bring the bank book updated that day and a recent bank letter. Approval is usually given about 30 days later." },
    { date: addMonths(f, 1 + afterMonths), title: "Earliest date to withdraw", body: `Keep ${amount.toLocaleString("en-US")} THB for ${afterMonths} months after approval. This assumes approval about a month after filing.` },
    { date: addMonths(f, 1 + afterMonths), title: `Keep at least ${floor.toLocaleString("en-US")} THB`, body: "From here on, the balance must never fall below the floor." },
    { date: addMonths(addMonths(f, 12), -beforeMonths), title: `Top back up to ${amount.toLocaleString("en-US")} THB`, body: "Latest date for next year's filing, which falls about 12 months after this one." },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5">
        <Field label="When will you file your extension?" hint="Usually up to 30 days before your current permission ends."><input type="date" value={filing} min={todayISO()} onChange={(e) => setFiling(e.target.value)} className={inputCls} /></Field>
      </Panel>
      <div className="space-y-6">
        <ol className="relative space-y-6 border-l-2 border-line pl-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[2.85rem] flex size-9 items-center justify-center rounded-full border-2 border-bg bg-primary font-semibold text-primary-ink">{i + 1}</span>
              <p className="text-sm font-semibold text-primary-2">{longDate(s.date)}</p>
              <h3 className="mt-1 font-sans text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <EmailCapture title="Email me my 800k dates" body="Your timeline, with a reminder before each deadline and alerts if the bank rules change." leadMagnet="retirement_800k_plan" tracks={["retirement"]} meta={{ filing }} />
      </div>
    </div>
  );
}
