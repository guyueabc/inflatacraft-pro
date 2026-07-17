import type { Metadata } from 'next';
import { BlogListClient } from '@/components/blog/blog-list-client';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog | Custom Inflatable Planning Guides | InflatableModel',
  description: 'General educational guides for planning, designing, inspecting, cleaning, and storing custom inflatable products. Confirm all project-specific requirements before ordering.',
  openGraph: {
    title: 'Blog | InflatableModel',
    description: 'Educational guides for custom inflatable project planning and product care.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
