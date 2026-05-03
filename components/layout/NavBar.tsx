'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { href: '/',        label: 'Home',    exact: true  },
  { href: '/courses', label: 'Courses', exact: false },
  { href: '/about',   label: 'About',   exact: false },
]

// ── Icon helper ───────────────────────────────────────────────────────────
function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      aria-hidden
    >
      {name}
    </span>
  )
}

export function NavBar() {
  const [open, setOpen]     = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname            = usePathname()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-base bg-bg-1/90 backdrop-blur-md">
      <nav className="max-w-site-max mx-auto px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl italic font-semibold text-text-main hover:text-primary-fixed-dim transition-colors tracking-tight"
        >
          GTC Class
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <NavLink key={href} href={href} exact={exact}>{label}</NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          {mounted ? (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-text-dim hover:text-text-main transition-colors"
            >
              <Icon name={isDark ? 'light_mode' : 'dark_mode'} />
            </button>
          ) : (
            <div className="w-9 h-9" aria-hidden />
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-text-dim hover:text-text-main transition-colors"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border-base bg-bg-1 px-6 py-3 flex flex-col gap-1"
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

// ── Desktop link ──────────────────────────────────────────────────────────
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
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={`
        font-display text-lg tracking-tight pb-1 transition-colors duration-200
        ${isActive
          ? 'text-text-main border-b-2 border-primary-container'
          : 'text-text-dim hover:text-text-main'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

// ── Mobile link ───────────────────────────────────────────────────────────
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
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        font-display text-xl tracking-tight px-2 py-3 transition-colors border-b border-border-base/40 last:border-0
        ${isActive ? 'text-text-main' : 'text-text-dim hover:text-text-main'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
