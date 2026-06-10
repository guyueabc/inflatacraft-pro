"use client";

import { useState, useCallback } from "react";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number | null;
  image: string;
  isCustom?: boolean;
  variant?: "default" | "outline" | "large";
  className?: string;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  isCustom = false,
  variant = "default",
  className,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const [localQty, setLocalQty] = useState(1);
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  const existingItem = items.find((i) => i.productId === productId);
  const cartQty = existingItem?.quantity ?? 0;

  const handleAdd = useCallback(() => {
    if (isCustom) return;
    addItem({ productId, name, price, image, isCustom, quantity: localQty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [productId, name, price, image, isCustom, localQty, addItem]);

  if (!price && isCustom) {
    return (
      <a
        href={`/get-quote?product=${encodeURIComponent(name)}`}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95",
          className
        )}
      >
        Get Custom Quote
      </a>
    );
  }

  if (cartQty > 0) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-lg border-2 border-navy-700 bg-navy-700 text-white",
          className
        )}
      >
        <button
          type="button"
          onClick={() => updateQuantity(productId, cartQty - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-l-md transition-colors hover:bg-navy-600"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-10 w-10 items-center justify-center text-sm font-semibold tabular-nums">
          {cartQty}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(productId, cartQty + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-r-md transition-colors hover:bg-navy-600"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Quantity selector + Add button
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-300 bg-white">
          <button
            type="button"
            onClick={() => setLocalQty(Math.max(1, localQty - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-l-md text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={localQty}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (v > 0) setLocalQty(v);
            }}
            className="h-10 w-12 border-x border-gray-300 text-center text-sm font-medium text-navy-900 [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min={1}
            aria-label="Quantity"
          />
          <button
            type="button"
            onClick={() => setLocalQty(localQty + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-r-md text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all active:scale-95",
          added
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white hover:bg-red-700",
          variant === "large" && "px-8 py-4 text-base"
        )}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
