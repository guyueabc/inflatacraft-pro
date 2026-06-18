"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  ChevronDown,
  HelpCircle,
  ShoppingCart,
  PenTool,
  Truck,
  Wrench,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

// 鈹€鈹€ Types 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

// 鈹€鈹€ Mock FAQ Data 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

const FAQ_DATA: FAQCategory[] = [
  {
    name: "General",
    icon: <HelpCircle className="h-5 w-5" />,
    items: [
      {
        id: "gen-1",
        question: "What is inflatablemodel?",
        answer:
          "inflatablemodel is a USA-based custom inflatable manufacturer specializing in giant product replicas, mascots, arches, costumes, and tents for B2B brands. We serve Fortune 500 companies, sports franchises, marketing agencies, and growing businesses that need high-impact brand activations. Every product is engineered in-house and built with premium materials in our US manufacturing facility.",
      },
      {
        id: "gen-2",
        question: "What industries do you serve?",
        answer:
          "We serve a wide range of industries including Food & Beverage, Automotive, Consumer Packaged Goods (CPG), Sports & Entertainment, Retail, Medical & Healthcare, Technology, and more. Our team has deep experience tailoring inflatable solutions to each industry's unique requirements 鈥?from food-grade materials for CPG sampling to medical-grade fabrics for healthcare campaigns.",
      },
      {
        id: "gen-3",
        question: "Where are your products manufactured?",
        answer:
          "All inflatablemodel products are designed, engineered, and manufactured in the United States. Our facility is located in the Midwest, allowing us to maintain rigorous quality control standards and offer fast turnaround times to clients across North America. We never outsource production overseas.",
      },
      {
        id: "gen-4",
        question: "Do you offer rush production?",
        answer:
          "Yes. Rush production is available for most product types at an additional fee. Typical rush timelines range from 7-14 days depending on product complexity and current production queue. Contact our sales team with your deadline and we'll let you know what's possible. We've delivered projects in as little as 5 days for urgent event needs.",
      },
      {
        id: "gen-5",
        question: "What makes inflatablemodel different from other manufacturers?",
        answer:
          "Three things: quality, speed, and partnership. We use premium materials (210D-500D fabrics, not the thin 70D used by budget manufacturers), we deliver in 2-6 weeks (not 8-16), and we provide free 3D renderings before you commit. Our engineering team actively suggests design improvements that make your inflatable more impactful and more durable. Every client gets a dedicated project manager from first sketch to final delivery.",
      },
    ],
  },
  {
    name: "Ordering & Quotes",
    icon: <ShoppingCart className="h-5 w-5" />,
    items: [
      {
        id: "order-1",
        question: "How do I get a quote?",
        answer:
          "Getting a quote is fast and free. Submit your project details through our online quote form at /get-quote, email us at inflatablemodel@showlovein.com, or call +86 15376427736. We'll need to know: the type of inflatable you want, approximate size, quantity, deadline, and any reference images. Most quotes are returned within 24 hours.",
      },
      {
        id: "order-2",
        question: "Do you offer free design consultations or renderings?",
        answer:
          "Absolutely. We provide free 3D renderings and design consultations with every quote request. Our design team will work with you to visualize your inflatable in your brand colors and context before you spend a dollar. We typically deliver initial renderings within 48 hours and iterate until you're completely satisfied.",
      },
      {
        id: "order-3",
        question: "What is the minimum order quantity?",
        answer:
          "There is no minimum order quantity. We produce single custom units as easily as we produce batches of hundreds. Whether you need one giant product replica for a flagship trade show or 500 branded tents for a nationwide rollout, we handle both with the same attention to detail.",
      },
      {
        id: "order-4",
        question: "How much do custom inflatables cost?",
        answer:
          "Pricing varies based on size, complexity, materials, and features. As a general guide: small inflatables (3-7 ft) range from $1,500-$4,000; medium (7-15 ft) from $3,000-$8,000; and large (15-30+ ft) from $8,000-$25,000+. Volume discounts apply for orders of 10+ units. Every quote includes a detailed line-item breakdown so you know exactly what you're paying for.",
      },
      {
        id: "order-5",
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers (ACH/wire), all major credit cards, and corporate purchase orders for approved accounts. Standard payment terms are 50% deposit to begin production and 50% before shipping. Net-30 terms are available for qualified corporate clients with established credit.",
      },
      {
        id: "order-6",
        question: "Can I see a sample before committing to full production?",
        answer:
          "Yes. We offer scaled prototype samples (typically 1/4 or 1/2 scale) for complex or high-quantity orders. This allows you to evaluate print quality, fabric feel, and construction before full-scale production begins. Sample costs are credited toward your final order if you proceed.",
      },
    ],
  },
  {
    name: "Design & Production",
    icon: <PenTool className="h-5 w-5" />,
    items: [
      {
        id: "design-1",
        question: "What information do you need to start a design?",
        answer:
          "To begin, we need: your brand logo files (vector format preferred 鈥?AI, EPS, SVG), any reference images or sketches of what you envision, desired dimensions, and your event or deployment context. If you don't have design files, our team can work from photos, hand sketches, or even verbal descriptions to create a design concept.",
      },
      {
        id: "design-2",
        question: "Can you match specific brand colors (Pantone)?",
        answer:
          "Yes. We use a professional color management system with Pantone matching for dye-sublimation printing. Provide your Pantone codes and we'll match them precisely. We also send physical color swatches for approval before full production to ensure accuracy, especially for corporate brand guidelines that require exact color reproduction.",
      },
      {
        id: "design-3",
        question: "What materials do you use?",
        answer:
          "We use premium-grade fabrics selected for durability and print quality: 210D Oxford Polyester for most standard inflatables, 300D Oxford Polyester for high-use commercial applications, and 500D Cordura Nylon for extreme-duty installations (like permanent outdoor displays or racing applications). All materials are UV-resistant, water-repellent, and fire-retardant certified.",
      },
      {
        id: "design-4",
        question: "How long does production take?",
        answer:
          "Standard production lead times are 2-6 weeks depending on product complexity and current order volume. Simple products like standard tents can ship in 2 weeks. Complex items like large product replicas with integrated lighting typically require 4-6 weeks. We'll give you a firm delivery date in your quote, and we have a 98% on-time delivery rate.",
      },
      {
        id: "design-5",
        question: "Can you integrate lighting, electronics, or mechanical features?",
        answer:
          "Yes. We offer internal and external LED lighting systems (RGB programmable options available), sound modules, motorized components, and interactive elements. Our engineering team can integrate nearly any feature you can imagine 鈥?inflatable products with blinking eyes, moving parts, synchronized music-reactive lighting, and more.",
      },
    ],
  },
  {
    name: "Shipping & Delivery",
    icon: <Truck className="h-5 w-5" />,
    items: [
      {
        id: "ship-1",
        question: "Do you ship internationally?",
        answer:
          "Yes. We ship worldwide. International shipping costs and timelines vary by destination and order size. We handle all customs documentation and can ship via air freight (fastest, 3-7 days), express courier (5-10 days), or ocean freight (most economical for large orders, 2-4 weeks). Duties and taxes are the responsibility of the buyer.",
      },
      {
        id: "ship-2",
        question: "How are inflatables packaged for shipping?",
        answer:
          "Every inflatable ships in a heavy-duty transport case designed for repeated use. Standard cases are reinforced nylon with wheels and handles. Premium hard cases (Pelican-style) are available for high-value orders. Each case includes the inflatable, blower/fan, repair kit, tie-down stakes, and a printed setup guide.",
      },
      {
        id: "ship-3",
        question: "What is the typical shipping cost?",
        answer:
          "Domestic US shipping typically ranges from $150-$500 depending on package size, weight, and destination. Most orders ship via FedEx Freight or LTL carrier. Shipping costs are included in your final quote, so there are no surprises. We can also accommodate will-call pickup at our manufacturing facility if you prefer.",
      },
      {
        id: "ship-4",
        question: "What happens if my order arrives damaged?",
        answer:
          "All shipments are fully insured. In the rare event of shipping damage, photograph the damage immediately and contact us within 48 hours. We'll file the insurance claim on your behalf and either repair or replace the damaged item at no cost to you. Rush replacement is available for time-sensitive event commitments.",
      },
      {
        id: "ship-5",
        question: "Do you offer drop-shipping to multiple locations?",
        answer:
          "Yes. For multi-location campaigns, we can drop-ship individual units directly to each destination. Each package includes everything the local team needs for setup. We've coordinated drop-shipments to 200+ locations simultaneously for national retail campaigns.",
      },
    ],
  },
  {
    name: "Maintenance & Care",
    icon: <Wrench className="h-5 w-5" />,
    items: [
      {
        id: "maint-1",
        question: "How do I clean my inflatable?",
        answer:
          "Clean your inflatable with mild soap and warm water using a soft cloth or sponge. Never use harsh chemicals, bleach, or pressure washers. For stubborn stains, a diluted solution of isopropyl alcohol can be used sparingly. Always allow the inflatable to dry completely before storing to prevent mildew. Detailed care instructions are included with every order.",
      },
      {
        id: "maint-2",
        question: "How should I store my inflatable when not in use?",
        answer:
          "Store your inflatable in a cool, dry place away from direct sunlight. Always deflate completely, fold gently (avoid sharp creases), and place in the provided storage bag or case. Do not store in attics or unconditioned spaces where extreme temperatures can degrade the fabric. Properly stored, our inflatables can last 5+ years.",
      },
      {
        id: "maint-3",
        question: "Can inflatables be repaired if they get damaged?",
        answer:
          "Yes. Every order includes a repair kit with adhesive patches, thread, and instructions for common field repairs. For more significant damage, we offer factory repair services 鈥?ship the item back to us and we'll restore it to like-new condition. Most repairs are completed within 5-7 business days.",
      },
      {
        id: "maint-4",
        question: "What is your warranty policy?",
        answer:
          "All inflatablemodel products come with a comprehensive warranty: 2 years on standard products (210D fabric), 3 years on premium products (300D+ fabric or 500D Cordura). The warranty covers manufacturing defects, seam failures, and print delamination under normal use. Blowers and electronic components carry a 1-year manufacturer warranty.",
      },
      {
        id: "maint-5",
        question: "Do you offer maintenance or refurbishment services?",
        answer:
          "Yes. We offer cleaning, inspection, and refurbishment services for existing inflatables 鈥?even those not originally manufactured by us. Our team can assess condition, perform necessary repairs, refresh faded printing, and replace worn components. Many clients send their inflatables for annual maintenance to keep them in peak condition.",
      },
      {
        id: "maint-6",
        question: "What's the lifespan of a custom inflatable?",
        answer:
          "With proper care, our inflatables typically last 3-7 years of regular use. Key factors affecting lifespan include frequency of use, storage conditions, exposure to weather, and how carefully the item is handled during setup and teardown. We've had clients still using inflatables from 8+ years ago because they followed the care instructions diligently.",
      },
    ],
  },
];

