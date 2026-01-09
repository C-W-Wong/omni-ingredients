import { getBlogCategories } from "@/actions/blog-categories";
import { getAuthors } from "@/actions/authors";
import { BlogPostForm } from "@/components/blog";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const [categories, authors] = await Promise.all([
    getBlogCategories(),
    getAuthors(),
  ]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Blog Post</h2>
      <BlogPostForm categories={categories} authors={authors} />
    </div>
  );
}
