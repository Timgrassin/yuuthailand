import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, graph } from "@/lib/seo/schema";

// Visible FAQ plus matching FAQPage JSON-LD. Never emit the schema without the visible list.
export function Faq({ items, title, id = "faq" }: { items: { question: string; answer: string }[]; title: string; id?: string }) {
  if (!items.length) return null;
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="mb-6 text-3xl">{title}</h2>
      <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-card">
        {items.map((f) => (
          <details key={f.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 font-semibold text-ink marker:hidden hover:bg-sunken/50">
              <h3 className="font-sans text-base font-semibold">{f.question}</h3>
              <Plus className="mt-0.5 size-5 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden />
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-ink-2">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={graph(faqSchema(items))} />
    </section>
  );
}
