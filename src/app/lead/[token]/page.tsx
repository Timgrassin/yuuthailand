import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadResponse } from "@/components/blocks/request-forms";
import { Container } from "@/components/ui/primitives";
import { publicDb } from "@/lib/supabase/public";
import { TRACK_INFO, TRACKS, type Track } from "@/lib/tracks";

// Provider view of one request, opened from the emailed link (migration 0035). The token is the only key,
// so the page is never indexed or cached, and analytics skip it (isPrivatePath).
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Request from Staylong", robots: { index: false, follow: false } };

type Delivery = {
  status: "sent" | "accepted" | "declined" | "enrolled" | "disputed" | "refunded"; provider: string; expired: boolean;
  track: string | null; city: string | null; nationality: string | null; start_month: string | null; message: string | null; received: string;
  contact: { name: string; email: string; phone: string | null; line_id: string | null; whatsapp: string | null } | null;
};

export default async function LeadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[0-9a-f]{64}$/.test(token)) notFound();
  const db = publicDb();
  if (!db) notFound();
  const { data } = await db.rpc("get_delivery", { p_token: token });
  const d = data as Delivery | null;
  if (!d) notFound();
  const visa = d.track && (TRACKS as readonly string[]).includes(d.track) ? TRACK_INFO[d.track as Track].name : d.track ?? "Not sure yet";
  const rows: [string, string][] = [["Visa", visa], ["City", d.city ?? "Not given"], ["Nationality", d.nationality ?? "Not given"], ["Start", d.start_month ?? "Not given"], ["Received", `${d.received} (Bangkok time)`]];
  return (
    <Container className="max-w-xl py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{`For ${d.provider}`}</p>
      <h1 className="mt-2 text-3xl font-bold">{"Request from Staylong"}</h1>
      <dl className="mt-6 grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
        {rows.map(([k, v]) => <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
      </dl>
      {d.message ? <p className="mt-4 whitespace-pre-line rounded-card border border-line bg-surface p-4 text-sm">{d.message}</p> : null}
      <div className="mt-8">
        {d.contact ? (
          <div className="rounded-card border border-line bg-surface p-5 text-sm" data-clarity-mask="true">
            <p className="font-semibold text-verified">{"You accepted this request. Please reply within one working day."}</p>
            <dl className="mt-4 grid grid-cols-[8rem_1fr] gap-y-2">
              <dt className="text-muted">{"Name"}</dt><dd>{d.contact.name}</dd>
              <dt className="text-muted">{"Email"}</dt><dd><a href={`mailto:${d.contact.email}`} className="underline">{d.contact.email}</a></dd>
              {d.contact.phone ? <><dt className="text-muted">{"Phone"}</dt><dd>{d.contact.phone}</dd></> : null}
              {d.contact.whatsapp ? <><dt className="text-muted">{"WhatsApp"}</dt><dd>{d.contact.whatsapp}</dd></> : null}
              {d.contact.line_id ? <><dt className="text-muted">{"LINE"}</dt><dd>{d.contact.line_id}</dd></> : null}
            </dl>
            <p className="mt-4 text-muted">{"Never promise a visa approval. Only the embassy and Thai Immigration decide."}</p>
          </div>
        ) : d.status === "declined" ? (
          <p className="font-semibold">{"You declined this request. Thank you for telling us why."}</p>
        ) : d.expired ? (
          <p className="font-semibold">{"This link has expired. Reply to the email if you still want this request."}</p>
        ) : d.status === "sent" ? (
          <LeadResponse token={token} />
        ) : (
          <p className="font-semibold">{"This request is closed."}</p>
        )}
      </div>
      <p className="mt-10 text-xs text-muted">{"Questions: reply to the email or write to hello@staylong.co."}</p>
    </Container>
  );
}
