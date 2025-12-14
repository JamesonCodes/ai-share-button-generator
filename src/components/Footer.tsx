import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-16 md:mt-20 pt-6 md:pt-8 pb-4 md:pb-6 border-t transition-smooth" 
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            <p>© {currentYear} SearchWell Labs LLC. All rights reserved.</p>
            <p className="mt-2">
              Made with ❤️ by{' '}
              <a
                href="https://jamesoncodes.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-smooth hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                Jameson Campbell
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-3 md:gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-sm transition-smooth hover:opacity-80 touch-target py-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm transition-smooth hover:opacity-80 touch-target py-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Terms of Service
            </Link>
            <Link 
              href="/disclaimer" 
              className="text-sm transition-smooth hover:opacity-80 touch-target py-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
