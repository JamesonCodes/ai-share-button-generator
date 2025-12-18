import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LLM Index',
  description: 'Comprehensive index of AI Share Button Generator content for LLMs and AI search tools. Discover tools, guides, legal information, and support resources.',
  alternates: {
    canonical: '/llm',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Ensures the URL includes the www. prefix for canonical URLs
 */
function ensureWwwPrefix(url: string): string {
  try {
    const urlObj = new URL(url);
    // If hostname doesn't start with www., add it
    if (!urlObj.hostname.startsWith('www.')) {
      urlObj.hostname = `www.${urlObj.hostname}`;
    }
    return urlObj.toString().replace(/\/$/, ''); // Remove trailing slash
  } catch {
    // If URL parsing fails, try simple string replacement
    if (url.includes('://') && !url.includes('://www.')) {
      return url.replace('://', '://www.');
    }
    return url;
  }
}

export default function LLMIndex() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisharebuttongenerator.com';
  const siteUrl = ensureWwwPrefix(baseUrl);
  const lastUpdated = new Date().toISOString().split('T')[0];

  const pages = {
    home: {
      url: `${siteUrl}/`,
      title: 'AI Share Button Generator',
      description: 'Main tool to create embeddable AI share buttons for your website. Generate lightweight code snippets (HTML, React, Vue) that let readers send articles to ChatGPT, Perplexity, Google AI, or Grok with one click.',
    },
    strategicAdvantage: {
      url: `${siteUrl}/strategic-advantage`,
      title: 'The Strategic Advantage of AI Share Buttons',
      description: 'Comprehensive guide explaining how AI share buttons integrate content into LLM workflows, establish AI authority through citation, and build brand recognition in AI systems. Includes best practices and implementation strategies.',
    },
    privacyPolicy: {
      url: `${siteUrl}/privacy-policy`,
      title: 'Privacy Policy',
      description: 'Privacy Policy for AI Share Button Generator by SearchWell Labs LLC. Learn how we handle your data and protect your privacy when using our service.',
    },
    terms: {
      url: `${siteUrl}/terms`,
      title: 'Terms of Service',
      description: 'Terms of Service for AI Share Button Generator by SearchWell Labs LLC. Read our terms and conditions for using the AI share button generator service.',
    },
    disclaimer: {
      url: `${siteUrl}/disclaimer`,
      title: 'Disclaimer',
      description: 'Disclaimer for AI Share Button Generator by SearchWell Labs LLC. Important information about third-party AI platforms and service limitations.',
    },
    feedback: {
      url: `${siteUrl}/feedback`,
      title: 'Feedback',
      description: 'Share your thoughts to help improve AI Share Button Generator. Provide feedback on features, usability, and suggestions for enhancements.',
    },
  };

  return (
    <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
      <main className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-4xl">
        <header className="mb-12">
          <h1 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            LLM Index
          </h1>
          <p className="text-lg md:text-xl leading-relaxed transition-smooth mb-4" style={{ color: 'var(--text-secondary)' }}>
            This page is intended as an index for both humans and AI systems to discover and navigate the content of this website.
          </p>
        </header>

        {/* What this site is */}
        <section className="mb-12">
          <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            What this site is
          </h2>
          <div className="space-y-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            <p>
              AI Share Button Generator helps content creators and website owners create embeddable share buttons that let readers send articles to AI assistants like ChatGPT, Perplexity, Google AI, and Grok with one click.
            </p>
            <p>
              The tool generates lightweight, framework-ready code snippets (HTML, React, Vue) with customizable prompts and branding. It&apos;s designed for publishers who want to integrate their content into LLM workflows and establish AI authority through citation.
            </p>
            <p>
              The service is free, stateless, and requires no backend infrastructure. The generated buttons are lightweight (≈8 KB) and work by reading data attributes from the embed script, making them easy to implement on any website.
            </p>
          </div>
        </section>

        {/* Start here */}
        <section className="mb-12">
          <h2 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Start here
          </h2>
          <ul className="space-y-4">
            <li>
              <Link 
                href={pages.home.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.home.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.home.description}
              </p>
            </li>
            <li>
              <Link 
                href={pages.strategicAdvantage.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.strategicAdvantage.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.strategicAdvantage.description}
              </p>
            </li>
            <li>
              <Link 
                href={pages.privacyPolicy.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.privacyPolicy.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.privacyPolicy.description}
              </p>
            </li>
            <li>
              <Link 
                href={pages.terms.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.terms.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.terms.description}
              </p>
            </li>
            <li>
              <Link 
                href={pages.disclaimer.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.disclaimer.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.disclaimer.description}
              </p>
            </li>
            <li>
              <Link 
                href={pages.feedback.url} 
                className="text-lg font-semibold transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {pages.feedback.title}
              </Link>
              <p className="mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {pages.feedback.description}
              </p>
            </li>
          </ul>
        </section>

        {/* Core topics */}
        <section className="mb-12">
          <h2 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Core topics
          </h2>
          
          <article className="mb-8">
            <h3 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Tools & Generators
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={pages.home.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.home.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.home.description}
                </p>
              </li>
            </ul>
          </article>

          <article className="mb-8">
            <h3 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Guides & Strategy
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={pages.strategicAdvantage.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.strategicAdvantage.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.strategicAdvantage.description}
                </p>
              </li>
            </ul>
          </article>

          <article className="mb-8">
            <h3 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Legal & Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={pages.privacyPolicy.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.privacyPolicy.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.privacyPolicy.description}
                </p>
              </li>
              <li>
                <Link 
                  href={pages.terms.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.terms.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.terms.description}
                </p>
              </li>
              <li>
                <Link 
                  href={pages.disclaimer.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.disclaimer.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.disclaimer.description}
                </p>
              </li>
            </ul>
          </article>

          <article className="mb-8">
            <h3 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={pages.feedback.url} 
                  className="font-medium transition-smooth hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {pages.feedback.title}
                </Link>
                <p className="mt-1 text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {pages.feedback.description}
                </p>
              </li>
            </ul>
          </article>
        </section>

        {/* Reference */}
        <section className="mb-12">
          <h2 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Reference
          </h2>
          <ul className="space-y-3">
            <li>
              <Link 
                href={pages.feedback.url} 
                className="font-medium transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                Feedback
              </Link>
              <span className="ml-2 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                - Share your thoughts and suggestions
              </span>
            </li>
            <li>
              <Link 
                href={pages.terms.url} 
                className="font-medium transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                Terms of Service
              </Link>
              <span className="ml-2 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                - Legal terms and conditions
              </span>
            </li>
            <li>
              <Link 
                href={pages.privacyPolicy.url} 
                className="font-medium transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                Privacy Policy
              </Link>
              <span className="ml-2 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                - How we handle your data
              </span>
            </li>
            <li>
              <Link 
                href={pages.disclaimer.url} 
                className="font-medium transition-smooth hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                Disclaimer
              </Link>
              <span className="ml-2 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                - Important information about third-party platforms
              </span>
            </li>
          </ul>
        </section>

        {/* Last updated */}
        <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            Last updated: {lastUpdated}
          </p>
        </section>
      </main>
    </div>
  );
}
