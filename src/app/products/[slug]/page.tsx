import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { ProductGallery } from "@/components/products/product-gallery";
import { ShareButton } from "@/components/products/share-button";
import {
  Clock,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Award,
  Printer,
} from "lucide-react";
import type { Metadata } from "next";

// Pre-generate all product pages at build time
export async function generateStaticParams() {
  const { products } = await import("@/lib/data/products");
  return products.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata for each product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name + " | InflatableModel",
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 4),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  // Product JSON-LD structured data (no price = custom quote product)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.slice(0, 10),
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "InflatableModel",
    },
    manufacturer: {
      "@type": "Organization",
      name: "InflatableModel",
    },
    productionDate: "2024",
    isSimilarTo: [],
  };

  // Product JSON-LD structured data
  return (
    <>
      {/* JSON-LD structured data for Google Rich Results + AI visibility */}

      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://qddjtx.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://qddjtx.com/products",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="min-h-screen bg-white pb-24 md:pb-0">
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
            {/* Image Gallery - Client Component */}
            <div>
              <div className="relative mb-4">
                <div className="absolute left-4 top-4 z-10 flex gap-2">
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
              <ProductGallery images={product.images} name={product.name} />
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

              {/* Quote CTA */}
              <div className="mb-6">
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <p className="text-lg font-semibold text-red-700">
                    Custom Quote Required
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    Pricing varies based on size, materials, and complexity. Contact us for a free quote.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`/get-quote?product=${encodeURIComponent(product.name)}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
                  >
                    Get Custom Quote
                  </a>
                </div>
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
                      Free over 
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

              {/* Share - Client Component */}
              <ShareButton productName={product.name} />
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
              <div className="overflow-x-auto -mx-4 sm:mx-0"><table className="w-full min-w-[320px] text-left">
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <td className="w-32 sm:w-64 px-3 sm:px-6 py-4 text-sm font-semibold text-navy-900 capitalize">
                        {key.replace(/([A-Z])/g, " ").trim()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
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
                  desc: "Complimentary shipping on all orders over  within the continental US.",
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
                      <img
                        src={`${rp.images[0]}?v=1`}
                        alt={rp.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-navy-700/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        {rp.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 text-sm font-semibold text-navy-900 line-clamp-2">
                        {rp.name}
                      </h3>
                      <div className="mt-auto pt-2">
                        <span className="text-xs font-semibold text-red-600">
                          Custom Quote
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      
        {/* Mobile: Fixed bottom CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
          <a
            href="/get-quote"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Get Free Quote &mdash; Free 3D Rendering
          </a>
        </div></div>
    </>
  );
}
