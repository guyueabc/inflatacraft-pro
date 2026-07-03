"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Megaphone, Store, Gamepad2, Shirt, Lightbulb } from "lucide-react";

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
    title: "Cold-Air Advertising Inflatables",
    description: "Giant product replicas, outdoor brand displays",
    icon: Megaphone,
    href: "/products?category=replica",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg",
    placeholderLabel: "Advertising",
    buyerConcerns: "Shape accuracy, blower sizing, anchoring",
  },
  {
    title: "Commercial Advertising Inflatables",
    description: "Arches, tents, retail promotion",
    icon: Store,
    href: "/products?category=arch",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
    placeholderLabel: "Commercial",
    buyerConcerns: "Fast setup, brand printing, public event safety",
  },
  {
    title: "Amusement & Rental Inflatables",
    description: "Bounce houses, slides, obstacle courses",
    icon: Gamepad2,
    href: "/products?category=game",
    imageSrc: "/images/products/inflatable-obstacle-course/inflatable-obstacle-course-1.jpg",
    placeholderLabel: "Amusement",
    buyerConcerns: "Children safety, inspection, ASTM/EN documentation",
  },
  {
    title: "Wearable Inflatable Costumes",
    description: "Mascot costumes, brand characters",
    icon: Shirt,
    href: "/products?category=costume",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg",
    placeholderLabel: "Costume",
    buyerConcerns: "Visibility, ventilation, battery",
  },
  {
    title: "Custom Inflatables",
    description: "Mascots, custom shapes",
    icon: Lightbulb,
    href: "/products?category=mascot",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg",
    placeholderLabel: "Custom",
    buyerConcerns: "Custom design, 3D preview, material options",
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
              {/* Product image with icon+label fallback */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={category.imageSrc}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 transition-colors group-hover:text-navy-600">
                  <category.icon className="h-10 w-10" />
                  <span className="text-sm font-medium">{category.placeholderLabel}</span>
                </div>
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
