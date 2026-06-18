import { products } from "@/lib/data/products";
import { ProductListClient } from "@/components/products/product-list-client";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products Catalog | InflatableModel",
  description: "Browse our complete range of custom inflatables - giant product replicas, mascots, arches, costumes, tents, and interactive games. Made in USA.",
  openGraph: {
    title: "Products | InflatableModel",
    description: "Browse our complete range of custom inflatables.",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-medium text-red-400 uppercase tracking-wider">
            Catalog
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Our Products
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Browse our complete catalog of custom inflatables - from giant product replicas
            to interactive games. Every product is made in the USA with premium materials.
          </p>
        </div>
      </section>

      {/* Client-side interactive product list */}
      <ProductListClient />
    </div>
  );
}