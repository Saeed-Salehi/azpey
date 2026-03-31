"use client";

import * as React from "react";

import type { CartItem } from "@/types/commerce";

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  addItem: (productId: string, quantity?: number) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CART_KEY = "azpey_cart";

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      setItems(parsed);
    } catch {
      setItems([]);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const value = React.useMemo<CartContextValue>(() => {
    return {
      items,
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (productId, quantity = 1) => {
        setItems((prev) => {
          const index = prev.findIndex((item) => item.productId === productId);
          if (index === -1) return [...prev, { productId, quantity }];
          const next = [...prev];
          next[index] = {
            ...next[index],
            quantity: next[index].quantity + quantity,
          };
          return next;
        });
      },
      updateItem: (productId, quantity) => {
        setItems((prev) =>
          prev
            .map((item) =>
              item.productId === productId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

