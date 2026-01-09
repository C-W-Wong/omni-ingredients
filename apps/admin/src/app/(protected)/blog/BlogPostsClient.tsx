"use client";

import { useState, useTransition, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, SearchInput, StatusBadge, ConfirmDialog } from "@/components/ui";
import {
  AdminBlogPost,
  getAdminBlogPosts,
  deleteBlogPost,
  publishBlogPost,
  unpublishBlogPost,
  toggleBlogPostFeatured,
} from "@/actions/blog";
import { BlogCategory } from "@/actions/blog-categories";

interface BlogPostsClientProps {
  initialPosts: AdminBlogPost[];
  categories: BlogCategory[];
}

export function BlogPostsClient({ initialPosts, categories }: BlogPostsClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    startTransition(async () => {
      const data = await getAdminBlogPosts(
        value || undefined,
        categoryFilter || undefined,
        statusFilter
      );
      setPosts(data);
    });
  }, [categoryFilter, statusFilter]);

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    startTransition(async () => {
      const data = await getAdminBlogPosts(
        search || undefined,
        value || undefined,
        statusFilter
      );
      setPosts(data);
    });
  };

  const handleStatusChange = (value: "all" | "published" | "draft") => {
    setStatusFilter(value);
    startTransition(async () => {
      const data = await getAdminBlogPosts(
        search || undefined,
        categoryFilter || undefined,
        value
      );
      setPosts(data);
    });
  };

  const handleTogglePublish = (post: AdminBlogPost) => {
    startTransition(async () => {
      const result = post.is_published
        ? await unpublishBlogPost(post.id)
        : await publishBlogPost(post.id);

      if (result.success) {
        setPosts(
          posts.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  is_published: !post.is_published,
                  published_at: !post.is_published ? new Date().toISOString() : p.published_at,
                }
              : p
          )
        );
      }
    });
  };

  const handleToggleFeatured = (post: AdminBlogPost) => {
    startTransition(async () => {
      const result = await toggleBlogPostFeatured(post.id, !post.is_featured);
      if (result.success) {
        setPosts(
          posts.map((p) =>
            p.id === post.id ? { ...p, is_featured: !post.is_featured } : p
          )
        );
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteBlogPost(deleteId);
      if (result.success) {
        setPosts(posts.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
          <p className="text-sm text-gray-500">{posts.length} posts</p>
        </div>
        <Link href="/blog/new">
          <Button>
            <PlusIcon className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search posts..."
          className="sm:w-64"
        />
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value as typeof statusFilter)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No posts found
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/blog/${post.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {post.featured_image_url ? (
                            <img
                              src={post.featured_image_url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-500">{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.author_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.category_name || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={post.is_published ? "published" : "draft"} />
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        disabled={isPending}
                        className={`w-5 h-5 ${post.is_featured ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
                      >
                        <StarIcon filled={post.is_featured} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTogglePublish(post)}
                          disabled={isPending}
                        >
                          {post.is_published ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => router.push(`/blog/${post.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(post.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isPending}
      />
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ) : (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
