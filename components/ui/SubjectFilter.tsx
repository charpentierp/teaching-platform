'use client'

import { useState } from 'react'

const SUBJECTS = [
  { id: 'all',     label: 'All' },
  { id: 'math',    label: 'Mathematics' },
  { id: 'physics', label: 'Physics' },
  { id: 'cs',      label: 'Computer Science' },
] as const

type SubjectId = (typeof SUBJECTS)[number]['id']

interface Props {
  onFilter?: (subject: SubjectId) => void
}

export function SubjectFilter({ onFilter }: Props) {
  const [active, setActive] = useState<SubjectId>('all')

  function handleSelect(id: SubjectId) {
    setActive(id)
    onFilter?.(id)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by subject">
      {SUBJECTS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleSelect(id)}
          aria-pressed={active === id}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            active === id
              ? 'bg-primary-500 border-primary-500 text-white'
              : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
