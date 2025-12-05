import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-16 md:mt-20 pt-8 pb-6 border-t transition-smooth" 
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            <p>© {currentYear} SearchWell Labs LLC. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-sm transition-smooth hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm transition-smooth hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Terms of Service
            </Link>
            <Link 
              href="/disclaimer" 
              className="text-sm transition-smooth hover:opacity-80"
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
