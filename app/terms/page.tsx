import type { Metadata } from "next";
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AI Share Button Generator by SearchWell Labs LLC. Read our terms and conditions for using the AI share button generator service.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service - AI Share Button Generator',
    description: 'Terms of Service for AI Share Button Generator by SearchWell Labs LLC. Read our terms and conditions.',
    url: '/terms',
  },
  twitter: {
    title: 'Terms of Service - AI Share Button Generator',
    description: 'Terms of Service for AI Share Button Generator by SearchWell Labs LLC.',
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-4xl">
        <div className="mb-6">
          <BackButton />
        </div>
        <header className="mb-12">
          <h1 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              By accessing or using the AI Share Button Generator (&ldquo;Service&rdquo;) operated by SearchWell Labs LLC 
              (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you disagree with 
              any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Description of Service
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The AI Share Button Generator is a web-based tool that allows users to generate embeddable code 
              for share buttons that redirect to third-party AI platforms (ChatGPT, Perplexity AI, Google AI, and Grok). 
              The Service generates code snippets that users can embed on their own websites.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Use of Service
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>Use the Service to generate code for malicious, harmful, or illegal purposes</li>
              <li>Use the Service to violate any applicable laws or regulations</li>
              <li>Attempt to reverse engineer, decompile, or disassemble the Service</li>
              <li>Use the Service in any way that could damage, disable, or impair the Service</li>
              <li>Use the Service to infringe upon the rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Third-Party Services
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The Service generates code that redirects users to third-party AI platforms. We are not responsible 
              for the availability, content, or practices of these third-party services. Your use of third-party 
              services is subject to their respective terms of service and privacy policies.
            </p>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We do not endorse, warrant, or assume responsibility for any third-party services, and we will not 
              be liable for any damages or losses related to your use of such services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Disclaimer of Warranties
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
              PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR 
              ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Limitation of Liability
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SEARCHWELL LABS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER 
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
              RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Intellectual Property
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              The Service and its original content, features, and functionality are owned by SearchWell Labs LLC 
              and are protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws. You may use the generated code snippets on your own websites in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              User-Generated Content
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              When you use the Service to generate code, you are responsible for ensuring that any URLs, brand names, 
              or prompt templates you provide comply with applicable laws and do not infringe upon the rights of others. 
              You retain all rights to the content you input into the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Waitlist and Email Communications
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Our Service offers a waitlist for premium features. By joining the waitlist, you agree to the following:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Email Collection:</strong> You provide your email address voluntarily to receive notifications about premium feature launches and updates.</li>
              <li><strong>Purpose:</strong> We will only use your email address to send you information about premium features you expressed interest in. We will not use your email for unrelated marketing purposes.</li>
              <li><strong>No Guarantee:</strong> Joining the waitlist does not guarantee access to premium features. We reserve the right to modify, delay, or cancel premium features at any time.</li>
              <li><strong>Unsubscribe Rights:</strong> You may unsubscribe from waitlist communications at any time by clicking the unsubscribe link in any email we send you, or by contacting us at <a href="mailto:jameson@searchwell.io" className="underline" style={{ color: 'var(--accent)' }}>jameson@searchwell.io</a>.</li>
            </ul>
            <p className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              By joining the waitlist, you acknowledge that you have read and agree to our <a href="/privacy-policy" className="underline" style={{ color: 'var(--accent)' }}>Privacy Policy</a>, which describes how we handle your email address and other information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Termination
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We reserve the right to terminate or suspend your access to the Service immediately, without prior 
              notice or liability, for any reason, including if you breach these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Changes to Terms
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
              try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material 
              change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Governing Law
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              These Terms shall be governed and construed in accordance with the laws of the State of Texas, United 
              States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Contact Information
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              If you have any questions about these Terms of Service, please contact us:
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
