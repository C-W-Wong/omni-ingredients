export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  servings: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  dailyValue: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  badges: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  ingredients: Ingredient[];
  otherIngredients: string;
  benefits: string[];
  usage: string;
  warnings: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "best-selling"
  | "newest";

export interface Category {
  id: string;
  name: string;
  slug: string;
}
