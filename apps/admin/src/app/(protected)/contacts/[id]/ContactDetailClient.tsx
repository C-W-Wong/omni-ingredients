"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  type ContactSubmission,
  updateContactStatus,
  deleteContactSubmission,
} from "@/actions/contacts";
import { ConfirmDialog } from "@/components/ui";

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-600" },
};

const inquiryTypeLabels: Record<string, string> = {
  general: "General Inquiry",
  quote: "Request a Quote",
  product: "Product Information",
  partnership: "Partnership Opportunities",
};

interface ContactDetailClientProps {
  contact: ContactSubmission;
}

export function ContactDetailClient({ contact: initialContact }: ContactDetailClientProps) {
  const router = useRouter();
  const [contact, setContact] = useState(initialContact);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    const result = await updateContactStatus(contact.id, newStatus);
    if (result.success) {
      setContact((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteContactSubmission(contact.id);
    if (result.success) {
      router.push("/contacts");
    }
    setIsDeleting(false);
  };

  const config = statusConfig[contact.status] || statusConfig.new;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/contacts"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submission</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${contact.email}?subject=Re: Your Inquiry — Omni Ingredients`}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Reply via Email
          </a>
          <button
            onClick={() => setShowDelete(true)}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <p className="text-gray-900 font-medium">{contact.full_name}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Company
              </label>
              <p className="text-gray-900">{contact.company_name}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Email
              </label>
              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                {contact.email}
              </a>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Phone
              </label>
              <p className="text-gray-900">
                {contact.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Inquiry Type
              </label>
              <p className="text-gray-900">
                {inquiryTypeLabels[contact.inquiry_type] || contact.inquiry_type}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Submitted
              </label>
              <p className="text-gray-900">
                {new Date(contact.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Status update */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              value={contact.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-900 whitespace-pre-wrap">
              {contact.message}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Contact Submission"
        message={`Are you sure you want to delete the contact submission from ${contact.full_name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
