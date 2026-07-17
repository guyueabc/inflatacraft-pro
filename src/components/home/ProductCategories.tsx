"use client";
import Image from "next/image";

import Link from "next/link";
import { ArrowRight, Megaphone, Store, Gamepad2, Lightbulb } from "lucide-react";

interface Category {
  title: string;
  description: string;
  icon: typeof Megaphone;
  href: string;
  imageSrc: string;
  placeholderLabel: string;
  buyerConcerns: string;
}

const CATEGORIES: Category[] = [
  {
    title: "Inflatable Arch",
    description: "Giant product replicas, outdoor brand displays",
    icon: Megaphone,
    href: "/products/inflatable-arch",
    imageSrc: "/images/products/inflatable-arch/1.png",
    placeholderLabel: "Arch",
    buyerConcerns: "Shape accuracy, blower sizing, anchoring",
  },
  {
    title: "Inflatable Mascot",
    description: "Custom mascots, brand characters",
    icon: Lightbulb,
    href: "/products/inflatable-mascot",
    imageSrc: "/images/products/inflatable-mascot/1.jpg",
    placeholderLabel: "Mascot",
    buyerConcerns: "Custom design, 3D preview, material options",
  },
  {
    title: "Inflatable Bottle Replica",
    description: "Giant product replicas for brands",
    icon: Store,
    href: "/products/inflatable-bottle",
    imageSrc: "/images/products/inflatable-bottle/10.jpg",
    placeholderLabel: "Replica",
    buyerConcerns: "Shape accuracy, printing, indoor/outdoor",
  },
  {
    title: "Inflatable Bounce House",
    description: "Bounce houses, slides, obstacle courses",
    icon: Gamepad2,
    href: "/products/inflatable-bounce-house",
    imageSrc: "/images/products/inflatable-bounce-house/1.jpg",
    placeholderLabel: "Amusement",
    buyerConcerns: "Children safety, inspection, ASTM/EN documentation",
  },
  {
    title: "Inflatable Water Slide",
    description: "Water slides, interactive games",
    icon: Gamepad2,
    href: "/products/inflatable-water-slide",
    imageSrc: "/images/products/inflatable-water-slide/1.png",
    placeholderLabel: "Water Slide",
    buyerConcerns: "Safety, supervision, water supply",
  },
  {
    title: "Inflatable Camping Tent",
    description: "Event tents, camping tents, dome tents",
    icon: Store,
    href: "/products/inflatable-camping-tent",
    imageSrc: "/images/products/inflatable-camping-tent/1.jpg",
    placeholderLabel: "Tent",
    buyerConcerns: "Fast setup, brand printing, public event safety",
  },
];

export function ProductCategories() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl md:text-4xl">
            Explore Our Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From tabletop replicas to building-sized inflatables — whatever your
            brand needs, we build it.
          </p>
        </div>

        <div className="mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-navy-300 hover:shadow-lg"
            >
              {/* Product image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={category.imageSrc}
                  alt={category.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                width={800} height={600} unoptimized />
              </div>
              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-bold text-navy-900">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {category.description}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {category.buyerConcerns}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors group-hover:text-red-500">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
