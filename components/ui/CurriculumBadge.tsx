const CURRICULUM_LABELS: Record<string, string> = {
  'ap-calculus':    'AP',
  'ap-physics-1':  'AP',
  'ap-physics-2':  'AP',
  'ap-csp':        'AP',
  'ap-cs-a':       'AP',
  'igcse-math':    'IGCSE',
  'igcse-physics': 'IGCSE',
  'igcse-cs':      'IGCSE',
  'bac-fr-math':   'Bac FR',
  'bac-fr-physique': 'Bac FR',
  'ib-math':       'IB',
  'ib-physics':    'IB',
  'ib-cs':         'IB',
}

const CURRICULUM_STYLES: Record<string, string> = {
  ap:       'bg-amber-900/40 text-amber-300 border-amber-800/50',
  igcse:    'bg-blue-900/40 text-blue-300 border-blue-800/50',
  'bac-fr': 'bg-orange-900/40 text-orange-300 border-orange-800/50',
  ib:       'bg-purple-900/40 text-purple-300 border-purple-800/50',
}

function getCurriculumType(curriculum: string): string {
  if (curriculum.startsWith('ap-')) return 'ap'
  if (curriculum.startsWith('igcse-')) return 'igcse'
  if (curriculum.startsWith('bac-fr-')) return 'bac-fr'
  if (curriculum.startsWith('ib-')) return 'ib'
  return 'ap'
}

interface Props {
  curriculum: string
  className?: string
}

export function CurriculumBadge({ curriculum, className = '' }: Props) {
  const type = getCurriculumType(curriculum)
  const label = CURRICULUM_LABELS[curriculum] ?? curriculum.toUpperCase()
  const style = CURRICULUM_STYLES[type] ?? CURRICULUM_STYLES['ap']

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${style} ${className}`}
    >
      {label}
    </span>
  )
}
