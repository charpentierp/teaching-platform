import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseCard } from '@/components/ui/CourseCard'
import { notFound } from 'next/navigation'

const SUBJECTS = {
  math: { label: 'Mathematics', color: 'text-primary-400' },
  physics: { label: 'Physics', color: 'text-blue-400' },
  cs: { label: 'Computer Science', color: 'text-purple-400' },
} as const

type Subject = keyof typeof SUBJECTS

interface Props {
  params: { subject: string }
}

export function generateStaticParams() {
  return Object.keys(SUBJECTS).map((subject) => ({ subject }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS[params.subject as Subject]
  if (!subject) return {}
  return { title: subject.label }
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS[params.subject as Subject]
  if (!subject) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
        <Link href="/courses" className="hover:text-zinc-300 transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-zinc-300">{subject.label}</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold mb-10">{subject.label}</h1>

      {params.subject === 'math' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CourseCard
            subject="math"
            curriculum="ap-calculus"
            title="AP Calculus AB"
            description="Limits, derivatives, integrals — from first principles to exam-ready."
            unitCount={1}
            language="en"
            href="/courses/math/ap-calculus"
          />
        </div>
      )}

      {params.subject !== 'math' && (
        <p className="text-zinc-500">No courses available yet for this subject.</p>
      )}
    </div>
  )
}
