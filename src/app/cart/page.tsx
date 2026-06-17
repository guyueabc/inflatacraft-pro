"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCartStore, type CartItem } from "@/stores/cartStore";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  AlertCircle,
  Package,
  Truck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    getItemCount,
    getCustomItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();
  const customItemCount = getCustomItemCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-navy-100">
              <ShoppingBag className="h-10 w-10 text-navy-700" />
            </div>
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-navy-900">
              Your cart is empty
            </h1>
            <p className="mb-8 max-w-md text-center text-gray-500">
              Looks like you haven&apos;t added any products to your cart yet.
              Browse our catalog to find the perfect custom inflatable for your brand.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
            >
              <ShoppingCart className="h-5 w-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy-900 px-4 py-12 text-white">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="mt-1 text-gray-300">
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </section>

      {/* Custom items warning */}
      {customItemCount > 0 && (
        <div className="border-b border-yellow-200 bg-yellow-50">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-start gap-2 text-sm text-yellow-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Items marked as <strong>Custom Quote</strong> will be converted to a
                quote request at checkout. A sales representative will contact you
                with pricing within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items list */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition-colors hover:text-navy-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy-900">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-semibold text-navy-900">

                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="font-semibold text-navy-900">

                    </span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over $500. Add{" "}

                  </p>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="font-semibold text-navy-900">

                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-navy-900">Total</span>
                    <span className="font-bold text-navy-900">

                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
              >
                Proceed to Checkout
              </Link>

              {/* Trust signals */}
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="h-4 w-4 text-navy-600" />
                  Free shipping on orders over $500
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Package className="h-4 w-4 text-navy-600" />
                  Made in USA • 1 Year Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <Link
        href={`/products/${item.productId}`}
        className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-navy-100 to-navy-200"
      >
        <div className="flex h-full w-full items-center justify-center text-navy-400">
          <svg
            className="h-8 w-8 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-9.75h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        {item.isCustom && (
          <span className="absolute left-1.5 top-1.5 rounded bg-navy-700/80 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            Custom
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.productId}`}
              className="text-sm font-semibold text-navy-900 hover:text-red-600 line-clamp-1"
            >
              {item.name}
            </Link>
            <button
              onClick={() => onRemove(item.productId)}
              className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {item.isCustom ? (
            <span className="mt-1 inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              <AlertCircle className="h-3 w-3" />
              Custom Quote Item
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center rounded-lg border border-gray-300 bg-white">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-l-md text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold tabular-nums text-navy-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-r-md text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-sm font-semibold text-red-600">
              Quote Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
