"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { quoteSchema, PRODUCT_TYPES, BUDGET_RANGES, DEADLINES, type QuoteFormData } from "@/lib/validations/quote";
import { Send, CheckCircle2, Phone, Mail } from "lucide-react";

export default function GetQuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { email: "", phone: "", name: "", company: "", productType: "", description: "", size: "", quantity: "", budgetRange: "", deadline: "" },
  });

  const onSubmit = async (data: QuoteFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch {}
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-navy-900">Quote Request Received!</h1>
          <p className="mt-3 leading-relaxed text-gray-600">
            Thank you! Our team will review your requirements and get back to you within <strong>24 hours</strong>.
          </p>
          <div className="mt-8 rounded-xl border border-navy-200 bg-navy-50 p-6 text-left">
            <h3 className="font-semibold text-navy-800">What happens next?</h3>
            <ol className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">1</span> Our team reviews your requirements</li>
              <li className="flex gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">2</span> We create a free 3D rendering of your design</li>
              <li className="flex gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">3</span> You receive a detailed quote within 24 hours</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">Get a Free Quote</h1>
          <p className="mt-3 text-gray-600">Just your email and phone — we&apos;ll handle the rest.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl border border-navy-200 bg-white p-8 shadow-sm" noValidate>
          {/* ── Required: Email + Phone ── */}
          <div className="mb-8 rounded-lg border-2 border-red-200 bg-red-50/30 p-5">
            <p className="mb-4 text-sm font-semibold text-red-700">Required — we need these to contact you</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="q-email" className="mb-1 block text-sm font-medium text-navy-700">Email *</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="q-email" type="email" placeholder="you@company.com" {...form.register("email")}
                    className={cn("w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      form.formState.errors.email ? "border-red-300 focus:ring-red-500/20" : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20")} />
                </div>
                {form.formState.errors.email && <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="q-phone" className="mb-1 block text-sm font-medium text-navy-700">Phone *</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="q-phone" type="tel" placeholder="+1 (555) 000-0000" {...form.register("phone")}
                    className={cn("w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      form.formState.errors.phone ? "border-red-300 focus:ring-red-500/20" : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20")} />
                </div>
                {form.formState.errors.phone && <p className="mt-1 text-xs text-red-600">{form.formState.errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* ── Optional fields ── */}
          <p className="mb-4 text-sm font-medium text-gray-400">Everything below is optional — fill in as much or as little as you like</p>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="q-name" className="mb-1 block text-sm text-navy-700">Name</label>
                <input id="q-name" type="text" placeholder="John Smith" {...form.register("name")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20" />
              </div>
              <div>
                <label htmlFor="q-company" className="mb-1 block text-sm text-navy-700">Company</label>
                <input id="q-company" type="text" placeholder="Your company" {...form.register("company")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20" />
              </div>
            </div>

            <div>
              <label htmlFor="q-product" className="mb-1 block text-sm text-navy-700">Product Type</label>
              <select id="q-product" {...form.register("productType")}
                className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20">
                <option value="">Select a product type...</option>
                {PRODUCT_TYPES.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="q-desc" className="mb-1 block text-sm text-navy-700">Project Description</label>
              <textarea id="q-desc" rows={3} placeholder="Tell us about your project — what do you need?" {...form.register("description")}
                className="w-full resize-y rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="q-size" className="mb-1 block text-sm text-navy-700">Size</label>
                <input id="q-size" type="text" placeholder='e.g. 10ft x 6ft' {...form.register("size")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20" />
              </div>
              <div>
                <label htmlFor="q-qty" className="mb-1 block text-sm text-navy-700">Quantity</label>
                <input id="q-qty" type="number" min="1" placeholder="1" {...form.register("quantity")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20" />
              </div>
              <div>
                <label htmlFor="q-deadline" className="mb-1 block text-sm text-navy-700">Deadline</label>
                <select id="q-deadline" {...form.register("deadline")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20">
                  <option value="">Select...</option>
                  {DEADLINES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="q-budget" className="mb-1 block text-sm text-navy-700">Budget Range</label>
              <select id="q-budget" {...form.register("budgetRange")}
                className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20">
                <option value="">Select...</option>
                {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={form.formState.isSubmitting}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-50">
            {form.formState.isSubmitting ? (
              <>Sending...</>
            ) : (
              <><Send className="h-4 w-4" /> Submit Quote Request</>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">We respect your privacy. No spam, ever.</p>
        </form>
      </div>
    </div>
  );
}
