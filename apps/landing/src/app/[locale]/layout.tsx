import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@omm/ui/Header";
import { Footer } from "@omm/ui/Footer";
import { routing, type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Omni Ingredients | Premium Nutraceutical Ingredients",
  description:
    "Your trusted B2B partner for high-quality vitamins, minerals, amino acids, and specialty nutrients. cGMP compliant manufacturing.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";
  const landingUrl =
    process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

  // Extract translations for Header and Footer from messages
  const commonMessages = messages.common as Record<string, unknown> | undefined;
  const navMessages = commonMessages?.navigation as Record<string, string> | undefined;
  const footerMessages = commonMessages?.footer as Record<string, unknown> | undefined;
  const announcementMessages = commonMessages?.announcement as Record<string, string> | undefined;

  const headerTranslations = {
    navigation: {
      home: navMessages?.home,
      solutions: navMessages?.solutions,
      about: navMessages?.about,
      journal: navMessages?.journal,
      contact: navMessages?.contact,
      getQuote: navMessages?.getQuote,
      search: navMessages?.search,
    },
    announcement: {
      line1: announcementMessages?.landing,
      line2: announcementMessages?.servingSince,
    },
  };

  const footerTranslations = {
    tagline: footerMessages?.tagline as string | undefined,
    products: footerMessages?.products as string | undefined,
    partner: footerMessages?.partner as string | undefined,
    company: footerMessages?.company as string | undefined,
    copyright: footerMessages?.copyright as string | undefined,
    productLinks: footerMessages?.productLinks as Record<string, string> | undefined,
    supportLinks: footerMessages?.supportLinks as Record<string, string> | undefined,
    companyLinks: footerMessages?.companyLinks as Record<string, string> | undefined,
    legalLinks: footerMessages?.legalLinks as Record<string, string> | undefined,
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header
              variant="landing"
              shopUrl={shopUrl}
              landingUrl={landingUrl}
              locale={locale}
              languageSwitcher={<LanguageSwitcher />}
              mobileLanguageSwitcher={<LanguageSwitcher variant="inline" />}
              translations={headerTranslations}
            />
            <main className="flex-1">{children}</main>
            <Footer
              variant="landing"
              shopUrl={shopUrl}
              landingUrl={landingUrl}
              locale={locale}
              translations={footerTranslations}
            />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
