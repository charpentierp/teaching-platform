import Link from 'next/link'
import { CourseCard } from '@/components/ui/CourseCard'
import { COURSES } from '@/lib/courses'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Structured learning resources for AP, IGCSE, Bac Français, and IB curricula — Math, Physics, CS.',
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-20">
        <div className="max-w-2xl">
          <p className="text-accent text-sm font-mono tracking-widest uppercase mb-4">
            GTC Class
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-6 text-balance">
            Rigorous content.<br />Clear structure.
          </h1>
          <p className="font-body text-lg text-zinc-400 leading-relaxed mb-8">
            Structured courses for AP, IGCSE, Bac Français, and IB curricula.
            Built for students who want to understand, not just pass.
          </p>
          <div className="flex gap-3">
            <Link
              href="/courses"
              className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors text-sm"
            >
              Browse courses
            </Link>
            <Link
              href="/about"
              className="px-5 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-zinc-300 font-medium rounded-md transition-colors text-sm"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold">Available courses</h2>
          <Link href="/courses" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((course) => (
            <CourseCard
              key={`${course.subject}-${course.curriculum}`}
              subject={course.subject}
              curriculum={course.curriculum}
              title={course.title}
              description={course.description}
              unitCount={1}
              language={course.language}
              href={course.href}
            />
          ))}
          <div className="border border-dashed border-white/10 rounded-xl p-6 flex items-center justify-center text-zinc-600 text-sm">
            More courses coming soon
          </div>
        </div>
      </section>
    </div>
  )
}
