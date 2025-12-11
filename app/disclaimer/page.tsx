import type { Metadata } from "next";
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for AI Share Button Generator by SearchWell Labs LLC. Important information about third-party AI platforms and service limitations.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer - AI Share Button Generator',
    description: 'Disclaimer for AI Share Button Generator by SearchWell Labs LLC. Important information about third-party AI platforms.',
    url: '/disclaimer',
  },
  twitter: {
    title: 'Disclaimer - AI Share Button Generator',
    description: 'Disclaimer for AI Share Button Generator by SearchWell Labs LLC.',
  },
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-4xl">
        <div className="mb-6">
          <BackButton />
        </div>
        <header className="mb-12">
          <h1 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Disclaimer
          </h1>
          <p className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div 
          className="rounded-softer p-8 md:p-10 transition-smooth space-y-6" 
          style={{ 
            backgroundColor: 'var(--surface)', 
            border: '1px solid var(--border)'
          }}
        >
          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              General Information
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The AI Share Button Generator (&ldquo;Service&rdquo;) is operated by SearchWell Labs LLC. The information on 
              this website and the Service provided are for general informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Third-Party AI Platforms
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Our Service generates code that redirects users to third-party AI platforms, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>ChatGPT</strong> - Operated by OpenAI</li>
              <li><strong>Perplexity AI</strong> - Operated by Perplexity AI, Inc.</li>
              <li><strong>Google AI (Gemini)</strong> - Operated by Google LLC</li>
            </ul>
            <p className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <strong>We are not affiliated with, endorsed by, or sponsored by OpenAI, Perplexity AI, or Google.</strong> 
              These are independent third-party services, and we have no control over their operations, content, 
              or policies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              No Endorsement
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The inclusion of links to third-party AI platforms does not imply endorsement, recommendation, or 
              approval of these services by SearchWell Labs LLC. We provide these links solely for the convenience 
              of our users.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Service Availability
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We do not guarantee that the Service will be available at all times or that it will be free from 
              errors or interruptions. The Service may be unavailable due to maintenance, updates, or technical 
              issues beyond our control.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Third-Party Service Availability
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We are not responsible for the availability, functionality, or content of third-party AI platforms. 
              These platforms may change their URLs, terms of service, or availability at any time without notice. 
              Users are responsible for ensuring that the generated code continues to function correctly.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Generated Code
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The code generated by our Service is provided &ldquo;as-is&rdquo; without warranty of any kind. While we strive 
              to generate accurate and functional code, we do not guarantee that the generated code will work in 
              all environments or with all configurations. Users are responsible for testing and validating the 
              generated code before deploying it to production environments.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Limitation of Liability
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              SearchWell Labs LLC shall not be liable for any damages, losses, or issues arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>Use of third-party AI platforms</li>
              <li>Changes to third-party platform URLs or functionality</li>
              <li>Issues with generated code in user environments</li>
              <li>Interruptions or unavailability of the Service</li>
              <li>Any indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              User Responsibility
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Users of the Service are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>Ensuring compliance with third-party platform terms of service</li>
              <li>Verifying that generated code works correctly in their environment</li>
              <li>Maintaining and updating generated code as needed</li>
              <li>Complying with applicable laws and regulations</li>
              <li>Protecting their own data and privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Changes to This Disclaimer
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We reserve the right to update this Disclaimer at any time. Changes will be posted on this page 
              with an updated &ldquo;Last updated&rdquo; date. Your continued use of the Service after any changes 
              constitutes acceptance of the updated Disclaimer.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Contact Information
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              If you have any questions about this Disclaimer, please contact us:
            </p>
            <div className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <p><strong>SearchWell Labs LLC</strong></p>
              <p>17350 State Hwy 249 Ste 220</p>
              <p>Houston, TX 77064</p>
              <p>Email: <a href="mailto:jameson@searchwell.io" className="underline" style={{ color: 'var(--accent)' }}>jameson@searchwell.io</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
