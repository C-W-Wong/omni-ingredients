"use client";

import { useState, useTransition } from "react";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import {
  AdminIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "@/actions/products";

interface IngredientManagerProps {
  productId: string;
  ingredients: AdminIngredient[];
}

export function IngredientManager({ productId, ingredients: initialIngredients }: IngredientManagerProps) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dailyValue, setDailyValue] = useState("");

  const resetForm = () => {
    setName("");
    setAmount("");
    setDailyValue("");
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (ingredient: AdminIngredient) => {
    setEditingId(ingredient.id);
    setName(ingredient.name);
    setAmount(ingredient.amount);
    setDailyValue(ingredient.daily_value || "");
    setIsCreating(false);
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createIngredient(productId, {
        name,
        amount,
        daily_value: dailyValue || undefined,
      });

      if (result.success) {
        window.location.reload();
      }
    });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    startTransition(async () => {
      const result = await updateIngredient(editingId, {
        name,
        amount,
        daily_value: dailyValue || null,
      });

      if (result.success) {
        setIngredients(
          ingredients.map((i) =>
            i.id === editingId
              ? { ...i, name, amount, daily_value: dailyValue || null }
              : i
          )
        );
        resetForm();
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteIngredient(deleteId);
      if (result.success) {
        setIngredients(ingredients.filter((i) => i.id !== deleteId));
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
        {!isCreating && !editingId && (
          <Button size="sm" onClick={() => setIsCreating(true)}>
            Add Ingredient
          </Button>
        )}
      </div>

      {/* Create form */}
      {isCreating && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Vitamin D3"
              required
            />
            <FormField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 1000 IU"
              required
            />
            <FormField
              label="Daily Value"
              value={dailyValue}
              onChange={(e) => setDailyValue(e.target.value)}
              placeholder="e.g., 250%"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} isLoading={isPending} disabled={!name || !amount}>
              Add Ingredient
            </Button>
          </div>
        </div>
      )}

      {/* Ingredients table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Daily Value</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ingredients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No ingredients yet. Add your first ingredient.
                </td>
              </tr>
            ) : (
              ingredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  {editingId === ingredient.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={dailyValue}
                          onChange={(e) => setDailyValue(e.target.value)}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleUpdate} isLoading={isPending}>
                          Save
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{ingredient.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{ingredient.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{ingredient.daily_value || "—"}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(ingredient)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(ingredient.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Ingredient"
        message="Are you sure you want to delete this ingredient?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}
