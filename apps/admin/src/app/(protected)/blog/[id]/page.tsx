import { notFound } from "next/navigation";
import { getAdminBlogPostById, publishBlogPost, unpublishBlogPost } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blog-categories";
import { getAuthors } from "@/actions/authors";
import { BlogPostForm } from "@/components/blog";
import { PublishToggle } from "./PublishToggle";

export const dynamic = "force-dynamic";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;
  const [post, categories, authors] = await Promise.all([
    getAdminBlogPostById(id),
    getBlogCategories(),
    getAuthors(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
          <p className="text-sm text-gray-500">
            Created: {new Date(post.created_at).toLocaleDateString()}
            {post.published_at && ` • Published: ${new Date(post.published_at).toLocaleDateString()}`}
          </p>
        </div>
        <PublishToggle postId={post.id} isPublished={post.is_published} />
      </div>
      <BlogPostForm post={post} categories={categories} authors={authors} />
    </div>
  );
}
