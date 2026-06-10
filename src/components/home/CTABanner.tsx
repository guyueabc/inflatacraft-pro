import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="bg-navy-900 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 px-8 py-12 md:flex-row md:px-16">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Bring Your Brand to Life?
            </h2>
            <p className="mt-3 max-w-lg text-lg text-navy-300">
              Let's discuss your project. Call us now or request a quote —
              we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="tel:1-800-INFLATA"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              1-800-INFLATA
            </a>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
            >
              Get Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
