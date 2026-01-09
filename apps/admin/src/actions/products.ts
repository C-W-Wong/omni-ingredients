"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

// Types
export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  category_id: string | null;
  category_name: string | null;
  is_active: boolean;
  variant_count: number;
  price_min: number;
  price_max: number;
  image_url: string | null;
  updated_at: string;
}

export interface AdminProductFull {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category_id: string | null;
  badge: string | null;
  other_ingredients: string | null;
  usage_instructions: string | null;
  warnings: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  variants: AdminVariant[];
  images: AdminImage[];
  ingredients: AdminIngredient[];
  benefits: AdminBenefit[];
}

export interface AdminVariant {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  compare_at_price: number | null;
  in_stock: boolean;
  stock_quantity: number;
  servings: number | null;
  display_order: number;
}

export interface AdminImage {
  id: string;
  url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
}

export interface AdminIngredient {
  id: string;
  name: string;
  amount: string;
  daily_value: string | null;
  display_order: number;
}

export interface AdminBenefit {
  id: string;
  benefit: string;
  display_order: number;
}

// Get all products (admin view)
export async function getAdminProducts(
  search?: string,
  categoryId?: string,
  status?: "active" | "inactive" | "all"
): Promise<AdminProduct[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("products")
    .select(`
      id,
      slug,
      name,
      tagline,
      category_id,
      is_active,
      updated_at,
      categories (name),
      product_variants (price),
      product_images (url, is_primary)
    `)
    .order("updated_at", { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%,tagline.ilike.%${search}%`);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (status === "active") {
    query = query.eq("is_active", true);
  } else if (status === "inactive") {
    query = query.eq("is_active", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data || []).map((product) => {
    const variants = product.product_variants || [];
    const images = product.product_images || [];
    const primaryImage = images.find((img: { is_primary: boolean }) => img.is_primary) || images[0];
    const prices = variants.map((v: { price: number }) => v.price);
    const category = product.categories as unknown as { name: string } | null;

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      category_id: product.category_id,
      category_name: category?.name || null,
      is_active: product.is_active,
      variant_count: variants.length,
      price_min: prices.length > 0 ? Math.min(...prices) : 0,
      price_max: prices.length > 0 ? Math.max(...prices) : 0,
      image_url: primaryImage?.url || null,
      updated_at: product.updated_at,
    };
  });
}

// Get single product by ID
export async function getAdminProductById(id: string): Promise<AdminProductFull | null> {
  const supabase = createAdminClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (*),
      product_images (*),
      product_ingredients (*),
      product_benefits (*)
    `)
    .eq("id", id)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    return null;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    category_id: product.category_id,
    badge: product.badge,
    other_ingredients: product.other_ingredients,
    usage_instructions: product.usage_instructions,
    warnings: product.warnings,
    is_active: product.is_active,
    created_at: product.created_at,
    updated_at: product.updated_at,
    variants: (product.product_variants || [])
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order),
    images: (product.product_images || [])
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order),
    ingredients: (product.product_ingredients || [])
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order),
    benefits: (product.product_benefits || [])
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order),
  };
}

