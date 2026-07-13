import type { Metadata } from 'next'
import { HowItWorksClient } from '@/components/how-it-works/how-it-works-client'

export const metadata: Metadata = {
  title: 'How It Works | Custom Inflatable Process | InflatableModel',
  description: 'From design to delivery: see our 5-step process for creating custom inflatables, including 3D rendering, artwork approval, production, testing, and shipping.',
  openGraph: {
    title: 'How It Works | InflatableModel',
    description: 'From design to delivery: see our 5-step process for custom inflatables.',
    type: 'website',
  },
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
