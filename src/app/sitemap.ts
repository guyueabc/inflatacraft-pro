import { type MetadataRoute } from 'next'
import { products } from '@/lib/data/products'
import { BLOG_DATA } from '@/lib/data/blog'
import { GALLERY_DATA } from '@/lib/data/gallery'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://inflatablemodel.com.cn'
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: base + '/products', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/gallery', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: base + '/get-quote', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/how-it-works', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/about', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/blog', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: base + '/contact', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/faq', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: base + '/products/' + p.slug,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = Object.keys(BLOG_DATA).map((slug) => ({
    url: base + '/blog/' + slug,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const galleryPages: MetadataRoute.Sitemap = Object.keys(GALLERY_DATA).map((id) => ({
    url: base + '/gallery/' + id,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))


  return [...core, ...productPages, ...blogPages, ...galleryPages]
}