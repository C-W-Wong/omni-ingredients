"use client";

import { useEffect } from "react";
import Link from "next/link";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "use-of-services", title: "Use of Services" },
  { id: "orders-pricing", title: "Orders and Pricing" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsOfServicePage() {
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
            Terms of Service
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
              Welcome to Omni Ingredients. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. Please read them carefully.
            </p>
          </div>

          {/* Section 1 */}
          <div id="acceptance" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                By accessing and using the Omni Ingredients website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of our services following any changes constitutes acceptance of those changes. We encourage you to review these terms periodically.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="use-of-services" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-4">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              2. Use of Services
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services in any way that violates applicable laws or regulations</li>
                <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of our services</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Use any automated means to access our website without permission</li>
                <li>Transmit any malicious code, viruses, or harmful content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div id="orders-pricing" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-5">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              3. Orders and Pricing
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Order Acceptance</h3>
              <p className="mb-4">
                All orders are subject to acceptance by Omni Ingredients. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.
              </p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Pricing</h3>
              <p className="mb-4">
                Prices are subject to change without notice. We make every effort to ensure pricing accuracy, but errors may occur. In the event of a pricing error, we will notify you and provide the option to proceed with the corrected price or cancel the order.
              </p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Payment Terms</h3>
              <p>
                Payment terms are established on a per-customer basis. Standard terms may include net 30 days for approved accounts. We reserve the right to modify payment terms at our discretion.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div id="intellectual-property" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-6">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              4. Intellectual Property
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Omni Ingredients or its content suppliers and is protected by intellectual property laws.
              </p>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reproduce, distribute, or display any content without prior written consent</li>
                <li>Modify or create derivative works based on our content</li>
                <li>Use our trademarks or logos without express permission</li>
                <li>Remove any copyright or proprietary notices from our materials</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div id="limitation-liability" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-7">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              5. Limitation of Liability
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                To the fullest extent permitted by law, Omni Ingredients shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
              </p>
              <p className="mb-4">
                Our total liability for any claim arising from these terms or our services shall not exceed the amount paid by you for the specific products or services giving rise to the claim.
              </p>
              <p>
                This limitation applies regardless of the legal theory upon which the claim is based, including negligence, breach of contract, or any other theory.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="governing-law" className="mt-12 scroll-mt-24 animate-on-scroll fade-in stagger-8">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              6. Governing Law
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Any dispute arising from these terms shall be resolved exclusively in the state or federal courts located in California. You consent to the personal jurisdiction of such courts.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div id="contact" className="mt-12 scroll-mt-24 animate-on-scroll fade-in">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              7. Contact Information
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
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
