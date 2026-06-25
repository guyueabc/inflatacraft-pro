import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Beer, Coffee, UtensilsCrossed, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Food & Beverage Inflatables | Giant Product Replicas | InflatableModel",
  description:
    "Giant inflatable food and beverage replicas for brand activations. Beer cans, soda bottles, snack bags, coffee cups, pizza boxes — 3–6 week turnaround. Free 3D renderings.",
  keywords: "food inflatable, beverage inflatable, giant beer can, inflatable soda bottle, snack bag inflatable, food brand replica, restaurant inflatable",
  openGraph: {
    title: "Food & Beverage Inflatables | InflatableModel",
    description: "Giant product replicas for food and beverage brands.",
    type: "article",
  },
};

const stats = [
  { icon: Beer, value: "200+", label: "Food brands served" },
  { icon: TrendingUp, value: "22%", label: "Sales lift average" },
  { icon: Coffee, value: "15–30 ft", label: "Standard sizes" },
  { icon: UtensilsCrossed, value: "3–6 wk", label: "Turnaround" },
];

const productExamples = [
  { product: "Giant Beer Can / Bottle", size: "15–20 ft", price: "$4,000–$8,000", events: "Brewery events, sports sponsorships, festivals" },
  { product: "Soda / Beverage Bottle", size: "12–25 ft", price: "$3,000–$10,000", events: "Retail promotions, concert sponsorships" },
  { product: "Snack Bag / Chip Bag", size: "10–20 ft", price: "$2,500–$7,000", events: "Supermarket grand openings, sports events" },
  { product: "Coffee Cup / Mug", size: "10–15 ft", price: "$2,000–$5,000", events: "Coffee shop launches, morning events" },
  { product: "Pizza Box / Slice", size: "8–15 ft", price: "$1,800–$4,500", events: "Restaurant openings, delivery promotions" },
  { product: "Candy Bar / Chocolate", size: "10–20 ft", price: "$2,500–$6,000", events: "Halloween, seasonal campaigns" },
  { product: "Energy Drink Can", size: "15–20 ft", price: "$4,000–$8,000", events: "Fitness events, sports sponsorships" },
  { product: "Wine Bottle / Barrel", size: "12–20 ft", price: "$3,500–$9,000", events: "Winery events, tasting rooms" },
];

const useCases = [
  { brand: "Craft Brewery", result: "12-state grand opening campaign", lift: "35% sales lift", product: "20 ft beer can replica" },
  { brand: "Energy Drink Brand", result: "NASCAR sponsorship activation", lift: "2M impressions", product: "15 ft can at finish line" },
  { brand: "Snack Brand", result: "Supermarket rollouts", lift: "50,000+ social posts", product: "15 ft chip bag" },
  { brand: "Coffee Chain", result: "New store launches", lift: "3x foot traffic", product: "10 ft coffee cup" },
  { brand: "Pizza Chain", result: "Delivery day event", lift: "42% order increase", product: "12 ft pizza box" },
];

const faqItems = [
  {
    question: "Can you match our exact product packaging?",
    answer:
      "Yes, we create precise replicas of your product packaging from photos and brand files. Our design team matches colors, logos, typography, and proportions. We provide free 3D renderings for approval before production. Most clients report the inflatable looks identical to the real product when photographed.",
  },
  {
    question: "What size should I choose for a beverage inflatable?",
    answer:
      "For indoor events, 10–15 ft fits most spaces. For outdoor festivals and sports sponsorships, 15–20 ft provides maximum visibility from 50+ yards. For stadium or concert sponsorships, 20–30 ft can be seen across the venue. We recommend 15 ft as the most versatile size for beverage brands.",
  },
  {
    question: "How do inflatables survive outdoor festival conditions?",
    answer:
      "Our food/beverage inflatables use 420D Oxford nylon with UV-resistant digital printing that withstands sun exposure for 3–5 years. Water-repellent coating protects from rain. For outdoor events, we include ground stakes and tie-down ropes. Always deflate during severe weather. A single inflatable can serve 20+ outdoor events over its lifespan.",
  },
  {
    question: "Can we add LED lighting for night events?",
    answer:
      "Yes, internal LED lighting is available for all product replicas (+$300–$1,500). LED-lit inflatables are highly visible at night events like concerts, festivals, and evening sports games. Photos of illuminated inflatables get 2–3x more social media shares than daytime shots.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FoodBeveragePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Industry Solution</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Food & Beverage Inflatables</h1>
            <p className="text-lg text-gray-300">
              Giant inflatable replicas of your food and beverage products — beer cans, soda bottles, snack bags, pizza boxes, and more. 22% average sales lift.
            </p>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-red-500" />
                  <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Product Replica Catalog</h2>
            <p className="mb-8 text-sm text-gray-500">Most requested food & beverage inflatable types</p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-sm font-bold text-navy-900">Product</th>
                    <th className="px-4 py-3 text-sm font-bold text-navy-900">Size</th>
                    <th className="px-4 py-3 text-sm font-bold text-navy-900">Price</th>
                    <th className="px-4 py-3 text-sm font-bold text-navy-900">Best Events</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productExamples.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 text-sm font-semibold text-navy-900">{row.product}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.size}</td>
                      <td className="px-4 py-3 text-sm text-green-700">{row.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Case Highlights</h2>
            <p className="mb-8 text-sm text-gray-500">Real results from food & beverage brands</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {useCases.map((row, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-1 text-lg font-bold text-navy-900">{row.brand}</h3>
                  <p className="text-sm text-gray-600 mb-1">{row.result} • {row.product}</p>
                  <p className="text-sm font-semibold text-green-700">{row.lift}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-navy-900">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Turn Your Product Into a Giant</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Get a custom inflatable replica of your food or beverage product.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500">
                Get Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}