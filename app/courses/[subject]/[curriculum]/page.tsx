import type { Metadata } from 'next'
import Link from 'next/link'
import { getCurriculumMeta, getUnits } from '@/lib/content'
import { CurriculumBadge } from '@/components/ui/CurriculumBadge'
import { UnitProgress } from '@/components/ui/UnitProgress'
import { notFound } from 'next/navigation'

interface Props {
  params: { subject: string; curriculum: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getCurriculumMeta(params.subject, params.curriculum)
  if (!meta) return {}
  return { title: meta.title }
}

export default function CurriculumPage({ params }: Props) {
  const meta = getCurriculumMeta(params.subject, params.curriculum)
  if (!meta) notFound()

  const units = getUnits(params.subject, params.curriculum)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/courses" className="hover:text-zinc-300 transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${params.subject}`} className="hover:text-zinc-300 transition-colors capitalize">
          {params.subject}
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{meta.title}</span>
      </nav>

      <div className="flex items-start gap-3 mb-3">
        <CurriculumBadge curriculum={params.curriculum} />
      </div>
      <h1 className="font-display text-4xl font-semibold mb-3">{meta.title}</h1>
      <p className="text-zinc-400 mb-10 max-w-xl">{meta.description}</p>

      <h2 className="font-display text-xl font-semibold mb-5">Units</h2>
      <div className="space-y-3">
        {units.map((unit, i) => (
          <Link
            key={unit.slug}
            href={`/courses/${params.subject}/${params.curriculum}/${unit.slug}`}
            className="block border border-white/8 hover:border-white/16 rounded-xl p-5 hover:bg-white/2 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 font-mono mb-1">Unit {unit.meta.order}</p>
                <h3 className="font-display font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {unit.meta.title}
                </h3>
                {unit.meta.description && (
                  <p className="text-sm text-zinc-500 mt-1">{unit.meta.description}</p>
                )}
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors ml-4">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
