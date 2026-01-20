"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  zh: "中文",
};

const localeFullNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
};

// Flag emojis for visual identification
const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  zh: "🇨🇳",
};

interface LanguageSwitcherProps {
  variant?: "dropdown" | "inline";
}

export function LanguageSwitcher({ variant = "dropdown" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common.languageSwitcher");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Inline variant for mobile - shows all options as buttons
  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
          {t("label")}
        </p>
        <div className="flex gap-2">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                loc === locale
                  ? "bg-[#df7a4c] text-white shadow-md"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
              aria-label={`Switch to ${localeFullNames[loc]}`}
              aria-current={loc === locale ? "true" : undefined}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span>{localeLabels[loc]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Dropdown variant for desktop
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("label")}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span>{localeLabels[locale]}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50"
          role="listbox"
          aria-label={t("label")}
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 transition-colors flex items-center gap-3 ${
                loc === locale
                  ? "text-[#df7a4c] font-medium bg-[#df7a4c]/5"
                  : "text-neutral-700"
              }`}
              role="option"
              aria-selected={loc === locale}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span className="flex-1">{localeFullNames[loc]}</span>
              {loc === locale && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
