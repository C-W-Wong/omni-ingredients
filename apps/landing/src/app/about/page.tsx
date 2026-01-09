"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  useEffect(() => {
    // Small delay to ensure DOM is ready after hydration
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

  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 animate-on-scroll image-reveal">
          <div className="h-full w-full bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-6 items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">About Us</p>
            <h1 className="mt-3 text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">Omni Ingredients</h1>
            <p className="text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">Your trusted B2B partner for high-quality vitamins, minerals, amino acids, and specialty nutrients.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll slide-right stagger-1">
            <h2 className="text-3xl md:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-1">Our Mission</h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-2">
              At Omni Ingredients, we are committed to being the premier supplier of nutraceutical ingredients across North America. Our focus is on building lasting partnerships through reliable service, competitive pricing, and uncompromising quality.
            </p>
            <p className="mt-4 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-3">
              We serve manufacturers and brands across the U.S., Canada, and Mexico, providing the essential building blocks for health and wellness products that improve lives.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-on-scroll scale-in stagger-2">
            <div className="bg-orange-50 rounded-2xl p-6 animate-on-scroll card-reveal stagger-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Quality Assured</h3>
              <p className="mt-2 text-sm text-neutral-600">cGMP compliant manufacturing standards</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 animate-on-scroll card-reveal stagger-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Global Reach</h3>
              <p className="mt-2 text-sm text-neutral-600">Serving U.S., Canada, and Mexico</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 animate-on-scroll card-reveal stagger-5">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Partnership Focus</h3>
              <p className="mt-2 text-sm text-neutral-600">Long-term client relationships</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 animate-on-scroll card-reveal stagger-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">High Volume</h3>
              <p className="mt-2 text-sm text-neutral-600">Stable, reliable supply chain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commodity Trade Division Section */}
      <section className="bg-neutral-50 border-y border-neutral-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header with Orange Accent */}
          <div className="flex items-center gap-4 mb-8 animate-on-scroll slide-right stagger-1">
            <div className="w-1.5 h-12 bg-orange-500 rounded-full"></div>
            <div>
              <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-neutral-900">
                Omni Ingredients — Commodity Trade Division
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mb-12 animate-on-scroll text-reveal stagger-2">
            <p className="text-lg text-neutral-700 leading-relaxed">
              <span className="font-semibold text-orange-600">Focus on stable, high-volume ingredient trade:</span> Amino acids, vitamins, minerals, botanical powders, and extracts.
            </p>
            <p className="mt-3 text-neutral-600">
              Provides core revenue and maintains client relationships across the U.S., Canada, and Mexico.
            </p>
          </div>

          {/* Team Photos Grid */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 animate-on-scroll text-reveal stagger-3">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-4">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Team Meeting</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-5">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Business Team</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-6">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Office</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operations Photos Grid */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 animate-on-scroll text-reveal stagger-1">Our Operations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-2">
                <Image
                  src="/assets/omni-warehouse.png"
                  alt="Omni Ingredients Warehouse"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-3">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Delivery Fleet</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-4">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Quality Control</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-5">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Inventory</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-6">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Logistics</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden animate-on-scroll card-reveal stagger-7">
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Distribution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-neutral-900 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">Partner With Us</h2>
            <p className="mt-4 text-lg opacity-90 animate-on-scroll text-reveal stagger-2">Ready to discuss your ingredient needs? Get in touch with our team for competitive pricing and reliable supply.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
              <a href="mailto:ga@omniingredients.com" className="px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition transform hover:scale-105">
                Contact Us
              </a>
              <a href={shopUrl} className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 backdrop-blur transition transform hover:scale-105">
                View Products
              </a>
            </div>

            {/* Business Hours */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80 animate-on-scroll text-reveal stagger-4">
                <strong>Business Hours (EST):</strong> Monday – Friday, 08:30 am – 05:00 pm
              </p>
              <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-5">
                <strong>Location:</strong> Ontario, CA 91761, USA
              </p>
              <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-6">
                <strong>Email:</strong> <a href="mailto:ga@omniingredients.com" className="hover:opacity-100 underline">ga@omniingredients.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
