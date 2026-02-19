import { MetadataRoute } from 'next'
import { getAllVilles, villeToSlug } from '@/lib/data'

// Date fixe de derniere mise a jour des donnees
const DATA_LAST_UPDATED = new Date('2025-01-28')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.clubhouseimmobilier.com'
  const villes = getAllVilles()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/villes`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/methodologie`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/outils`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/outils/comparateur`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/outils/budget`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quartiers`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sources`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages des villes - deduplication par slug
  const seenSlugs = new Set<string>()
  const villePages: MetadataRoute.Sitemap = []
  const quartiersAEviterPages: MetadataRoute.Sitemap = []

  for (const ville of villes) {
    const slug = villeToSlug(ville.nom)
    if (seenSlugs.has(slug)) continue
    seenSlugs.add(slug)

    villePages.push({
      url: `${baseUrl}/villes/${slug}`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    quartiersAEviterPages.push({
      url: `${baseUrl}/villes/${slug}/quartiers-a-eviter`,
      lastModified: DATA_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return [...staticPages, ...villePages, ...quartiersAEviterPages]
}
