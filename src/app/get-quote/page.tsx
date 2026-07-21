import type { Metadata } from 'next'
import { GetQuoteClient } from '@/components/get-quote/get-quote-client'

export const metadata: Metadata = {
  title: 'Request a Quote | Custom Inflatables | InflatableModel',
  description: 'Request a custom inflatable quote and share your project requirements with InflatableModel.',
  openGraph: {
    title: 'Request a Quote | InflatableModel',
    description: 'Share your custom inflatable requirements for project review.',
    type: 'website',
  },
}

export default function GetQuotePage() {
  return <GetQuoteClient />
}
