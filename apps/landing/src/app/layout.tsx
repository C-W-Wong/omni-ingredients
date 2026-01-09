import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@omm/ui/Header";
import { Footer } from "@omm/ui/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Omni Ingredients | Premium Nutraceutical Ingredients",
  description: "Your trusted B2B partner for high-quality vitamins, minerals, amino acids, and specialty nutrients. cGMP compliant manufacturing.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";
  const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header
            variant="landing"
            shopUrl={shopUrl}
            landingUrl={landingUrl}
          />
          <main className="flex-1">{children}</main>
          <Footer
            variant="landing"
            shopUrl={shopUrl}
            landingUrl={landingUrl}
          />
        </div>
      </body>
    </html>
  );
}
