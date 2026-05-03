export type Subject = 'math' | 'physics' | 'cs'

export interface CourseEntry {
  subject: Subject
  curriculum: string
  title: string
  description: string
  language: string
  href: string
}

export const COURSES: CourseEntry[] = [
  {
    subject: 'math',
    curriculum: 'ap-calculus',
    title: 'AP Calculus AB',
    description: 'Limits, derivatives, integrals — from first principles to exam-ready.',
    language: 'en',
    href: '/courses/math/ap-calculus',
  },
  {
    subject: 'cs',
    curriculum: 'igcse-cs',
    title: 'IGCSE Computer Science',
    description: 'Networks, security, algorithms, and data — Cambridge Pearson Edexcel iGCSE.',
    language: 'en',
    href: '/courses/cs/igcse-cs',
  },
]

export const SUBJECTS: Record<Subject, { label: string }> = {
  math:    { label: 'Mathematics' },
  physics: { label: 'Physics' },
  cs:      { label: 'Computer Science' },
}
