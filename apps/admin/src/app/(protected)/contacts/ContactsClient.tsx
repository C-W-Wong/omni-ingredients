"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, SearchInput, ConfirmDialog } from "@/components/ui";
import {
  type ContactSubmission,
  getContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
} from "@/actions/contacts";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-600" },
};

const inquiryTypeLabels: Record<string, string> = {
  general: "General",
  quote: "Quote",
  product: "Product",
  partnership: "Partnership",
};

function ContactStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.new;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

interface ContactsClientProps {
  initialContacts: ContactSubmission[];
}

export function ContactsClient({ initialContacts }: ContactsClientProps) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContacts = async (s?: string, st?: string) => {
    setIsLoading(true);
    const data = await getContactSubmissions(s || undefined, st || undefined);
    setContacts(data);
    setIsLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchContacts(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    fetchContacts(search, value);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateContactStatus(id, newStatus);
    fetchContacts(search, statusFilter);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await deleteContactSubmission(deleteTarget.id);
    setDeleteTarget(null);
    setIsDeleting(false);
    fetchContacts(search, statusFilter);
  };

  type ContactRow = Record<string, unknown> & ContactSubmission;

  const columns = [
    {
      key: "created_at",
      header: "Submitted",
      render: (item: ContactRow) => (
        <span className="text-gray-600">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "full_name",
      header: "Name",
      render: (item: ContactRow) => (
        <span className="font-medium text-gray-900">{item.full_name}</span>
      ),
    },
    {
      key: "company_name",
      header: "Company",
    },
    {
      key: "email",
      header: "Email",
      render: (item: ContactRow) => (
        <a
          href={`mailto:${item.email}`}
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {item.email}
        </a>
      ),
    },
    {
      key: "inquiry_type",
      header: "Inquiry Type",
      render: (item: ContactRow) => (
        <span className="text-gray-600">
          {inquiryTypeLabels[item.inquiry_type] || item.inquiry_type}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ContactRow) => (
        <ContactStatusBadge status={item.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: ContactRow) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <button
            onClick={() => setDeleteTarget(item)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, company, or email..."
          className="flex-1 max-w-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={contacts as ContactRow[]}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No contact submissions found"
        onRowClick={(item) => router.push(`/contacts/${(item as ContactRow).id}`)}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Contact Submission"
        message={`Are you sure you want to delete the contact submission from ${deleteTarget?.full_name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
