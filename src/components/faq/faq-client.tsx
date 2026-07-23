"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { FAQ_DATA } from "@/lib/data/faq";

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
