"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  categories,
  premixSolutions,
  qualityPillars,
  warehouseLocations,
  heroImages,
} from "@/data/content";

// Icon components
const AlertTriangleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShuffleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
    <path d="m18 2 4 4-4 4" />
    <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
    <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
    <path d="m18 14 4 4-4 4" />
  </svg>
);

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "alert-triangle":
      return <AlertTriangleIcon />;
    case "clock":
      return <ClockIcon />;
    case "shuffle":
      return <ShuffleIcon />;
    case "message-square":
      return <MessageIcon />;
    default:
      return <AlertTriangleIcon />;
  }
};

export default function HomePage() {
  const t = useTranslations("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Initialize hero content animation
    setTimeout(() => {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.classList.add("animate");
      }
    }, 300);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="antialiased selection:bg-[#2A2118] selection:text-white text-neutral-900">
      {/* ========================================
          1. HERO SECTION
          Full-bleed cinematic image with dramatic overlay
          ======================================== */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 animate-on-scroll image-reveal">
          <Image
            src="/assets/omni-hero.png"
            alt="Premium nutraceutical ingredients"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 hero-cinematic-overlay"></div>
        </div>

        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 items-end pb-16 sm:pb-24">
          <div className="max-w-3xl text-white hero-content hero-text-shadow">
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              {t("hero.tagline")}
            </p>
            <h1 className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mt-6 max-w-2xl leading-relaxed animate-on-scroll text-reveal stagger-3">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="mailto:ga@omniingredients.com"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#df7a4c] text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:bg-[#c86a3f] hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-on-scroll slide-left stagger-4"
              >
                {t("hero.cta.quote")}
                <ArrowRightIcon />
              </a>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 backdrop-blur transition transform hover:scale-105 animate-on-scroll slide-left stagger-5"
              >
                {t("hero.cta.solutions")}
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          2. TRUST BAR
          Key stats with floating images
          ======================================== */}
      <section className="bg-warm-white bg-noise border-b border-neutral-200">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="text-center animate-on-scroll blur-slide stagger-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#2A2118]">
                {t("trust.yearsExperience")}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                {t("trust.yearsExperienceLabel")}
              </p>
            </div>
            <div className="text-center animate-on-scroll blur-slide stagger-2">
              <p className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#2A2118]">
                {t("trust.productsDistributed")}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                {t("trust.productsDistributedLabel")}
              </p>
            </div>
            <div className="text-center animate-on-scroll blur-slide stagger-3">
              <p className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#2A2118]">
                {t("trust.satisfiedPartners")}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                {t("trust.satisfiedPartnersLabel")}
              </p>
            </div>
            <div className="text-center animate-on-scroll blur-slide stagger-4">
              <p className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#2A2118]">
                {t("trust.quoteResponse")}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                {t("trust.quoteResponseLabel")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          3. PAIN POINTS SECTION
          "We Understand Your Challenges"
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background: Soft radial gradient + geometric dot pattern */}
        <div className="absolute inset-0 bg-radial-warm bg-dots"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("painPoints.tagline")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("painPoints.title")}
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("painPoints.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#df7a4c]/10 rounded-xl flex items-center justify-center text-[#df7a4c] mb-5">
                  {getIconComponent(["alert-triangle", "clock", "shuffle", "message-square"][index])}
                </div>
                <h3 className="font-semibold text-lg text-[#2A2118]">
                  {t(`painPoints.items.${index}.title`)}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {t(`painPoints.items.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          4. SOLUTION SECTION
          "How Omni Simplifies Your Supply Chain"
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background: Large image at low opacity + gradient overlay */}
        <div className="absolute inset-0">
          <Image
            src={heroImages.logistics}
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
                {t("solutions.tagline")}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
                {t("solutions.title")}
              </h2>
              <p className="mt-6 text-neutral-600 text-lg leading-relaxed animate-on-scroll text-reveal stagger-3">
                {t("solutions.subtitle")}
              </p>

              <div className="mt-8 space-y-5">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 animate-on-scroll fade-in stagger-${index + 4}`}
                  >
                    <div className="w-8 h-8 bg-[#df7a4c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2A2118]">
                        {t(`solutions.items.${index}.title`)}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {t(`solutions.items.${index}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-on-scroll slide-right stagger-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src={heroImages.warehouse}
                  alt="Omni Ingredients warehouse operations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-[#2A2118] text-white p-6 rounded-xl shadow-xl animate-on-scroll scale-in stagger-6">
                <p className="text-3xl font-bold font-playfair">{t("solutions.floatingStat.value")}</p>
                <p className="text-sm opacity-80 mt-1">{t("solutions.floatingStat.label")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          5. ABOUT PREVIEW
          Dark section with company overview
          ======================================== */}
      <section className="relative bg-[#2A2118] text-white py-16 sm:py-24 overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-noise opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll slide-left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/assets/omni-partnership.jpeg"
                  alt="Omni Ingredients team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
                {t("aboutPreview.tagline")}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
                {t("aboutPreview.title")}
              </h2>
              <p className="mt-6 text-neutral-300 text-lg leading-relaxed animate-on-scroll text-reveal stagger-3">
                {t("aboutPreview.description1")}
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed animate-on-scroll text-reveal stagger-4">
                {t("aboutPreview.description2")}
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition animate-on-scroll scale-in stagger-5"
              >
                {t("aboutPreview.cta")}
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          6. PRODUCTS & SOLUTIONS PREVIEW
          Category cards with mesh gradient background
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background: Mesh gradient + noise */}
        <div className="absolute inset-0 bg-mesh-warm bg-noise"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("categories.tagline")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("categories.title")}
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("categories.subtitle")}
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <Image
                  src={category.image}
                  alt={t(`categories.items.${category.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2118]/90 via-[#2A2118]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg sm:text-xl font-semibold tracking-tight">
                    {t(`categories.items.${category.id}.title`)}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    {t(`categories.items.${category.id}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Premix Solutions Highlight */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl animate-on-scroll scale-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-[#2A2118]">
                  {t("categories.premix.title")}
                </h3>
                <p className="mt-2 text-neutral-600 max-w-xl">
                  {t("categories.premix.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {premixSolutions.map((premix) => (
                  <span
                    key={premix.id}
                    className="px-4 py-2 bg-[#edd8cc] text-[#2A2118] rounded-full text-sm font-medium"
                  >
                    {t(`categories.premix.items.${premix.id}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#df7a4c] text-white font-semibold rounded-full hover:bg-[#c86a3f] transition transform hover:scale-105 animate-on-scroll scale-in"
            >
              {t("categories.cta")}
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          7. QUALITY & COMPLIANCE
          Full-width image with dark overlay and pillars
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages.lab}
            alt="Quality control laboratory"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#2A2118]/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              {t("quality.tagline")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
              {t("quality.title")}
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("quality.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className={`bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#df7a4c]/20 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-[#ffa087]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {pillar.icon === "shield" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    )}
                    {pillar.icon === "document" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    )}
                    {pillar.icon === "check" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    )}
                    {pillar.icon === "compliance" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-lg">
                  {t(`quality.pillars.${pillar.id}.title`)}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                  {t(`quality.pillars.${pillar.id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          8. WHO WE SERVE
          Warm gradient with geometric line pattern
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background: Warm gradient + geometric lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-lines"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              {t("customers.tagline")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              {t("customers.title")}
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              {t("customers.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <span
                key={index}
                className={`px-5 py-3 bg-white/80 backdrop-blur border border-neutral-200 rounded-full text-sm sm:text-base font-medium text-[#2A2118] shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 animate-on-scroll blur-slide stagger-${(index % 4) + 1}`}
              >
                {t(`customers.types.${index}`)}
              </span>
            ))}
          </div>

          {/* Warehouse Network Preview */}
          <div className="mt-16 sm:mt-20">
            <h3 className="text-center text-xl sm:text-2xl font-playfair font-semibold mb-8 animate-on-scroll text-reveal">
              {t("warehouses.title")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {warehouseLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition animate-on-scroll card-reveal stagger-${index + 1}`}
                >
                  <div className="w-10 h-10 bg-[#df7a4c]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-[#df7a4c]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-[#df7a4c] text-sm font-medium">
                    {t(`warehouses.locations.${location.id}.region`)}
                  </p>
                  <h4 className="text-lg font-semibold text-[#2A2118] mt-1">
                    {t(`warehouses.locations.${location.id}.city`)}
                  </h4>
                  <p className="text-sm text-neutral-600 mt-2">
                    {t(`warehouses.locations.${location.id}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          9. CONTACT CTA
          Gradient with subtle noise
          ======================================== */}
      <section className="relative bg-gradient-to-br from-[#df7a4c] to-[#c86a3f] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll blur-slide">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              {t("cta.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a
              href="mailto:ga@omniingredients.com"
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition group animate-on-scroll card-reveal stagger-1"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("cta.manufacturers.title")}</h3>
              <p className="text-white/80 text-sm">
                {t("cta.manufacturers.description")}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                {t("cta.manufacturers.cta")}
                <ArrowRightIcon />
              </span>
            </a>

            <a
              href="mailto:ga@omniingredients.com"
              className="bg-white text-[#2A2118] rounded-2xl p-8 hover:shadow-xl transition group animate-on-scroll card-reveal stagger-2"
            >
              <div className="w-12 h-12 bg-[#edd8cc] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg
                  className="w-6 h-6 text-[#df7a4c]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("cta.brands.title")}</h3>
              <p className="text-neutral-600 text-sm">
                {t("cta.brands.description")}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#df7a4c] group-hover:gap-3 transition-all">
                {t("cta.brands.cta")}
                <ArrowRightIcon />
              </span>
            </a>
          </div>

          {/* Contact Details */}
          <div className="mt-12 text-center text-white/80 space-y-2 animate-on-scroll fade-in">
            <p>
              <strong className="text-white">{t("cta.contact.emailLabel")}</strong>{" "}
              <a
                href="mailto:ga@omniingredients.com"
                className="hover:text-white underline"
              >
                ga@omniingredients.com
              </a>
            </p>
            <p>
              <strong className="text-white">{t("cta.contact.hoursLabel")}</strong> {t("cta.contact.hours")}
            </p>
            <p>
              <strong className="text-white">{t("cta.contact.locationLabel")}</strong> {t("cta.contact.location")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
