"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField } from "@/components/ui";
import { RichTextEditor } from "./RichTextEditor";
import { AdminBlogPostFull, createBlogPost, updateBlogPost } from "@/actions/blog";
import { BlogCategory } from "@/actions/blog-categories";
import { Author } from "@/actions/authors";

interface BlogPostFormProps {
  post?: AdminBlogPostFull;
  categories: BlogCategory[];
  authors: Author[];
}

export function BlogPostForm({ post, categories, authors }: BlogPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [categoryId, setCategoryId] = useState(post?.category_id || "");
  const [authorId, setAuthorId] = useState(post?.author_id || "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || "");
  const [readTime, setReadTime] = useState(post?.read_time?.toString() || "");
  const [isFeatured, setIsFeatured] = useState(post?.is_featured ?? false);

  const isEditMode = !!post;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditMode) {
      setSlug(generateSlug(value));
    }
  };

  const calculateReadTime = (text: string) => {
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / 200); // ~200 words per minute
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    const time = calculateReadTime(value);
    setReadTime(time.toString());
  };

  const handleSubmit = () => {
    setError(null);

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    startTransition(async () => {
      if (isEditMode) {
        const result = await updateBlogPost(post.id, {
          title,
          slug,
          excerpt,
          content,
          category_id: categoryId || null,
          author_id: authorId || null,
          featured_image_url: featuredImageUrl,
          read_time: readTime ? parseInt(readTime) : undefined,
          is_featured: isFeatured,
        });

        if (!result.success) {
          setError(result.error || "Failed to update post");
        }
      } else {
        const result = await createBlogPost({
          title,
          slug,
          excerpt,
          content,
          category_id: categoryId || undefined,
          author_id: authorId || undefined,
          featured_image_url: featuredImageUrl,
          read_time: readTime ? parseInt(readTime) : undefined,
          is_featured: isFeatured,
        });

        if (result.success && result.id) {
          router.push(`/blog/${result.id}`);
        } else {
          setError(result.error || "Failed to create post");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            required
          />
          <FormField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
            required
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
            as="select"
            label="Author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </FormField>
          <FormField
            label="Featured Image URL"
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            placeholder="https://..."
          />
          <FormField
            label="Read Time (minutes)"
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="Auto-calculated"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured post
            </label>
          </div>
        </div>

        <FormField
          as="textarea"
          label="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the post..."
          helperText="Shown in post listings"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <RichTextEditor content={content} onChange={handleContentChange} />
        </div>

        {featuredImageUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image Preview
            </label>
            <div className="w-64 h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={featuredImageUrl}
                alt="Featured"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={() => router.push("/blog")}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isPending}
            disabled={!title || !slug || !content}
          >
            {isEditMode ? "Save Changes" : "Create Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
