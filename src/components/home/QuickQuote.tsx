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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Phone</span>
              <input
                id="qq-phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
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
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-red-200">Product Type</span>
              <select
                id="qq-product"
                name="productType"
                value={form.productType}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
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
          <Phone className="h-4 w-4" />
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
