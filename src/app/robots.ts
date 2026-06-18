import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/account/', '/checkout', '/cart', '/auth/', '/login', '/register', '/sign-in', '/distributor-login'],
    },
    sitemap: 'https://inflatablemodel.com.cn/sitemap.xml',
  }
}