// 鈹€鈹€ Page Component 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

export function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_DATA[0].name);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter FAQ items by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;

    const q = searchQuery.toLowerCase();
    return FAQ_DATA
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  // Determine if search is active
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 鈹€鈹€ Page Header 鈹€鈹€ */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">
            Help Center
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Find answers to common questions about our products, ordering process,
            design capabilities, shipping, and maintenance. Can't find what you're
            looking for? Our team is here to help.
          </p>
        </div>
      </section>

      {/* 鈹€鈹€ Search Bar 鈹€鈹€ */}
      <div className="sticky top-[73px] z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ 鈥?e.g., 'shipping cost', 'warranty', 'design process'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-10 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 鈹€鈹€ Main Content 鈹€鈹€ */}
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {isSearching ? (
          /* 鈹€鈹€ Search Results View 鈹€鈹€ */
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-gray-500">
              Search results for{" "}
              <span className="font-semibold text-navy-900">
                &ldquo;{searchQuery}&rdquo;
              </span>
              {" 鈥?"}
              {filteredData.reduce((sum, cat) => sum + cat.items.length, 0)} result
              {filteredData.reduce((sum, cat) => sum + cat.items.length, 0) !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                <Search className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-semibold text-navy-900">
                  No results found
                </h3>
                <p className="mb-4 max-w-sm text-sm text-gray-500">
                  Try different keywords or browse by category below.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {filteredData.map((category) => (
                  <div key={category.name}>
                    <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-navy-900">
                      <span className="text-red-500">{category.icon}</span>
                      {category.name}
                    </h2>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <AccordionItem
                          key={item.id}
                          item={item}
                          isOpen={openItems.has(item.id)}
                          onToggle={() => toggleItem(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 鈹€鈹€ Categorized View with Tabs 鈹€鈹€ */
          <div>
            {/* Category Tabs */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {FAQ_DATA.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                    activeCategory === cat.name
                      ? "bg-navy-700 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700 shadow-sm"
                  )}
                >
                  <span
                    className={cn(
                      activeCategory === cat.name ? "text-white" : "text-navy-400"
                    )}
                  >
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active Category Content */}
            <div className="mx-auto max-w-3xl">
              {FAQ_DATA.filter((cat) => cat.name === activeCategory).map(
                (category) => (
                  <div key={category.name}>
                    <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-navy-900">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-100 text-navy-700">
                        {category.icon}
                      </span>
                      {category.name} Questions
                    </h2>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <AccordionItem
                          key={item.id}
                          item={item}
                          isOpen={openItems.has(item.id)}
                          onToggle={() => toggleItem(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Quick Links to Other Categories */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <p className="mb-4 text-sm font-medium text-gray-500">
                  Jump to another category:
                </p>
                <div className="flex flex-wrap gap-2">
                  {FAQ_DATA.filter((cat) => cat.name !== activeCategory).map(
                    (cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:border-navy-300 hover:text-navy-700"
                      >
                        {cat.icon}
                        {cat.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 鈹€鈹€ Contact CTA 鈹€鈹€ */}
      <section className="border-t border-gray-200 bg-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
            <MessageCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            Our team is ready to help. Reach out by phone, email, or request a
            callback 鈥?we typically respond within a few hours during business
            hours.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+86 15376427736"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              +86 15376427736
            </a>
            <a
              href="mailto:inflatablemodel@showlovein.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50 sm:w-auto"
            >
              <Mail className="h-5 w-5" />
              Email Support
            </a>
            <Link
              href="/get-quote"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 sm:w-auto"
            >
              Request a Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Monday鈥揊riday, 8am鈥?pm EST 鈥?Response within 4 hours guaranteed
          </p>
        </div>
      </section>
    </div>
  );
}

// 鈹€鈹€ Accordion Item Component 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-semibold text-navy-900 md:text-base">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
