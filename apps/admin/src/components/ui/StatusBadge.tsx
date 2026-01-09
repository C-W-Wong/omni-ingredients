"use client";

interface StatusBadgeProps {
  status: "active" | "inactive" | "published" | "draft" | "pending";
  className?: string;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-600",
  },
  published: {
    label: "Published",
    className: "bg-green-100 text-green-700",
  },
  draft: {
    label: "Draft",
    className: "bg-yellow-100 text-yellow-700",
  },
  pending: {
    label: "Pending",
    className: "bg-blue-100 text-blue-700",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
