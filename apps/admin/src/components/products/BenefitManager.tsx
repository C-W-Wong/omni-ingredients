"use client";

import { useState, useTransition } from "react";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import {
  AdminBenefit,
  createBenefit,
  updateBenefit,
  deleteBenefit,
} from "@/actions/products";

interface BenefitManagerProps {
  productId: string;
  benefits: AdminBenefit[];
}

export function BenefitManager({ productId, benefits: initialBenefits }: BenefitManagerProps) {
  const [benefits, setBenefits] = useState(initialBenefits);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [benefit, setBenefit] = useState("");

  const resetForm = () => {
    setBenefit("");
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (b: AdminBenefit) => {
    setEditingId(b.id);
    setBenefit(b.benefit);
    setIsCreating(false);
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createBenefit(productId, benefit);

      if (result.success) {
        window.location.reload();
      }
    });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    startTransition(async () => {
      const result = await updateBenefit(editingId, benefit);

      if (result.success) {
        setBenefits(
          benefits.map((b) =>
            b.id === editingId ? { ...b, benefit } : b
          )
        );
        resetForm();
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteBenefit(deleteId);
      if (result.success) {
        setBenefits(benefits.filter((b) => b.id !== deleteId));
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
        {!isCreating && !editingId && (
          <Button size="sm" onClick={() => setIsCreating(true)}>
            Add Benefit
          </Button>
        )}
      </div>

      {/* Create form */}
      {isCreating && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <FormField
            label="Benefit"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            placeholder="e.g., Supports heart health"
            required
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} isLoading={isPending} disabled={!benefit}>
              Add Benefit
            </Button>
          </div>
        </div>
      )}

      {/* Benefits list */}
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {benefits.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No benefits yet. Add your first benefit.
          </div>
        ) : (
          benefits.map((b) => (
            <div key={b.id} className="px-4 py-3 flex items-center justify-between">
              {editingId === b.id ? (
                <div className="flex-1 flex items-center gap-4">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                  />
                  <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleUpdate} isLoading={isPending}>
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-sm text-gray-900">{b.benefit}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(b)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteId(b.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Benefit"
        message="Are you sure you want to delete this benefit?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}
