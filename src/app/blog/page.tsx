import type { Metadata } from 'next';
import { BlogListClient } from '@/components/blog/blog-list-client';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog | Inflatable Marketing Insights | InflatableModel',
  description: 'Expert guides on custom inflatable marketing, ROI strategies, trade show tips, case studies, and industry trends. Insights from the USA leading inflatable manufacturer.',
  openGraph: {
    title: 'Blog | InflatableModel',
    description: 'Expert guides on custom inflatable marketing.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
