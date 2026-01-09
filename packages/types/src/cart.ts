export interface CartItemVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variant: CartItemVariant;
  quantity: number;
  addedAt: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string) => boolean;
}
