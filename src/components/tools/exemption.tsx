"use client";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, NumberInput, Panel, Stat, addDays, fromISO, inputCls, longDate, toISO } from "./ui";

export function ExemptionCalculator() {
  const [entry, setEntry] = useState(toISO(new Date()));
  const [days, setDays] = useState(30);
  const [extend, setExtend] = useState(false);
  const e = fromISO(entry);
  const last = addDays(e, days - 1); // arrival day counts as day 1
  const lastExt = addDays(last, 30);
  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5">
        <Field label="Entry date"><input type="date" value={entry} onChange={(ev) => setEntry(ev.target.value)} className={inputCls} /></Field>
        <Field label="Days granted on entry" hint="30 for most nationalities since 15 Sep 2026. Check your passport stamp."><NumberInput value={days} onChange={(v) => setDays(Math.max(1, v))} unit="days" /></Field>
        <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={extend} onChange={(ev) => setExtend(ev.target.checked)} className="size-4 accent-[var(--sl-primary)]" />Include the one 30-day extension</label>
      </Panel>
      <div className="space-y-6">
        <Panel className="grid gap-6 sm:grid-cols-2">
          <Stat big label="Last legal day" value={(extend ? lastExt : last).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} note={longDate(extend ? lastExt : last)} />
          <Stat label={extend ? "Without extension" : "With one extension"} value={longDate(extend ? last : lastExt)} note={extend ? "Apply for the extension before this date." : "Extend at an immigration office before your last day."} />
        </Panel>
        <p className="rounded-sm border border-accent/30 bg-accent-soft p-4 text-sm text-warn">Staying longer than this means an overstay fine of 500 THB a day. For stays beyond 60 days, you need a long-stay visa.</p>
        <EmailCapture title="Email me these dates and my long-stay options" body="Your last legal day and extension deadline, plus the visa routes that let you stay longer." leadMagnet="exemption_dates" meta={{ entry, days, last: toISO(last) }} />
      </div>
    </div>
  );
}
