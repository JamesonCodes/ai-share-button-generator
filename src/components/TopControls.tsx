'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import StrategicAdvantageButton from '@/components/StrategicAdvantageButton';
import FeedbackButton from '@/components/FeedbackButton';

export default function TopControls() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop: Show buttons directly */}
      <div className="hidden md:flex fixed top-6 right-6 z-50 flex-col items-end gap-3">
        <ThemeToggle />
        <StrategicAdvantageButton />
        <FeedbackButton />
      </div>

      {/* Mobile: Hamburger menu */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        {/* Hamburger button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3.5 rounded-soft transition-smooth active:opacity-90 touch-target"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            // Close icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-smooth"
              style={{ color: 'var(--text-primary)' }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-smooth"
              style={{ color: 'var(--text-primary)' }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Menu overlay and content */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
              style={{ zIndex: 49 }}
              onClick={handleMenuClick}
              aria-hidden="true"
            />
            
            {/* Menu panel */}
            <div
              className="absolute top-14 right-0 rounded-soft shadow-lg transition-all duration-200 ease-out"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                minWidth: '200px',
                zIndex: 50,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
              }}
            >
              <div className="flex flex-col p-2 gap-1">
                {/* Theme Toggle with label */}
                <button
                  onClick={() => {
                    toggleTheme();
                    handleMenuClick();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target w-full text-left"
                  style={{
                    minHeight: '44px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {theme === 'light' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="text-sm font-medium transition-smooth">
                    Toggle Theme
                  </span>
                </button>

                {/* Strategic Advantage with label */}
                <Link
                  href={pathname === '/strategic-advantage' ? '/' : '/strategic-advantage'}
                  onClick={handleMenuClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target w-full text-left"
                  style={{
                    minHeight: '44px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {pathname === '/strategic-advantage' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  )}
                  <span className="text-sm font-medium transition-smooth">
                    {pathname === '/strategic-advantage' ? 'Home' : 'Strategic Advantage'}
                  </span>
                </Link>

                {/* Feedback with label */}
                <Link
                  href={pathname === '/feedback' ? '/' : '/feedback'}
                  onClick={handleMenuClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-soft transition-smooth hover:opacity-80 active:opacity-90 touch-target w-full text-left"
                  style={{
                    minHeight: '44px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {pathname === '/feedback' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-smooth flex-shrink-0"
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
                  )}
                  <span className="text-sm font-medium transition-smooth">
                    {pathname === '/feedback' ? 'Home' : 'Feedback'}
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
