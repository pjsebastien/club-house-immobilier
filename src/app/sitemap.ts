import { MetadataRoute } from 'next'
import { getAllVilles, villeToSlug } from '@/lib/data'

// Date dynamique du build - signale la fraicheur du contenu a Google
const BUILD_DATE = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.clubhouseimmobilier.com'
  const villes = getAllVilles()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/villes`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investir`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/methodologie`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/outils`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/outils/comparateur`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/outils/budget`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quartiers`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sources`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: BUILD_DATE,
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
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    quartiersAEviterPages.push({
      url: `${baseUrl}/villes/${slug}/quartiers-a-eviter`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return [...staticPages, ...villePages, ...quartiersAEviterPages]
}
