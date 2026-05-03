// Stitch-aligned difficulty tag
const DIFFICULTY_CONFIG = {
  foundations:  { label: 'Foundations', bg: 'bg-success-green/10', text: 'text-success-green border-success-green/30' },
  core:         { label: 'Core',        bg: 'bg-info-blue/10',     text: 'text-info-blue border-info-blue/30'         },
  advanced:     { label: 'Advanced',    bg: 'bg-tip-gold/10',      text: 'text-tip-gold border-tip-gold/30'           },
  'exam-ready': { label: 'Exam Ready',  bg: 'bg-danger-red/10',    text: 'text-danger-red border-danger-red/30'       },
} as const

type Difficulty = keyof typeof DIFFICULTY_CONFIG

interface Props {
  difficulty: string
  size?:      'sm' | 'md'
  className?: string
}

export function DifficultyTag({ difficulty, size = 'md', className = '' }: Props) {
  const config = DIFFICULTY_CONFIG[difficulty as Difficulty] ?? {
    label: difficulty,
    bg:    'bg-surface-container-high',
    text:  'text-text-muted border-border-base',
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[10px]'

  return (
    <span
      className={`
        inline-flex items-center border
        ${config.bg} ${config.text}
        font-mono uppercase tracking-widest ${padding}
        ${className}
      `}
    >
      {config.label}
    </span>
  )
}
