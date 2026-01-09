"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category_id: string | null;
  category_name: string | null;
  author_id: string | null;
  author_name: string | null;
  featured_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface AdminBlogPostFull {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  author_id: string | null;
  featured_image_url: string | null;
  read_time: number | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export async function getAdminBlogPosts(
  search?: string,
  categoryId?: string,
  status?: "published" | "draft" | "all"
): Promise<AdminBlogPost[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("blog_posts")
    .select(`
      id,
      slug,
      title,
      excerpt,
      category_id,
      author_id,
      featured_image_url,
      is_featured,
      is_published,
      published_at,
      created_at,
      blog_categories (name),
      authors (name)
    `)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (status === "published") {
    query = query.eq("is_published", true);
  } else if (status === "draft") {
    query = query.eq("is_published", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data || []).map((post) => {
    const category = post.blog_categories as unknown as { name: string } | null;
    const author = post.authors as unknown as { name: string } | null;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category_id: post.category_id,
      category_name: category?.name || null,
      author_id: post.author_id,
      author_name: author?.name || null,
      featured_image_url: post.featured_image_url,
      is_featured: post.is_featured,
      is_published: post.is_published,
      published_at: post.published_at,
      created_at: post.created_at,
    };
  });
}

export async function getAdminBlogPostById(id: string): Promise<AdminBlogPostFull | null> {
  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return post;
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category_id?: string;
  author_id?: string;
  featured_image_url?: string;
  read_time?: number;
  is_featured?: boolean;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      title: data.title,
      slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
      excerpt: data.excerpt || null,
      content: data.content,
      category_id: data.category_id || null,
      author_id: data.author_id || null,
      featured_image_url: data.featured_image_url || null,
      read_time: data.read_time || null,
      is_featured: data.is_featured ?? false,
      is_published: false,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    if (error.code === "23505") {
      return { success: false, error: "A post with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  return { success: true, id: post.id };
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category_id?: string | null;
    author_id?: string | null;
    featured_image_url?: string;
    read_time?: number;
    is_featured?: boolean;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.slug !== undefined) updateData.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt || null;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.category_id !== undefined) updateData.category_id = data.category_id || null;
  if (data.author_id !== undefined) updateData.author_id = data.author_id || null;
  if (data.featured_image_url !== undefined) updateData.featured_image_url = data.featured_image_url || null;
  if (data.read_time !== undefined) updateData.read_time = data.read_time || null;
  if (data.is_featured !== undefined) updateData.is_featured = data.is_featured;

  const { error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating blog post:", error);
    if (error.code === "23505") {
      return { success: false, error: "A post with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true };
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  return { success: true };
}

export async function publishBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      is_published: true,
      published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error publishing blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true };
}

export async function unpublishBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({ is_published: false })
    .eq("id", id);

  if (error) {
    console.error("Error unpublishing blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true };
}

export async function toggleBlogPostFeatured(
  id: string,
  isFeatured: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({ is_featured: isFeatured })
    .eq("id", id);

  if (error) {
    console.error("Error toggling featured:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true };
}
