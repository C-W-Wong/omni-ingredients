import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
  // Enable automatic locale detection from browser Accept-Language header
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
