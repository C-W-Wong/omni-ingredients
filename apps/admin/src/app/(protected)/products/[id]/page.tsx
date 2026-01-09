import { notFound } from "next/navigation";
import { getAdminProductById, toggleProductStatus } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { ProductForm } from "@/components/products";
import { StatusToggle } from "./StatusToggle";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-500">Last updated: {new Date(product.updated_at).toLocaleDateString()}</p>
        </div>
        <StatusToggle productId={product.id} isActive={product.is_active} />
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
