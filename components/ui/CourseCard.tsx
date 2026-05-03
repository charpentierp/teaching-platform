import Link from 'next/link'
import { CurriculumBadge } from './CurriculumBadge'

const SUBJECT_STYLES = {
  math:    { accent: 'border-primary-500/30 hover:border-primary-500/60', dot: 'bg-primary-400' },
  physics: { accent: 'border-blue-800/30 hover:border-blue-700/60',       dot: 'bg-blue-400' },
  cs:      { accent: 'border-purple-800/30 hover:border-purple-700/60',    dot: 'bg-purple-400' },
} as const

type Subject = keyof typeof SUBJECT_STYLES

interface Props {
  subject: Subject
  curriculum: string
  title: string
  description: string
  unitCount: number
  language: string
  href: string
}

export function CourseCard({ subject, curriculum, title, description, unitCount, language, href }: Props) {
  const styles = SUBJECT_STYLES[subject]

  return (
    <Link
      href={href}
      className={`group block border rounded-xl p-6 transition-all duration-200 bg-white/2 hover:bg-white/4 ${styles.accent}`}
    >
      <div className="flex items-center justify-between mb-4">
        <CurriculumBadge curriculum={curriculum} />
        <span className="text-xs font-mono text-zinc-600 uppercase">
          {language === 'en' ? 'EN' : language === 'fr' ? 'FR' : language.toUpperCase()}
        </span>
      </div>

      <h3 className="font-display font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-600 font-mono">
          {unitCount} unit{unitCount !== 1 ? 's' : ''}
        </span>
        <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
          View →
        </span>
      </div>
    </Link>
  )
}
