import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Container } from "@/components/ui/primitives";

export function CtaBand({ title, body, primary, secondary }: { title: ReactNode; body?: ReactNode; primary: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <Container className="py-16">
      <div className="bg-night-mesh grain overflow-hidden rounded-[28px] px-8 py-12 text-white shadow-lift sm:px-14 sm:py-16">
        <div className="relative max-w-2xl">
          <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
          {body ? <p className="mt-4 text-lg text-white/75">{body}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="light" size="lg"><Link href={primary.href}>{primary.label}</Link></Button>
            {secondary ? <Button asChild variant="outlineLight" size="lg"><Link href={secondary.href}>{secondary.label}</Link></Button> : null}
          </div>
        </div>
      </div>
    </Container>
  );
}
