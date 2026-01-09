import { getAdminBlogPosts } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blog-categories";
import { BlogPostsClient } from "./BlogPostsClient";

export const dynamic = "force-dynamic";

export default async function BlogPostsPage() {
  const [posts, categories] = await Promise.all([
    getAdminBlogPosts(),
    getBlogCategories(),
  ]);

  return (
    <BlogPostsClient
      initialPosts={posts}
      categories={categories}
    />
  );
}
