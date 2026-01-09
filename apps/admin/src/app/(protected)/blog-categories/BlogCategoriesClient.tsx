"use client";

import { useState, useTransition } from "react";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import {
  BlogCategory,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "@/actions/blog-categories";

interface BlogCategoriesClientProps {
  initialCategories: BlogCategory[];
}

export function BlogCategoriesClient({ initialCategories }: BlogCategoriesClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setEditingId(null);
    setIsCreating(false);
    setError(null);
  };

  const startEdit = (category: BlogCategory) => {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
    setIsCreating(false);
    setError(null);
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (isCreating) {
      setSlug(generateSlug(value));
    }
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createBlogCategory({ name, slug });
      if (result.success) {
        window.location.reload();
      } else {
        setError(result.error || "Failed to create category");
      }
    });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    startTransition(async () => {
      const result = await updateBlogCategory(editingId, { name, slug });
      if (result.success) {
        setCategories(
          categories.map((c) =>
            c.id === editingId ? { ...c, name, slug } : c
          )
        );
        resetForm();
      } else {
        setError(result.error || "Failed to update category");
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteBlogCategory(deleteId);
      if (result.success) {
        setCategories(categories.filter((c) => c.id !== deleteId));
        setDeleteId(null);
      } else {
        setError(result.error || "Failed to delete category");
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Blog Categories</h2>
          <p className="text-sm text-gray-500">Manage blog post categories</p>
        </div>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)}>
            <PlusIcon className="w-4 h-4" />
            Add Category
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Wellness"
              required
            />
            <FormField
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., wellness"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleCreate} isLoading={isPending} disabled={!name || !slug}>
              Create Category
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No categories yet.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  {editingId === category.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(category)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(category.id)}
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
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
