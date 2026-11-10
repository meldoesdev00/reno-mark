import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://renomark.ee',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://renomark.ee/privaatsus',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
