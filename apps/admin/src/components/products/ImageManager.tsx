"use client";

import { useState, useTransition } from "react";
import { Button, FormField, ConfirmDialog } from "@/components/ui";
import {
  AdminImage,
  addProductImage,
  updateProductImage,
  deleteProductImage,
} from "@/actions/products";

interface ImageManagerProps {
  productId: string;
  images: AdminImage[];
}

export function ImageManager({ productId, images: initialImages }: ImageManagerProps) {
  const [images, setImages] = useState(initialImages);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");

  const resetForm = () => {
    setUrl("");
    setAltText("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    startTransition(async () => {
      const result = await addProductImage(productId, {
        url,
        alt_text: altText || undefined,
        is_primary: images.length === 0,
      });

      if (result.success) {
        window.location.reload();
      }
    });
  };

  const handleSetPrimary = (imageId: string) => {
    startTransition(async () => {
      const result = await updateProductImage(imageId, { is_primary: true });
      if (result.success) {
        setImages(
          images.map((img) => ({
            ...img,
            is_primary: img.id === imageId,
          }))
        );
      }
    });
  };

  const handleUpdateAlt = () => {
    if (!editingId) return;

    startTransition(async () => {
      const result = await updateProductImage(editingId, { alt_text: altText });
      if (result.success) {
        setImages(
          images.map((img) =>
            img.id === editingId ? { ...img, alt_text: altText } : img
          )
        );
        resetForm();
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteProductImage(deleteId);
      if (result.success) {
        setImages(images.filter((img) => img.id !== deleteId));
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Images</h3>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            Add Image
          </Button>
        )}
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <FormField
            label="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
          />
          <FormField
            label="Alt Text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image..."
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={resetForm} disabled={isPending}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd} isLoading={isPending} disabled={!url}>
              Add Image
            </Button>
          </div>
        </div>
      )}

      {/* Images grid */}
      {images.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          No images yet. Add your first image.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative bg-white rounded-lg border overflow-hidden group ${
                image.is_primary ? "border-green-500 ring-2 ring-green-500" : "border-gray-200"
              }`}
            >
              <div className="aspect-square">
                <img
                  src={image.url}
                  alt={image.alt_text || "Product image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {image.is_primary && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                  Primary
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!image.is_primary && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSetPrimary(image.id)}
                    disabled={isPending}
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(image.id);
                    setAltText(image.alt_text || "");
                  }}
                >
                  Edit Alt
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setDeleteId(image.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit alt text modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h4 className="font-medium text-gray-900">Edit Alt Text</h4>
            <FormField
              label="Alt Text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={resetForm} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleUpdateAlt} isLoading={isPending}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}
