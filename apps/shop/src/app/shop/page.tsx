import { getProducts, getCategories } from "@/actions/products";
import ShopClient from "@/components/shop/ShopClient";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ShopClient initialProducts={products} categories={categories} />;
}
