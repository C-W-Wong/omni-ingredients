import { getAdminProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { ProductsClient } from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories(),
  ]);

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
    />
  );
}
