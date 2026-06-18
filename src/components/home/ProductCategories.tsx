"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Box, Sparkles, TowerControl, Shirt, Tent, Gamepad2 } from "lucide-react";

interface Category {
  title: string;
  description: string;
  icon: typeof Box;
  href: string;
  imageSrc: string;
  placeholderLabel: string;
}

const CATEGORIES: Category[] = [
  {
    title: "Giant Product Replicas",
    description: "Turn your product into a skyscraper-sized attraction that dominates trade shows and retail launches.",
    icon: Box,
    href: "/products?category=replica",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg",
    placeholderLabel: "Product Replica",
  },
  {
    title: "Inflatable Mascots",
    description: "Custom character mascots that bring your brand personality to life at events and stadiums.",
    icon: Sparkles,
    href: "/products?category=mascot",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg",
    placeholderLabel: "Mascot",
  },
  {
    title: "Inflatable Arches",
    description: "Race-ready arches for finish lines, start gates, and branded entrances that command attention.",
    icon: TowerControl,
    href: "/products?category=arch",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
    placeholderLabel: "Arch",
  },
  {
    title: "Inflatable Costumes",
    description: "Wearable inflatable suits for street teams, halftime shows, and viral marketing stunts.",
    icon: Shirt,
    href: "/products?category=costume",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg",
    placeholderLabel: "Costume",
  },
  {
    title: "Inflatable Tents",
    description: "Custom-printed canopies and inflatable shelters for outdoor activations and sampling tours.",
    icon: Tent,
    href: "/products?category=tent",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg",
    placeholderLabel: "Tent",
  },
  {
    title: "Inflatable Games",
    description: "Interactive inflatables — obstacle courses, slides, and bounce houses for corporate events.",
    icon: Gamepad2,
    href: "/products?category=game",
    imageSrc: "/images/products/inflatable-obstacle-course/inflatable-obstacle-course-1.jpg",
    placeholderLabel: "Game",
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
