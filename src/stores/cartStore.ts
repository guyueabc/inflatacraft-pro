"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number | null; // null for custom-quote items
  quantity: number;
  image: string;
  isCustom: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCustomItemCount: () => number;
}

function generateId(): string {
  return `cart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId
        );

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + (item.quantity ?? 1),
          };
          set({ items: newItems });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                id: generateId(),
                quantity: item.quantity ?? 1,
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getCustomItemCount: () => {
        return get().items.filter((i) => i.isCustom).length;
      },
    }),
    {
      name: "inflatacraft-cart",
    }
  )
);
