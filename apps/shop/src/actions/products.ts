"use server";

import { createClient } from "@omm/supabase/server";
import type {
  ShopProduct,
  Product,
  Review,
  SortOption,
} from "@omm/types";

// Get all products for shop listing
export async function getProducts(
  category?: string,
  sort: SortOption = "featured"
): Promise<ShopProduct[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      tagline,
      badge,
      categories (
        name
      ),
      product_variants (
        price,
        compare_at_price,
        in_stock
      ),
      product_images (
        url,
        is_primary
      )
    `
    )
    .eq("is_active", true);

  if (category) {
    query = query.eq("categories.slug", category.toLowerCase());
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  if (!products || products.length === 0) {
    return [];
  }

  // Transform database results to ShopProduct format
  const shopProducts: ShopProduct[] = products.map((product) => {
    const variants = product.product_variants || [];
    const images = product.product_images || [];
    const primaryImage = images.find((img: { is_primary: boolean }) => img.is_primary) || images[0];
    const minPriceVariant = variants.reduce(
      (min: { price: number; compare_at_price?: number } | null, v: { price: number; compare_at_price?: number }) =>
        !min || v.price < min.price ? v : min,
      null as { price: number; compare_at_price?: number } | null
    );
    const categoryData = product.categories as unknown as { name: string } | null;

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline || "",
      category: categoryData?.name || "",
      price: minPriceVariant?.price || 0,
      compareAtPrice: minPriceVariant?.compare_at_price,
      image: primaryImage?.url || "",
      badge: product.badge || undefined,
      rating: 0, // Will be calculated from reviews
      reviewCount: 0,
      inStock: variants.some((v: { in_stock: boolean }) => v.in_stock),
    };
  });

  // Sort products
  return sortProducts(shopProducts, sort);
}

// Get a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      tagline,
      description,
      badge,
      other_ingredients,
      usage_instructions,
      warnings,
      categories (
        name
      ),
      product_variants (
        id,
        name,
        price,
        compare_at_price,
        in_stock,
        servings,
        display_order
      ),
      product_images (
        id,
        url,
        alt_text,
        display_order,
        is_primary
      ),
      product_ingredients (
        name,
        amount,
        daily_value,
        display_order
      ),
      product_benefits (
        benefit,
        display_order
      )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    return null;
  }

  // Get reviews for this product
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  // Calculate average rating
  const reviewsList = reviews || [];
  const averageRating =
    reviewsList.length > 0
      ? reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length
      : 0;

  // Sort variants, images, ingredients, benefits by display_order
  const sortedVariants = (product.product_variants || []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );
  const sortedImages = (product.product_images || []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );
  const sortedIngredients = (product.product_ingredients || []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );
  const sortedBenefits = (product.product_benefits || []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline || "",
    description: product.description || "",
    category: (product.categories as unknown as { name: string } | null)?.name || "",
    badges: product.badge ? [product.badge] : [],
    images: sortedImages.map(
      (img: { id: string; url: string; alt_text: string }) => ({
        id: img.id,
        src: img.url,
        alt: img.alt_text || product.name,
      })
    ),
    variants: sortedVariants.map(
      (v: {
        id: string;
        name: string;
        price: number;
        compare_at_price?: number;
        in_stock: boolean;
        servings: number;
      }) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        compareAtPrice: v.compare_at_price,
        inStock: v.in_stock,
        servings: v.servings || 0,
      })
    ),
    ingredients: sortedIngredients.map(
      (i: { name: string; amount: string; daily_value: string }) => ({
        name: i.name,
        amount: i.amount,
        dailyValue: i.daily_value || "†",
      })
    ),
    otherIngredients: product.other_ingredients || "",
    benefits: sortedBenefits.map((b: { benefit: string }) => b.benefit),
    usage: product.usage_instructions || "",
    warnings: product.warnings || "",
    reviews: reviewsList.map((r) => ({
      id: r.id,
      author: r.author_name,
      rating: r.rating,
      date: new Date(r.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      title: r.title || "",
      content: r.content || "",
      verified: r.is_verified,
      helpful: r.helpful_count,
    })),
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviewsList.length,
  };
}

// Get product reviews with pagination
export async function getProductReviews(
  productId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ reviews: Review[]; total: number }> {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data: reviews, error, count } = await supabase
    .from("reviews")
    .select("*", { count: "exact" })
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], total: 0 };
  }

  return {
    reviews: (reviews || []).map((r) => ({
      id: r.id,
      author: r.author_name,
      rating: r.rating,
      date: new Date(r.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      title: r.title || "",
      content: r.content || "",
      verified: r.is_verified,
      helpful: r.helpful_count,
    })),
    total: count || 0,
  };
}

// Get categories
export async function getCategories(): Promise<
  { id: string; name: string; slug: string }[]
> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories || [];
}

// Helper function to sort products
function sortProducts(
  products: ShopProduct[],
  sortBy: SortOption
): ShopProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-selling":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort((a, b) =>
        a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0
      );
    case "featured":
    default:
      return sorted.sort((a, b) =>
        a.badge === "Best Seller" ? -1 : b.badge === "Best Seller" ? 1 : 0
      );
  }
}
