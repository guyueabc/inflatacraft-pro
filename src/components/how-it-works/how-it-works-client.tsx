"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

const steps = [
  {
    title: "Submit Requirements",
    description:
      "Provide the intended use, approximate dimensions, quantity, destination, deadline, artwork, and reference images.",
  },
  {
    title: "Review the Proposal",
    description:
      "Review the offered design support, written specification, accessories, documentation scope, price, and commercial terms.",
  },
  {
    title: "Approve in Writing",
    description:
      "Approve the final artwork and specification. Any revision scope and approval process must be confirmed for the project.",
  },
  {
    title: "Confirm Production",
    description:
      "Production location, material, inspection scope, schedule, and any product-specific reports are confirmed in the order documents.",
  },
  {
    title: "Arrange Delivery",
    description:
      "Packaging, freight, customs responsibilities, destination access, and delivery terms are confirmed for the approved order.",
  },
];

export function HowItWorksClient() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">How Project Review Works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            A project-specific process without a universal schedule, free-rendering promise, manufacturing-location claim, or guaranteed inspection result.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-5">
            {steps.map((step, index) => (
              <article key={step.title} className="flex gap-5 rounded-xl border border-gray-200 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold text-white">{index + 1}</div>
                <div><h2 className="text-xl font-bold text-navy-900">{step.title}</h2><p className="mt-2 leading-relaxed text-gray-700">{step.description}</p></div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900">
            <h2 className="font-bold">Before approval</h2>
            <ul className="mt-3 space-y-2">
              {[
                "Confirm the exact included and excluded scope.",
                "Confirm the relevant venue or regulatory requirements independently.",
                "Confirm any certificate, report, warranty, or insurance in writing for the exact product.",
                "Confirm production and delivery estimates with adequate contingency for the event date.",
              ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-navy-900">Share your project requirements</h2>
        <p className="mt-3 text-gray-600">Response and quotation timing varies with the request and current queue.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/get-quote" className="rounded-lg bg-red-600 px-7 py-3 font-semibold text-white hover:bg-red-500">Request a Quote</Link>
          <a href="https://wa.me/8615376427736" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-7 py-3 font-semibold text-navy-900 hover:bg-gray-50"><MessageCircle className="h-5 w-5" />WhatsApp</a>
        </div>
      </section>
    </main>
  );
}
