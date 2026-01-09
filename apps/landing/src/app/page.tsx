"use client";

import { useEffect } from "react";
import Link from "next/link";

// Product categories for B2B
const categories = [
  {
    title: "Vitamins",
    description: "A, B-Complex, C, D, E, K and more",
    sub: "Essential Nutrients",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg",
  },
  {
    title: "Minerals",
    description: "Calcium, Magnesium, Zinc, Iron, Selenium",
    sub: "Mineral Solutions",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg",
  },
  {
    title: "Amino Acids",
    description: "Essential & Non-essential amino acids",
    sub: "Protein Building Blocks",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg",
  },
  {
    title: "Botanical Extracts",
    description: "Plant-based actives and phytonutrients",
    sub: "Natural Actives",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/66c7e7a4-0871-4ca4-9a13-ee7daeeeebe7_800w.jpg",
  },
  {
    title: "Specialty Nutrients",
    description: "CoQ10, Omega-3s, Probiotics, Enzymes",
    sub: "Advanced Ingredients",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f0c6ca8f-90a8-4036-bdd1-9adc2e917c7b_3840w.jpg",
  },
];

// Featured ingredients
const featuredIngredients = [
  {
    name: "Vitamin D3 (Cholecalciferol)",
    casNumber: "67-97-0",
    form: "Powder / Oil",
    moq: "25 kg",
    badge: "Popular",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg",
  },
  {
    name: "Magnesium Citrate",
    casNumber: "3344-18-1",
    form: "Powder",
    moq: "50 kg",
    badge: "In Stock",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg",
  },
  {
    name: "L-Glutamine",
    casNumber: "56-85-9",
    form: "Powder",
    moq: "25 kg",
    badge: "In Stock",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg",
  },
  {
    name: "Ashwagandha Extract",
    casNumber: "N/A",
    form: "Powder (5% Withanolides)",
    moq: "10 kg",
    badge: "Popular",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/66c7e7a4-0871-4ca4-9a13-ee7daeeeebe7_800w.jpg",
  },
];

// Warehouse locations
const warehouseLocations = [
  {
    city: "Ontario, California",
    region: "West Coast",
    description: "Distribution hub supporting imports through the Ports of Los Angeles and Long Beach",
    icon: "west",
  },
  {
    city: "Dallas, Texas",
    region: "Central U.S.",
    description: "Central logistics hub enabling efficient nationwide ground transportation",
    icon: "central",
  },
  {
    city: "Buford, Georgia",
    region: "East Coast",
    description: "East Coast and Southeast regional distribution center",
    icon: "east",
  },
];

// Quality pillars
const qualityPillars = [
  {
    title: "Supplier Qualification",
    description: "Long-term evaluation and vetting of manufacturing partners",
    icon: "shield",
  },
  {
    title: "Lot Traceability",
    description: "Complete documentation management for every batch",
    icon: "document",
  },
  {
    title: "COA Verification",
    description: "Independent analytical testing and certificate verification",
    icon: "check",
  },
  {
    title: "Compliance Focus",
    description: "Regulatory and quality risk awareness at every step",
    icon: "compliance",
  },
];

// Business scope items
const businessScope = [
  "Functional and nutritional ingredients",
  "Synthetic biology-derived and fermentation-based ingredients",
  "Amino acids, botanical extracts, antioxidants, and specialty actives",
  "Customized sourcing, commercialization, and supply chain solutions",
];

