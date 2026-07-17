import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { ProductGallery } from "@/components/products/product-gallery";
import { ShareButton } from "@/components/products/share-button";
import { ProductSchema } from "@/components/layout/ProductSchema";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const { products } = await import("@/lib/data/products");
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Custom Inflatable Product Type | InflatableModel`,
    description: product.description,
    alternates: { canonical: `https://qddjtx.com/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 4),
      type: "website",
    },
  };
}

const planningItems = [
  "Intended use and operating environment",
  "Approximate dimensions and available footprint",
  "Authorized artwork and visual references",
  "Required quantity, destination, and deadline",
  "Venue, electrical, anchoring, and document requirements",
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://qddjtx.com" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://qddjtx.com/products" },
              { "@type": "ListItem", position: 3, name: product.name },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <ProductSchema product={product} />
      <main className="min-h-screen bg-white pb-24 md:pb-0">
        <div className="border-b border-gray-200">
          <nav className="container mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-gray-500">
            <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span>
            <span className="truncate font-medium text-navy-900">{product.name}</span>
          </nav>
        </div>

        <section className="container mx-auto max-w-7xl px-4 py-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProductGallery images={product.images} name={product.name} />
            <div>
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">{product.category}</span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">{product.name}</h1>
              <p className="mt-5 text-base leading-relaxed text-gray-700">{product.description}</p>

              <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Images are visual references for this product type. They do not represent a verified customer case,
                    endorsement, exact specification, inventory item, certification, performance result, or guaranteed deliverable.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-gray-200 p-5">
                <h2 className="text-lg font-bold text-navy-900">Information needed for review</h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  {planningItems.map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/get-quote" className="rounded-lg bg-red-600 px-7 py-3 text-center font-semibold text-white hover:bg-red-500">Request a Custom Quote</Link>
                <a href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-300 px-7 py-3 text-center font-semibold text-navy-900 hover:bg-gray-50">WhatsApp</a>
              </div>
              <div className="mt-5"><ShareButton productName={product.name} /></div>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Project-specific confirmation</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Final dimensions, material, printing, accessories, blower, electrical configuration, anchoring, documentation,
              production location, inspection scope, price, schedule, warranty if any, shipping, and delivery terms are only
              those stated in the approved quotation or written order documents.
            </p>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto max-w-7xl px-4">
              <h2 className="mb-7 text-2xl font-bold text-navy-900">Related Product Types</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <Link key={item.id} href={`/products/${item.slug}`} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md">
                    <div className="aspect-[4/3] bg-gray-100"><Image src={`${item.images[0]}?v=1`} alt={`${item.name} visual reference`} className="h-full w-full object-contain" width={800} height={600} unoptimized /></div>
                    <div className="p-4"><h3 className="font-semibold text-navy-900">{item.name}</h3><p className="mt-1 text-xs text-gray-500">Custom quote required</p></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
