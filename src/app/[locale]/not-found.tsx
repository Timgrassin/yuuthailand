import { Container } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-muted">This page does not exist. หน้านี้ไม่มีอยู่</p>
      <Link href="/" className="mt-6 inline-block text-primary underline">Yuu</Link>
    </Container>
  );
}
