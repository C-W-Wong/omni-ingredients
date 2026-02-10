"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { warehouseLocations, heroImages } from "@/data/content";

// Value keys for translations
const valueKeys = ["reliability", "transparency", "partnership", "quality"];
const valueIcons: Record<string, string> = {
  reliability: "shield",
  transparency: "eye",
  partnership: "handshake",
  quality: "check",
};

// Why choose us keys for translations
const whyChooseUsKeys = [
  "usOperations",
  "globalSourcing",
  "endToEndLogistics",
  "technicalExpertise",
  "complianceFocus",
  "scalableSolutions",
];

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export default function AboutPage() {
  const t = useTranslations("about");

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
      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 animate-on-scroll image-reveal">
          <img
            src={heroImages.team}
            alt="Omni Ingredients team"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A2118]/50 via-[#2A2118]/60 to-[#2A2118]/85"></div>
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

      {/* ========================================
          OUR STORY
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-warm-white bg-noise"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
                {t("story.badge")}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
                {t("story.title")}
              </h2>
              <p className="mt-6 text-neutral-600 text-lg leading-relaxed animate-on-scroll text-reveal stagger-3">
                {t("story.description1")}
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-4">
                {t("story.description2")}
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-5">
                {t("story.description3")}
              </p>
            </div>

            <div className="relative animate-on-scroll slide-right stagger-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImages.warehouse}
                  alt="Omni Ingredients warehouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#df7a4c] text-white p-6 rounded-xl shadow-xl animate-on-scroll scale-in stagger-4">
                <p className="text-3xl font-bold font-playfair">15+</p>
                <p className="text-sm opacity-90 mt-1">{t("story.experience")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          OUR VALUES
          ======================================== */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("values.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("values.title")}
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("values.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((key, index) => (
              <div
                key={key}
                className={`bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#edd8cc] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {valueIcons[key] === "shield" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {valueIcons[key] === "eye" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                    {valueIcons[key] === "handshake" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                    {valueIcons[key] === "check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#2A2118]">{t(`values.items.${key}.title`)}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{t(`values.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WHY CHOOSE US
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#2A2118]"></div>
        <div className="absolute inset-0 bg-noise opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              {t("whyChooseUs.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
              {t("whyChooseUs.title")}
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("whyChooseUs.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsKeys.map((key, index) => (
              <div
                key={key}
                className={`flex items-start gap-4 animate-on-scroll fade-in stagger-${(index % 6) + 1}`}
              >
                <div className="w-8 h-8 bg-[#df7a4c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">{t(`whyChooseUs.items.${key}.title`)}</h4>
                  <p className="text-sm text-neutral-400 mt-1">{t(`whyChooseUs.items.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WAREHOUSE NETWORK
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-lines"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("warehouse.badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("warehouse.title")}
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("warehouse.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {warehouseLocations.map((location, index) => (
              <div
                key={location.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#df7a4c]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[#df7a4c] text-sm font-medium">{t(`warehouse.locations.${location.id}.region`)}</p>
                <h3 className="text-xl font-semibold text-[#2A2118] mt-1">{t(`warehouse.locations.${location.id}.city`)}</h3>
                <p className="text-neutral-600 mt-3">{t(`warehouse.locations.${location.id}.description`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["reducedTransit", "localInventory", "reliableDelivery", "scalableGrowth"].map((benefitKey, index) => (
              <div
                key={benefitKey}
                className={`flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl p-4 animate-on-scroll fade-in stagger-${index + 1}`}
              >
                <div className="w-10 h-10 bg-[#edd8cc] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#2A2118] font-medium">{t(`warehouse.benefits.${benefitKey}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CONTACT CTA
          ======================================== */}
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
              href="mailto:info@omniingredients.com"
              className="px-8 py-4 bg-white text-[#df7a4c] font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
            >
              {t("cta.contactUs")}
            </a>
            <Link
              href="/solutions"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition transform hover:scale-105"
            >
              {t("cta.viewSolutions")}
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80 animate-on-scroll text-reveal stagger-4">
              <strong className="text-white">{t("cta.businessHours")}</strong> Monday – Friday, 08:30 am – 05:00 pm PST
            </p>
            <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-5">
              <strong className="text-white">{t("cta.location")}</strong> 2121 Maple Privado, Ontario, CA 91761, USA
            </p>
            <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-6">
              <strong className="text-white">{t("cta.email")}</strong>{" "}
              <a href="mailto:info@omniingredients.com" className="hover:text-white underline">
                info@omniingredients.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
