import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

// Detect preferred locale from Accept-Language header
function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return routing.defaultLocale;

  // Parse Accept-Language header and find best match
  const languages = acceptLanguage.split(",").map(lang => {
    const [code, q = "q=1"] = lang.trim().split(";");
    return { code: code.split("-")[0].toLowerCase(), quality: parseFloat(q.split("=")[1]) };
  }).sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { code } of languages) {
    if (routing.locales.includes(code as typeof routing.locales[number])) {
      return code;
    }
  }

  return routing.defaultLocale;
}

// This page redirects the root path to the user's preferred locale
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const preferredLocale = getPreferredLocale(acceptLanguage);

  redirect(`/${preferredLocale}`);
}
