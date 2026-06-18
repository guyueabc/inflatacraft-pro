import type { Metadata } from 'next'
import { ContactPageClient } from '@/components/contact/contact-client'

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
            url: 'https://inflatablemodel.com.cn',
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
      <ContactPageClient />
    </>
  )
}
