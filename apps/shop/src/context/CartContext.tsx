"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { createClient } from "@omm/supabase/client";
import { useAuth } from "./AuthContext";
import type { CartItem, CartContextType } from "@omm/types";

const STORAGE_KEY = "omni-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  // Hydrate from localStorage or Supabase on mount
  useEffect(() => {
    const initializeCart = async () => {
      if (user) {
        // User is logged in - fetch from Supabase
        await fetchCartFromSupabase();
      } else {
        // User is not logged in - use localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            setItems(JSON.parse(stored));
          } catch {
            console.error("Failed to parse cart from localStorage");
          }
        }
      }
      setIsHydrated(true);
    };

    initializeCart();
  }, [user]);

  // Fetch cart from Supabase
  const fetchCartFromSupabase = useCallback(async () => {
    if (!user) return;

    try {
      // Get or create cart for user
      let { data: cart } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (!cart) {
        const { data: newCart } = await supabase
          .from("carts")
          .insert({ user_id: user.id, status: "active" })
          .select("id")
          .single();
        cart = newCart;
      }

      if (!cart) return;

      // Get cart items with product and variant details
      const { data: cartItems } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          quantity,
          added_at,
          products (
            id,
            name,
            product_images (
              url,
              is_primary
            )
          ),
          product_variants (
            id,
            name,
            price,
            compare_at_price
          )
        `
        )
        .eq("cart_id", cart.id);

      if (cartItems) {
        const transformedItems: CartItem[] = cartItems.map((item) => {
          const product = item.products as unknown as {
            id: string;
            name: string;
            product_images: { url: string; is_primary: boolean }[];
          };
          const variant = item.product_variants as unknown as {
            id: string;
            name: string;
            price: number;
            compare_at_price?: number;
          };
          const primaryImage =
            product.product_images?.find((img) => img.is_primary) ||
            product.product_images?.[0];

          return {
            id: `${product.id}-${variant.id}`,
            productId: product.id,
            productName: product.name,
            productImage: primaryImage?.url || "",
            variant: {
              id: variant.id,
              name: variant.name,
              price: variant.price,
              compareAtPrice: variant.compare_at_price,
            },
            quantity: item.quantity,
            addedAt: new Date(item.added_at).getTime(),
          };
        });
        setItems(transformedItems);
      }
    } catch (error) {
      console.error("Error fetching cart from Supabase:", error);
    }
  }, [user, supabase]);

  // Sync to Supabase when logged in
  const syncToSupabase = useCallback(
    async (
      action: "add" | "update" | "remove" | "clear",
      itemData?: {
        productId?: string;
        variantId?: string;
        quantity?: number;
        itemId?: string;
      }
    ) => {
      if (!user || isSyncing) return;

      setIsSyncing(true);
      try {
        // Get or create cart
        let { data: cart } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (!cart) {
          const { data: newCart } = await supabase
            .from("carts")
            .insert({ user_id: user.id, status: "active" })
            .select("id")
            .single();
          cart = newCart;
        }

        if (!cart) return;

        switch (action) {
          case "add":
            if (itemData?.productId && itemData?.variantId) {
              // Check if item exists
              const { data: existing } = await supabase
                .from("cart_items")
                .select("id, quantity")
                .eq("cart_id", cart.id)
                .eq("variant_id", itemData.variantId)
                .single();

              if (existing) {
                await supabase
                  .from("cart_items")
                  .update({
                    quantity: existing.quantity + (itemData.quantity || 1),
                  })
                  .eq("id", existing.id);
              } else {
                await supabase.from("cart_items").insert({
                  cart_id: cart.id,
                  product_id: itemData.productId,
                  variant_id: itemData.variantId,
                  quantity: itemData.quantity || 1,
                });
              }
            }
            break;

          case "update":
            if (itemData?.variantId && itemData?.quantity !== undefined) {
              if (itemData.quantity < 1) {
                await supabase
                  .from("cart_items")
                  .delete()
                  .eq("cart_id", cart.id)
                  .eq("variant_id", itemData.variantId);
              } else {
                await supabase
                  .from("cart_items")
                  .update({ quantity: itemData.quantity })
                  .eq("cart_id", cart.id)
                  .eq("variant_id", itemData.variantId);
              }
            }
            break;

          case "remove":
            if (itemData?.variantId) {
              await supabase
                .from("cart_items")
                .delete()
                .eq("cart_id", cart.id)
                .eq("variant_id", itemData.variantId);
            }
            break;

          case "clear":
            await supabase.from("cart_items").delete().eq("cart_id", cart.id);
            break;
        }
      } catch (error) {
        console.error("Error syncing to Supabase:", error);
      } finally {
        setIsSyncing(false);
      }
    },
    [user, supabase, isSyncing]
  );

  // Persist to localStorage on changes (for non-logged-in users)
  useEffect(() => {
    if (isHydrated && !user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated, user]);

  // Merge localStorage cart to Supabase on login
  useEffect(() => {
    const mergeCartsOnLogin = async () => {
      if (user && isHydrated) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const localItems: CartItem[] = JSON.parse(stored);
            if (localItems.length > 0) {
              // Add local items to Supabase
              for (const item of localItems) {
                await syncToSupabase("add", {
                  productId: item.productId,
                  variantId: item.variant.id,
                  quantity: item.quantity,
                });
              }
              // Clear localStorage after merge
              localStorage.removeItem(STORAGE_KEY);
              // Refresh from Supabase
              await fetchCartFromSupabase();
            }
          } catch {
            console.error("Failed to merge cart on login");
          }
        } else {
          // Just fetch from Supabase if no local cart
          await fetchCartFromSupabase();
        }
      }
    };

    mergeCartsOnLogin();
  }, [user, isHydrated]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "id" | "addedAt">) => {
      const itemId = `${newItem.productId}-${newItem.variant.id}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity,
          };
          return updated;
        }

        return [...prevItems, { ...newItem, id: itemId, addedAt: Date.now() }];
      });

      // Sync to Supabase if logged in
      if (user) {
        syncToSupabase("add", {
          productId: newItem.productId,
          variantId: newItem.variant.id,
          quantity: newItem.quantity,
        });
      }
    },
    [user, syncToSupabase]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      // Sync to Supabase if logged in
      if (user && item) {
        syncToSupabase("remove", { variantId: item.variant.id });
      }
    },
    [user, items, syncToSupabase]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      const item = items.find((i) => i.id === itemId);

      if (quantity < 1) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }

      // Sync to Supabase if logged in
      if (user && item) {
        syncToSupabase("update", { variantId: item.variant.id, quantity });
      }
    },
    [user, items, syncToSupabase]
  );

  const clearCart = useCallback(() => {
    setItems([]);

    // Sync to Supabase if logged in
    if (user) {
      syncToSupabase("clear");
    }
  }, [user, syncToSupabase]);

  const isInCart = useCallback(
    (productId: string, variantId: string) => {
      return items.some((item) => item.id === `${productId}-${variantId}`);
    },
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
