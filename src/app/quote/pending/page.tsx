"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, DollarSign, Clock, Package, FileText, AlertCircle, ArrowRight } from "lucide-react";

interface QuoteEstimate {
  priceRangeUsd: { min: number; max: number };
  recommendedSystem: string;
  productConfiguration?: string[];
  productionTime: string;
  shippingEstimate: string;
  documentsRecommended?: string[];
  requiredConfirmations?: string[];
  notes?: string[];
}

interface QuotePayload {
  data?: QuotePayload;
  estimate?: QuoteEstimate;
  leadScore?: { category: string; score: number };
}

function QuoteContent() {
  const searchParams = useSearchParams();
  // The estimate is handed to this page by the submitting tab. An opaque
  // database ID is displayed only as a reference and is never used to fetch
  // contact details from a public endpoint.
  const quoteId = searchParams.get("id");
  const [quote] = useState<QuotePayload | null>(() => {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("quote_estimate");
    if (!cached) return null;
    try {
      return JSON.parse(cached) as QuotePayload;
    } catch {
      return null;
    }
  });

  if (!quote) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-navy-900">Quote Not Found</h1>
          <p className="mt-2 text-gray-600">No quote data found. Please submit the quote form first.</p>
          <Link href="/get-quote" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700">
            <ArrowRight className="h-4 w-4" /> Get a Quote
          </Link>
        </div>
      </div>
    );
  }

  const data = quote.data || quote;
  const estimate = data?.estimate;
  const leadScore = data?.leadScore;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-navy-900">Your Project Estimate</h1>
          <p className="mt-2 text-gray-600">Here&apos;s a preliminary quote based on your project details.</p>
        </div>

        {/* Quote ID */}
        {quoteId && (
          <div className="mt-4 rounded-lg border border-navy-200 bg-navy-50 px-4 py-2 text-center text-sm text-navy-700">
            Reference ID: <span className="font-mono font-semibold">{quoteId}</span>
          </div>
        )}

        {/* Lead Score Badge */}
        {leadScore && (
          <div className="mt-4 flex justify-center">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              leadScore.category === "A" ? "bg-green-100 text-green-700" :
              leadScore.category === "B" ? "bg-yellow-100 text-yellow-700" :
              "bg-gray-100 text-gray-600"
            }`}>
              Priority: {leadScore.category} (Score: {leadScore.score}/100)
            </span>
          </div>
        )}

        {/* Estimate Card */}
        {estimate && (
          <div className="mt-6 space-y-4">
            {/* Price Range */}
            <div className="rounded-xl border-2 border-red-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy-900">Budgetary Price Range</h2>
                  <p className="text-sm text-gray-500">USD — for early project planning</p>
                </div>
              </div>
              <p className="mt-4 text-3xl font-extrabold text-navy-900">
                ${estimate.priceRangeUsd.min.toLocaleString()} – ${estimate.priceRangeUsd.max.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                This is a budgetary range, not a final quotation. Final price depends on size, material, printing, accessories, documentation, packing and shipping.
              </p>
            </div>

            {/* Product Configuration */}
            <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-navy-600" />
                <h3 className="font-bold text-navy-900">Recommended System</h3>
              </div>
              <p className="mt-2 text-sm font-medium text-navy-700">{estimate.recommendedSystem}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                {estimate.productConfiguration?.map((c: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-navy-400">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Time */}
            <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-navy-600" />
                <h3 className="font-bold text-navy-900">Production Timeline</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{estimate.productionTime}</p>
            </div>

            {/* Shipping */}
            <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-navy-600" />
                <h3 className="font-bold text-navy-900">Shipping Estimate</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{estimate.shippingEstimate}</p>
            </div>

            {/* Documents Recommended */}
            {estimate.documentsRecommended && estimate.documentsRecommended.length > 0 && (
              <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-navy-900">Documents We Can Prepare</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                  {estimate.documentsRecommended.map((d: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Confirmations */}
            {estimate.requiredConfirmations && estimate.requiredConfirmations.length > 0 && (
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                <h3 className="font-bold text-yellow-800">To Finalize Your Quote</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-yellow-700">
                  {estimate.requiredConfirmations.map((c: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-600" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {estimate.notes && estimate.notes.length > 0 && (
              <div className="rounded-lg bg-gray-50 p-4">
                <ul className="space-y-1 text-xs text-gray-500">
                  {estimate.notes.map((n: string, i: number) => (
                    <li key={i}>• {n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-navy-300 px-6 py-3 text-sm font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
          <Link href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700">
            Get Detailed Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg bg-navy-50 p-4 text-center text-xs text-navy-600">
          This is a budgetary estimate for early project planning. Final quotation depends on confirmed dimensions, artwork, material, accessories, documentation requirements, packing size, destination and shipping method. Local compliance and venue requirements should be confirmed by the buyer before operation.
        </div>
      </div>
    </div>
  );
}

export default function QuotePendingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-navy-200 border-t-red-600" /></div>}>
      <QuoteContent />
    </Suspense>
  );
}
