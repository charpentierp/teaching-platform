'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[var(--background)]/90 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold text-[var(--foreground)] hover:text-accent transition-colors tracking-tight"
        >
          Teaching Platform
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/" exact>Home</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/about">About</NavLink>
          <div className="ml-2 pl-2 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </nav>
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
