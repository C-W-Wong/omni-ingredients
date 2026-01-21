"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const cookieTypeKeys = ["essential", "performance", "functional", "marketing"] as const;

export default function CookiePolicyPage() {
  const t = useTranslations("legal.cookies");
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
          {/* Introduction */}
          <div className="prose prose-neutral max-w-none animate-on-scroll fade-in stagger-1">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {t("intro")}
            </p>
          </div>

          {/* What Are Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-2">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              {t("whatAreCookies.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("whatAreCookies.content1")}</p>
              <p>{t("whatAreCookies.content2")}</p>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-6">
              {t("types.title")}
            </h2>
            <div className="grid gap-6">
              {cookieTypeKeys.map((key, index) => (
                <div
                  key={key}
                  className={`bg-neutral-50 rounded-2xl p-6 border border-neutral-200 animate-on-scroll card-reveal stagger-${index + 1}`}
                >
                  <h3 className="text-lg font-semibold text-[#2A2118] mb-3">
                    {t(`types.${key}.name`)}
                  </h3>
                  <p className="text-neutral-600 mb-4">{t(`types.${key}.description`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#edd8cc] text-[#2A2118] px-3 py-1 rounded-full"
                      >
                        {t(`types.${key}.examples.${i}`)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Manage Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-4">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              {t("howToManage.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("howToManage.intro")}</p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">
                {t("howToManage.browserSettings.title")}
              </h3>
              <p className="mb-4">{t("howToManage.browserSettings.content")}</p>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 mt-4">
                <p className="font-medium text-[#2A2118] mb-3">
                  {t("howToManage.browserSettings.browsers.title")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Chrome:</strong> {t("howToManage.browserSettings.browsers.chrome").replace("Chrome: ", "")}
                  </li>
                  <li>
                    <strong>Firefox:</strong> {t("howToManage.browserSettings.browsers.firefox").replace("Firefox: ", "")}
                  </li>
                  <li>
                    <strong>Safari:</strong> {t("howToManage.browserSettings.browsers.safari").replace("Safari: ", "")}
                  </li>
                  <li>
                    <strong>Edge:</strong> {t("howToManage.browserSettings.browsers.edge").replace("Edge: ", "")}
                  </li>
                </ul>
              </div>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">
                {t("howToManage.optOut.title")}
              </h3>
              <p>{t("howToManage.optOut.content")}</p>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-5">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              {t("thirdParty.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("thirdParty.intro")}</p>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`thirdParty.items.${i}`)}</li>
                ))}
              </ul>
              <p className="mt-4">{t("thirdParty.disclaimer")}</p>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-12 animate-on-scroll fade-in stagger-6">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              {t("updates.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p>{t("updates.content")}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12 animate-on-scroll fade-in stagger-7">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              {t("contact.title")}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">{t("contact.content")}</p>
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
