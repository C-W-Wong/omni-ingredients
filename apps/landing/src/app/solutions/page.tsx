"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  categories,
  premixSolutions,
  qualityPillars,
  customerTypes,
  heroImages,
} from "@/data/content";

// Additional ingredient types for detailed view
const ingredientTypes = [
  {
    category: "Vitamins",
    items: ["Vitamin A", "B-Complex", "Vitamin C", "Vitamin D3", "Vitamin E", "Vitamin K2"],
  },
  {
    category: "Minerals",
    items: ["Calcium", "Magnesium", "Zinc", "Iron", "Selenium", "Chromium"],
  },
  {
    category: "Amino Acids",
    items: ["L-Glutamine", "L-Arginine", "L-Carnitine", "BCAAs", "Creatine", "Taurine"],
  },
  {
    category: "Botanical Extracts",
    items: ["Ashwagandha", "Turmeric", "Green Tea", "Ginseng", "Elderberry", "Milk Thistle"],
  },
  {
    category: "Specialty Nutrients",
    items: ["CoQ10", "Omega-3s", "Probiotics", "Enzymes", "Collagen", "Hyaluronic Acid"],
  },
];

// Services offered
const services = [
  {
    title: "Single Ingredient Sourcing",
    description: "Access our extensive network of qualified manufacturers for individual raw materials.",
    icon: "package",
  },
  {
    title: "Custom Premix Development",
    description: "Pre-blended formulations tailored to your product specifications and market needs.",
    icon: "beaker",
  },
  {
    title: "Supply Chain Management",
    description: "End-to-end logistics from international sourcing to U.S. delivery.",
    icon: "truck",
  },
  {
    title: "Quality Documentation",
    description: "Complete COAs, specifications, and regulatory documentation for every batch.",
    icon: "document",
  },
  {
    title: "Technical Support",
    description: "Formulation guidance and application expertise from our technical team.",
    icon: "support",
  },
  {
    title: "Inventory Programs",
    description: "Consignment and scheduled delivery programs for predictable supply.",
    icon: "calendar",
  },
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

export default function SolutionsPage() {
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
            src={heroImages.ingredients}
            alt="Nutraceutical ingredient solutions"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A2118]/60 via-[#2A2118]/70 to-[#2A2118]/90"></div>
        </div>

        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 items-center">
          <div className="max-w-3xl text-white">
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              Our Solutions
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
              Comprehensive Ingredient Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mt-6 max-w-2xl leading-relaxed animate-on-scroll text-reveal stagger-3">
              From single raw materials to custom premixes, we provide the building blocks for your health and wellness products.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          FUNCTIONAL CATEGORIES
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-warm-white bg-noise"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              By Function
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Functional Categories
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Our ingredients are organized by health benefit, making it easy to find the right solutions for your formulations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className={`group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 animate-on-scroll card-reveal stagger-${(index % 6) + 1}`}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2118]/90 via-[#2A2118]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">{category.description}</p>
                  <a
                    href="mailto:ga@omniingredients.com"
                    className="mt-4 inline-flex items-center gap-2 text-[#ffa087] text-sm font-medium group-hover:gap-3 transition-all"
                  >
                    Request Info
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          INGREDIENT TYPES
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-lines"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              By Type
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Ingredient Types
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Browse our extensive catalog of vitamins, minerals, amino acids, botanicals, and specialty nutrients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ingredientTypes.map((type, index) => (
              <div
                key={type.category}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition animate-on-scroll card-reveal stagger-${(index % 5) + 1}`}
              >
                <h3 className="font-semibold text-lg text-[#2A2118] mb-4">{type.category}</h3>
                <ul className="space-y-2">
                  {type.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#df7a4c]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:ga@omniingredients.com"
                  className="mt-4 inline-flex items-center gap-1 text-[#df7a4c] text-sm font-medium hover:gap-2 transition-all"
                >
                  View All
                  <ArrowRightIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          PREMIX SOLUTIONS
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages.lab}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2A2118]/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
                Beyond Single Ingredients
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
                Custom Premix Solutions
              </h2>
              <p className="mt-6 text-neutral-300 text-lg leading-relaxed animate-on-scroll text-reveal stagger-3">
                Our premix capabilities go beyond simple blending. We work with you to develop optimized formulations that meet your specific requirements.
              </p>

              <div className="mt-8 space-y-4">
                {premixSolutions.map((premix, index) => (
                  <div
                    key={premix.title}
                    className={`flex items-start gap-4 animate-on-scroll fade-in stagger-${index + 4}`}
                  >
                    <div className="w-8 h-8 bg-[#df7a4c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                      <CheckIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{premix.title}</h4>
                      <p className="text-sm text-neutral-400 mt-1">{premix.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="mailto:ga@omniingredients.com"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#df7a4c] text-white font-medium rounded-lg hover:bg-[#c86a3f] transition animate-on-scroll scale-in stagger-7"
              >
                Discuss Your Formulation
                <ArrowRightIcon />
              </a>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 animate-on-scroll card-reveal stagger-1">
                  <p className="text-4xl font-playfair font-bold text-white">500+</p>
                  <p className="text-neutral-400 text-sm mt-1">Single Ingredients</p>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 animate-on-scroll card-reveal stagger-2">
                  <p className="text-4xl font-playfair font-bold text-white">Custom</p>
                  <p className="text-neutral-400 text-sm mt-1">Premix Blends</p>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 animate-on-scroll card-reveal stagger-3">
                  <p className="text-4xl font-playfair font-bold text-white">Full</p>
                  <p className="text-neutral-400 text-sm mt-1">Documentation</p>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 animate-on-scroll card-reveal stagger-4">
                  <p className="text-4xl font-playfair font-bold text-white">24hr</p>
                  <p className="text-neutral-400 text-sm mt-1">Quote Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SERVICES
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-warm bg-noise"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              How We Help
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Our Services
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Beyond ingredients, we provide comprehensive support throughout your supply chain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll card-reveal stagger-${(index % 6) + 1}`}
              >
                <div className="w-12 h-12 bg-[#df7a4c]/10 rounded-xl flex items-center justify-center text-[#df7a4c] mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {service.icon === "package" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    )}
                    {service.icon === "beaker" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    )}
                    {service.icon === "truck" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    )}
                    {service.icon === "document" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {service.icon === "support" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                    {service.icon === "calendar" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#2A2118]">{service.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          QUALITY ASSURANCE
          ======================================== */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              Quality First
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Our Quality Standards
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Every ingredient we supply meets rigorous quality and compliance standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#edd8cc] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {pillar.icon === "shield" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {pillar.icon === "document" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {pillar.icon === "check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    )}
                    {pillar.icon === "compliance" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="font-semibold text-[#2A2118] text-lg">{pillar.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WHO WE SERVE
          ======================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-dots"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              Our Customers
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Industries We Serve
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              We work with companies of all sizes across the health and wellness industry.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {customerTypes.map((type, index) => (
              <span
                key={type}
                className={`px-5 py-3 bg-white/80 backdrop-blur border border-neutral-200 rounded-full text-sm sm:text-base font-medium text-[#2A2118] shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 animate-on-scroll blur-slide stagger-${(index % 4) + 1}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="relative bg-gradient-to-br from-[#df7a4c] to-[#c86a3f] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
            Tell us about your ingredient needs and we'll respond with a quote within 24 hours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
            <a
              href="mailto:ga@omniingredients.com"
              className="px-8 py-4 bg-white text-[#df7a4c] font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
            >
              Request a Quote
            </a>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition transform hover:scale-105"
            >
              Learn About Us
            </Link>
          </div>

          <p className="mt-8 text-white/80 text-sm animate-on-scroll fade-in stagger-4">
            <strong className="text-white">Email:</strong>{" "}
            <a href="mailto:ga@omniingredients.com" className="hover:text-white underline">
              ga@omniingredients.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
