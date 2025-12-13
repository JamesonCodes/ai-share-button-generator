'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StrategicAdvantageButtonProps {
  className?: string;
}

export default function StrategicAdvantageButton({ className = '' }: StrategicAdvantageButtonProps) {
  const pathname = usePathname();
  const isStrategicAdvantagePage = pathname === '/strategic-advantage';

  if (isStrategicAdvantagePage) {
    // Show home icon when on strategic advantage page
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

  // Show strategic advantage icon when on other pages
  return (
    <Link
      href="/strategic-advantage"
      className={`p-3.5 md:p-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      aria-label="Learn about strategic advantage"
      title="The Strategic Advantage of AI Share Buttons"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-smooth"
        style={{ color: 'var(--text-primary)' }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    </Link>
  );
}
