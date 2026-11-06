import Link from "next/link";
import { Button, Container } from "@/components/ui/primitives";
import { confirmSubscription } from "@/lib/actions/subscription";
import { copy } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({ title: copy.subscription.confirmTitle, description: copy.subscription.confirmBody, path: "/subscribe/confirm", noindex: true });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string; result?: string }> }) {
  const { token, result } = await searchParams;
  const t = copy.subscription;
  const message = result === "confirmed" ? t.confirmed : result === "already" ? t.already : result || (token && !UUID.test(token)) || !token ? t.invalid : null;
  return (
    <Container className="max-w-xl py-20">
      <h1 className="text-3xl">{t.confirmTitle}</h1>
      {message ? (
        <p role="status" className="mt-4 text-lg text-ink-2">{message}</p>
      ) : (
        <form action={confirmSubscription} className="mt-6">
          <p className="text-lg text-ink-2">{t.confirmBody}</p>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" className="mt-6">{t.confirmButton}</Button>
        </form>
      )}
      <Link href="/" className="mt-10 inline-block text-primary underline">{t.home}</Link>
    </Container>
  );
}
