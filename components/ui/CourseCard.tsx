import Link from 'next/link'

// ── Per-subject: left-border accent + hover text colour ───────────────────
const SUBJECT_STYLES: Record<string, {
  border:   string
  hoverBorder: string
  hoverText: string
  viewText: string
}> = {
  math: {
    border:      'border-l-math-steel',
    hoverBorder: 'hover:border-math-steel/50',
    hoverText:   'group-hover:text-math-steel',
    viewText:    'text-math-steel',
  },
  physics: {
    border:      'border-l-physics-copper',
    hoverBorder: 'hover:border-physics-copper/50',
    hoverText:   'group-hover:text-physics-copper',
    viewText:    'text-physics-copper',
  },
  cs: {
    border:      'border-l-cs-moss',
    hoverBorder: 'hover:border-cs-moss/50',
    hoverText:   'group-hover:text-cs-moss',
    viewText:    'text-cs-moss',
  },
}

// ── Curriculum badge config ───────────────────────────────────────────────
const CURRICULUM_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  ap:       { bg: 'bg-primary-container',    text: 'text-on-primary-container', label: 'AP'     },
  igcse:    { bg: 'bg-info-blue',            text: 'text-bg-1',                 label: 'IGCSE'  },
  'bac-fr': { bg: 'bg-danger-red',           text: 'text-on-error',             label: 'Bac FR' },
  ib:       { bg: 'bg-tip-gold',             text: 'text-on-secondary-fixed',   label: 'IB'     },
}

function getCurriculumType(curriculum: string) {
  if (curriculum.startsWith('ap-'))     return 'ap'
  if (curriculum.startsWith('igcse-'))  return 'igcse'
  if (curriculum.startsWith('bac-fr-')) return 'bac-fr'
  if (curriculum.startsWith('ib-'))     return 'ib'
  return 'ap'
}

type Subject = 'math' | 'physics' | 'cs'

interface Props {
  subject:     Subject
  curriculum:  string
  title:       string
  description: string
  unitCount:   number
  language:    string
  href:        string
}

export function CourseCard({
  subject, curriculum, title, description, unitCount, language, href,
}: Props) {
  const s    = SUBJECT_STYLES[subject] ?? SUBJECT_STYLES.math
  const type = getCurriculumType(curriculum)
  const badge = CURRICULUM_BADGE[type]

  return (
    <Link
      href={href}
      className={`
        group flex flex-col justify-between
        bg-surface-container-lowest
        border-l-4 ${s.border} border-y border-r border-border-base
        p-lg
        transition-all duration-200
        ${s.hoverBorder} hover:bg-surface-container-low hover:-translate-y-0.5
      `}
    >
      {/* Top row — badges + language */}
      <div>
        <div className="flex items-start justify-between mb-md">
          <div className="flex gap-xs flex-wrap">
            {badge && (
              <span
                className={`${badge.bg} ${badge.text} font-mono text-mono-label px-2 py-0.5 uppercase`}
              >
                {badge.label}
              </span>
            )}
            <span className="bg-surface-container-highest text-text-muted font-mono text-mono-label px-2 py-0.5 uppercase">
              {language.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-display text-h2 text-text-main ${s.hoverText} transition-colors leading-snug`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-text-muted mt-sm line-clamp-2 border-t border-border-base/50 pt-xs">
          {description}
        </p>
      </div>

      {/* Bottom row — unit count + view link */}
      <div className="mt-xl flex items-center justify-between">
        <span className="font-mono text-mono-label text-text-dim uppercase">
          {unitCount} UNIT{unitCount !== 1 ? 'S' : ''}
        </span>
        <span
          className={`font-mono text-mono-label ${s.viewText} flex items-center gap-1 uppercase`}
          aria-hidden
        >
          VIEW →
        </span>
      </div>
    </Link>
  )
}
