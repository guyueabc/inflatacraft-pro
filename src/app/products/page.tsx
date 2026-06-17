"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  products,
  CATEGORIES,
  SORT_OPTIONS,
  LEAD_TIMES,
  type ProductCategory,
} from "@/lib/data/products";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ArrowUpDown,
  Tag,
  Clock,
  Star,
} from "lucide-react";

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedLeadTime, setSelectedLeadTime] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  
  // Read ?category= from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("category");
    if (catParam) {
      const map: Record<string, ProductCategory> = {
        replica: "Giant Product Replicas",
        mascot: "Inflatable Mascots",
        arch: "Inflatable Arches",
        costume: "Inflatable Costumes",
        tent: "Inflatable Tents",
        game: "Inflatable Games",
      };
      const cat = map[catParam.toLowerCase()];
      if (cat) setSelectedCategories([cat]);
    }
  }, []); // eslint-disable-line

const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }


    // Lead time filter
    if (selectedLeadTime) {
      filtered = filtered.filter((p) => p.leadTime?.startsWith(selectedLeadTime));
    }

    // Sort
    switch (sort) {
      case "newest":
        filtered.reverse();
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [search, selectedCategories, selectedLeadTime, sort]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
selectedLeadTime !== null ||
    search.trim().length > 0;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLeadTime(null);
  };

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
            Browse our complete catalog of custom inflatables — from giant product replicas
            to interactive games. Every product is made in the USA with premium materials.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[73px] z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-4 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 sm:flex-1">
              <ArrowUpDown className="h-4 w-4 text-gray-400 shrink-0" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-2 pr-8 text-sm font-medium text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 sm:w-auto"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded-l-md p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-navy-700 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-r-md p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-navy-700 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors lg:hidden",
                mobileFiltersOpen
                  ? "border-navy-700 bg-navy-700 text-white"
                  : "border-gray-300 text-navy-700 hover:bg-gray-50"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "w-64 shrink-0 lg:block",
              mobileFiltersOpen ? "fixed inset-0 z-40 block bg-white p-6 pt-20" : "hidden"
            )}
          >
            {/* Mobile close */}
            {mobileFiltersOpen && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            <div className="space-y-6">
              {/* Active filters */}
              {hasActiveFilters && (
                <div>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-900">
                  <Tag className="h-4 w-4" />
                  Category
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="h-4 w-4 rounded border-gray-300 text-navy-700 accent-navy-700 focus:ring-navy-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Lead Time */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-900">
                  <Clock className="h-4 w-4" />
                  Lead Time
                </h3>
                <div className="space-y-1.5">
                  {LEAD_TIMES.map((lt) => (
                    <label
                      key={lt.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="lead-time"
                        checked={selectedLeadTime === lt.value}
                        onChange={() =>
                          setSelectedLeadTime(
                            selectedLeadTime === lt.value ? null : lt.value
                          )
                        }
                        className="h-4 w-4 border-gray-300 text-navy-700 accent-navy-700 focus:ring-navy-500"
                      />
                      {lt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile apply */}
            {mobileFiltersOpen && (
              <div className="mt-8">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full rounded-lg bg-navy-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-navy-900">
                  {filteredProducts.length}
                </span>{" "}
                product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              {hasActiveFilters && (
                <span className="rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-medium text-navy-700">
                  Filtered
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-semibold text-navy-900">
                  No products found
                </h3>
                <p className="mb-4 max-w-sm text-sm text-gray-500">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Product Grid */
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Product List */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
    >
      {/* Product image */}
      <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-100 to-navy-200">
        <img
          src={`${product.images[0]}?v=1`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-navy-700/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {product.category}
        </span>
        {/* Featured badge */}
        {product.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-base font-semibold text-navy-900 transition-colors group-hover:text-red-600 line-clamp-2">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-sm font-semibold text-red-600">
                Custom Quote
              </span>
          </div>
          <span className="rounded-lg border border-navy-300 px-3 py-1.5 text-xs font-semibold text-navy-700 transition-colors group-hover:border-navy-700 group-hover:bg-navy-700 group-hover:text-white">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductListItem({ product }: { product: (typeof products)[number] }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex gap-6 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative h-36 w-48 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-navy-100 to-navy-200">
        <img
          src={`${product.images[0]}?v=1`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="absolute left-2 top-2 rounded-full bg-navy-700/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-navy-900 transition-colors group-hover:text-red-600">
              {product.name}
            </h3>
            {product.featured && (
              <Star className="h-4 w-4 fill-red-500 text-red-500" />
            )}
          </div>
          <p className="mb-2 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-red-600">
                Custom Quote
              </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {product.leadTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {product.leadTime}
              </span>
            )}
            <span className="rounded-lg border border-navy-300 px-3 py-1.5 text-xs font-semibold text-navy-700 transition-colors group-hover:border-navy-700 group-hover:bg-navy-700 group-hover:text-white">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
