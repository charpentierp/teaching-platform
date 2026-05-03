'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  src: string
  title: string
  curriculum: string
  unit: string
  backHref: string
  /** estimated height for initial render before resize */
  minHeight?: number
}

export function HtmlLessonFrame({
  src,
  title,
  curriculum,
  unit,
  backHref,
  minHeight = 800,
}: Props) {
  const [height, setHeight] = useState(minHeight)

  function handleLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    try {
      const doc = (e.target as HTMLIFrameElement).contentDocument
      if (doc) {
        const h = doc.documentElement.scrollHeight
        if (h > 200) setHeight(h)
      }
    } catch {
      // cross-origin safety; silently keep minHeight
    }
  }

  return (
    <div className="w-full">
      {/* Breadcrumb header */}
      <div className="border-b border-white/8 bg-[var(--background)] sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-3 text-sm">
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
          >
            <span>←</span>
            <span className="hidden sm:inline">Back to unit</span>
          </Link>
          <span className="text-zinc-700">·</span>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest truncate">
            {curriculum} · {unit}
          </span>
          <span className="text-zinc-700 hidden sm:inline">·</span>
          <span className="text-zinc-400 truncate hidden sm:inline">{title}</span>
        </div>
      </div>

      {/* iframe — fills the full width, auto-height */}
      <iframe
        src={src}
        title={title}
        onLoad={handleLoad}
        style={{ height }}
        className="w-full border-0 block"
        loading="lazy"
      />
    </div>
  )
}
