"use client";

import { Header } from "@omm/ui/Header";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function ShopHeader() {
  const { user, isLoading, signOut } = useAuth();
  const { itemCount } = useCart();
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";
  const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

  return (
    <Header
      variant="shop"
      cartCount={itemCount}
      user={user}
      isLoading={isLoading}
      onSignOut={signOut}
      shopUrl={shopUrl}
      landingUrl={landingUrl}
    />
  );
}
