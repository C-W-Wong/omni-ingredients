"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { warehouseLocations, heroImages } from "@/data/content";

// Company values
const values = [
  {
    title: "Reliability",
    description: "Consistent supply and predictable lead times you can plan around.",
    icon: "shield",
  },
  {
    title: "Transparency",
    description: "Clear communication, honest timelines, and complete documentation.",
    icon: "eye",
  },
  {
    title: "Partnership",
    description: "Long-term relationships built on mutual success and trust.",
    icon: "handshake",
  },
  {
    title: "Quality",
    description: "Rigorous standards and qualified suppliers, no exceptions.",
    icon: "check",
  },
];

// Why choose us points
const whyChooseUs = [
  {
    title: "U.S.-Based Operations",
    description: "Local warehousing, domestic customer service, and faster response times.",
  },
  {
    title: "Global Sourcing Network",
    description: "Established relationships with qualified manufacturers worldwide.",
  },
  {
    title: "End-to-End Logistics",
    description: "We handle international trade complexities so you don't have to.",
  },
  {
    title: "Technical Expertise",
    description: "Formulation guidance backed by our parent group's R&D capabilities.",
  },
  {
    title: "Compliance Focus",
    description: "Deep understanding of U.S. regulatory requirements and documentation.",
  },
  {
    title: "Scalable Solutions",
    description: "From samples to commercial volumes, we grow with your needs.",
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

export default function AboutPage() {
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
              About Us
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
              Omni Ingredients
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mt-6 max-w-2xl leading-relaxed animate-on-scroll text-reveal stagger-3">
              Your trusted B2B partner for high-quality nutraceutical ingredients. U.S.-based operations with global sourcing expertise.
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
                Our Story
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
                Connecting Global Ingredients to North American Markets
              </h2>
              <p className="mt-6 text-neutral-600 text-lg leading-relaxed animate-on-scroll text-reveal stagger-3">
                Omni Ingredients is a U.S.-based ingredient solutions company specializing in the sourcing, distribution, and commercialization of high-quality functional ingredients for the nutraceutical, food & beverage, and health industries.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-4">
                Built on a strong cross-border supply chain foundation, we connect global manufacturers with North American customers, providing reliable, compliant, and scalable ingredient solutions.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-5">
                Our parent group brings R&D capabilities and technical depth that sets us apart from traditional trading companies. We're not just moving products – we're building partnerships that drive innovation in health and wellness.
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
                <p className="text-sm opacity-90 mt-1">Years Experience</p>
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
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Our Values
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              These principles guide every partnership and decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#edd8cc] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {value.icon === "shield" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {value.icon === "eye" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                    {value.icon === "handshake" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                    {value.icon === "check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#2A2118]">{value.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{value.description}</p>
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
              The Omni Difference
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
              Why Choose Us
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              We combine the best of global sourcing with local service and support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 animate-on-scroll fade-in stagger-${(index % 6) + 1}`}
              >
                <div className="w-8 h-8 bg-[#df7a4c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                  <p className="text-sm text-neutral-400 mt-1">{item.description}</p>
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
              Logistics
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Nationwide Warehousing Network
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Strategically positioned warehouses ensure fast delivery, stable inventory, and supply chain resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {warehouseLocations.map((location, index) => (
              <div
                key={location.city}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-[#df7a4c]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[#df7a4c] text-sm font-medium">{location.region}</p>
                <h3 className="text-xl font-semibold text-[#2A2118] mt-1">{location.city}</h3>
                <p className="text-neutral-600 mt-3">{location.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Reduced Transit Time", icon: "clock" },
              { label: "Local Inventory", icon: "box" },
              { label: "Reliable Delivery", icon: "truck" },
              { label: "Scalable Growth", icon: "chart" },
            ].map((benefit, index) => (
              <div
                key={benefit.label}
                className={`flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl p-4 animate-on-scroll fade-in stagger-${index + 1}`}
              >
                <div className="w-10 h-10 bg-[#edd8cc] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#df7a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#2A2118] font-medium">{benefit.label}</span>
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
            Partner With Us
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
            Ready to discuss your ingredient needs? Get in touch with our team for competitive pricing and reliable supply.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
            <a
              href="mailto:ga@omniingredients.com"
              className="px-8 py-4 bg-white text-[#df7a4c] font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
            >
              Contact Us
            </a>
            <Link
              href="/solutions"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition transform hover:scale-105"
            >
              View Solutions
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80 animate-on-scroll text-reveal stagger-4">
              <strong className="text-white">Business Hours (EST):</strong> Monday – Friday, 08:30 am – 05:00 pm
            </p>
            <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-5">
              <strong className="text-white">Location:</strong> Ontario, CA 91761, USA
            </p>
            <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-6">
              <strong className="text-white">Email:</strong>{" "}
              <a href="mailto:ga@omniingredients.com" className="hover:text-white underline">
                ga@omniingredients.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
