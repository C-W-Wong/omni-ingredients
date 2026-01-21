"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const pillarKeys = ["responsibleSourcing", "supplyChainTransparency", "environmentalPractices", "communityImpact"] as const;
const pillarIcons = ["leaf", "link", "globe", "heart"] as const;
const commitmentKeys = ["supplierAudits", "globalPartners", "zeroTolerance"] as const;
const initiativeKeys = ["carbonNeutrality", "packagingInnovation", "supplierDevelopment", "circularEconomy"] as const;

const LeafIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const iconComponents: { [key: string]: () => React.ReactNode } = {
  leaf: LeafIcon,
  link: LinkIcon,
  globe: GlobeIcon,
  heart: HeartIcon,
};

export default function SustainabilityPage() {
  const t = useTranslations("sustainability");

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
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 animate-on-scroll image-reveal">
          <div className="h-full w-full bg-gradient-to-br from-[#2A2118] via-[#3d3026] to-[#2A2118]"></div>
          <div className="absolute inset-0 bg-noise opacity-30"></div>
        </div>

        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 items-center">
          <div className="max-w-3xl text-white">
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              {t("hero.badge")}
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mt-6 max-w-2xl leading-relaxed animate-on-scroll text-reveal stagger-3">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-warm-white bg-noise"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair animate-on-scroll text-reveal stagger-1">
            {t("mission.title")}
          </h2>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-2">
            {t("mission.description")}
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("pillars.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("pillars.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillarKeys.map((key, index) => {
              const IconComponent = iconComponents[pillarIcons[index]];
              return (
                <div
                  key={key}
                  className={`bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:shadow-lg transition animate-on-scroll card-reveal stagger-${index + 1}`}
                >
                  <div className="w-16 h-16 bg-[#edd8cc] rounded-2xl flex items-center justify-center mb-6 text-[#df7a4c]">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2A2118] mb-3">
                    {t(`pillars.items.${key}.title`)}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {t(`pillars.items.${key}.description`)}
                  </p>
                  <ul className="space-y-3">
                    {[0, 1, 2, 3].map((pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-[#df7a4c]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#df7a4c]">
                          <CheckIcon />
                        </span>
                        <span className="text-sm text-neutral-600">
                          {t(`pillars.items.${key}.points.${pointIndex}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#2A2118]"></div>
        <div className="absolute inset-0 bg-noise opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              {t("commitments.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
              {t("commitments.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commitmentKeys.map((key, index) => (
              <div
                key={key}
                className={`text-center animate-on-scroll fade-in stagger-${index + 1}`}
              >
                <p className="text-5xl sm:text-6xl font-playfair font-bold text-[#df7a4c]">
                  {t(`commitments.items.${key}.stat`)}
                </p>
                <p className="text-xl font-semibold text-white mt-2">
                  {t(`commitments.items.${key}.label`)}
                </p>
                <p className="text-neutral-400 mt-2 text-sm">
                  {t(`commitments.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-lines"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("future.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("future.title")}
            </h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-3">
              {t("future.description")}
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {initiativeKeys.map((key, index) => (
              <div
                key={key}
                className={`bg-white/80 backdrop-blur rounded-xl p-6 animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <h3 className="font-semibold text-[#2A2118] mb-2">
                  {t(`future.initiatives.${key}.title`)}
                </h3>
                <p className="text-sm text-neutral-600">
                  {t(`future.initiatives.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#df7a4c] to-[#c86a3f] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
            {t("cta.description")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
            <a
              href="mailto:ga@omniingredients.com"
              className="px-8 py-4 bg-white text-[#df7a4c] font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
            >
              {t("cta.getInTouch")}
            </a>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition transform hover:scale-105"
            >
              {t("cta.learnAboutUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
