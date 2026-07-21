import type { Metadata } from 'next'
import { GetQuoteClient } from '@/components/get-quote/get-quote-client'

export const metadata: Metadata = {
  title: 'Contact Us | Request a Quote | InflatableModel',
  description: 'Contact InflatableModel through WhatsApp or the online quote form for custom inflatable inquiries.',
  openGraph: {
    title: 'Contact InflatableModel | Request a Quote',
    description: 'Contact us through WhatsApp or the online form for custom inflatable inquiries.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'InflatableModel',
            url: 'https://qddjtx.com',
          }),
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-medium text-red-400 uppercase tracking-wider">
            Contact Us
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Get In Touch
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Have a project in mind? Fill out the form below so the team can review your requirements and prepare a custom quote.
          </p>
          {/* Quick contact info */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              WhatsApp
            </a>

          </div>
        </div>
      </section>

      {/* Same form as /get-quote */}
      <GetQuoteClient />
    </>
  )
}