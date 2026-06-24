import type { Metadata } from 'next'
import { GetQuoteClient } from '@/components/get-quote/get-quote-client'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Quote | InflatableModel',
  description: 'Contact InflatableModel for custom inflatable inquiries. Free 3D renderings. Call +86 157-6427-7366 or email inflatablemodel@showlovein.com.',
  openGraph: {
    title: 'Contact InflatableModel | Get a Free Quote',
    description: 'Contact us for custom inflatable inquiries. Free 3D renderings.',
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
            url: 'https://www.qddjtx.com',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-157-6427-7366',
              email: 'inflatablemodel@showlovein.com',
              contactType: 'sales',
              availableLanguage: ['English', 'Chinese'],
            },
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
            Have a project in mind? Fill out the form below and our team will get back to you within 24 hours with a custom quote.
          </p>
          {/* Quick contact info */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +86 153-7642-7736
            </a>
            <a href="mailto:inflatablemodel@showlovein.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              inflatablemodel@showlovein.com
            </a>
            <a href="https://wa.me/8615376427736" className="inline-flex items-center gap-2 hover:text-white transition-colors">
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