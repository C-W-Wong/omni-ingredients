"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  // Initialize scroll animations
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

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="bg-white min-h-[60vh]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-600 animate-on-scroll fade-in">
          <Link href="/" className="hover:text-neutral-900 transition">Home</Link>
          <span>/</span>
          <span className="text-neutral-900">Shopping Cart</span>
        </nav>
      </div>

      {/* Cart Content */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-3xl md:text-4xl tracking-tight font-semibold font-playfair mb-8 animate-on-scroll text-reveal">
          Shopping Cart {itemCount > 0 && <span className="text-neutral-400">({itemCount})</span>}
        </h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 animate-on-scroll blur-slide">
            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8">Looks like you haven&apos;t added any products yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition transform hover:scale-105 shadow-lg shadow-emerald-500/25"
            >
              Continue Shopping
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`animate-on-scroll slide-left stagger-${Math.min(index + 1, 4)} group bg-white rounded-2xl border border-neutral-200 p-4 md:p-6 transition-all hover:shadow-md`}
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link href="/product" className="shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href="/product" className="font-semibold text-neutral-900 hover:text-neutral-600 transition line-clamp-1">
                            {item.productName}
                          </Link>
                          <p className="text-sm text-neutral-500 mt-1">{item.variant.name}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="inline-flex items-center border border-neutral-200 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-neutral-100 rounded-l-full transition"
                            aria-label="Decrease quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-neutral-100 rounded-r-full transition"
                            aria-label="Increase quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="M12 5v14"></path>
                            </svg>
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${(item.variant.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-neutral-500">
                              ${item.variant.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - 1 column */}
            <div className="lg:col-span-1">
              <div className="animate-on-scroll slide-right stagger-2 sticky top-24 bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-neutral-500">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 my-6"></div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="text-xl font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => alert("Checkout functionality coming soon!")}
                  className="w-full py-3.5 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-600 hover:text-neutral-900 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="border-t border-neutral-200 mt-6 pt-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
