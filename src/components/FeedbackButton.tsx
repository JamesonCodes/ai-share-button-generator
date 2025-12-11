'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FeedbackButtonProps {
  className?: string;
}

export default function FeedbackButton({ className = '' }: FeedbackButtonProps) {
  const pathname = usePathname();
  const isFeedbackPage = pathname === '/feedback';

  if (isFeedbackPage) {
    // Show home icon when on feedback page
    return (
      <Link
        href="/"
        className={`p-3.5 md:p-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target ${className}`}
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
        aria-label="Go to home"
        title="Go to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-smooth"
          style={{ color: 'var(--text-primary)' }}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
    );
  }

  // Show feedback icon when on other pages
  return (
    <Link
      href="/feedback"
      className={`p-3.5 md:p-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      aria-label="Provide feedback"
      title="Provide feedback"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-smooth"
        style={{ color: 'var(--text-primary)' }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}
