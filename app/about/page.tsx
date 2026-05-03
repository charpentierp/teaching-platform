import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the teacher behind this platform.',
}

const subjects = [
  { label: 'Mathematics', items: ['AP Calculus AB/BC', 'AP Statistics', 'IGCSE Mathematics', 'Bac Français Maths', 'IB Math AA/AI'] },
  { label: 'Physics', items: ['AP Physics 1 & 2', 'AP Physics C', 'IGCSE Physics', 'Bac Français Physique', 'IB Physics'] },
  { label: 'Computer Science', items: ['AP Computer Science Principles', 'AP Computer Science A', 'IGCSE CS', 'IB Computer Science'] },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <p className="text-accent text-sm font-mono tracking-widest uppercase mb-4">About</p>
      <h1 className="font-display text-4xl font-semibold mb-10">The platform</h1>

      <div className="space-y-6 text-zinc-300 font-body leading-relaxed mb-14">
        <p>
          This is a personal teaching platform — a structured, public resource for students
          preparing for AP, IGCSE, Bac Français, and IB examinations in Mathematics, Physics,
          and Computer Science.
        </p>
        <p>
          All content is written and curated by a single teacher. The goal is rigour over volume:
          every lesson, problem set, and practice question is designed to build genuine understanding,
          not just exam technique.
        </p>
        <p>
          The platform is free and public. No account required to read lessons or attempt practice questions.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-semibold mb-6">Curricula covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject.label}>
              <h3 className="font-display font-semibold text-zinc-200 mb-3">{subject.label}</h3>
              <ul className="space-y-1.5">
                {subject.items.map((item) => (
                  <li key={item} className="text-sm text-zinc-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-semibold mb-4">How to use this site</h2>
        <div className="space-y-4 text-zinc-400">
          <div className="flex gap-4">
            <span className="font-mono text-xs text-zinc-600 mt-0.5 shrink-0 w-5">01</span>
            <p className="text-sm">Browse the <Link href="/courses" className="text-accent underline underline-offset-2">course catalogue</Link> and choose your curriculum.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-xs text-zinc-600 mt-0.5 shrink-0 w-5">02</span>
            <p className="text-sm">Work through lessons in order. Each lesson has a short formative check at the end.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-xs text-zinc-600 mt-0.5 shrink-0 w-5">03</span>
            <p className="text-sm">Take the unit practice quiz once you have completed all lessons.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-xs text-zinc-600 mt-0.5 shrink-0 w-5">04</span>
            <p className="text-sm">Download the PDF exercise sets for additional practice and exam-style questions.</p>
          </div>
        </div>
      </section>

      <section className="pt-8 border-t border-white/8">
        <h2 className="font-display text-xl font-semibold mb-4">Contact</h2>
        <p className="text-zinc-400 text-sm">
          Questions, corrections, or feedback — reach out at{' '}
          <a
            href="mailto:pat.hagaren@gmail.com"
            className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors"
          >
            pat.hagaren@gmail.com
          </a>
        </p>
      </section>
    </div>
  )
}
