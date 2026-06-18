import type { Metadata } from 'next'
import { GetQuoteClient } from '@/components/get-quote/get-quote-client'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Custom Inflatables | InflatableModel',
  description: 'Request a free custom inflatable quote. 3D renderings and pricing within 24 hours. USA manufacturing, worldwide shipping.',
  openGraph: {
    title: 'Get a Free Quote | InflatableModel',
    description: 'Request a free custom inflatable quote.',
    type: 'website',
  },
}

export default function GetQuotePage() {
  return <GetQuoteClient />
}
