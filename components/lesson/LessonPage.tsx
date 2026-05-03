import Link from 'next/link'
import readingTime from 'reading-time'
import { DifficultyTag } from '@/components/ui/DifficultyTag'
import { CurriculumBadge } from '@/components/ui/CurriculumBadge'
import type { LessonFrontmatter } from '@/lib/content'

interface Breadcrumb {
  subject: string
  curriculum: string
  curriculumHref: string
  unit: string
  unitHref: string
}

interface NavItem {
  title: string
  href: string
}

interface Props {
  frontmatter: LessonFrontmatter
  content: React.ReactNode
  rawContent: string
  breadcrumb: Breadcrumb
  prev: NavItem | null
  next: NavItem | null
}

export function LessonPage({ frontmatter, content, rawContent, breadcrumb, prev, next }: Props) {
  const { text: readTime } = readingTime(rawContent)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
        <article>
          <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/courses" className="hover:text-zinc-300 transition-colors">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${frontmatter.subject}`} className="hover:text-zinc-300 transition-colors capitalize">
              {frontmatter.subject}
            </Link>
            <span>/</span>
            <Link href={breadcrumb.curriculumHref} className="hover:text-zinc-300 transition-colors">
              {breadcrumb.curriculum}
            </Link>
            <span>/</span>
            <Link href={breadcrumb.unitHref} className="hover:text-zinc-300 transition-colors">
              {breadcrumb.unit}
            </Link>
            <span>/</span>
            <span className="text-zinc-300">{frontmatter.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <CurriculumBadge curriculum={frontmatter.curriculum} />
            {frontmatter.difficulty && (
              <DifficultyTag difficulty={frontmatter.difficulty} />
            )}
            <span className="text-xs font-mono text-zinc-600">{readTime}</span>
            {frontmatter.updatedAt && (
              <span className="text-xs font-mono text-zinc-600">
                · Updated {frontmatter.updatedAt}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl font-semibold mb-8 leading-tight">
            {frontmatter.title}
          </h1>

          <div className="prose-lesson text-zinc-300">
            {content}
          </div>

          <nav className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={prev.href}
                className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors max-w-[45%]"
              >
                <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">←</span>
                <span className="truncate">{prev.title}</span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={next.href}
                className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors max-w-[45%] ml-auto"
              >
                <span className="truncate">{next.title}</span>
                <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">→</span>
              </Link>
            ) : <div />}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="border border-white/8 rounded-xl p-5">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Lesson info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-zinc-600 text-xs mb-0.5">Subject</dt>
                  <dd className="text-zinc-300 capitalize">{frontmatter.subject}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600 text-xs mb-0.5">Unit</dt>
                  <dd className="text-zinc-300">{frontmatter.unit}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600 text-xs mb-0.5">Reading time</dt>
                  <dd className="text-zinc-300 font-mono text-xs">{readTime}</dd>
                </div>
                {frontmatter.difficulty && (
                  <div>
                    <dt className="text-zinc-600 text-xs mb-1.5">Level</dt>
                    <dd><DifficultyTag difficulty={frontmatter.difficulty} size="sm" /></dd>
                  </div>
                )}
                {frontmatter.language && (
                  <div>
                    <dt className="text-zinc-600 text-xs mb-0.5">Language</dt>
                    <dd className="text-zinc-300 font-mono text-xs uppercase">{frontmatter.language}</dd>
                  </div>
                )}
              </dl>
            </div>

            <Link
              href={breadcrumb.unitHref}
              className="flex items-center gap-2 px-4 py-3 border border-white/8 hover:border-white/16 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 transition-all w-full"
            >
              <span>←</span>
              <span>Back to unit</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
