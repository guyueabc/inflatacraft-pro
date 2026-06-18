import { GALLERY_DATA, getGalleryItemBySlug, type GalleryDetail } from '@/lib/data/gallery';
import { notFound } from 'next/navigation';
import { GalleryDetailClient } from '@/components/gallery/gallery-detail-client';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(GALLERY_DATA).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getGalleryItemBySlug(id);
  if (!item) return { title: 'Case Study Not Found' };
  return {
    title: `${item.clientName} 鈥?${item.productType} | InflatableModel Gallery`,
    description: item.description,
    openGraph: {
      title: `${item.clientName} Case Study`,
      description: item.description,
      type: 'article',
    },
  };
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getGalleryItemBySlug(id);
  if (!item) notFound();

  const caseStudyLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${item.clientName} 鈥?${item.productType} Case Study`,
    description: item.description,
    author: { '@type': 'Organization', name: 'InflatableModel' },
    publisher: { '@type': 'Organization', name: 'InflatableModel' },
    about: { '@type': 'Thing', name: item.productType },
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
              { "@type": "ListItem", position: 2, name: "Gallery", item: "https://inflatablemodel.com.cn/gallery" },
              { "@type": "ListItem", position: 3, name: item.clientName },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyLd) }}
      />
      <GalleryDetailClient item={item} />
    </>
  );
}