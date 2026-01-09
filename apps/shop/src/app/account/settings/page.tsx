"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@omm/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/account/settings");
    }
  }, [user, isLoading, router]);

  // Load profile data
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFormData({
          fullName: profile.full_name || "",
          phone: profile.phone || "",
        });
      }
    }

    loadProfile();
  }, [user, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.fullName,
        phone: formData.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setIsSaving(false);

    if (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-neutral-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-neutral-600">
            <li>
              <Link href="/account" className="hover:text-neutral-900 transition">
                Account
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900">Settings</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold font-playfair tracking-tight">
            Account Settings
          </h1>
          <p className="text-neutral-600 mt-2">
            Update your profile information
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-600"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-6">Profile Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 cursor-not-allowed"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-white rounded-2xl border border-red-200 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            disabled
            className="px-6 py-2.5 border border-red-200 text-red-600 font-medium rounded-full hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
          <p className="text-xs text-neutral-500 mt-2">
            Account deletion is currently disabled. Contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
