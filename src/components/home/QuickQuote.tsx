"use client";

import React, { useState, useEffect, useRef, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, Loader2, CheckCircle2, Phone, MessageCircle } from "lucide-react";

const PRODUCT_TYPES = [
  "Giant Product Replica",
  "Inflatable Mascot",
  "Inflatable Arch",
  "Inflatable Costume",
  "Inflatable Tent",
  "Inflatable Game",
  "Other / Not Sure",
] as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  productType: "",
};

export function QuickQuote() {
  const [form, setForm] = useState<FormData>(initialForm);
  const formRef = useRef(form);
  useEffect(() => { formRef.current = form; }, [form]);

  // Save partial data to sessionStorage + beforeunload beacon
  useEffect(() => {
    const t = setTimeout(() => {
      if (form.email) {
        try { sessionStorage.setItem("partial_lead", JSON.stringify(form)); } catch {}
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [form]);

  useEffect(() => {
    const send = () => {
      if (sessionStorage.getItem('partial_sent') === '1') return;
      sessionStorage.setItem('partial_sent', '1');
      const d = formRef.current;
      if (!d.email && !d.phone) return;
      const adParams = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid"];
      const utm: Record<string,string> = {};
      adParams.forEach((k) => { try { const v = sessionStorage.getItem(k); if (v) utm[k] = v; } catch {} });
      navigator.sendBeacon("/api/analytics/partial-lead", JSON.stringify({ ...d, ...utm }));
    };
    window.addEventListener("beforeunload", send);
    window.addEventListener("pagehide", send);
    return () => { window.removeEventListener("beforeunload", send); window.removeEventListener("pagehide", send); };
  }, []);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!form.email) {
      setStatus("idle");
      setErrorMessage("Please provide your email so we can reach you.");
      return;
    }

    const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];
    const utm: Record<string, string> = {};
    adParams.forEach((k) => { try { const v = sessionStorage.getItem(k); if (v) utm[k] = v; } catch {} });

    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          productType: form.productType,
          ...utm,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Network error" }));
        throw new Error(err.error || "Submission failed");
      }

      sessionStorage.setItem("quote_submitted", "true");
      (window as any).dataLayer?.push({ event: "quote_form_submitted" });
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", { send_to: "AW-18234377845/TYNLCJu0_70cEPWM6vZD" });
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again or call us directly.");
    }
  };

  if (status === "success") {
    return (
      <section className="bg-red-600 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <SuccessMessage />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-red-600 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Get a Free Quote
          </h2>
          <p className="mt-4 text-lg text-red-100">
            Fill out the form below and our team will respond within 24 hours
            with a custom estimate — no obligation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-4xl"
          noValidate
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Email *</span>
              <input
                id="qq-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Phone</span>
              <input
                id="qq-phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Name</span>
              <input
                id="qq-name"
                name="name"
                type="text"
                placeholder="Your name (optional)"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Product Type</span>
              <select
                id="qq-product"
                name="productType"
                value={form.productType}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2.5 text-sm text-gray-900 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">Select type...</option>
                {PRODUCT_TYPES.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>
          </div>

          {status === "error" && (
            <p className="mt-4 text-center text-sm text-red-100">{errorMessage}</p>
          )}

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-10 py-3.5 text-base font-bold text-red-600 shadow-lg transition-all hover:bg-red-50 active:scale-95 sm:w-auto",
                status === "submitting" && "cursor-not-allowed opacity-70"
              )}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Get My Free Quote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center">
      <CheckCircle2 className="h-16 w-16 text-white" />
      <h3 className="mt-4 font-heading text-2xl font-bold text-white">
        Quote Request Received!
      </h3>
      <p className="mt-2 text-red-100">
        Our team will reach out within 24 hours with your custom estimate.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
        </a>
        <a
          href="https://wa.me/8615376427736"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all hover:bg-green-600 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>
      <p className="mt-4 text-center text-sm text-red-200">
        No obligation · No spam · Response within 24 hours · <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
      </p>
    </div>
  );
}
