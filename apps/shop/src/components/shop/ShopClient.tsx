"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ShopProduct, SortOption } from "@omm/types";

interface ShopClientProps {
  initialProducts: ShopProduct[];
  categories: { id: string; name: string; slug: string }[];
}

// Client-side sort function
function sortProducts(products: ShopProduct[], sortBy: SortOption): ShopProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-selling":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort((a, b) =>
        a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0
      );
    case "featured":
    default:
      return sorted.sort((a, b) =>
        a.badge === "Best Seller" ? -1 : b.badge === "Best Seller" ? 1 : 0
      );
  }
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filter and sort products
  const filteredProducts =
    selectedCategory === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Initialize scroll animations
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
  }, [sortedProducts]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto animate-on-scroll fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold font-playfair">Shop</h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">Premium supplements for optimal wellness</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-on-scroll scale-in stagger-1">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.name
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-neutral-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-200"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={`animate-on-scroll card-reveal stagger-${Math.min(index + 1, 8)}`}
              >
                <article className="group rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="text-xs font-medium text-neutral-900 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full py-1.5 px-3 absolute top-4 left-4 shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="absolute top-4 right-4 p-2.5 bg-white/95 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-neutral-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-1">
                      {product.tagline}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-neutral-400 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`w-3.5 h-3.5 ${i < product.rating ? "fill-current" : "opacity-30"}`}
                        >
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-neutral-500">({product.reviewCount})</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="mt-12 text-center animate-on-scroll fade-in">
            <button className="px-8 py-3 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition">
              Load More Products
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">Stay updated</h2>
            <p className="mt-4 text-base sm:text-lg opacity-90 animate-on-scroll text-reveal stagger-2">Be the first to know about new products, exclusive offers, and wellness tips.</p>

            <form className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto animate-on-scroll scale-in stagger-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:opacity-90 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm opacity-70 animate-on-scroll fade-in stagger-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
