import Link from 'next/link'

const LINKEDIN_URL = 'https://www.linkedin.com/in/patrick-charpentier-hagaren'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-bg-1 border-t border-border-base mt-xl">
      <div className="max-w-site-max mx-auto px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-xl italic font-semibold text-text-muted hover:text-text-main transition-colors"
            >
              GTC Class
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim mt-1">
              STEM Education — AP · IGCSE · Bac FR · IB
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              href="/courses"
              className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-primary-container transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-primary-container transition-colors"
            >
              About
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-primary-container transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border-base/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            © {year} GTC Class — Patrick Charpentier. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            gtcclass.com
          </p>
        </div>
      </div>
    </footer>
  )
}
