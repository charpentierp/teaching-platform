// Stitch-aligned curriculum badge
const CURRICULUM_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ap:       { bg: 'bg-primary-container/20',  text: 'text-on-primary-container border-primary-container/40', label: 'AP'     },
  igcse:    { bg: 'bg-info-blue/10',          text: 'text-info-blue border-info-blue/30',                    label: 'IGCSE'  },
  'bac-fr': { bg: 'bg-danger-red/10',         text: 'text-danger-red border-danger-red/30',                  label: 'Bac FR' },
  ib:       { bg: 'bg-tip-gold/10',           text: 'text-tip-gold border-tip-gold/30',                      label: 'IB'     },
}

function getCurriculumType(curriculum: string): string {
  if (curriculum.startsWith('ap-'))     return 'ap'
  if (curriculum.startsWith('igcse-'))  return 'igcse'
  if (curriculum.startsWith('bac-fr-')) return 'bac-fr'
  if (curriculum.startsWith('ib-'))     return 'ib'
  return 'ap'
}

interface Props {
  curriculum: string
  className?: string
}

export function CurriculumBadge({ curriculum, className = '' }: Props) {
  const type   = getCurriculumType(curriculum)
  const config = CURRICULUM_STYLES[type] ?? CURRICULUM_STYLES.ap

  return (
    <span
      className={`
        inline-flex items-center border
        ${config.bg} ${config.text}
        font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5
        ${className}
      `}
    >
      {config.label}
    </span>
  )
}
