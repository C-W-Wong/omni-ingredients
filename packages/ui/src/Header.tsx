"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Collection data for dropdown
const collections = [
  {
    href: "/shop?collection=cleansers",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_3840w.jpg",
    title: "Refresh: Cleansers",
    desc: "pH-balanced, non-stripping",
  },
  {
    href: "/shop?collection=serums",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/514c8cb5-f728-4441-9fe6-51d3dba28717_3840w.jpg",
    title: "Treat: Serums",
    desc: "Actives that respect your barrier",
  },
  {
    href: "/shop?collection=moisturizers",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a36afded-b34e-42f9-986d-2a5af9747298_800w.jpg",
    title: "Nourish: Moisturizers",
    desc: "Ceramide-rich hydration",
  },
];

export interface HeaderProps {
  variant?: "landing" | "shop";
  cartCount?: number;
  user?: { email?: string; user_metadata?: { full_name?: string } } | null;
  isLoading?: boolean;
  onSignOut?: () => void;
  shopUrl?: string;
  landingUrl?: string;
}

export function Header({
  variant = "shop",
  cartCount = 0,
  user = null,
  isLoading = false,
  onSignOut,
  shopUrl = "http://localhost:3001",
  landingUrl = "http://localhost:3000",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const isLanding = variant === "landing";
  const isShop = variant === "shop";

  // Close account dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut();
    }
    setAccountOpen(false);
  };

  // Get user display name or email
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Account";

  // Navigation links based on variant
  const landingNavLinks = [
    { href: "/", label: "Home", external: false },
    { href: "/journal", label: "Journal", external: false },
    { href: "/about", label: "About", external: false },
  ];

  const shopNavLinks = [
    { href: `${landingUrl}/about`, label: "About", external: true },
    { href: `${landingUrl}/journal`, label: "Journal", external: true },
  ];

  const navLinks = isLanding ? landingNavLinks : shopNavLinks;

  return (
    <>
      {/* Announcement Bar */}
      <div className="hidden sm:block bg-[#3D2E28] text-white text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {isLanding ? (
            <>
              <p className="opacity-90">Premium B2B Nutraceutical Ingredients</p>
              <p className="opacity-90">Serving North America since 2010</p>
            </>
          ) : (
            <>
              <p className="opacity-90">Free shipping on orders over $60</p>
              <p className="opacity-90">New: Barrier Repair Serum 2.0 is here</p>
            </>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="sticky z-50 supports-[backdrop-filter]:bg-white/70 transition-colors duration-300 bg-white/90 border-neutral-200 border-b top-0 backdrop-blur">
        <div className="flex h-16 max-w-7xl mx-auto px-4 sm:px-6 items-center justify-between">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors"
              aria-label="Open menu"
            >
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
                className="w-5 h-5"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
            <Link href={isLanding ? "/" : landingUrl} className="flex items-center gap-2">
              <Image
                src="/favicon/favicon-96x96.png"
                alt="Omni Ingredients logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="text-base sm:text-lg font-semibold tracking-tight">
                Omni Ingredients
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {isShop && (
              <>
                <Link href="/" className="hover:text-neutral-600 transition">
                  Shop
                </Link>

                {/* Collections dropdown - Shop only */}
                <div
                  className="relative"
                  onMouseEnter={() => setCollectionsOpen(true)}
                  onMouseLeave={() => setCollectionsOpen(false)}
                >
                  <button className="hover:text-neutral-600 transition flex items-center gap-1">
                    Collections
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-3 h-3 transition-transform ${
                        collectionsOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl p-6 transition-all duration-200 ${
                      collectionsOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-4">
                      {collections.map((collection) => (
                        <Link
                          key={collection.title}
                          href={collection.href}
                          className="group flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img
                              src={collection.img}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-900">
                              {collection.title}
                            </h4>
                            <p className="text-xs text-neutral-600">
                              {collection.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 mt-4 pt-4">
                      <Link
                        href="/"
                        className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition flex items-center gap-2"
                      >
                        View all collections
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Render nav links */}
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-neutral-600 transition"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-neutral-600 transition"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Shop CTA button for landing variant */}
            {isLanding && (
              <a
                href={shopUrl}
                className="px-4 py-2 bg-[#df7a4c] text-white rounded-full font-medium hover:bg-[#c86a3f] transition"
              >
                Shop Now
              </a>
            )}
          </nav>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search button */}
            <button
              className="hidden sm:inline-flex p-2 rounded-md hover:bg-neutral-100 transition-colors"
              aria-label="Search"
            >
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
                className="w-5 h-5"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </button>

            {/* Account button - Shop variant only */}
            {isShop && !isLoading && (
              <div className="relative hidden sm:block" ref={accountRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setAccountOpen(!accountOpen)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100 transition-colors"
                      aria-label="Account"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#ffa087] text-white flex items-center justify-center text-sm font-medium">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    </button>

                    {/* Account Dropdown */}
                    <div
                      className={`absolute top-full right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden transition-all duration-200 ${
                        accountOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="px-4 py-3 border-b border-neutral-100">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/account"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                          Orders
                        </Link>
                        <Link
                          href="/account/settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-neutral-100 py-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex p-2 rounded-md hover:bg-neutral-100 transition-colors"
                    aria-label="Account"
                  >
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
                      className="w-5 h-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                )}
              </div>
            )}

            {/* Cart button - Shop variant only */}
            {isShop && (
              <Link
                href="/cart"
                className="relative p-2 rounded-md hover:bg-neutral-100 transition-colors"
                aria-label="Cart"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ffa087] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Contact button - Landing variant only (desktop) */}
            {isLanding && (
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Contact
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer - rendered outside header to avoid stacking context issues */}
      {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-full max-w-xs sm:w-80 bg-white shadow-xl flex flex-col transition-transform duration-300">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200">
                <span className="text-lg tracking-tight font-semibold">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  aria-label="Close menu"
                >
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
                    className="w-5 h-5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="flex flex-col gap-1">
                  {/* Mobile nav links */}
                  {isShop && (
                    <Link
                      href="/"
                      className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Shop
                    </Link>
                  )}

                  {navLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  )}

                  {/* Shop CTA for landing mobile */}
                  {isLanding && (
                    <a
                      href={shopUrl}
                      className="py-3 px-4 rounded-lg bg-[#df7a4c] text-white font-medium text-center mt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Shop Now
                    </a>
                  )}

                  {/* Mobile Account Section - Shop only */}
                  {isShop && user ? (
                    <>
                      <Link
                        href="/account"
                        className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="py-3 px-4 rounded-lg hover:bg-red-50 transition font-medium text-left text-red-600"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : isShop && (
                    <Link
                      href="/login"
                      className="py-3 px-4 rounded-lg hover:bg-neutral-100 transition font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>

                {/* Collections in mobile menu - Shop only */}
                {isShop && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="px-4 text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                      Collections
                    </p>
                    <div className="flex flex-col gap-1">
                      {collections.map((collection) => (
                        <Link
                          key={collection.title}
                          href={collection.href}
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-neutral-100 transition"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img
                              src={collection.img}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{collection.title}</p>
                            <p className="text-xs text-neutral-500">{collection.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </nav>

              {/* Search in mobile menu */}
              <div className="p-4 sm:p-6 border-t border-neutral-200">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <span className="text-neutral-600">
                    {isLanding ? "Search ingredients..." : "Search products..."}
                  </span>
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
                    className="w-4 h-4 text-neutral-400"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </button>
              </div>
            </aside>
          </div>
        )}
    </>
  );
}

export default Header;
