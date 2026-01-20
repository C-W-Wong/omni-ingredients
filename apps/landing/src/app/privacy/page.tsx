"use client";

import { useEffect } from "react";
import Link from "next/link";

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "information-sharing", title: "Information Sharing" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights" },
  { id: "contact", title: "Contact Information" },
];

export default function PrivacyPolicyPage() {
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
            Legal
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl tracking-tight font-playfair leading-[1.1] animate-on-scroll text-reveal stagger-2">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 mt-6 animate-on-scroll text-reveal stagger-3">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Table of Contents */}
          <div className="mb-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 animate-on-scroll fade-in stagger-1">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-neutral-600 hover:text-[#df7a4c] transition text-sm"
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Introduction */}
          <div className="prose prose-neutral max-w-none animate-on-scroll fade-in stagger-2">
            <p className="text-lg text-neutral-600 leading-relaxed">
              At Omni Ingredients, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
            </p>
          </div>

          {/* Section 1 */}
          <div id="information-we-collect" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              1. Information We Collect
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">We may collect the following types of information:</p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number, and company name</li>
                <li>Business address and billing information</li>
                <li>Information provided when you request quotes or samples</li>
                <li>Communication records when you contact us</li>
              </ul>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div id="how-we-use-information" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-4">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              2. How We Use Information
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders and requests</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send relevant product information and industry updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraudulent transactions and protect our business</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div id="information-sharing" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-5">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              3. Information Sharing
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our website, conducting business, or servicing you</li>
                <li><strong>Business Partners:</strong> Trusted partners involved in fulfilling your orders or providing services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div id="data-security" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-6">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              4. Data Security
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data during transmission</li>
                <li>Secure servers and firewalls</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls limiting who can view your information</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div id="your-rights" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-7">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              5. Your Rights
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information below.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="contact" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-8">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              6. Contact Information
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 mt-4">
                <p className="font-semibold text-[#2A2118]">Omni Ingredients</p>
                <p className="mt-2">Ontario, CA 91761, USA</p>
                <p className="mt-1">
                  Email:{" "}
                  <a href="mailto:ga@omniingredients.com" className="text-[#df7a4c] hover:underline">
                    ga@omniingredients.com
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
              &larr; Back to Home
            </Link>
            <a
              href="#"
              className="text-neutral-500 hover:text-neutral-700 text-sm"
            >
              Back to top &uarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
