import Link from 'next/link'

const LINKEDIN_URL = 'https://www.linkedin.com/in/patrick-charpentier-hagaren'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-white/8 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display font-semibold text-[var(--foreground)] hover:text-accent transition-colors"
            >
              GTC Class
            </Link>
            <p className="text-xs text-zinc-600 mt-1">
              STEM education — AP · IGCSE · Bac FR · IB
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <Link href="/courses" className="hover:text-zinc-300 transition-colors">Courses</Link>
            <Link href="/about"   className="hover:text-zinc-300 transition-colors">About</Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-700">
          <p>© {year} GTC Class — Patrick Charpentier. All rights reserved.</p>
          <p className="font-mono">gtcclass.com</p>
        </div>
      </div>
    </footer>
  )
}
