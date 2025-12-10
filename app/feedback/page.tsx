import type { Metadata } from 'next';
import TopControls from '@/components/TopControls';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share your thoughts to help improve AI Share Button Generator.',
  alternates: {
    canonical: '/feedback',
  },
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
      <TopControls />
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
            We value your feedback
          </h1>
          <p className="text-sm md:text-base transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            Let us know how the generator worked and what would make it even more useful.
          </p>
        </header>
        <div
          className="rounded-softer p-4 md:p-6 border transition-smooth"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdaL7JU-xLBjK5YXVbA_S7j3pnW_rw5g2F2a6i6HGtRNl_meA/viewform?embedded=true"
            width="100%"
            height="720"
            style={{ border: 'none' }}
            loading="lazy"
            allowFullScreen
            title="AI Share Button Generator Feedback Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
