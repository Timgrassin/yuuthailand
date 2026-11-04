"use client";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, Panel, Stat, addDays, fromISO, inputCls, thb, toISO } from "./ui";

const PER_DAY = 500, CAP = 20000;
// Reported ban tiers for people who surrender voluntarily (Immigration Bureau, 2016 rules as widely reported).
const BAN = (d: number) => (d > 5 * 365 ? "10 years" : d > 3 * 365 ? "5 years" : d > 365 ? "3 years" : d > 90 ? "1 year" : "No ban");

export function OverstayCalculator() {
  const [permitted, setPermitted] = useState(toISO(new Date()));
  const [leave, setLeave] = useState(toISO(addDays(new Date(), 5)));
  const days = Math.max(0, Math.round((fromISO(leave).getTime() - fromISO(permitted).getTime()) / 86400000));
  const fine = Math.min(CAP, days * PER_DAY);
  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5">
        <Field label="Last permitted day" hint="The date on your stamp or extension."><input type="date" value={permitted} onChange={(e) => setPermitted(e.target.value)} className={inputCls} /></Field>
        <Field label="Day you leave Thailand"><input type="date" value={leave} onChange={(e) => setLeave(e.target.value)} className={inputCls} /></Field>
      </Panel>
      <div className="space-y-6">
        <Panel className="grid gap-6 sm:grid-cols-3">
          <Stat big label="Overstay" value={`${days} ${days === 1 ? "day" : "days"}`} />
          <Stat label="Fine" value={thb(fine)} note={fine === CAP ? "Capped at 20,000 THB" : "500 THB a day"} />
          <Stat label="Possible ban" value={BAN(days)} note="If you surrender. Arrest means longer bans." />
        </Panel>
        <EmailCapture title="Send me my legal options" body="We email the long-stay routes that fit you, so you never need to overstay." leadMagnet="overstay_options" meta={{ days }} />
      </div>
    </div>
  );
}
