"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product, ProductVariant } from "@omm/types";
import { useCart } from "@/context/CartContext";

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  // Guard against products with no variants
  if (product.variants.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-neutral-600">This product is currently unavailable.</p>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "usage">("description");
  const { addItem } = useCart();

  // Calculate rating distribution from reviews
  const ratingDistribution = product.reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>
  );

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
  }, []);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.src || "",
      variant: {
        id: selectedVariant.id,
        name: selectedVariant.name,
        price: selectedVariant.price,
        compareAtPrice: selectedVariant.compareAtPrice,
      },
      quantity,
    });
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-neutral-900 transition">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-neutral-900 transition">Shop</Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>
      </div>

      {/* Hero Product Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="animate-on-scroll image-reveal stagger-1">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px]">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-emerald-500 ring-2 ring-emerald-500/20"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-neutral-100 relative group">
                {product.images[selectedImage] && (
                  <img
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                {/* Wishlist button */}
                <button className="absolute top-4 right-4 p-2.5 bg-white/95 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24">
            {/* Badges */}
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 animate-on-scroll scale-in stagger-1">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-medium text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-full py-1.5 px-3"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Category */}
            <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2 animate-on-scroll text-reveal stagger-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl tracking-tight font-semibold font-playfair animate-on-scroll text-reveal stagger-2">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg text-neutral-600 mt-2 animate-on-scroll text-reveal stagger-3">
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4 animate-on-scroll fade-in stagger-3">
              <div className="flex items-center gap-0.5 text-amber-500">
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
                    className={`w-5 h-5 ${i < Math.floor(product.averageRating) ? "fill-current" : "opacity-30"}`}
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">{product.averageRating}</span>
              <a href="#reviews" className="text-sm text-neutral-600 hover:text-neutral-900 transition">
                ({product.totalReviews} reviews)
              </a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6 animate-on-scroll slide-left stagger-4">
              <span className="text-3xl font-semibold">${selectedVariant.price.toFixed(2)}</span>
              {selectedVariant.compareAtPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  ${selectedVariant.compareAtPrice.toFixed(2)}
                </span>
              )}
              {selectedVariant.compareAtPrice && (
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  Save ${(selectedVariant.compareAtPrice - selectedVariant.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mt-6 animate-on-scroll fade-in stagger-4">
                <label className="block text-sm font-medium mb-3">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2.5 rounded-full border transition-all font-medium ${
                        selectedVariant.id === variant.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6 animate-on-scroll fade-in stagger-5">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="inline-flex items-center border border-neutral-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-neutral-100 rounded-l-full transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-neutral-100 rounded-r-full transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 animate-on-scroll scale-in stagger-5">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Add to Cart — ${(selectedVariant.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 animate-on-scroll fade-in stagger-6">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
                    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
                    <circle cx="7" cy="18" r="2"></circle>
                    <path d="M15 18H9"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                  </svg>
                </div>
                <p className="text-xs text-neutral-600">Free Shipping<br/>Over $60</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path>
                  </svg>
                </div>
                <p className="text-xs text-neutral-600">30-Day<br/>Returns</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <p className="text-xs text-neutral-600">cGMP<br/>Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Tab Navigation */}
          <div className="flex gap-1 p-1 bg-neutral-200/50 rounded-full w-fit mb-8 animate-on-scroll scale-in">
            {[
              { id: "description", label: "Description" },
              { id: "ingredients", label: "Ingredients" },
              { id: "usage", label: "How to Use" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-on-scroll fade-in">
            {activeTab === "description" && (
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-6 font-playfair">About This Product</h3>
                  <div className="space-y-4">
                    <p className="text-neutral-700 text-base leading-7 first-letter:text-4xl first-letter:font-playfair first-letter:font-bold first-letter:text-neutral-900 first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                      {product.description}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed border-l-2 border-emerald-500 pl-4 italic">
                      Manufactured in a cGMP-certified facility and tested by independent laboratories for purity and potency.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-6 font-playfair">Benefits</h3>
                  <ul className="space-y-4">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </span>
                        <span className="text-neutral-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="max-w-xl">
                {/* Supplement Facts Table */}
                <div className="border-2 border-neutral-900 rounded-lg overflow-hidden bg-white">
                  <div className="border-b-8 border-neutral-900 px-4 py-3">
                    <h3 className="text-xl font-bold tracking-tight">Supplement Facts</h3>
                    <p className="text-sm text-neutral-600">Serving Size: 1 Softgel | Servings Per Container: {selectedVariant.servings || "varies"}</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="border-b-2 border-neutral-900">
                      <tr>
                        <th className="text-left px-4 py-2 font-semibold">Amount Per Serving</th>
                        <th className="text-right px-4 py-2 font-semibold">% DV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.ingredients.map((ingredient, index) => (
                        <tr key={index} className="border-b border-neutral-200">
                          <td className="px-4 py-2">
                            <span className="font-medium">{ingredient.name}</span>{" "}
                            <span className="text-neutral-600">{ingredient.amount}</span>
                          </td>
                          <td className="text-right px-4 py-2">{ingredient.dailyValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 text-xs text-neutral-600 border-t border-neutral-200">
                    <p>† Daily Value not established.</p>
                  </div>
                </div>

                {product.otherIngredients && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Other Ingredients</h4>
                    <p className="text-sm text-neutral-600">{product.otherIngredients}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "usage" && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-4">Directions</h3>
                  <p className="text-neutral-600 leading-relaxed">{product.usage}</p>
                </div>
                {product.warnings && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      Warnings
                    </h4>
                    <p className="text-sm text-amber-700">{product.warnings}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-16" id="reviews">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Rating Summary */}
          <div className="lg:col-span-1 animate-on-scroll slide-right stagger-1">
            <h2 className="text-3xl font-semibold tracking-tight mb-6">Customer Reviews</h2>

            {/* Average Rating */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-bold">{product.averageRating || 0}</span>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`${i < Math.floor(product.averageRating) ? "fill-current" : "opacity-30"}`}
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-neutral-600">{product.totalReviews} reviews</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-4">{rating}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${product.totalReviews > 0 ? (ratingDistribution[rating] / product.totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-neutral-600 w-10">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="mt-6 w-full px-6 py-3 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition">
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {product.reviews.length === 0 ? (
              <p className="text-neutral-500">No reviews yet. Be the first to review this product!</p>
            ) : (
              product.reviews.map((review, index) => (
                <article
                  key={review.id}
                  className={`animate-on-scroll card-reveal stagger-${Math.min(index + 1, 5)} border border-neutral-200 rounded-2xl bg-white p-6`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`${i < review.rating ? "fill-current" : "opacity-30"}`}
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                          </svg>
                        ))}
                      </div>
                      <h4 className="mt-2 font-semibold tracking-tight">{review.title}</h4>
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{review.content}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                    <span>{review.author} — {review.date}</span>
                    <button className="flex items-center gap-1 hover:text-neutral-700 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 10v12"></path>
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </article>
              ))
            )}

            {/* Load More */}
            {product.reviews.length > 0 && (
              <div className="text-center animate-on-scroll fade-in">
                <button className="px-8 py-3 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