// Create product
export async function createProduct(data: {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  category_id?: string;
  badge?: string;
  other_ingredients?: string;
  usage_instructions?: string;
  warnings?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: data.name,
      slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
      tagline: data.tagline || null,
      description: data.description || null,
      category_id: data.category_id || null,
      badge: data.badge || null,
      other_ingredients: data.other_ingredients || null,
      usage_instructions: data.usage_instructions || null,
      warnings: data.warnings || null,
      is_active: false, // New products start as inactive
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating product:", error);
    if (error.code === "23505") {
      return { success: false, error: "A product with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true, id: product.id };
}

// Update product
export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    category_id?: string | null;
    badge?: string;
    other_ingredients?: string;
    usage_instructions?: string;
    warnings?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
  if (data.tagline !== undefined) updateData.tagline = data.tagline || null;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.category_id !== undefined) updateData.category_id = data.category_id || null;
  if (data.badge !== undefined) updateData.badge = data.badge || null;
  if (data.other_ingredients !== undefined) updateData.other_ingredients = data.other_ingredients || null;
  if (data.usage_instructions !== undefined) updateData.usage_instructions = data.usage_instructions || null;
  if (data.warnings !== undefined) updateData.warnings = data.warnings || null;

  const { error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    if (error.code === "23505") {
      return { success: false, error: "A product with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return { success: true };
}

// Delete product
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

// Toggle product status
export async function toggleProductStatus(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("products")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    console.error("Error toggling product status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return { success: true };
}

// === VARIANT ACTIONS ===

export async function createVariant(
  productId: string,
  data: {
    name: string;
    sku?: string;
    price: number;
    compare_at_price?: number;
    in_stock?: boolean;
    stock_quantity?: number;
    servings?: number;
  }
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  // Get highest display_order
  const { data: lastVariant } = await supabase
    .from("product_variants")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = (lastVariant?.display_order ?? -1) + 1;

  const { data: variant, error } = await supabase
    .from("product_variants")
    .insert({
      product_id: productId,
      name: data.name,
      sku: data.sku || null,
      price: data.price,
      compare_at_price: data.compare_at_price || null,
      in_stock: data.in_stock ?? true,
      stock_quantity: data.stock_quantity ?? 0,
      servings: data.servings || null,
      display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating variant:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true, id: variant.id };
}

export async function updateVariant(
  id: string,
  data: {
    name?: string;
    sku?: string;
    price?: number;
    compare_at_price?: number | null;
    in_stock?: boolean;
    stock_quantity?: number;
    servings?: number | null;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_variants")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating variant:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

export async function deleteVariant(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting variant:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

// === IMAGE ACTIONS ===

export async function addProductImage(
  productId: string,
  data: { url: string; alt_text?: string; is_primary?: boolean }
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  // Get highest display_order
  const { data: lastImage } = await supabase
    .from("product_images")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = (lastImage?.display_order ?? -1) + 1;

  // If this is set as primary, unset other primary images
  if (data.is_primary) {
    await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", productId);
  }

  const { data: image, error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      url: data.url,
      alt_text: data.alt_text || null,
      display_order,
      is_primary: data.is_primary ?? display_order === 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error adding image:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true, id: image.id };
}

export async function updateProductImage(
  id: string,
  data: { alt_text?: string; is_primary?: boolean }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // If setting as primary, first get product_id and unset other primaries
  if (data.is_primary) {
    const { data: image } = await supabase
      .from("product_images")
      .select("product_id")
      .eq("id", id)
      .single();

    if (image) {
      await supabase
        .from("product_images")
        .update({ is_primary: false })
        .eq("product_id", image.product_id);
    }
  }

  const { error } = await supabase
    .from("product_images")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating image:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

export async function deleteProductImage(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

// === INGREDIENT ACTIONS ===

export async function createIngredient(
  productId: string,
  data: { name: string; amount: string; daily_value?: string }
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  // Get highest display_order
  const { data: lastIngredient } = await supabase
    .from("product_ingredients")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = (lastIngredient?.display_order ?? -1) + 1;

  const { data: ingredient, error } = await supabase
    .from("product_ingredients")
    .insert({
      product_id: productId,
      name: data.name,
      amount: data.amount,
      daily_value: data.daily_value || null,
      display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating ingredient:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true, id: ingredient.id };
}

export async function updateIngredient(
  id: string,
  data: { name?: string; amount?: string; daily_value?: string | null }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_ingredients")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating ingredient:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

export async function deleteIngredient(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_ingredients")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting ingredient:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

// === BENEFIT ACTIONS ===

export async function createBenefit(
  productId: string,
  benefit: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createAdminClient();

  // Get highest display_order
  const { data: lastBenefit } = await supabase
    .from("product_benefits")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = (lastBenefit?.display_order ?? -1) + 1;

  const { data: newBenefit, error } = await supabase
    .from("product_benefits")
    .insert({
      product_id: productId,
      benefit,
      display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating benefit:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true, id: newBenefit.id };
}

export async function updateBenefit(
  id: string,
  benefit: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_benefits")
    .update({ benefit })
    .eq("id", id);

  if (error) {
    console.error("Error updating benefit:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}

export async function deleteBenefit(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("product_benefits")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting benefit:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}
