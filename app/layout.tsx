import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import TopControls from "@/components/TopControls";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aisharebuttongenerator.com'),
  title: {
    default: "AI Share Button Generator",
    template: "%s | AI Share Button Generator"
  },
  description: "Generate embeddable AI share buttons for your blog or website. Let readers send articles to ChatGPT, Perplexity, Google AI, or Grok with one click. Free, lightweight, and easy to use.",
  keywords: [
    "AI share button",
    "ChatGPT share button",
    "Perplexity share button",
    "Google AI share button",
    "AI assistant integration",
    "embeddable share button",
    "content sharing",
    "AI tools",
    "blog tools",
    "website widgets"
  ],
  authors: [{ name: "SearchWell Labs LLC" }],
  creator: "SearchWell Labs LLC",
  publisher: "SearchWell Labs LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AI Share Button Generator",
    title: "AI Share Button Generator - Embeddable AI Share Buttons",
    description: "Generate embeddable AI share buttons for your blog or website. Let readers send articles to ChatGPT, Perplexity, Google AI, or Grok with one click.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "AI Share Button Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Share Button Generator - Embeddable AI Share Buttons",
    description: "Generate embeddable AI share buttons for your blog or website. Let readers send articles to ChatGPT, Perplexity, Google AI, or Grok with one click.",
    images: ["/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisharebuttongenerator.com';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10A37F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('ai-share-button-theme');
                const theme = stored || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Share Button Generator",
              "applicationCategory": "WebApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Generate embeddable AI share buttons for your blog or website. Let readers send articles to ChatGPT, Perplexity, Google AI, or Grok with one click.",
              "url": siteUrl,
              "author": {
                "@type": "Organization",
                "name": "SearchWell Labs LLC",
                "url": "https://searchwell.io"
              },
              "featureList": [
                "Multi-platform AI support (ChatGPT, Perplexity, Google AI)",
                "Custom prompt templates",
                "Framework support (HTML, React, Vue)",
                "Live preview",
                "Lightweight embeddable script",
                "Dark mode support"
              ],
              "screenshot": `${siteUrl}/og_image.png`
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SearchWell Labs LLC",
              "url": "https://searchwell.io",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "17350 State Hwy 249 Ste 220",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "postalCode": "77064",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "jameson@searchwell.io",
                "contactType": "Customer Service"
              }
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <TopControls />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}