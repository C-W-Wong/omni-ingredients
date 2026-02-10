"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export interface QuoteModalTranslations {
  title?: string;
  subtitle?: string;
  fields?: {
    fullName?: string;
    companyName?: string;
    businessEmail?: string;
    phoneNumber?: string;
    phoneExt?: string;
    optional?: string;
    message?: string;
    messagePlaceholder?: string;
  };
  submit?: string;
  sending?: string;
  success?: {
    title?: string;
    description?: string;
    close?: string;
  };
  errors?: {
    nameRequired?: string;
    companyRequired?: string;
    emailRequired?: string;
    emailInvalid?: string;
    messageRequired?: string;
    submitFailed?: string;
  };
}

export interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations?: QuoteModalTranslations;
  submitUrl?: string;
}

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  phoneExt: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  message?: string;
}

const initialFormData: FormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  phoneExt: "",
  message: "",
};

export function QuoteModal({
  isOpen,
  onClose,
  translations: t,
  submitUrl = "/api/quote",
}: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Mount portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Entrance/exit animation
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Trigger entrance animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      setShow(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && show && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen, show]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      onClose();
      // Reset form after animation
      setFormData(initialFormData);
      setErrors({});
      setIsSuccess(false);
      setSubmitError("");
    }, 300);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t?.errors?.nameRequired || "Full name is required";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName =
        t?.errors?.companyRequired || "Company name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = t?.errors?.emailRequired || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        t?.errors?.emailInvalid || "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message =
        t?.errors?.messageRequired || "Please include details about your needs";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setIsSuccess(true);
    } catch {
      setSubmitError(
        t?.errors?.submitFailed ||
          "Failed to submit. Please try again or email us at info@omniingredients.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 modal-overlay ${show ? "show" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div
        className={`relative w-full max-w-lg bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto modal-content ${show ? "show" : ""}`}
      >
        {/* Close button */}
        <button
          ref={firstFocusableRef}
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-neutral-100 transition-colors z-10"
          aria-label="Close"
        >
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {t?.success?.title || "Quote Request Submitted!"}
              </h3>
              <p className="text-neutral-600 mb-6">
                {t?.success?.description ||
                  "Thank you! Our team will review your request and get back to you within 24 hours."}
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-[#df7a4c] text-white rounded-lg font-medium hover:bg-[#c86a3f] transition-colors"
              >
                {t?.success?.close || "Close"}
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="mb-6 pr-8">
                <h2
                  id="quote-modal-title"
                  className="text-xl font-semibold text-neutral-900"
                >
                  {t?.title || "Request a Quote"}
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  {t?.subtitle ||
                    "Tell us about your ingredient needs and we'll respond within 24 hours."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="qm-fullName"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    {t?.fields?.fullName || "Full Name"}
                  </label>
                  <input
                    id="qm-fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.fullName
                        ? "border-red-300 bg-red-50"
                        : "border-neutral-200"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="qm-companyName"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    {t?.fields?.companyName || "Company Name"}
                  </label>
                  <input
                    id="qm-companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.companyName
                        ? "border-red-300 bg-red-50"
                        : "border-neutral-200"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Business Email */}
                <div>
                  <label
                    htmlFor="qm-email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    {t?.fields?.businessEmail || "Business Email"}
                  </label>
                  <input
                    id="qm-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-neutral-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone + Extension (side by side) */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="qm-phone"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t?.fields?.phoneNumber || "Phone Number"}{" "}
                      <span className="text-neutral-400 font-normal">
                        {t?.fields?.optional || "(Optional)"}
                      </span>
                    </label>
                    <input
                      id="qm-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div className="w-20">
                    <label
                      htmlFor="qm-phoneExt"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t?.fields?.phoneExt || "Ext."}
                    </label>
                    <input
                      id="qm-phoneExt"
                      name="phoneExt"
                      type="text"
                      value={formData.phoneExt}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="qm-message"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    {t?.fields?.message || "Message"}
                  </label>
                  <textarea
                    id="qm-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      t?.fields?.messagePlaceholder ||
                      "Tell us about the products you're interested in, expected monthly quantities, timeline, and any specific requirements..."
                    }
                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none ${
                      errors.message
                        ? "border-red-300 bg-red-50"
                        : "border-neutral-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit error */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#df7a4c] text-white rounded-lg font-medium hover:bg-[#c86a3f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-4 w-4"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isSubmitting
                    ? t?.sending || "Submitting..."
                    : t?.submit || "Submit Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
