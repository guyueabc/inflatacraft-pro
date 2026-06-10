"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import {
  Share2,
  ExternalLink,
  Link as LinkIcon,
  Mail,
  Copy,
  Check,
  Clock,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Award,
  Ruler,
  Printer,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const related = getRelatedProducts(product, 4);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-navy-700">
              Products
            </Link>
            <span>/</span>
            <span className="font-medium text-navy-900 truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product hero */}
      <section className="container mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            {/* Main image */}
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-navy-100 to-navy-200">
              <img
                src={`${product.images[selectedImage]}?v=1`}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {/* Badges */}
              <div className="absolute left-4 top-4 flex gap-2">
                {product.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}
                {product.isCustom && (
                  <span className="rounded-full bg-navy-700 px-3 py-1 text-xs font-semibold text-white">
                    Custom
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-gradient-to-br from-navy-100 to-navy-200 transition-all",
                    selectedImage === idx
                      ? "border-navy-700"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  <img
                    src={`${img}?v=1`}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                {product.category}
              </span>
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              {product.name}
            </h1>

            <p className="mb-6 text-base leading-relaxed text-gray-600">
              {product.longDescription || product.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              {product.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-navy-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <p className="text-lg font-semibold text-red-700">
                    Custom Quote Required
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    This is a fully custom product. Pricing varies based on size, materials, and complexity.
                  </p>
                </div>
              )}
            </div>

            {/* Add to Cart or Quote */}
            <div className="mb-8">
              {product.price && !product.isCustom ? (
                <AddToCartButton
                  productId={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  isCustom={false}
                  variant="large"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`/get-quote?product=${encodeURIComponent(product.name)}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
                  >
                    Get Custom Quote
                  </a>
                  {product.price && (
                    <AddToCartButton
                      productId={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.images[0]}
                      isCustom={false}
                      variant="large"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Quick highlights */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              {product.leadTime && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                  <Clock className="h-5 w-5 text-navy-600" />
                  <div>
                    <p className="text-xs text-gray-500">Lead Time</p>
                    <p className="text-sm font-semibold text-navy-900">
                      {product.leadTime}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                <Truck className="h-5 w-5 text-navy-600" />
                <div>
                  <p className="text-xs text-gray-500">Shipping</p>
                  <p className="text-sm font-semibold text-navy-900">
                    Free over $500
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                <ShieldCheck className="h-5 w-5 text-navy-600" />
                <div>
                  <p className="text-xs text-gray-500">Warranty</p>
                  <p className="text-sm font-semibold text-navy-900">
                    1 Year
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                <Award className="h-5 w-5 text-navy-600" />
                <div>
                  <p className="text-xs text-gray-500">Made In</p>
                  <p className="text-sm font-semibold text-navy-900">USA</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              {shareOpen && (
                <div className="absolute left-0 top-12 z-20 flex gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    aria-label="Share on Facebook"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-sky-50 hover:text-sky-600"
                    aria-label="Share on Twitter"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Share on LinkedIn"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(shareUrl)}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Share via Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy-700"
                    aria-label="Copy link"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Technical Specifications
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr
                    key={key}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="w-64 px-6 py-4 text-sm font-semibold text-navy-900 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: RotateCcw,
                title: "Satisfaction Guarantee",
                desc: "Not satisfied? We'll make it right. 100% satisfaction guaranteed.",
              },
              {
                icon: ShieldCheck,
                title: "1 Year Warranty",
                desc: "All products covered against manufacturing defects for 12 months.",
              },
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "Complimentary shipping on all orders over $500 within the continental US.",
              },
              {
                icon: Printer,
                title: "Free 3D Renderings",
                desc: "See your design before production with complimentary digital mockups.",
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center"
              >
                <badge.icon className="mb-3 h-8 w-8 text-navy-600" />
                <h3 className="mb-1 text-sm font-semibold text-navy-900">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-navy-100 to-navy-200">
                    <div className="flex h-full items-center justify-center text-navy-400">
                      <svg
                        className="h-12 w-12 opacity-30"
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
                    <span className="absolute left-2 top-2 rounded-full bg-navy-700/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {rp.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-1 text-sm font-semibold text-navy-900 line-clamp-2">
                      {rp.name}
                    </h3>
                    <div className="mt-auto pt-2">
                      {rp.price ? (
                        <span className="text-base font-bold text-navy-900">
                          {formatPrice(rp.price)}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-red-600">
                          Custom Quote
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
