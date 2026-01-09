import { getCategories } from "@/actions/categories";
import { ProductForm } from "@/components/products";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Product</h2>
      <ProductForm categories={categories} />
    </div>
  );
}
