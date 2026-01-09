"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      inquiryType: "general",
      message: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "quote", label: "Request a Quote" },
    { value: "product", label: "Product Information" },
    { value: "partnership", label: "Partnership Opportunities" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 animate-on-scroll image-reveal">
          <div className="h-full w-full bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-6 items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">
              Get in Touch
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
              Contact Us
            </h1>
            <p className="text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">
              Ready to discuss your ingredient needs? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form - Left Column (3/5) */}
          <div className="lg:col-span-3">
            <div className="animate-on-scroll card-reveal stagger-1">
              <h2 className="text-2xl md:text-3xl tracking-tight font-semibold mb-2">
                Send us a message
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we&apos;ll get back to you within
                24-48 business hours.
              </p>

              {isSubmitted ? (
                /* Success State */
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700 mb-6">
                    Thank you for contacting us. We&apos;ll respond within 24-48
                    business hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`w-full px-4 py-3 rounded-lg bg-white border ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-neutral-200 focus:ring-amber-500"
                        } text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                        className={`w-full px-4 py-3 rounded-lg bg-white border ${
                          errors.company
                            ? "border-red-500 focus:ring-red-500"
                            : "border-neutral-200 focus:ring-amber-500"
                        } text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 rounded-lg bg-white border ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-neutral-200 focus:ring-amber-500"
                        } text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Phone Number{" "}
                        <span className="text-neutral-400">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your ingredient needs, quantities, and any specific requirements..."
                      className={`w-full px-4 py-3 rounded-lg bg-white border ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-neutral-200 focus:ring-amber-500"
                      } text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
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
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Cards - Right Column (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Card */}
            <div className="animate-on-scroll scale-in stagger-2 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
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
                  className="text-orange-600"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
              <a
                href="mailto:ga@omniingredients.com"
                className="text-orange-600 hover:text-orange-700 transition"
              >
                ga@omniingredients.com
              </a>
            </div>

            {/* Location Card */}
            <div className="animate-on-scroll scale-in stagger-3 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
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
                  className="text-orange-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Location</h3>
              <p className="text-neutral-600">Ontario, CA 91761</p>
              <p className="text-neutral-600">United States</p>
            </div>

            {/* Hours Card */}
            <div className="animate-on-scroll scale-in stagger-4 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
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
                  className="text-orange-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">
                Business Hours
              </h3>
              <p className="text-neutral-600">Monday – Friday</p>
              <p className="text-neutral-600">08:30 am – 05:00 pm (EST)</p>
            </div>

            {/* Response Time Card */}
            <div className="animate-on-scroll scale-in stagger-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
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
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Quick Response</h3>
              <p className="text-white/90">
                We typically respond to all inquiries within 24-48 business
                hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-neutral-50 border-y border-neutral-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll slide-right stagger-1">
              <h2 className="text-2xl md:text-3xl tracking-tight font-semibold mb-4">
                Our Headquarters
              </h2>
              <p className="text-neutral-600 mb-6">
                Strategically located in Southern California, our headquarters
                enables efficient distribution across North America with access
                to major logistics corridors.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
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
                    className="text-orange-500 mt-0.5 flex-shrink-0"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">Address</p>
                    <p className="text-neutral-600">Ontario, CA 91761, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
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
                    className="text-orange-500 mt-0.5 flex-shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">Email</p>
                    <a
                      href="mailto:ga@omniingredients.com"
                      className="text-orange-600 hover:text-orange-700 transition"
                    >
                      ga@omniingredients.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="animate-on-scroll scale-in stagger-2">
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-400 mx-auto mb-3"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="text-neutral-500 font-medium">
                      Ontario, California
                    </p>
                    <p className="text-neutral-400 text-sm">
                      Southern California Distribution Hub
                    </p>
                  </div>
                </div>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%">
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-neutral-300"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
              Ready to Partner?
            </h2>
            <p className="mt-4 text-lg text-neutral-300 animate-on-scroll text-reveal stagger-2">
              Explore our extensive catalog of nutraceutical ingredients or
              request a custom quote for your specific needs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll scale-in stagger-3">
              <Link
                href="/#categories"
                className="px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition transform hover:scale-105"
              >
                View Products
              </Link>
              <a
                href={shopUrl}
                className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 backdrop-blur transition transform hover:scale-105"
              >
                Visit Shop
              </a>
            </div>

            <p className="mt-8 text-sm text-neutral-400 animate-on-scroll text-reveal stagger-4">
              Serving North America since 2010 • 500+ Products • cGMP Compliant
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
