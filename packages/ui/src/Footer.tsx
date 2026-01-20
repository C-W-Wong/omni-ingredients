"use client";

import Link from "next/link";

// Shop (B2C) footer links
const shopLinks = [
  { href: "/shop?category=cleansers", label: "Cleansers" },
  { href: "/shop?category=serums", label: "Serums" },
  { href: "/shop?category=moisturizers", label: "Moisturizers" },
  { href: "/shop?category=treatments", label: "Treatments" },
];

const shopSupportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/contact", label: "Contact Us" },
];

// Landing (B2B) footer links
const landingProductLinks = [
  { href: "/solutions", label: "All Solutions" },
  { href: "/solutions#categories", label: "Ingredient Categories" },
  { href: "/solutions#premix", label: "Custom Premix" },
  { href: "/solutions#services", label: "Our Services" },
];

const landingSupportLinks = [
  { href: "mailto:ga@omniingredients.com", label: "Request Quote" },
  { href: "/about", label: "About Us" },
  { href: "/journal", label: "Industry Insights" },
  { href: "/contact", label: "Contact" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/press", label: "Press" },
  { href: "/sustainability", label: "Sustainability" },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM216,176a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm-8-68a12,12,0,1,1,12-12A12,12,0,0,1,88,108Zm96,68a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
      </svg>
    ),
  },
];

export interface FooterProps {
  variant?: "landing" | "shop";
  shopUrl?: string;
  landingUrl?: string;
  locale?: string;
  translations?: {
    tagline?: string;
    products?: string;
    partner?: string;
    company?: string;
    copyright?: string;
    productLinks?: {
      allSolutions?: string;
      ingredientCategories?: string;
      customPremix?: string;
      ourServices?: string;
    };
    supportLinks?: {
      requestQuote?: string;
      aboutUs?: string;
      industryInsights?: string;
      contact?: string;
    };
    companyLinks?: {
      aboutUs?: string;
      press?: string;
      sustainability?: string;
    };
    legalLinks?: {
      privacyPolicy?: string;
      termsOfService?: string;
      cookiePolicy?: string;
    };
  };
}

export function Footer({
  variant = "shop",
  shopUrl = "http://localhost:3001",
  landingUrl = "http://localhost:3000",
  locale,
  translations,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isLanding = variant === "landing";
  const t = translations;

  // Prefix paths with locale for landing variant
  const localePath = (path: string) => locale ? `/${locale}${path === "/" ? "" : path}` : path;

  // Landing (B2B) footer links with translations
  const translatedLandingProductLinks = [
    { href: localePath("/solutions"), label: t?.productLinks?.allSolutions || "All Solutions" },
    { href: localePath("/solutions") + "#categories", label: t?.productLinks?.ingredientCategories || "Ingredient Categories" },
    { href: localePath("/solutions") + "#premix", label: t?.productLinks?.customPremix || "Custom Premix" },
    { href: localePath("/solutions") + "#services", label: t?.productLinks?.ourServices || "Our Services" },
  ];

  const translatedLandingSupportLinks = [
    { href: "mailto:ga@omniingredients.com", label: t?.supportLinks?.requestQuote || "Request Quote" },
    { href: localePath("/about"), label: t?.supportLinks?.aboutUs || "About Us" },
    { href: localePath("/journal"), label: t?.supportLinks?.industryInsights || "Industry Insights" },
    { href: localePath("/contact"), label: t?.supportLinks?.contact || "Contact" },
  ];

  const translatedCompanyLinks = [
    { href: localePath("/about"), label: t?.companyLinks?.aboutUs || "About Us" },
    { href: localePath("/press"), label: t?.companyLinks?.press || "Press" },
    { href: localePath("/sustainability"), label: t?.companyLinks?.sustainability || "Sustainability" },
  ];

  const productLinks = isLanding ? translatedLandingProductLinks : shopLinks;
  const supportLinks = isLanding ? translatedLandingSupportLinks : shopSupportLinks;
  const currentCompanyLinks = isLanding ? translatedCompanyLinks : companyLinks;

  return (
    <footer className="bg-white border-t border-neutral-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href={isLanding ? localePath("/") : landingUrl} className="inline-block">
              <h3 className="text-lg font-semibold tracking-tight mb-4">
                Omni Ingredients
              </h3>
            </Link>
            <p className="text-sm text-neutral-600 mb-6 max-w-xs">
              {isLanding
                ? (t?.tagline || "Your trusted B2B partner for premium nutraceutical ingredients across North America.")
                : "Natural skincare crafted with clinically proven botanicals."}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-[#edd8cc] rounded-lg transition"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products / Shop */}
          <div>
            <h4 className="font-semibold mb-4">
              {isLanding ? (t?.products || "Products") : "Shop"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">
              {isLanding ? (t?.partner || "Partner") : "Support"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") || link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t?.company || "Company"}</h4>
            <ul className="space-y-2.5 text-sm">
              {currentCompanyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-900 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-200 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 text-center sm:text-left">
            &copy; {currentYear} Omni Ingredients. {t?.copyright || "All rights reserved."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href={isLanding ? localePath("/privacy") : "/privacy"}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition"
            >
              {t?.legalLinks?.privacyPolicy || "Privacy Policy"}
            </Link>
            <Link
              href={isLanding ? localePath("/terms") : "/terms"}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition"
            >
              {t?.legalLinks?.termsOfService || "Terms of Service"}
            </Link>
            <Link
              href={isLanding ? localePath("/cookies") : "/cookies"}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition"
            >
              {t?.legalLinks?.cookiePolicy || "Cookie Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
