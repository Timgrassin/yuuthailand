import Link from "next/link";
import { Button, Container } from "@/components/ui/primitives";
import { unsubscribe } from "@/lib/actions/subscription";
import { copy } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({ title: copy.subscription.unsubscribeTitle, description: copy.subscription.unsubscribeBody, path: "/unsubscribe", noindex: true });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string; result?: string }> }) {
  const { token, result } = await searchParams;
  const t = copy.subscription;
  const message = result === "done" ? t.unsubscribed : result || !token || !UUID.test(token) ? t.invalid : null;
  return (
    <Container className="max-w-xl py-20">
      <h1 className="text-3xl">{t.unsubscribeTitle}</h1>
      {message ? (
        <p role="status" className="mt-4 text-lg text-ink-2">{message}</p>
      ) : (
        <form action={unsubscribe} className="mt-6">
          <p className="text-lg text-ink-2">{t.unsubscribeBody}</p>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" variant="secondary" className="mt-6">{t.unsubscribeButton}</Button>
        </form>
      )}
      <Link href="/" className="mt-10 inline-block text-primary underline">{t.home}</Link>
    </Container>
  );
}
