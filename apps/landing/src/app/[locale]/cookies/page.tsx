"use client";

import { useEffect } from "react";
import Link from "next/link";

const cookieTypes = [
  {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.",
    examples: ["Session cookies", "Security cookies", "Load balancing cookies"],
  },
  {
    name: "Performance Cookies",
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.",
    examples: ["Analytics cookies", "Page load time tracking", "Error monitoring"],
  },
  {
    name: "Functional Cookies",
    description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
    examples: ["Language preferences", "Region settings", "Chat support"],
  },
  {
    name: "Marketing Cookies",
    description: "These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.",
    examples: ["Advertising cookies", "Social media cookies", "Retargeting cookies"],
  },
];

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-neutral-600 mt-6 animate-on-scroll text-reveal stagger-3">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Introduction */}
          <div className="prose prose-neutral max-w-none animate-on-scroll fade-in stagger-1">
            <p className="text-lg text-neutral-600 leading-relaxed">
              This Cookie Policy explains how Omni Ingredients uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
            </p>
          </div>

          {/* What Are Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-2">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              What Are Cookies?
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Omni Ingredients) are called &quot;first-party cookies.&quot; Cookies set by parties other than the website owner are called &quot;third-party cookies.&quot; Third-party cookies enable third-party features or functionality to be provided on or through the website.
              </p>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-6">
              Types of Cookies We Use
            </h2>
            <div className="grid gap-6">
              {cookieTypes.map((cookie, index) => (
                <div
                  key={cookie.name}
                  className={`bg-neutral-50 rounded-2xl p-6 border border-neutral-200 animate-on-scroll card-reveal stagger-${index + 1}`}
                >
                  <h3 className="text-lg font-semibold text-[#2A2118] mb-3">
                    {cookie.name}
                  </h3>
                  <p className="text-neutral-600 mb-4">{cookie.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((example) => (
                      <span
                        key={example}
                        className="text-xs bg-[#edd8cc] text-[#2A2118] px-3 py-1 rounded-full"
                      >
                        {example}
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
              How to Manage Cookies
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in the following ways:
              </p>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Browser Settings</h3>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
              </p>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 mt-4">
                <p className="font-medium text-[#2A2118] mb-3">Popular browser cookie settings:</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions
                  </li>
                </ul>
              </div>
              <h3 className="text-lg font-semibold text-[#2A2118] mt-6 mb-3">Opt-Out Links</h3>
              <p>
                Some third-party services provide opt-out mechanisms. For example, you can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="mt-12 animate-on-scroll fade-in stagger-5">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              Third-Party Cookies
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                We may use third-party services that set cookies on our website. These services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website traffic analysis and reporting</li>
                <li><strong>Social Media Platforms:</strong> For sharing functionality and embedded content</li>
                <li><strong>Customer Support Tools:</strong> For live chat and support features</li>
              </ul>
              <p className="mt-4">
                We do not control the cookies used by these third parties. Please review their respective privacy policies for more information about their cookie practices.
              </p>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-12 animate-on-scroll fade-in stagger-6">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              Updates to This Policy
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12 animate-on-scroll fade-in stagger-7">
            <h2 className="text-2xl font-playfair font-semibold text-[#2A2118] mb-4">
              Contact Information
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-600">
              <p className="mb-4">
                If you have questions about our use of cookies, please contact us:
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
