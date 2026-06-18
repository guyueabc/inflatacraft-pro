import type { Metadata } from 'next'
import { HowItWorksClient } from '@/components/how-it-works/how-it-works-client'

export const metadata: Metadata = {
  title: 'How It Works | Custom Inflatable Process | InflatableModel',
  description: 'From design to delivery: see our 5-step process for creating custom inflatables. Free 3D renderings, 3-6 week turnaround. USA manufacturing.',
  openGraph: {
    title: 'How It Works | InflatableModel',
    description: 'From design to delivery: see our 5-step process for custom inflatables.',
    type: 'website',
  },
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
