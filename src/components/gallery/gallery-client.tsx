"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRight } from "lucide-react";

interface VisualReference {
  title: string;
  productType: string;
  description: string;
  imageSrc: string;
  href: string;
}

const REFERENCES: VisualReference[] = [
  {
    title: "Inflatable Beverage Can Reference",
    productType: "Product Replica",
    description: "Visual reference showing the general form and printed surface of an oversized beverage-can inflatable.",
    imageSrc: "/images/products/inflatable-bottle/10.jpg",
    href: "/products/inflatable-bottle",
  },
  {
    title: "Inflatable Entrance Arch Reference",
    productType: "Arch",
    description: "Visual reference for a customizable inflatable entrance or route marker.",
    imageSrc: "/images/products/inflatable-arch/1.png",
    href: "/products/inflatable-arch",
  },
  {
    title: "Inflatable Mascot Reference",
    productType: "Mascot",
    description: "Visual reference for a custom character or mascot-shaped inflatable.",
    imageSrc: "/images/products/inflatable-mascot/1.jpg",
    href: "/products/inflatable-mascot",
  },
  {
    title: "Inflatable Event Tent Reference",
    productType: "Tent",
    description: "Visual reference for a branded inflatable tent or temporary event space.",
    imageSrc: "/images/products/inflatable-camping-tent/1.jpg",
    href: "/products/inflatable-camping-tent",
  },
  {
    title: "Inflatable Dinosaur Reference",
    productType: "Character Display",
    description: "Visual reference showing a large dinosaur-shaped inflatable display.",
    imageSrc: "/images/products/inflatable-animals/充气恐龙_1.jpg",
    href: "/products/inflatable-animals",
  },
  {
    title: "Inflatable Movie Screen Reference",
    productType: "Event Equipment",
    description: "Visual reference for an inflatable projection-screen structure.",
    imageSrc: "/images/products/inflatable-movie-screen/1.jpg",
    href: "/products/inflatable-movie-screen",
  },
];

export function GalleryPageClient() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Visual References</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Custom Inflatable Product Gallery</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-300">
            Browse product-form and customization references. Unless expressly identified with supporting documentation,
            these images are not verified customer case studies, endorsements, or evidence of marketing results.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            Images are provided as visual references. Final dimensions, materials, colors, accessories, documentation,
            production details, and delivery terms are confirmed for each quoted configuration.
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCES.map((item, index) => (
              <motion.article
                key={item.title}
                data-testid="gallery-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-square bg-gray-100 p-3">
                  <SmartImage
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-600">{item.productType}</p>
                  <h2 className="mt-2 text-lg font-bold text-navy-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-500"
                  >
                    View product information <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white py-14">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-900">Need a Project-Specific Review?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Send your reference image, intended use, approximate dimensions, destination, and required deadline.
          </p>
          <Link
            href="/get-quote"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-500"
          >
            Request a Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
