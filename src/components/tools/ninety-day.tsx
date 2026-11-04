"use client";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, Panel, Stat, addDays, fromISO, inputCls, longDate, toISO } from "./ui";

export function NinetyDayCalculator() {
  const [start, setStart] = useState(toISO(new Date()));
  const s = fromISO(start);
  const due = addDays(s, 90);
  const next = [1, 2, 3, 4].map((k) => addDays(s, 90 * (k + 1)));
  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5">
        <Field label="Date you entered Thailand or last reported"><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls} /></Field>
        <p className="text-sm text-muted">Leaving Thailand resets the count. Use your latest entry date after any trip.</p>
      </Panel>
      <div className="space-y-6">
        <Panel className="grid gap-6 sm:grid-cols-3">
          <Stat label="Report due" value={due.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} big />
          <Stat label="Window opens" value={longDate(addDays(due, -15))} note="15 days before" />
          <Stat label="Last day, no fine" value={longDate(addDays(due, 7))} note="7 days after" />
        </Panel>
        <Panel>
          <h3 className="font-sans font-semibold">Following reports, if you stay</h3>
          <ul className="mt-3 divide-y divide-line">{next.map((d, i) => <li key={i} className="flex justify-between py-2 text-[15px]"><span className="text-muted">Report {i + 2}</span><span className="font-semibold">{longDate(d)}</span></li>)}</ul>
        </Panel>
        <EmailCapture title="Get a reminder before each report" body="We email you when your filing window opens, so you never pay a late fine." leadMagnet="ninety_day_reminders" meta={{ start, due: toISO(due) }} />
      </div>
    </div>
  );
}
