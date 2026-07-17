"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, Search } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    name: "Quotes & Orders",
    items: [
      {
        id: "quote",
        question: "How do I request a quote?",
        answer:
          "Submit the online quote form or contact us through WhatsApp. Include the product type, intended use, approximate size, quantity, destination, deadline, artwork, and reference images.",
      },
      {
        id: "price",
        question: "How is pricing determined?",
        answer:
          "Pricing depends on the approved dimensions, shape, material, printing, accessories, quantity, documentation, production scope, and delivery terms. A project-specific quotation is required.",
      },
      {
        id: "minimum",
        question: "What is the minimum order quantity?",
        answer:
          "Minimum quantity and production availability depend on the product and configuration. State the required quantity in the quote request so it can be reviewed.",
      },
      {
        id: "payment",
        question: "Which payment and commercial terms apply?",
        answer:
          "Accepted payment method, deposit, balance, currency, taxes, duties, cancellation terms, and delivery terms must be confirmed in the final quotation or order agreement.",
      },
    ],
  },
  {
    name: "Design & Production",
    items: [
      {
        id: "design-input",
        question: "What information is needed for design review?",
        answer:
          "Provide authorized artwork, reference images, intended use, approximate dimensions, audience interaction, installation environment, destination, and deadline. Available design or rendering support is confirmed per project.",
      },
      {
        id: "materials",
        question: "Which materials are available?",
        answer:
          "Material and construction options depend on the intended use, design, operating environment, documentation requirements, and quotation. Confirm the exact material in the approved specification.",
      },
      {
        id: "schedule",
        question: "How long does production take?",
        answer:
          "The schedule depends on specification approval, order status, complexity, quantity, production availability, and delivery method. No generic website timeline is guaranteed; use the written quotation for the applicable estimate.",
      },
      {
        id: "origin",
        question: "Where is the product manufactured?",
        answer:
          "Production location, inspection scope, material, documentation, packaging, and delivery arrangements are confirmed in writing for each approved order.",
      },
    ],
  },
  {
    name: "Shipping & Documentation",
    items: [
      {
        id: "shipping",
        question: "Do you arrange international shipping?",
        answer:
          "Available delivery methods, freight cost, customs responsibilities, duties, destination access, and risk transfer depend on the order and agreed delivery terms. Confirm them in the quotation.",
      },
      {
        id: "documents",
        question: "Which certificates or reports are included?",
        answer:
          "Requirements vary by product, destination, venue, and intended use. Ask the relevant venue or authority what documents are required, then confirm document availability for the exact quoted configuration before ordering.",
      },
      {
        id: "outdoor",
        question: "Can an inflatable be used outdoors?",
        answer:
          "Outdoor suitability depends on the approved design, material, blower, anchoring, ground conditions, weather, supervision, and product-specific operating limits. Follow the supplied instructions and venue requirements.",
      },
    ],
  },
  {
    name: "Care & Support",
    items: [
      {
        id: "care",
        question: "How should an inflatable be stored?",
        answer:
          "Follow the instructions for the specific product. In general, clean and fully dry it before packing, avoid sharp folds, and store it away from moisture, excessive heat, pests, and sharp objects.",
      },
      {
        id: "warranty",
        question: "What warranty applies?",
        answer:
          "Any warranty, component coverage, exclusions, period, and claim procedure must be stated in the final quotation or written order terms. Do not assume coverage that is not documented for the order.",
      },
      {
        id: "contact",
        question: "How can I contact InflatableModel?",
        answer:
          "Use the online form or the WhatsApp link shown on the website. Response time varies with the request and current queue.",
      },
    ],
  },
];

export function FAQPageClient() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("quote");

  const categories = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return FAQ_DATA;
    return FAQ_DATA.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term),
      ),
    })).filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            General planning information for custom inflatable quote requests. Project-specific terms are confirmed in writing.
          </p>
          <label className="relative mx-auto mt-8 block max-w-xl">
            <span className="sr-only">Search questions</span>
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions"
              className="w-full rounded-xl border border-white/20 bg-white px-12 py-4 text-navy-900 outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl space-y-10 px-4">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="mb-4 text-xl font-bold text-navy-900">{category.name}</h2>
              <div className="space-y-3">
                {category.items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <article key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-navy-900"
                      >
                        {item.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{item.answer}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">No matching questions.</p>
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-navy-900">Need a project-specific answer?</h2>
        <p className="mt-3 text-gray-600">Send the requirements through the quote form or WhatsApp.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/get-quote" className="rounded-lg bg-red-600 px-7 py-3 font-semibold text-white hover:bg-red-500">Request a Quote</Link>
          <a href="https://wa.me/8615376427736" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-7 py-3 font-semibold text-navy-900 hover:bg-gray-50">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
