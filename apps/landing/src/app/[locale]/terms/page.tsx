"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const sectionKeys = ["acceptance", "useOfServices", "ordersAndPricing", "intellectualProperty", "limitationOfLiability", "governingLaw", "contact"] as const;

export default function TermsOfServicePage() {
  const t = useTranslations("legal.terms");
  const tLegal = useTranslations("legal");
  const tCommon = useTranslations("common");

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="antialiased selection:bg-[#2A2118] selection:text-white text-neutral-900">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc]"></div>
        <div className="absolute inset-0 bg-noise opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
            {t("badge")}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
            {t("title")}
          </h1>
          <p className="text-neutral-600 mt-6 animate-on-scroll text-reveal stagger-3">
            {tLegal("lastUpdated")}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Table of Contents */}
          <div className="mb-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 animate-on-scroll fade-in stagger-1">
            <h2 className="text-lg font-semibold mb-4">{tLegal("tableOfContents")}</h2>
            <nav>
              <ul className="space-y-2">
                {sectionKeys.map((key, index) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="text-neutral-600 hover:text-[#df7a4c] transition text-sm"
                    >
                      {index + 1}. {t(`sections.${key}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Introduction */}
          <div className="prose prose-neutral max-w-none animate-on-scroll fade-in stagger-2">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {t("intro")}
            </p>
          </div>

          {/* Section 1 - Acceptance of Terms */}
          <div id="acceptance" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              1. {t("sections.acceptance.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.acceptance.content1")}</p>
              <p>{t("sections.acceptance.content2")}</p>
            </div>
          </div>

          {/* Section 2 - Use of Services */}
          <div id="useOfServices" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-4">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              2. {t("sections.useOfServices.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.useOfServices.intro")}</p>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>{t(`sections.useOfServices.items.${i}`)}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 - Orders and Pricing */}
          <div id="ordersAndPricing" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-5">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              3. {t("sections.ordersAndPricing.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">
                {t("sections.ordersAndPricing.orderAcceptance.title")}
              </h3>
              <p className="mb-4">{t("sections.ordersAndPricing.orderAcceptance.content")}</p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">
                {t("sections.ordersAndPricing.pricing.title")}
              </h3>
              <p className="mb-4">{t("sections.ordersAndPricing.pricing.content")}</p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">
                {t("sections.ordersAndPricing.paymentTerms.title")}
              </h3>
              <p>{t("sections.ordersAndPricing.paymentTerms.content")}</p>
            </div>
          </div>

          {/* Section 4 - Intellectual Property */}
          <div id="intellectualProperty" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-6">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              4. {t("sections.intellectualProperty.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.intellectualProperty.content")}</p>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.intellectualProperty.items.${i}`)}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5 - Limitation of Liability */}
          <div id="limitationOfLiability" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-7">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              5. {t("sections.limitationOfLiability.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.limitationOfLiability.content1")}</p>
              <p className="mb-4">{t("sections.limitationOfLiability.content2")}</p>
              <p>{t("sections.limitationOfLiability.content3")}</p>
            </div>
          </div>

          {/* Section 6 - Governing Law */}
          <div id="governingLaw" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-8">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              6. {t("sections.governingLaw.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.governingLaw.content1")}</p>
              <p>{t("sections.governingLaw.content2")}</p>
            </div>
          </div>

          {/* Section 7 - Contact */}
          <div id="contact" className="mt-12 scroll-mt-24 animate-on-scroll fade-in">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              7. {t("sections.contact.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("sections.contact.content")}</p>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 mt-4">
                <p className="font-semibold text-[#2A2118]">{tCommon("companyName")}</p>
                <p className="mt-2">{tCommon("location")}</p>
                <p className="mt-1">
                  Email:{" "}
                  <a href={`mailto:${tCommon("email")}`} className="text-[#df7a4c] hover:underline">
                    {tCommon("email")}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="mt-16 pt-8 border-t border-neutral-200 flex justify-between items-center">
            <Link
              href="/"
              className="text-[#df7a4c] hover:underline font-medium"
            >
              &larr; {tLegal("backToHome")}
            </Link>
            <a
              href="#"
              className="text-neutral-500 hover:text-neutral-700 text-sm"
            >
              {tLegal("backToTop")} &uarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
