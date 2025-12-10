import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisharebuttongenerator.com'
  
  return {
    name: 'AI Share Button Generator',
    short_name: 'AI Share Button',
    description: 'Generate embeddable AI share buttons for your blog or website. Let readers send articles to ChatGPT, Perplexity, or Google AI with one click.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10A37F',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
