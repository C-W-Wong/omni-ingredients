import { getBlogCategories } from "@/actions/blog-categories";
import { BlogCategoriesClient } from "./BlogCategoriesClient";

export const dynamic = "force-dynamic";

export default async function BlogCategoriesPage() {
  const categories = await getBlogCategories();

  return <BlogCategoriesClient initialCategories={categories} />;
}
