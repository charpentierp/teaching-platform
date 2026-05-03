import type { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { getCurriculumMeta, getUnitMeta, getLessons } from '@/lib/content'
import { DifficultyTag } from '@/components/ui/DifficultyTag'
import { UnitProgress } from '@/components/ui/UnitProgress'
import { PDFResource } from '@/components/resources/PDFResource'
import { notFound } from 'next/navigation'

interface Props {
  params: { subject: string; curriculum: string; unit: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = getUnitMeta(params.subject, params.curriculum, params.unit)
  if (!unit) return {}
  return { title: unit.title }
}

function pdfExists(filename: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'pdfs', filename))
  } catch {
    return false
  }
}

function hasMCQ(subject: string, curriculum: string, unit: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'content', subject, curriculum, unit, `mcq-${unit}.json`)
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

export default function UnitPage({ params }: Props) {
  const curriculumMeta = getCurriculumMeta(params.subject, params.curriculum)
  const unitMeta = getUnitMeta(params.subject, params.curriculum, params.unit)
  if (!unitMeta || !curriculumMeta) notFound()

  const lessons = getLessons(params.subject, params.curriculum, params.unit)
  const basePath = `/courses/${params.subject}/${params.curriculum}/${params.unit}`

  const exerciseFile = `${params.curriculum}-${params.unit}-exercises.pdf`
  const answersFile  = `${params.curriculum}-${params.unit}-answers.pdf`
  const hasExercises = pdfExists(exerciseFile)
  const hasAnswers   = pdfExists(answersFile)
  const showMCQ      = hasMCQ(params.subject, params.curriculum, params.unit)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/courses" className="hover:text-zinc-300 transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${params.subject}`} className="hover:text-zinc-300 transition-colors capitalize">
          {params.subject}
        </Link>
        <span>/</span>
        <Link href={`/courses/${params.subject}/${params.curriculum}`} className="hover:text-zinc-300 transition-colors">
          {curriculumMeta.title}
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{unitMeta.title}</span>
      </nav>

      <p className="text-xs text-zinc-500 font-mono mb-2">Unit {unitMeta.order}</p>
      <h1 className="font-display text-4xl font-semibold mb-3">{unitMeta.title}</h1>
      {unitMeta.description && (
        <p className="text-zinc-400 mb-8">{unitMeta.description}</p>
      )}

      <UnitProgress total={lessons.length} completed={0} />

      <h2 className="font-display text-xl font-semibold mt-10 mb-5">Lessons</h2>
      <div className="space-y-2">
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`${basePath}/${lesson.slug}`}
            className="flex items-center gap-4 border border-white/8 hover:border-white/16 rounded-xl px-5 py-4 hover:bg-white/2 transition-all group"
          >
            <span className="text-xs font-mono text-zinc-600 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                {lesson.frontmatter.title}
              </p>
            </div>
            {lesson.frontmatter.difficulty && (
              <DifficultyTag difficulty={lesson.frontmatter.difficulty} size="sm" />
            )}
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0">→</span>
          </Link>
        ))}
      </div>

      {showMCQ && (
        <div className="mt-10">
          <Link
            href={`${basePath}/mcq`}
            className="flex items-center justify-between border border-primary-500/30 hover:border-primary-500/60 bg-primary-500/5 hover:bg-primary-500/10 rounded-xl px-6 py-5 transition-all group"
          >
            <div>
              <p className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Practice Quiz
              </p>
              <p className="text-sm text-zinc-500 mt-0.5">Test your knowledge of this unit</p>
            </div>
            <span className="text-primary-400 group-hover:text-primary-300 transition-colors text-lg">→</span>
          </Link>
        </div>
      )}

      {(hasExercises || hasAnswers) && (
        <div className="mt-12 pt-8 border-t border-white/8">
          <h2 className="font-display text-xl font-semibold mb-5">Resources</h2>
          {hasExercises && (
            <PDFResource
              title={`Exercises — ${unitMeta.title}`}
              href={`/pdfs/${exerciseFile}`}
              type="exercises"
            />
          )}
          {hasAnswers && (
            <PDFResource
              title={`Answer Key — ${unitMeta.title}`}
              href={`/pdfs/${answersFile}`}
              type="answers"
              className={hasExercises ? 'mt-3' : ''}
            />
          )}
        </div>
      )}
    </div>
  )
}
