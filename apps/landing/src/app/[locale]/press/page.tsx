"use client";

import { useEffect } from "react";
import Link from "next/link";

const companyFacts = [
  { stat: "15+", label: "Years Experience", description: "In the nutraceutical industry" },
  { stat: "50+", label: "Global Partners", description: "Trusted supplier network" },
  { stat: "3", label: "U.S. Warehouses", description: "Strategic distribution locations" },
  { stat: "500+", label: "SKUs", description: "Functional ingredients available" },
];

const recentNews = [
  {
    date: "January 2025",
    title: "Omni Ingredients Expands U.S. Warehouse Network",
    excerpt: "New distribution center in New Jersey enhances East Coast delivery capabilities.",
  },
  {
    date: "December 2024",
    title: "Partnership Announcement: Premium Botanical Extracts",
    excerpt: "Exclusive North American distribution agreement for high-quality botanical ingredients.",
  },
  {
    date: "November 2024",
    title: "Sustainability Initiative Launch",
    excerpt: "Commitment to carbon-neutral operations by 2030 with comprehensive supply chain improvements.",
  },
];

const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function PressPage() {
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
            Newsroom
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
            Press & Media
          </h1>
          <p className="text-neutral-600 mt-6 text-lg max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
            News, announcements, and resources for media professionals covering the nutraceutical industry.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
                About Us
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
                Company Overview
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600 animate-on-scroll fade-in stagger-3">
                <p>
                  Omni Ingredients is a U.S.-based ingredient solutions company specializing in the sourcing, distribution, and commercialization of high-quality functional ingredients for the nutraceutical, food & beverage, and health industries.
                </p>
                <p>
                  With a strong cross-border supply chain foundation and U.S.-based operations, we connect global manufacturers with North American customers, providing reliable, compliant, and scalable ingredient solutions.
                </p>
                <p>
                  Our parent group&apos;s R&amp;D capabilities and technical expertise set us apart from traditional trading companies, enabling us to offer formulation guidance and innovative solutions to our partners.
                </p>
              </div>
            </div>

            {/* Media Contact Card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 animate-on-scroll slide-left stagger-2">
              <h3 className="text-xl font-semibold text-[#2A2118] mb-6">Media Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#edd8cc] rounded-lg flex items-center justify-center text-[#df7a4c]">
                    <MailIcon />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <a href="mailto:ga@omniingredients.com" className="text-[#df7a4c] hover:underline font-medium">
                      ga@omniingredients.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#edd8cc] rounded-lg flex items-center justify-center text-[#df7a4c]">
                    <PhoneIcon />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Business Hours (EST)</p>
                    <p className="font-medium text-[#2A2118]">Monday – Friday, 08:30 am – 05:00 pm</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  For press inquiries, interview requests, or media kit access, please contact our team directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#2A2118]"></div>
        <div className="absolute inset-0 bg-noise opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#ffa087] font-medium animate-on-scroll text-reveal stagger-1">
              At a Glance
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-playfair text-white animate-on-scroll text-reveal stagger-2">
              Company Facts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`text-center animate-on-scroll fade-in stagger-${index + 1}`}
              >
                <p className="text-4xl sm:text-5xl font-playfair font-bold text-[#df7a4c]">
                  {fact.stat}
                </p>
                <p className="text-lg font-semibold text-white mt-2">{fact.label}</p>
                <p className="text-neutral-400 mt-1 text-sm">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              Resources
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Media Downloads
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Company Logo Pack", format: "ZIP", size: "2.4 MB" },
              { name: "Media Kit", format: "PDF", size: "1.8 MB" },
              { name: "Company Fact Sheet", format: "PDF", size: "450 KB" },
            ].map((item, index) => (
              <div
                key={item.name}
                className={`bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition group cursor-pointer animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-[#edd8cc] rounded-lg flex items-center justify-center text-[#df7a4c] group-hover:bg-[#df7a4c] group-hover:text-white transition">
                    <DownloadIcon />
                  </div>
                  <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded">
                    {item.format}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-[#2A2118]">{item.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{item.size}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-500 mt-8 animate-on-scroll fade-in stagger-4">
            Contact us for high-resolution images and additional materials.
          </p>
        </div>
      </section>

      {/* Recent News */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-[#edd8cc] bg-lines"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#df7a4c] font-medium animate-on-scroll text-reveal stagger-1">
              Latest Updates
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-playfair animate-on-scroll text-reveal stagger-2">
              Recent News
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((news, index) => (
              <article
                key={news.title}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <CalendarIcon />
                  <time>{news.date}</time>
                </div>
                <h3 className="font-semibold text-[#2A2118] text-lg leading-snug">
                  {news.title}
                </h3>
                <p className="text-neutral-600 text-sm mt-3">{news.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#df7a4c] to-[#c86a3f] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
            Have questions or need additional information? Our team is ready to assist with your media inquiries.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
            <a
              href="mailto:ga@omniingredients.com"
              className="px-8 py-4 bg-white text-[#df7a4c] font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
            >
              Contact Media Relations
            </a>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition transform hover:scale-105"
            >
              About Omni Ingredients
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
