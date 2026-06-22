"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { quoteSchema, PRODUCT_TYPES, BUDGET_RANGES, DEADLINES, type QuoteFormData } from "@/lib/validations/quote";
import { Send, CheckCircle2, Phone, Mail } from "lucide-react";

export function GetQuoteClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { email: "", phone: "", name: "", company: "", productType: "", description: "", size: "", quantity: "", budgetRange: "", deadline: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stash latest form values in a ref so beforeunload can read them
  const formRef = useRef<QuoteFormData | null>(null);
  const values = form.watch();

  // Keep ref in sync
  useEffect(() => { formRef.current = values; }, [values]);

  // Save partial data to sessionStorage every 3s debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      if (values.email) {
        try { sessionStorage.setItem("partial_lead", JSON.stringify(values)); } catch {}
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [values]);

  // Before unload / page leave: send beacon with last-stashed partial
  useEffect(() => {
    const sendPartial = () => {
      if (sessionStorage.getItem('partial_sent') === '1') return;
      sessionStorage.setItem('partial_sent', '1');
      const partial = formRef.current;
      if (!partial?.email && !partial?.phone) return;
      const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
      const utm: Record<string, string> = {};
      adParams.forEach((k) => { try { const v = sessionStorage.getItem(k); if (v) utm[k] = v; } catch {} });
      navigator.sendBeacon("/api/analytics/partial-lead", JSON.stringify({ ...partial, ...utm }));
    };
    window.addEventListener("beforeunload", sendPartial);
    window.addEventListener("pagehide", sendPartial);
    return () => {
      window.removeEventListener("beforeunload", sendPartial);
      window.removeEventListener("pagehide", sendPartial);
    };
  }, []);


  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    // 璇诲彇鎵€鏈夊箍鍛婂弬鏁?
    const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];
    const utm = adParams.reduce((acc, k) => {
      const v = sessionStorage.getItem(k);
      if (v) acc[k] = v;
      return acc;
    }, {} as Record<string, string>);

    try {
      await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...utm }),
      });
    } catch {
      // 鍗充娇 fetch 鎶ラ敊锛屾暟鎹彲鑳藉凡鎻愪氦鎴愬姛锛屼粛鐒舵樉绀烘垚鍔熼〉
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    // 鏍囪杞寲淇″彿 —?Analytics 缁勪欢浼氭娴嬪苟鎺ㄩ€?Google Ads 杞寲
    sessionStorage.setItem("quote_submitted", "true");
    // 鎺ㄩ€?GTM 杞寲浜嬩欢
    (window as any).dataLayer?.push({ event: "quote_form_submitted" });
    // Google Ads 杞寲杩借釜 (濡傛灉 gtag 宸插姞杞?
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", { send_to: "AW-18234377845/quote_submit" });
    }
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch {}
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16 pb-24 md:pb-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:h-20 sm:w-20">
            <CheckCircle2 className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-navy-900">Quote Request Received!</h1>
          <p className="mt-3 leading-relaxed text-gray-600">
            Thank you! Our team will review your requirements and get back to you within <strong>24 hours</strong>.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:+8615376427736" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-navy-300 px-6 py-3 text-sm font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Us Now
            </a>
            <a href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
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
          <p className="mt-3 text-gray-600">Just your email and phone —?we&apos;ll handle the rest.</p>
        </div>

        <div className="rounded-xl border border-navy-200 bg-white p-5 shadow-sm sm:p-8">
          {/* 鈹€鈹€ Required: Email + Phone 鈹€鈹€ */}
          <div className="mb-8 rounded-lg border-2 border-red-200 bg-red-50/30 p-5">
            <p className="mb-4 text-sm font-semibold text-red-700">Required —?we need these to contact you</p>
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
                <label htmlFor="q-phone" className="mb-1 block text-sm font-medium text-navy-700">Phone</label>
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

          {/* 鈹€鈹€ Optional fields 鈹€鈹€ */}
          <p className="mb-4 text-sm font-medium text-gray-400">Everything below is optional —?fill in as much or as little as you like</p>
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
          <button type="button" disabled={isSubmitting}
            onClick={() => form.handleSubmit(onSubmit)()}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-50">
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <><Send className="h-4 w-4" /> Submit Quote Request</>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">We respect your privacy. No spam, ever.</p>
        </div>
      </div>
    </div>
  );
}
