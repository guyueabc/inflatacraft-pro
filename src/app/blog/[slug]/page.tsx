import { getBlogPostBySlug, BLOG_DATA } from '@/lib/data/blog';
import { notFound } from 'next/navigation';
import { BlogDetailClient } from '@/components/blog/blog-detail-client';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(BLOG_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title + ' | InflatableModel Blog',
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    image: '/images/og-default.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'InflatableModel',
    },
  };

  return (
    <>

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://inflatablemodel.com.cn" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://inflatablemodel.com.cn/blog" },
              { "@type": "ListItem", position: 3, name: post.title },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailClient post={post} />
    </>
  );
}
