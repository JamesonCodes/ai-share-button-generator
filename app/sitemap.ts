import { MetadataRoute } from 'next'

/**
 * Ensures the URL includes the www. prefix for canonical URLs
 */
function ensureWwwPrefix(url: string): string {
  try {
    const urlObj = new URL(url)
    // If hostname doesn't start with www., add it
    if (!urlObj.hostname.startsWith('www.')) {
      urlObj.hostname = `www.${urlObj.hostname}`
    }
    return urlObj.toString().replace(/\/$/, '') // Remove trailing slash
  } catch {
    // If URL parsing fails, try simple string replacement
    if (url.includes('://') && !url.includes('://www.')) {
      return url.replace('://', '://www.')
    }
    return url
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisharebuttongenerator.com'
  const canonicalBaseUrl = ensureWwwPrefix(baseUrl)
  
  return [
    {
      url: canonicalBaseUrl,
      lastModified: new Date(),
    },
    {
      url: `${canonicalBaseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${canonicalBaseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${canonicalBaseUrl}/disclaimer`,
      lastModified: new Date(),
    },
    {
      url: `${canonicalBaseUrl}/feedback`,
      lastModified: new Date(),
    },
    {
      url: `${canonicalBaseUrl}/strategic-advantage`,
      lastModified: new Date(),
    },
  ]
}
