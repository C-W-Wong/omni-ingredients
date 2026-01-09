"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
}

export async function getAuthors(): Promise<Author[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching authors:", error);
    return [];
  }

  return data || [];
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching author:", error);
    return null;
  }

  return data;
}

export async function createAuthor(data: {
  name: string;
  slug: string;
  bio?: string;
  avatar_url?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  const { data: author, error } = await supabase
    .from("authors")
    .insert({
      name: data.name,
      slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
      bio: data.bio || null,
      avatar_url: data.avatar_url || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating author:", error);
    if (error.code === "23505") {
      return { success: false, error: "An author with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/authors");
  return { success: true, id: author.id };
}

export async function updateAuthor(
  id: string,
  data: {
    name?: string;
    slug?: string;
    bio?: string;
    avatar_url?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
  if (data.bio !== undefined) updateData.bio = data.bio || null;
  if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url || null;

  const { error } = await supabase
    .from("authors")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating author:", error);
    if (error.code === "23505") {
      return { success: false, error: "An author with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/authors");
  revalidatePath(`/authors/${id}`);
  return { success: true };
}

export async function deleteAuthor(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Check if any posts use this author
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", id);

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete author: ${count} post(s) are using it`,
    };
  }

  const { error } = await supabase
    .from("authors")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting author:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/authors");
  return { success: true };
}