export default function HomePage() {
  useEffect(() => {
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

    // Initialize hero content animation
    setTimeout(() => {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.classList.add("animate");
      }
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="antialiased selection:bg-neutral-900 selection:text-white text-neutral-900 bg-white">
      {/* Hero Section - with background image */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 hero-parallax-bg animate-on-scroll image-reveal stagger-1">
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fbca9e2-8404-407b-b3f5-0d7031ed837c_1600w.jpg"
            alt="Premium nutraceutical ingredients"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 hero-gradient-overlay"></div>
        </div>
        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 items-center">
          <div className="max-w-xl text-white hero-content">
            <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">
              B2B Nutraceutical Partner
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
              Premium Nutraceutical Ingredients
            </h1>
            <p className="text-base/7 md:text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">
              Your trusted B2B partner for high-quality vitamins, minerals, amino acids, and specialty nutrients. Serving manufacturers across North America.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="mailto:ga@omniingredients.com"
                className="flex justify-center gap-2 items-center lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 overflow-hidden group text-lg text-neutral-900 bg-gray-50 max-w-fit border-gray-50 border-2 rounded-full py-2 px-4 shadow-xl backdrop-blur-md animate-on-scroll scale-in stagger-4"
              >
                Request Quote
                <svg className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-gray-800 group-hover:fill-gray-800"></path>
                </svg>
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:bg-white/10 backdrop-blur transition transform hover:scale-105 animate-on-scroll slide-left stagger-5"
              >
                View Catalog
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Playfair italic with floating images */}
      <section className="transition-colors duration-300 bg-neutral-50 border-neutral-200 border-t">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="text-center animate-on-scroll blur-slide">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <span className="animate-on-scroll slide-left stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">500+ products,</span>
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg" alt="Vitamins" className="animate-on-scroll rotate-in stagger-2 inline-block w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white object-cover ring-white ring-2 sm:ring-4 rounded-xl sm:rounded-2xl shadow-xl -rotate-6" />
              <span className="animate-on-scroll slide-right stagger-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">cGMP certified,</span>
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg" alt="Quality" className="animate-on-scroll rotate-in stagger-4 inline-block w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ring-white ring-2 sm:ring-4 bg-white object-cover rounded-xl sm:rounded-2xl shadow-xl rotate-6" />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg" alt="Ingredients" className="animate-on-scroll scale-up stagger-5 hidden sm:inline-block sm:h-10 sm:w-16 md:h-12 md:w-20 lg:h-14 lg:w-24 ring-white ring-2 sm:ring-4 object-cover rounded-xl sm:rounded-2xl shadow-xl -rotate-3" />
              <span className="animate-on-scroll slide-up stagger-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">trusted globally.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Expandable card panels */}
      <section id="categories" className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row mb-6 sm:mb-8 items-start sm:items-end justify-between gap-4 animate-on-scroll fade-in">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-1">Product Categories</h2>
            <p className="mt-2 text-neutral-600 animate-on-scroll text-reveal stagger-2">Comprehensive range for dietary supplements, functional foods, and pharmaceuticals.</p>
          </div>
          <a href="mailto:ga@omniingredients.com" className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-neutral-600 transition animate-on-scroll slide-left stagger-3">
            Request catalog
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>

        {/* Desktop horizontal scroll cards */}
        <div className="hidden md:flex gap-1.5 bg-white w-full h-[464px] max-w-none rounded-3xl p-6 shadow-2xl space-x-4 animate-on-scroll scale-in overflow-hidden">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`card-panel flex-1 overflow-hidden cursor-pointer transition-all duration-500 flex hover:flex-[4] group bg-gray-800 h-full rounded-3xl relative items-center justify-center animate-on-scroll blur-in stagger-${index + 1}`}
            >
              <img src={category.image} alt={category.title} className="card-image w-full h-full object-cover rounded-3xl" />
              <div className="card-overlay group-hover:opacity-100 transition-opacity duration-300 flex flex-col bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 rounded-3xl p-6 absolute inset-0 justify-end">
                <h3 className="text-white text-xl font-medium mb-1 tracking-tight">{category.title}</h3>
                <p className="text-gray-200 text-sm">{category.description}</p>
                <p className="text-gray-400 text-xs mt-2">{category.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile grid cards */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.slice(0, 4).map((category, index) => (
            <div
              key={category.title}
              className={`group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg animate-on-scroll card-reveal stagger-${index + 1}`}
            >
              <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-medium tracking-tight">{category.title}</h3>
                <p className="text-gray-200 text-sm mt-1">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Company Overview */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-on-scroll slide-left">
              <span className="text-sm uppercase tracking-widest text-amber-600 font-medium animate-on-scroll text-reveal stagger-1">About Us</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold font-playfair animate-on-scroll text-reveal stagger-2">
                Connecting Global Ingredients to North American Markets
              </h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-3">
                Omni Ingredients is a U.S.-based ingredient solutions company specializing in the sourcing, distribution, and commercialization of high-quality functional ingredients for the nutraceutical, food & beverage, and health industries.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-4">
                Built on a strong cross-border supply chain foundation, we connect global manufacturers with North American customers, providing reliable, compliant, and scalable ingredient solutions.
              </p>

              <div className="mt-8 animate-on-scroll fade-in stagger-5">
                <h3 className="font-semibold text-neutral-900 mb-4">Our Business Scope</h3>
                <ul className="space-y-3">
                  {businessScope.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-neutral-600">
                      <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative animate-on-scroll slide-right stagger-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/68d6b8da-d1ca-48b1-a6ff-a76d865061f1_3840w.jpg"
                  alt="Quality ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-6 rounded-xl shadow-xl animate-on-scroll scale-in stagger-4">
                <p className="text-3xl font-bold">2010</p>
                <p className="text-sm opacity-90">Serving North America</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Platform Section */}
      <section className="bg-neutral-50 border-y border-neutral-200 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll slide-left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-xl p-4 animate-on-scroll card-reveal stagger-1">
                    <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium text-sm">Product Specs</p>
                    <p className="text-xs text-neutral-500">Download instantly</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-4 animate-on-scroll card-reveal stagger-2">
                    <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="font-medium text-sm">COA Access</p>
                    <p className="text-xs text-neutral-500">Lot-level verification</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-4 animate-on-scroll card-reveal stagger-3">
                    <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="font-medium text-sm">Sample Orders</p>
                    <p className="text-xs text-neutral-500">Trial quantities</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-4 animate-on-scroll card-reveal stagger-4">
                    <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-medium text-sm">Online Ordering</p>
                    <p className="text-xs text-neutral-500">Automated processing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-on-scroll slide-right">
              <span className="text-sm uppercase tracking-widest text-amber-600 font-medium animate-on-scroll text-reveal stagger-1">B2B Platform</span>
              <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
                Digital Ordering & Sample Platform
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-3">
                Our in-house digital platform is designed to support R&D teams, formulators, and procurement professionals with streamlined ingredient evaluation and ordering.
              </p>

              <ul className="mt-6 space-y-3 animate-on-scroll fade-in stagger-4">
                <li className="flex items-center gap-3 text-neutral-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create verified B2B accounts
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Order trial materials and ingredient samples
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access and download product documentation
                </li>
              </ul>

              <a
                href="mailto:ga@omniingredients.com"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition transform hover:scale-105 animate-on-scroll scale-in stagger-5"
              >
                Request B2B Access
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warehousing Network */}
      <section className="bg-neutral-900 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll fade-in">
            <span className="text-sm uppercase tracking-widest text-amber-400 font-medium animate-on-scroll text-reveal stagger-1">Logistics</span>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
              Nationwide Warehousing Network
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Strategically positioned warehouses along major logistics corridors ensure fast delivery, stable inventory, and supply chain resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 animate-on-scroll scale-in">
            {warehouseLocations.map((location, index) => (
              <div
                key={location.city}
                className={`bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-amber-400 text-sm font-medium">{location.region}</p>
                <h3 className="text-xl font-semibold mt-1">{location.city}</h3>
                <p className="text-neutral-400 text-sm mt-3">{location.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "clock", label: "Reduced Transit Time" },
              { icon: "box", label: "Local Inventory" },
              { icon: "truck", label: "Reliable Delivery" },
              { icon: "chart", label: "Scalable Growth" },
            ].map((benefit, index) => (
              <div key={benefit.label} className={`flex items-center gap-3 animate-on-scroll fade-in stagger-${index + 1}`}>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-300">{benefit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner - Background image with glassmorphism */}
      <section className="max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6">
        <div className="animate-on-scroll image-reveal grid lg:grid-cols-2 gap-8 lg:gap-16 md:px-8 md:py-12 lg:px-20 lg:py-24 relative group cursor-pointer transition-all duration-500 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cab73078-80bd-4f30-8d0d-775e21f09e27_3840w.jpg)] bg-cover rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl items-center">
          <div className="rounded-2xl sm:rounded-3xl absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>
          <div className="group-hover:opacity-100 transition-all duration-500 opacity-0 rounded-2xl sm:rounded-3xl absolute inset-0" style={{ backdropFilter: 'blur(1px)' }}></div>

          <div className="relative z-10 animate-on-scroll slide-left stagger-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight animate-on-scroll text-reveal stagger-1">Why Partner With Omni Ingredients?</h2>
            <p className="leading-relaxed text-neutral-200 mt-4 sm:mt-6 text-sm sm:text-base animate-on-scroll text-reveal stagger-2">
              We combine international sourcing, local warehousing, and professional customer service to support your entire ingredient lifecycle.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: "shield", title: "Quality Assured", desc: "cGMP compliant with rigorous testing" },
                { icon: "box", title: "Reliable Supply", desc: "Consistent availability across catalog" },
                { icon: "globe", title: "Global Sourcing", desc: "Cross-border supply chain expertise" },
                { icon: "clock", title: "Fast Quotes", desc: "24-hour turnaround on requests" },
              ].map((item, index) => (
                <div key={item.title} className={`animate-on-scroll card-reveal stagger-${index + 3} transition-colors duration-300 transform hover:scale-105 bg-white/50 border-neutral-300 border rounded-xl p-4 sm:p-6 shadow-sm backdrop-blur-sm`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600">
                    {item.icon === 'shield' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></>}
                    {item.icon === 'box' && <><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>}
                    {item.icon === 'globe' && <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>}
                    {item.icon === 'clock' && <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
                  </svg>
                  <h4 className="mt-3 sm:mt-4 font-semibold tracking-tight text-neutral-900 text-sm sm:text-base">{item.title}</h4>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:flex hidden items-center justify-center animate-on-scroll slide-right stagger-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-on-scroll card-reveal stagger-3">
              <div className="text-center">
                <p className="text-6xl font-bold text-white">24hr</p>
                <p className="text-white/80 text-sm mt-2">Quote Turnaround</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-white/60 text-xs">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-white/60 text-xs">Warehouses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll fade-in">
            <span className="text-sm uppercase tracking-widest text-amber-600 font-medium animate-on-scroll text-reveal stagger-1">Standards</span>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
              Quality & Compliance
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-3">
              Quality and compliance are fundamental to our operations. We work closely with qualified partners and independent laboratories to ensure all products meet U.S. regulatory standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition animate-on-scroll card-reveal stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {pillar.icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {pillar.icon === 'document' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                    {pillar.icon === 'check' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
                    {pillar.icon === 'compliance' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ingredients */}
      <section className="border-y transition-colors duration-300 overflow-hidden bg-neutral-50 border-neutral-200" id="ingredients">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8 animate-on-scroll slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-1">Featured Ingredients</h2>
              <p className="mt-2 text-neutral-600 animate-on-scroll text-reveal stagger-2">Popular products from our catalog</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button className="inline-flex gap-2 hover:text-neutral-700 transition hover:bg-neutral-50 text-sm border-white border rounded-lg py-2 px-3 shadow-lg items-center animate-on-scroll scale-in stagger-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m15 18-6-6 6-6"></path></svg>
              </button>
              <button className="inline-flex gap-2 hover:text-neutral-700 transition hover:bg-neutral-50 text-sm border-white border rounded-lg py-2 px-3 shadow-lg items-center animate-on-scroll scale-in stagger-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {featuredIngredients.map((ingredient, index) => (
              <article key={ingredient.name} className={`animate-on-scroll card-reveal stagger-${index + 1} group rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl`}>
                <div className="relative">
                  <img src={ingredient.image} alt={ingredient.name} className={`aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110 animate-on-scroll image-reveal stagger-${index + 1}`} />
                  <span className="text-xs font-medium text-neutral-900 bg-white/80 border-neutral-200 border rounded-full py-1.5 px-3 absolute top-4 left-4 shadow-sm backdrop-blur-sm">{ingredient.badge}</span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg tracking-tight font-semibold text-neutral-900">{ingredient.name}</h3>
                  <div className="mt-3 space-y-1 text-sm text-neutral-600">
                    <p><span className="text-neutral-500">CAS:</span> {ingredient.casNumber}</p>
                    <p><span className="text-neutral-500">Form:</span> {ingredient.form}</p>
                    <p><span className="text-neutral-500">MOQ:</span> {ingredient.moq}</p>
                  </div>
                  <a
                    href="mailto:ga@omniingredients.com"
                    className="mt-4 block text-center py-2.5 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition"
                  >
                    Request Quote
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-on-scroll blur-slide">
            <span className="text-sm uppercase tracking-widest text-amber-600 font-medium animate-on-scroll text-reveal stagger-1">Our Vision</span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold font-playfair leading-tight animate-on-scroll text-reveal stagger-2">
              Evolving beyond traditional ingredient trading toward a{" "}
              <span className="text-amber-600">platform-driven</span> and{" "}
              <span className="text-amber-600">differentiated</span> ingredient model.
            </h2>
            <p className="mt-8 text-lg text-neutral-600 leading-relaxed animate-on-scroll text-reveal stagger-3">
              Our goal is to become a trusted ingredient partner that delivers not only products, but also reliability, expertise, and long-term value.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-on-scroll fade-in stagger-4">
              <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm">Technical barriers</span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm">Branded products</span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm">Deep partnerships</span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm">Sustainable growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-gradient-to-br from-amber-500 to-orange-500 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll blur-slide">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
              Partner With Us
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              Whether you are a manufacturer seeking access to the North American market or a brand looking for dependable ingredient solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a
              href="mailto:ga@omniingredients.com"
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition group animate-on-scroll card-reveal stagger-1"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Manufacturers</h3>
              <p className="text-white/80 text-sm">Seeking access to the North American market with reliable distribution and compliance support.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Get in touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            <a
              href="mailto:ga@omniingredients.com"
              className="bg-white text-neutral-900 rounded-2xl p-8 hover:shadow-xl transition group animate-on-scroll card-reveal stagger-2"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Brands</h3>
              <p className="text-neutral-600 text-sm">Looking for dependable ingredient solutions with transparent sourcing and technical support.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-600 group-hover:gap-3 transition-all">
                Request quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Fixed contrast */}
      <section className="bg-neutral-900 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">
              Stay Updated
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 animate-on-scroll text-reveal stagger-2">
              Get industry insights, new product announcements, and market updates delivered to your inbox.
            </p>

            <form className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto animate-on-scroll scale-in stagger-3">
              <input
                type="email"
                placeholder="Enter your business email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm text-neutral-400 animate-on-scroll fade-in stagger-4">
              Industry updates only. Unsubscribe anytime.
            </p>

            {/* Business Hours */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-neutral-300 animate-on-scroll text-reveal stagger-5">
                <strong className="text-white">Business Hours (EST):</strong> Monday – Friday, 08:30 am – 05:00 pm
              </p>
              <p className="text-sm text-neutral-300 mt-2 animate-on-scroll text-reveal stagger-6">
                <strong className="text-white">Location:</strong> Ontario, CA 91761, USA
              </p>
              <p className="text-sm text-neutral-300 mt-2 animate-on-scroll text-reveal stagger-7">
                <strong className="text-white">Email:</strong>{" "}
                <a href="mailto:ga@omniingredients.com" className="text-amber-400 hover:text-amber-300 underline">
                  ga@omniingredients.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
