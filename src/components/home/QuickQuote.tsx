"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

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

    if (!form.email || !form.phone) {
      setStatus("idle");
      setErrorMessage("Please provide your email and phone so we can reach you.");
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
        (window as any).gtag("event", "conversion", { send_to: "AW-18234377845/quote_submit" });
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
              <label htmlFor="qq-email" className="sr-only">Email *</label>
              <input
                id="qq-email"
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label htmlFor="qq-phone" className="sr-only">Phone *</label>
              <input
                id="qq-phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label htmlFor="qq-name" className="sr-only">Full Name</label>
              <input
                id="qq-name"
                name="name"
                type="text"
                placeholder="Full Name (optional)"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label htmlFor="qq-product" className="sr-only">Product Type</label>
              <select
                id="qq-product"
                name="productType"
                value={form.productType}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-gray-900 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">Product Type (optional)</option>
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
        Looking forward to bringing your brand to life!
      </p>
    </div>
  );
}