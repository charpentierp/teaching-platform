import Link from 'next/link'
import readingTime from 'reading-time'
import type { LessonFrontmatter } from '@/lib/content'

interface Breadcrumb {
  subject:        string
  curriculum:     string
  curriculumHref: string
  unit:           string
  unitHref:       string
}

interface NavItem {
  title: string
  href:  string
}

interface Props {
  frontmatter: LessonFrontmatter
  content:     React.ReactNode
  rawContent:  string
  breadcrumb:  Breadcrumb
  prev:        NavItem | null
  next:        NavItem | null
}

// ── Curriculum badge config (mirrors CourseCard) ──────────────────────────
const CURRICULUM_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  ap:       { bg: 'bg-primary-container/20',  text: 'text-on-primary-container border-primary-container/40', label: 'AP'     },
  igcse:    { bg: 'bg-info-blue/10',          text: 'text-info-blue border-info-blue/30',                    label: 'IGCSE'  },
  'bac-fr': { bg: 'bg-danger-red/10',         text: 'text-danger-red border-danger-red/30',                  label: 'Bac FR' },
  ib:       { bg: 'bg-tip-gold/10',           text: 'text-tip-gold border-tip-gold/30',                      label: 'IB'     },
}

const DIFFICULTY_BADGE: Record<string, { bg: string; text: string }> = {
  foundations:  { bg: 'bg-success-green/10', text: 'text-success-green border-success-green/30' },
  core:         { bg: 'bg-info-blue/10',     text: 'text-info-blue border-info-blue/30'         },
  advanced:     { bg: 'bg-tip-gold/10',      text: 'text-tip-gold border-tip-gold/30'           },
  'exam-ready': { bg: 'bg-danger-red/10',    text: 'text-danger-red border-danger-red/30'       },
}

function getCurriculumType(curriculum: string) {
  if (curriculum.startsWith('ap-'))     return 'ap'
  if (curriculum.startsWith('igcse-'))  return 'igcse'
  if (curriculum.startsWith('bac-fr-')) return 'bac-fr'
  if (curriculum.startsWith('ib-'))     return 'ib'
  return 'ap'
}

function Badge({ bg, text, children }: { bg: string; text: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center ${bg} ${text} border font-mono text-[10px] uppercase tracking-widest px-3 py-1`}
    >
      {children}
    </span>
  )
}

export function LessonPage({
  frontmatter, content, rawContent, breadcrumb, prev, next,
}: Props) {
  const { text: readTime } = readingTime(rawContent)

  const currType  = getCurriculumType(frontmatter.curriculum)
  const currBadge = CURRICULUM_BADGE[currType]
  const diffBadge = frontmatter.difficulty
    ? DIFFICULTY_BADGE[frontmatter.difficulty]
    : null

  const diffLabel = frontmatter.difficulty
    ? (frontmatter.difficulty === 'exam-ready' ? 'Exam Ready'
      : frontmatter.difficulty.charAt(0).toUpperCase() + frontmatter.difficulty.slice(1))
    : null

  return (
    <div className="max-w-site-max mx-auto px-4 sm:px-8 pt-10 pb-24">

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav
        className="flex items-center flex-wrap gap-1 font-mono text-[10px] uppercase tracking-widest text-text-dim mb-8"
        aria-label="Breadcrumb"
      >
        <Link href="/courses" className="hover:text-primary-fixed-dim transition-colors">Courses</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <Link
          href={`/courses/${frontmatter.subject}`}
          className="hover:text-primary-fixed-dim transition-colors capitalize"
        >
          {frontmatter.subject}
        </Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <Link href={breadcrumb.curriculumHref} className="hover:text-primary-fixed-dim transition-colors">
          {breadcrumb.curriculum}
        </Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <Link href={breadcrumb.unitHref} className="hover:text-primary-fixed-dim transition-colors">
          {breadcrumb.unit}
        </Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-text-muted">{frontmatter.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">

        {/* ── Main article ────────────────────────────────────────────────── */}
        <article>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-base pb-8 mb-8">
            <div className="max-w-2xl">
              <h1 className="font-display text-h1-page text-text-main mb-2 leading-tight">
                {frontmatter.title}
              </h1>
              {frontmatter.updatedAt && (
                <p className="font-mono text-body-sm text-text-dim italic">
                  Updated {frontmatter.updatedAt}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {currBadge && (
                <Badge bg={currBadge.bg} text={currBadge.text}>
                  {currBadge.label}
                </Badge>
              )}
              {diffBadge && diffLabel && (
                <Badge bg={diffBadge.bg} text={diffBadge.text}>
                  {diffLabel}
                </Badge>
              )}
            </div>
          </div>

          {/* MDX content */}
          <div className="prose-lesson text-on-surface-variant">
            {content}
          </div>

          {/* ── Prev / Next navigation ──────────────────────────────────── */}
          <nav
            className="mt-24 pt-12 border-t border-border-base flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
            aria-label="Lesson navigation"
          >
            {prev ? (
              <Link href={prev.href} className="group flex flex-col items-start gap-1 max-w-[240px]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-primary-fixed-dim transition-colors">
                  Previous Lesson
                </span>
                <span className="font-display text-h2 text-text-muted group-hover:text-text-main transition-colors leading-tight">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {/* Divider on sm+ */}
            {prev && next && (
              <div className="hidden sm:block h-10 w-px bg-border-base shrink-0" />
            )}

            {next ? (
              <Link href={next.href} className="group flex flex-col items-end text-right gap-1 max-w-[240px] sm:ml-auto">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-primary-fixed-dim transition-colors">
                  Next Lesson
                </span>
                <span className="font-display text-h2 text-text-muted group-hover:text-text-main transition-colors leading-tight">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        </article>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">

            {/* Lesson info panel */}
            <div className="bg-surface-container-low border border-border-base p-lg">
              <p className="font-mono text-mono-label text-text-dim uppercase tracking-widest mb-md">
                Lesson Info
              </p>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-0.5">Subject</dt>
                  <dd className="text-body-sm text-text-muted capitalize">{frontmatter.subject}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-0.5">Unit</dt>
                  <dd className="text-body-sm text-text-muted">{frontmatter.unit}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-0.5">Reading time</dt>
                  <dd className="font-mono text-body-sm text-text-muted">{readTime}</dd>
                </div>
                {frontmatter.difficulty && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-1">Level</dt>
                    <dd>
                      {diffBadge && diffLabel && (
                        <Badge bg={diffBadge.bg} text={diffBadge.text}>{diffLabel}</Badge>
                      )}
                    </dd>
                  </div>
                )}
                {frontmatter.language && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-0.5">Language</dt>
                    <dd className="font-mono text-body-sm text-text-muted uppercase">{frontmatter.language}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Back to unit */}
            <Link
              href={breadcrumb.unitHref}
              className="flex items-center gap-2 px-md py-sm border border-border-base hover:border-border-strong bg-surface-container-low hover:bg-surface-container text-text-dim hover:text-text-muted transition-all text-body-sm font-mono w-full"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to unit</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
