const DIFFICULTY_CONFIG = {
  foundations:  { label: 'Foundations',  style: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' },
  core:         { label: 'Core',         style: 'bg-blue-900/30 text-blue-400 border-blue-800/50' },
  advanced:     { label: 'Advanced',     style: 'bg-red-900/30 text-red-400 border-red-800/50' },
  'exam-ready': { label: 'Exam Ready',   style: 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' },
} as const

type Difficulty = keyof typeof DIFFICULTY_CONFIG

interface Props {
  difficulty: string
  size?: 'sm' | 'md'
  className?: string
}

export function DifficultyTag({ difficulty, size = 'md', className = '' }: Props) {
  const config = DIFFICULTY_CONFIG[difficulty as Difficulty] ?? {
    label: difficulty,
    style: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  }

  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono font-medium border ${config.style} ${sizeClass} ${className}`}
    >
      {config.label}
    </span>
  )
}
