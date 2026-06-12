import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://inflatablemodel.com.cn";
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/get-quote`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/cart`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${base}/checkout`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${base}/distributor-login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/auth/signin`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/auth/signup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
