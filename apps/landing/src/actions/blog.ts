"use server";

import { createClient } from "@omm/supabase/server";
import type { BlogPost } from "@omm/types";

// Get all blog posts
export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select(
      `
      slug,
      title,
      excerpt,
      content,
      featured_image_url,
      read_time,
      is_featured,
      published_at,
      blog_categories (
        name
      ),
      authors (
        name
      )
    `
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (category) {
    query = query.eq("blog_categories.slug", category.toLowerCase());
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  if (!posts || posts.length === 0) {
    return [];
  }

  return posts.map((post) => {
    const blogCategory = post.blog_categories as unknown as { name: string } | null;
    const authorData = post.authors as unknown as { name: string } | null;

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      category: blogCategory?.name || "",
      image: post.featured_image_url || "",
      date: post.published_at
        ? new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
      readTime: post.read_time || 5,
      featured: post.is_featured,
      author: authorData?.name || "Omni Ingredients Team",
    };
  });
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      `
      slug,
      title,
      excerpt,
      content,
      featured_image_url,
      read_time,
      is_featured,
      published_at,
      blog_categories (
        name
      ),
      authors (
        name
      )
    `
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !post) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  const blogCategory = post.blog_categories as unknown as { name: string } | null;
  const authorData = post.authors as unknown as { name: string } | null;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    content: post.content,
    category: blogCategory?.name || "",
    image: post.featured_image_url || "",
    date: post.published_at
      ? new Date(post.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: post.read_time || 5,
    featured: post.is_featured,
    author: authorData?.name || "Omni Ingredients Team",
  };
}

// Get related posts (excluding current post)
export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(
      `
      slug,
      title,
      excerpt,
      content,
      featured_image_url,
      read_time,
      is_featured,
      published_at,
      blog_categories (
        name
      ),
      authors (
        name
      )
    `
    )
    .eq("is_published", true)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  if (!posts || posts.length === 0) {
    return [];
  }

  return posts.map((post) => {
    const blogCategory = post.blog_categories as unknown as { name: string } | null;
    const authorData = post.authors as unknown as { name: string } | null;

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      category: blogCategory?.name || "",
      image: post.featured_image_url || "",
      date: post.published_at
        ? new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
      readTime: post.read_time || 5,
      featured: post.is_featured,
      author: authorData?.name || "Omni Ingredients Team",
    };
  });
}

// Get blog categories
export async function getBlogCategories(): Promise<
  { id: string; name: string; slug: string }[]
> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("blog_categories")
    .select("id, name, slug");

  if (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }

  return categories || [];
}
