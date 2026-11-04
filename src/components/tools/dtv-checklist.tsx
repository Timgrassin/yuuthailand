"use client";
import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, Panel, inputCls } from "./ui";

type Country = { slug: string; name: string; dtv: { policeCertificate: string; certificateMaxAge: string | null; residenceProof: string; quirks: string[] } };
const CATS = {
  remote: { label: "Remote work for a foreign employer", items: ["Employment contract or employer letter from a company outside Thailand", "Recent payslips or proof of income from that employer"] },
  freelance: { label: "Freelancer or business owner abroad", items: ["Client contracts or invoices from clients outside Thailand", "Portfolio or company registration abroad"] },
  softpower: { label: "Soft power (Muay Thai, cooking, medical, events)", items: ["Enrolment or acceptance letter from the camp, school or provider, with course dates", "Proof of payment for the course"] },
} as const;

export function DtvChecklist({ countries }: { countries: Country[] }) {
  const [cat, setCat] = useState<keyof typeof CATS>("remote");
  const [cc, setCc] = useState(countries[0]?.slug ?? "");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const c = countries.find((x) => x.slug === cc);
  const items = [
    "Passport valid for at least 6 months, with blank pages",
    "Bank statement in your name showing at least 500,000 THB, usually covering the last 3 months",
    ...CATS[cat].items,
    `Proof of residence in ${c?.name ?? "the country where you apply"}: ${c?.dtv.residenceProof ?? "check with your mission"}`,
    `Criminal record certificate: ${c?.dtv.policeCertificate ?? "check with your mission"}${c?.dtv.certificateMaxAge ? ` (${c.dtv.certificateMaxAge})` : ""}`,
    "Recent passport photo",
    "Certified translations of any document not in English or Thai",
    ...(c?.dtv.quirks ?? []),
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5">
        <Field label="Your DTV category"><select value={cat} onChange={(e) => setCat(e.target.value as keyof typeof CATS)} className={inputCls}>{Object.entries(CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></Field>
        <Field label="Country you apply from" hint="Since 31 Aug 2026, your country of nationality or permanent residence."><select value={cc} onChange={(e) => setCc(e.target.value)} className={inputCls}>{countries.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select></Field>
        <p className="text-sm text-muted">{Object.values(done).filter(Boolean).length} of {items.length} ready</p>
      </Panel>
      <div className="space-y-6">
        <Panel className="p-0">
          <ul className="divide-y divide-line">
            {items.map((it) => (
              <li key={it}>
                <button type="button" onClick={() => setDone((d) => ({ ...d, [it]: !d[it] }))} className="flex w-full items-start gap-3 px-6 py-4 text-left hover:bg-sunken/50">
                  {done[it] ? <CheckSquare className="mt-0.5 size-5 shrink-0 text-verified" aria-hidden /> : <Square className="mt-0.5 size-5 shrink-0 text-line-strong" aria-hidden />}
                  <span className={done[it] ? "text-muted line-through" : "text-ink-2"}>{it}</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <EmailCapture title="Email me my checklist" body="Your DTV checklist as an email you can tick off, plus alerts if the requirements change." leadMagnet="dtv_checklist" tracks={["dtv"]} meta={{ category: cat, country: cc }} />
      </div>
    </div>
  );
}
