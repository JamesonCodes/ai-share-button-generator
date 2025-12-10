'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function TopControls() {
  const pathname = usePathname();
  const isFeedbackPage = pathname === '/feedback';

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-3">
      {isFeedbackPage ? (
        <Link
          href="/"
          className="text-sm font-medium transition-smooth hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          Home
        </Link>
      ) : (
        <Link
          href="/feedback"
          className="text-sm font-medium transition-smooth hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          Feedback
        </Link>
      )}
      <ThemeToggle />
    </div>
  );
}
