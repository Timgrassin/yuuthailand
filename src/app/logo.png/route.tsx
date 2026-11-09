import { logoImage } from "@/lib/seo/brand-image";

export const dynamic = "force-static";

export function GET() {
  return logoImage(512);
}
