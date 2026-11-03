import { defineRouting } from "next-intl/routing";

// D2: English has no prefix, Thai lives under /th.
export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});
