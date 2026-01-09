"use client";

import { useState, useTransition } from "react";
import { toggleProductStatus } from "@/actions/products";
import { Button, StatusBadge } from "@/components/ui";

interface StatusToggleProps {
  productId: string;
  isActive: boolean;
}

export function StatusToggle({ productId, isActive: initialActive }: StatusToggleProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleProductStatus(productId, !isActive);
      if (result.success) {
        setIsActive(!isActive);
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      <StatusBadge status={isActive ? "active" : "inactive"} />
      <Button
        size="sm"
        variant="secondary"
        onClick={handleToggle}
        isLoading={isPending}
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
