"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField } from "@/components/ui";
import { AdminProductFull, createProduct, updateProduct } from "@/actions/products";
import { Category } from "@/actions/categories";
import { VariantManager } from "./VariantManager";
import { ImageManager } from "./ImageManager";
import { IngredientManager } from "./IngredientManager";
import { BenefitManager } from "./BenefitManager";

interface ProductFormProps {
  product?: AdminProductFull;
  categories: Category[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "variants" | "images" | "ingredients" | "benefits">("details");

  // Form state
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [tagline, setTagline] = useState(product?.tagline || "");
  const [description, setDescription] = useState(product?.description || "");
  const [categoryId, setCategoryId] = useState(product?.category_id || "");
  const [badge, setBadge] = useState(product?.badge || "");
  const [otherIngredients, setOtherIngredients] = useState(product?.other_ingredients || "");
  const [usageInstructions, setUsageInstructions] = useState(product?.usage_instructions || "");
  const [warnings, setWarnings] = useState(product?.warnings || "");

  const isEditMode = !!product;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEditMode) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = () => {
    setError(null);

    startTransition(async () => {
      if (isEditMode) {
        const result = await updateProduct(product.id, {
          name,
          slug,
          tagline,
          description,
          category_id: categoryId || null,
          badge,
          other_ingredients: otherIngredients,
          usage_instructions: usageInstructions,
          warnings,
        });

        if (!result.success) {
          setError(result.error || "Failed to update product");
        }
      } else {
        const result = await createProduct({
          name,
          slug,
          tagline,
          description,
          category_id: categoryId || undefined,
          badge,
          other_ingredients: otherIngredients,
          usage_instructions: usageInstructions,
          warnings,
        });

        if (result.success && result.id) {
          router.push(`/products/${result.id}`);
        } else {
          setError(result.error || "Failed to create product");
        }
      }
    });
  };

  const tabs = [
    { id: "details", label: "Details" },
    ...(isEditMode
      ? [
          { id: "variants", label: `Variants (${product.variants.length})` },
          { id: "images", label: `Images (${product.images.length})` },
          { id: "ingredients", label: `Ingredients (${product.ingredients.length})` },
          { id: "benefits", label: `Benefits (${product.benefits.length})` },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "details" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Product name"
              required
            />
            <FormField
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="product-slug"
              helperText="URL-friendly identifier"
              required
            />
            <FormField
              label="Tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short product description"
            />
            <FormField
              as="select"
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </FormField>
            <FormField
              label="Badge"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g., Best Seller, New"
              helperText="Optional label shown on product"
            />
          </div>

          <FormField
            as="textarea"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full product description..."
          />

          <FormField
            as="textarea"
            label="Other Ingredients"
            value={otherIngredients}
            onChange={(e) => setOtherIngredients(e.target.value)}
            placeholder="Other ingredients not in the main list..."
          />

          <FormField
            as="textarea"
            label="Usage Instructions"
            value={usageInstructions}
            onChange={(e) => setUsageInstructions(e.target.value)}
            placeholder="How to use this product..."
          />

          <FormField
            as="textarea"
            label="Warnings"
            value={warnings}
            onChange={(e) => setWarnings(e.target.value)}
            placeholder="Safety warnings and precautions..."
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => router.push("/products")}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              isLoading={isPending}
              disabled={!name || !slug}
            >
              {isEditMode ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </div>
      )}

      {activeTab === "variants" && product && (
        <VariantManager productId={product.id} variants={product.variants} />
      )}

      {activeTab === "images" && product && (
        <ImageManager productId={product.id} images={product.images} />
      )}

      {activeTab === "ingredients" && product && (
        <IngredientManager productId={product.id} ingredients={product.ingredients} />
      )}

      {activeTab === "benefits" && product && (
        <BenefitManager productId={product.id} benefits={product.benefits} />
      )}
    </div>
  );
}
