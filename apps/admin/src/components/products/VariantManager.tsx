"use client";

import { useState, useTransition } from "react";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import {
  AdminVariant,
  createVariant,
  updateVariant,
  deleteVariant,
} from "@/actions/products";

interface VariantManagerProps {
  productId: string;
  variants: AdminVariant[];
}

export function VariantManager({ productId, variants: initialVariants }: VariantManagerProps) {
  const [variants, setVariants] = useState(initialVariants);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState("");
  const [servings, setServings] = useState("");

  const resetForm = () => {
    setName("");
    setSku("");
    setPrice("");
    setCompareAtPrice("");
    setInStock(true);
    setStockQuantity("");
    setServings("");
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (variant: AdminVariant) => {
    setEditingId(variant.id);
    setName(variant.name);
    setSku(variant.sku || "");
    setPrice(variant.price.toString());
    setCompareAtPrice(variant.compare_at_price?.toString() || "");
    setInStock(variant.in_stock);
    setStockQuantity(variant.stock_quantity.toString());
    setServings(variant.servings?.toString() || "");
    setIsCreating(false);
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createVariant(productId, {
        name,
        sku: sku || undefined,
        price: parseFloat(price),
        compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        in_stock: inStock,
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
        servings: servings ? parseInt(servings) : undefined,
      });

      if (result.success) {
        window.location.reload();
      }
    });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    startTransition(async () => {
      const result = await updateVariant(editingId, {
        name,
        sku: sku || undefined,
        price: parseFloat(price),
        compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
        in_stock: inStock,
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
        servings: servings ? parseInt(servings) : null,
      });

      if (result.success) {
        setVariants(
          variants.map((v) =>
            v.id === editingId
              ? {
                  ...v,
                  name,
                  sku: sku || null,
                  price: parseFloat(price),
                  compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
                  in_stock: inStock,
                  stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
                  servings: servings ? parseInt(servings) : null,
                }
              : v
          )
        );
        resetForm();
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteVariant(deleteId);
      if (result.success) {
        setVariants(variants.filter((v) => v.id !== deleteId));
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Variants</h3>
        {!isCreating && !editingId && (
          <Button size="sm" onClick={() => setIsCreating(true)}>
            Add Variant
          </Button>
        )}
      </div>

      {/* Create form */}
      {isCreating && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., 30 Count"
              required
            />
            <FormField
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Optional"
            />
            <FormField
              label="Price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
            <FormField
              label="Compare At"
              type="number"
              step="0.01"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(e.target.value)}
              placeholder="Optional"
            />
            <FormField
              label="Stock Qty"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="0"
            />
            <FormField
              label="Servings"
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="Optional"
            />
            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} isLoading={isPending} disabled={!name || !price}>
              Add Variant
            </Button>
          </div>
        </div>
      )}

      {/* Variants table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servings</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {variants.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No variants yet. Add your first variant.
                </td>
              </tr>
            ) : (
              variants.map((variant) => (
                <tr key={variant.id}>
                  {editingId === variant.id ? (
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
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                          <label className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={inStock}
                              onChange={(e) => setInStock(e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs">In Stock</span>
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={servings}
                          onChange={(e) => setServings(e.target.value)}
                          className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
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
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{variant.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{variant.sku || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ${variant.price.toFixed(2)}
                        {variant.compare_at_price && (
                          <span className="text-gray-400 line-through ml-1">
                            ${variant.compare_at_price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={variant.in_stock ? "text-green-600" : "text-red-600"}>
                          {variant.in_stock ? `${variant.stock_quantity} in stock` : "Out of stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{variant.servings || "—"}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(variant)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(variant.id)}
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
        title="Delete Variant"
        message="Are you sure you want to delete this variant?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}
