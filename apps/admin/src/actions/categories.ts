"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  // Get the highest display_order
  const { data: lastCategory } = await supabase
    .from("categories")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = (lastCategory?.display_order ?? -1) + 1;

  const { data: category, error } = await supabase
    .from("categories")
    .insert({
      name: data.name,
      slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
      description: data.description || null,
      display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating category:", error);
    if (error.code === "23505") {
      return { success: false, error: "A category with this name or slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/categories");
  return { success: true, id: category.id };
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
  if (data.description !== undefined) updateData.description = data.description || null;

  const { error } = await supabase
    .from("categories")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating category:", error);
    if (error.code === "23505") {
      return { success: false, error: "A category with this name or slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/categories");
  return { success: true };
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Check if any products use this category
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${count} product(s) are using it`,
    };
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/categories");
  return { success: true };
}

export async function reorderCategories(
  items: { id: string; display_order: number }[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Update each category's display_order
  for (const item of items) {
    const { error } = await supabase
      .from("categories")
      .update({ display_order: item.display_order })
      .eq("id", item.id);

    if (error) {
      console.error("Error reordering categories:", error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/categories");
  return { success: true };
}
