"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }

  return data || [];
}

export async function createBlogCategory(data: {
  name: string;
  slug: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  const { data: category, error } = await supabase
    .from("blog_categories")
    .insert({
      name: data.name,
      slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating blog category:", error);
    if (error.code === "23505") {
      return { success: false, error: "A category with this name or slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/blog-categories");
  return { success: true, id: category.id };
}

export async function updateBlogCategory(
  id: string,
  data: { name?: string; slug?: string }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("blog_categories")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating blog category:", error);
    if (error.code === "23505") {
      return { success: false, error: "A category with this name or slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/blog-categories");
  return { success: true };
}

export async function deleteBlogCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Check if any posts use this category
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${count} post(s) are using it`,
    };
  }

  const { error } = await supabase
    .from("blog_categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog category:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog-categories");
  return { success: true };
}
