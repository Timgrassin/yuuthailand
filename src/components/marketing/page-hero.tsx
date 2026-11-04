import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";

// Shared top-of-page band: breadcrumb slot, eyebrow, display H1, lead, optional aside.
export function PageHero({ crumbs, eyebrow, title, lead, children, aside }: { crumbs?: ReactNode; eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="bg-mesh border-b border-line">
      <Container className="pb-12 pt-8 sm:pb-16 sm:pt-10">
        {crumbs}
        <div className={aside ? "grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end" : ""}>
          <div className="max-w-3xl">
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-[3.5rem]">{title}</h1>
            {lead ? <div className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl">{lead}</div> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
