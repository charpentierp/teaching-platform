'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/',        label: 'Home',    exact: true  },
  { href: '/courses', label: 'Courses', exact: false },
  { href: '/about',   label: 'About',   exact: false },
]

export function NavBar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[var(--background)]/90 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-semibold text-[var(--foreground)] hover:text-accent transition-colors tracking-tight"
        >
          GTC Class
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <NavLink key={href} href={href} exact={exact}>{label}</NavLink>
          ))}
          <div className="ml-2 pl-2 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-white/8 bg-[var(--background)] px-4 py-3 flex flex-col gap-1"
        >
          {NAV_LINKS.map(({ href, label, exact }) => (
            <MobileNavLink key={href} href={href} exact={exact} onClick={() => setOpen(false)}>
              {label}
            </MobileNavLink>
          ))}
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  exact = false,
  children,
}: {
  href: string
  exact?: boolean
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'text-[var(--foreground)] bg-white/8'
          : 'text-zinc-400 hover:text-[var(--foreground)] hover:bg-white/5'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  exact = false,
  onClick,
  children,
}: {
  href: string
  exact?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
        isActive
          ? 'text-[var(--foreground)] bg-white/8'
          : 'text-zinc-400 hover:text-[var(--foreground)] hover:bg-white/5'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
