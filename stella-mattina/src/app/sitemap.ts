import type { MetadataRoute } from 'next'
import { getPractitioners } from '@/lib/content/practitioners'
import { getBlogPosts } from '@/lib/content/blog'
import { getLocations } from '@/lib/content/locations'
import { getServices } from '@/lib/content/services'

const BASE_URL = 'https://stellamattina.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/doctor-directory`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/find-our-locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/patient-information`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // SEO landing pages
    {
      url: `${BASE_URL}/gynecologist-dallas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hormone-pellet-therapy-dallas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/prenatal-care-near-me`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/primary-care-physician-dallas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/maternal-fetal-medicine`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ginecologo-dallas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/biote-hormone-therapy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/womens-health`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const doctorUrls: MetadataRoute.Sitemap = getPractitioners().map((p) => ({
    url: `${BASE_URL}/doctor-directory/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogUrls: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }))

  const locationUrls: MetadataRoute.Sitemap = getLocations().map((loc) => ({
    url: `${BASE_URL}/find-our-locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Filter out providers-bio — that route is a server-side redirect to /doctor-directory, not a real page
  const serviceUrls: MetadataRoute.Sitemap = getServices()
    .filter((s) => s.slug !== 'providers-bio')
    .map((s) => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [...staticUrls, ...doctorUrls, ...blogUrls, ...locationUrls, ...serviceUrls]
}
