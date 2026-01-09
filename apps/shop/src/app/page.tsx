"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // Initialize scroll animations
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
    <div className="antialiased selection:bg-neutral-900 selection:text-white text-neutral-900 font-[Inter] bg-white">
      {/* Toast Notifications */}
      <div id="toastContainer" className="fixed top-20 right-6 z-[100] space-y-2"></div>

      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 hero-parallax-bg animate-on-scroll image-reveal stagger-1">
          <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/68d6b8da-d1ca-48b1-a6ff-a76d865061f1_3840w.jpg" alt="Skincare model with dewy skin" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 hero-gradient-overlay"></div>
        </div>
        <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 items-center">
          <div className="max-w-xl text-white hero-content">
            <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">Botanical · Clinical · Kind</p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">Natural Skincare</h1>
            <p className="text-base/7 md:text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">Awaken your skin with gentle actives and nourishing oils. Formulated to restore barrier health and glow naturally.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href="/shop" className="flex justify-center gap-2 items-center lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 overflow-hidden group text-lg text-neutral-900 bg-gray-50 max-w-fit border-gray-50 border-2 rounded-full py-2 px-4 shadow-xl backdrop-blur-md animate-on-scroll scale-in stagger-4">
                Shop Now
                <svg className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-gray-800 group-hover:fill-gray-800"></path>
                </svg>
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:bg-white/10 backdrop-blur transition transform hover:scale-105 animate-on-scroll slide-left stagger-5">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="transition-colors duration-300 bg-neutral-50 border-neutral-200 border-t">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="text-center animate-on-scroll blur-slide">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <span className="animate-on-scroll slide-left stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">Refresh your skin,</span>
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ead6a95d-ae67-4b24-9f26-ae02bf27cb1e_3840w.jpg" alt="Model applying serum" className="animate-on-scroll rotate-in stagger-2 inline-block w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white object-cover ring-white ring-2 sm:ring-4 rounded-xl sm:rounded-2xl shadow-xl -rotate-6" />
              <span className="animate-on-scroll slide-right stagger-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">love yourself,</span>
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cab73078-80bd-4f30-8d0d-775e21f09e27_3840w.jpg" alt="Spa mask moment" className="animate-on-scroll rotate-in stagger-4 inline-block w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ring-white ring-2 sm:ring-4 bg-white object-cover rounded-xl sm:rounded-2xl shadow-xl rotate-6" />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/16c0110c-f333-4a45-a83a-d83ff9487661_3840w.jpg" alt="Leaf detail" className="animate-on-scroll scale-up stagger-5 hidden sm:inline-block sm:h-10 sm:w-16 md:h-12 md:w-20 lg:h-14 lg:w-24 ring-white ring-2 sm:ring-4 object-cover rounded-xl sm:rounded-2xl shadow-xl -rotate-3" />
              <span className="animate-on-scroll slide-up stagger-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold italic font-playfair text-neutral-900">renew your glow.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 justify-start" id="collections">
        <div className="flex flex-col sm:flex-row mb-6 sm:mb-8 items-start sm:items-end justify-between gap-4 animate-on-scroll fade-in">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-1">Explore Collections</h2>
            <p className="mt-2 text-neutral-600 animate-on-scroll text-reveal stagger-2">Targeted routines for every skin goal.</p>
          </div>
          <Link href="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-neutral-600 transition animate-on-scroll slide-left stagger-3">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Desktop horizontal scroll cards */}
        <div className="hidden md:flex gap-1.5 bg-white w-full h-[464px] max-w-none rounded-3xl p-6 shadow-2xl space-x-4 animate-on-scroll scale-in overflow-hidden">
          {[
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg", title: "Hydrate & Restore", desc: "Moisture-rich serums with hyaluronic acid", sub: "Essential Hydration Collection" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg", title: "Cleanse & Purify", desc: "pH-balanced cleansers for sensitive skin", sub: "Gentle Care Collection" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg", title: "Renew & Repair", desc: "Anti-aging actives with botanical support", sub: "Advanced Renewal Series" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/66c7e7a4-0871-4ca4-9a13-ee7daeeeebe7_800w.jpg", title: "Botanical Blend", desc: "Nature-inspired actives for healthy glow", sub: "Natural Radiance Collection" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f0c6ca8f-90a8-4036-bdd1-9adc2e917c7b_3840w.jpg", title: "Nourish & Protect", desc: "Rich moisturizers with barrier protection", sub: "Barrier Repair Collection" },
          ].map((card, index) => (
            <div key={card.title} className={`card-panel flex-1 overflow-hidden cursor-pointer transition-all duration-500 flex hover:flex-[4] group bg-gray-800 h-full rounded-3xl relative items-center justify-center animate-on-scroll blur-in stagger-${index + 1}`}>
              <img src={card.img} alt={card.title} className="card-image w-full h-full object-cover rounded-3xl" />
              <div className="card-overlay group-hover:opacity-100 transition-opacity duration-300 flex flex-col bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 rounded-3xl p-6 absolute inset-0 justify-end">
                <h3 className="text-white text-xl font-medium mb-1 tracking-tight">{card.title}</h3>
                <p className="text-gray-200 text-sm">{card.desc}</p>
                <p className="text-gray-400 text-xs mt-2">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile grid cards */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg", title: "Hydrate & Restore", desc: "Moisture-rich serums with hyaluronic acid" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg", title: "Cleanse & Purify", desc: "pH-balanced cleansers for sensitive skin" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg", title: "Renew & Repair", desc: "Anti-aging actives with botanical support" },
            { img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/66c7e7a4-0871-4ca4-9a13-ee7daeeeebe7_800w.jpg", title: "Botanical Blend", desc: "Nature-inspired actives for healthy glow" },
          ].map((card, index) => (
            <Link
              key={card.title}
              href="/shop"
              className={`group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg animate-on-scroll card-reveal stagger-${index + 1}`}
            >
              <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-medium tracking-tight">{card.title}</h3>
                <p className="text-gray-200 text-sm mt-1">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y transition-colors duration-300 overflow-hidden bg-neutral-50 border-neutral-200" id="shop">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8 animate-on-scroll slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-1">Featured Products</h2>
              <p className="mt-2 text-neutral-600 animate-on-scroll text-reveal stagger-2">Thoughtful formulas, consciously packaged.</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Barrier Repair Serum", desc: "Ceramides + Niacinamide 5%", price: "$42", badge: "New", reviews: 162, rating: 4, img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg" },
              { name: "Cloud Cleanser", desc: "Amino Acid Gel", price: "$22", badge: "pH 5.5", reviews: 84, rating: 3, img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg" },
              { name: "Silk Moisture Cream", desc: "Squalane + Peptides", price: "$34", badge: "Best Seller", reviews: 420, rating: 5, img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c698c05d-cf04-4db6-bbeb-c6b5bacd1d26_800w.jpg" },
            ].map((product, index) => (
              <article key={product.name} className={`animate-on-scroll card-reveal stagger-${index + 1} group rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl`}>
                <Link href="/product" className="block">
                  <div className="relative">
                    <img src={product.img} alt={product.name} className={`aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110 animate-on-scroll image-reveal stagger-${index + 1}`} />
                    <span className="text-xs font-medium text-neutral-900 bg-white/60 border-neutral-200 border rounded-full py-1.5 px-3 absolute top-4 left-4 shadow-sm backdrop-blur-sm animate-on-scroll fade-in stagger-2">{product.badge}</span>
                    <button className="absolute top-4 right-4 p-2.5 bg-white/95 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-sm animate-on-scroll rotate-in stagger-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <header className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg tracking-tight font-semibold text-neutral-900 animate-on-scroll text-reveal stagger-4">{product.name}</h3>
                        <p className="text-sm text-neutral-600 mt-1 animate-on-scroll text-reveal stagger-5">{product.desc}</p>
                      </div>
                      <span className="text-base sm:text-lg font-semibold text-neutral-900 animate-on-scroll slide-left stagger-6">{product.price}</span>
                    </header>
                    <div className="mt-3 sm:mt-4 flex items-center gap-1 text-amber-500 animate-on-scroll fade-in stagger-7">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < product.rating ? 'fill-current' : 'opacity-40'}`}>
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-xs sm:text-sm text-neutral-600 font-medium">{product.reviews} reviews</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients / Philosophy */}
      <section className="max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6" id="about">
        <div className="animate-on-scroll image-reveal grid lg:grid-cols-2 gap-8 lg:gap-16 md:px-8 md:py-12 lg:px-20 lg:py-24 relative group cursor-pointer transition-all duration-500 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fbca9e2-8404-407b-b3f5-0d7031ed837c_1600w.jpg)] bg-cover rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl items-center">
          <div className="rounded-2xl sm:rounded-3xl absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-all duration-500"></div>
          <div className="group-hover:opacity-100 transition-all duration-500 opacity-0 rounded-2xl sm:rounded-3xl absolute inset-0" style={{ backdropFilter: 'blur(1px)' }}></div>

          <div className="relative z-10 animate-on-scroll slide-left stagger-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight animate-on-scroll text-reveal stagger-1">Clinically gentle. Consciously crafted.</h2>
            <p className="leading-relaxed text-neutral-200 mt-4 sm:mt-6 text-sm sm:text-base animate-on-scroll text-reveal stagger-2">We formulate with evidence-based percentages, skin-identical lipids, and soothing botanicals to support long-term skin health.</p>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: "leaf", title: "Botanical Actives", desc: "Green tea, licorice root, centella." },
                { icon: "droplets", title: "Hydration Matrix", desc: "Humectants + ceramides blend." },
                { icon: "beaker", title: "Clinical Precision", desc: "Evidence-based concentrations." },
              ].map((item, index) => (
                <div key={item.title} className={`animate-on-scroll card-reveal stagger-${index + 3} transition-colors duration-300 transform hover:scale-105 bg-white/50 border-neutral-300 border rounded-xl p-4 sm:p-6 shadow-sm backdrop-blur-sm`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 sm:w-6 sm:h-6 animate-on-scroll scale-in stagger-${index + 4}`} style={{ color: 'rgb(22, 163, 74)' }}>
                    {item.icon === 'leaf' && <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></>}
                    {item.icon === 'droplets' && <><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></>}
                    {item.icon === 'beaker' && <><path d="M4.5 3h15"></path><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"></path><path d="M6 14h12"></path></>}
                  </svg>
                  <h4 className={`mt-3 sm:mt-4 font-semibold tracking-tight text-neutral-900 text-sm sm:text-base animate-on-scroll text-reveal stagger-${index + 5}`}>{item.title}</h4>
                  <p className={`mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-700 animate-on-scroll text-reveal stagger-${index + 6}`}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12">
              <Link href="/about" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur transition transform hover:scale-105 animate-on-scroll scale-in stagger-1 text-sm sm:text-base">
                View Ingredients
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative z-10 lg:flex hidden items-center justify-center animate-on-scroll slide-right stagger-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-on-scroll card-reveal stagger-3">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center animate-on-scroll rotate-in stagger-${i + 4}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                      <path d="M224,64V192a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V64A16,16,0,0,1,48,48H208A16,16,0,0,1,224,64Z" opacity="0.2"></path>
                      <path d="M208,40H48A24,24,0,0,0,24,64V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,200H48a8,8,0,0,1-8-8V160H216v32A8,8,0,0,1,208,200Z"></path>
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm mt-6 text-center animate-on-scroll text-reveal stagger-8">Backed by research, proven by results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900 text-white transition-colors duration-300" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">Stay glowing</h2>
            <p className="mt-4 text-base sm:text-lg opacity-90 animate-on-scroll text-reveal stagger-2">Be the first to know about new products, exclusive offers, and skincare tips from our experts.</p>

            <form className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto animate-on-scroll scale-in stagger-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-300" />
              <button type="submit" className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:opacity-90 transition transform hover:scale-105 animate-on-scroll slide-left stagger-4">
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm opacity-70 animate-on-scroll fade-in stagger-5">No spam, just glow. Unsubscribe anytime.</p>

            {/* Business Hours */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
              <p className="text-sm opacity-80 animate-on-scroll text-reveal stagger-6">
                <strong>Business Hours (EST):</strong> Monday – Friday, 08:30 am – 05:00 pm
              </p>
              <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-7">
                <strong>Location:</strong> Ontario, CA 91761, USA
              </p>
              <p className="text-sm opacity-80 mt-2 animate-on-scroll text-reveal stagger-8">
                <strong>Email:</strong> <a href="mailto:ga@omniingredients.com" className="hover:opacity-100 underline">ga@omniingredients.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
