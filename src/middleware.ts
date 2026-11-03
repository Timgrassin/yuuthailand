import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Skip API, Next internals, metadata routes and any file with an extension.
export const config = {
  matcher: ["/((?!api|_next|_vercel|feeds|llms\\.txt|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};
