import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AI Share Button Generator by SearchWell Labs LLC. Learn how we handle your data and protect your privacy when using our service.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy - AI Share Button Generator',
    description: 'Privacy Policy for AI Share Button Generator by SearchWell Labs LLC. Learn how we handle your data and protect your privacy.',
    url: '/privacy-policy',
  },
  twitter: {
    title: 'Privacy Policy - AI Share Button Generator',
    description: 'Privacy Policy for AI Share Button Generator by SearchWell Labs LLC.',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-4xl">
        <header className="mb-12">
          <h1 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            Privacy Policy
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
              Introduction
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              SearchWell Labs LLC ("we," "our," or "us") operates the AI Share Button Generator ("Service"). 
              This Privacy Policy explains how we handle information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Information We Collect
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Our Service is designed with privacy in mind. We collect minimal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Email Address:</strong> If you choose to join our waitlist for premium features, we collect your email address and your feature preferences. This information is stored securely with our email service provider (Resend) and is used solely to notify you about premium feature launches.</li>
              <li><strong>Theme Preference:</strong> We store your theme preference (light or dark mode) in your browser's localStorage. This information is stored locally on your device and is not transmitted to our servers.</li>
              <li><strong>User Input:</strong> When you use the generator to create share button code, the information you enter (URLs, brand names, prompt templates) is processed entirely in your browser. We do not collect, store, or transmit this information to our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              How We Use Information
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Email Addresses:</strong> We use your email address to send you notifications about premium feature launches and updates related to the features you expressed interest in. We do not use your email for marketing purposes unrelated to the waitlist, and we do not share your email with third parties except as necessary to provide the email service (see Third-Party Services below).</li>
              <li><strong>Theme Preference:</strong> The theme preference stored in localStorage is used solely to maintain your display preferences between visits. We do not use this information for any other purpose, and we do not share it with third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Third-Party Services
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <strong>Email Service Provider:</strong> We use Resend to store and manage email addresses for our waitlist. Resend processes your email address on our behalf in accordance with their privacy policy. You can review Resend's privacy practices at <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>resend.com/legal/privacy-policy</a>.
            </p>
            <p className="mb-3 mt-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <strong>AI Platform Redirects:</strong> Our Service generates code that redirects users to third-party AI platforms, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>ChatGPT (operated by OpenAI)</li>
              <li>Perplexity AI</li>
              <li>Google AI (Gemini)</li>
            </ul>
            <p className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              When users click share buttons generated by our Service, they are redirected to these third-party 
              platforms. We are not responsible for the privacy practices of these external services. We 
              encourage you to review the privacy policies of these platforms:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>OpenAI Privacy Policy</a></li>
              <li><a href="https://www.perplexity.ai/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Perplexity Privacy Policy</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>Google Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Data Storage and Security
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <strong>Email Addresses:</strong> Email addresses collected through our waitlist are stored securely with Resend, our email service provider. We retain your email address until you request its deletion or unsubscribe from our waitlist communications.
            </p>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <strong>Local Data:</strong> Theme preferences and user input for generating share button code are processed entirely in your browser. The theme preference stored in localStorage can be cleared at any time through your browser settings.
            </p>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We implement reasonable security measures to protect your information, but no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Email Communications and Opt-Out
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              If you have joined our waitlist, we may send you emails about premium feature launches and updates. You can opt-out of these communications at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>Clicking the unsubscribe link in any email we send you</li>
              <li>Contacting us at <a href="mailto:jameson@searchwell.io" className="underline" style={{ color: 'var(--accent)' }}>jameson@searchwell.io</a> and requesting removal from the waitlist</li>
            </ul>
            <p className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We will process your opt-out request promptly, typically within 10 business days.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Your Rights
            </h2>
            <p className="mb-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Deletion:</strong> You can request that we delete your email address from our waitlist.</li>
              <li><strong>Opt-Out:</strong> You can unsubscribe from our email communications at any time (see Email Communications and Opt-Out above).</li>
              <li><strong>Correction:</strong> You can request that we correct any inaccurate information we hold about you.</li>
            </ul>
            <p className="mt-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              To exercise any of these rights, please contact us at <a href="mailto:jameson@searchwell.io" className="underline" style={{ color: 'var(--accent)' }}>jameson@searchwell.io</a>. We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Cookies and Local Storage
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We use browser localStorage (not cookies) to store your theme preference. This is a standard 
              browser feature that allows websites to remember your preferences. You can disable or clear 
              localStorage through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Children's Privacy
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Our Service is not directed to children under the age of 13. We do not knowingly collect 
              personal information from children. If you are a parent or guardian and believe your child 
              has provided us with information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Changes to This Privacy Policy
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Contact Us
            </h2>
            <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              If you have any questions about this Privacy Policy, please contact us:
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
