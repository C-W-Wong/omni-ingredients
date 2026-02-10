"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, SearchInput, ConfirmDialog } from "@/components/ui";
import {
  type QuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
  deleteQuoteRequest,
} from "@/actions/quotes";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-700" },
  quoted: { label: "Quoted", className: "bg-green-100 text-green-700" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-600" },
};

function QuoteStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.new;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

interface QuotesClientProps {
  initialQuotes: QuoteRequest[];
}

export function QuotesClient({ initialQuotes }: QuotesClientProps) {
  const router = useRouter();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<QuoteRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchQuotes = async (s?: string, st?: string) => {
    setIsLoading(true);
    const data = await getQuoteRequests(s || undefined, st || undefined);
    setQuotes(data);
    setIsLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchQuotes(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    fetchQuotes(search, value);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateQuoteStatus(id, newStatus);
    fetchQuotes(search, statusFilter);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await deleteQuoteRequest(deleteTarget.id);
    setDeleteTarget(null);
    setIsDeleting(false);
    fetchQuotes(search, statusFilter);
  };

  type QuoteRow = Record<string, unknown> & QuoteRequest;

  const columns = [
    {
      key: "created_at",
      header: "Submitted",
      render: (item: QuoteRow) => (
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
      render: (item: QuoteRow) => (
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
      render: (item: QuoteRow) => (
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
      key: "status",
      header: "Status",
      render: (item: QuoteRow) => (
        <QuoteStatusBadge status={item.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: QuoteRow) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
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
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
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
          <option value="quoted">Quoted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={quotes as QuoteRow[]}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No quote requests found"
        onRowClick={(item) => router.push(`/quotes/${(item as QuoteRow).id}`)}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Quote Request"
        message={`Are you sure you want to delete the quote request from ${deleteTarget?.full_name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
