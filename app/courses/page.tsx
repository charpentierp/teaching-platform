import type { Metadata } from 'next'
import { CourseCard } from '@/components/ui/CourseCard'
import { SubjectFilter } from '@/components/ui/SubjectFilter'
import { COURSES } from '@/lib/courses'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'All available courses — Math, Physics, CS across AP, IGCSE, Bac FR, and IB curricula.',
}

export default function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">Catalogue</p>
        <h1 className="font-display text-4xl font-semibold mb-3">Courses</h1>
        <p className="text-zinc-400 max-w-xl">
          Structured content for AP, IGCSE, Bac Français, and IB curricula.
          Filter by subject to find what you need.
        </p>
      </div>

      <SubjectFilter />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </div>
  )
}
