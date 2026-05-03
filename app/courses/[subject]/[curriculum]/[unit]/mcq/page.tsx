import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMCQSet, getMCQChoicesAsArray, getUnitMeta, getCurriculumMeta } from '@/lib/content'
import { MCQSet } from '@/components/quiz/MCQSet'

interface Props {
  params: { subject: string; curriculum: string; unit: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = getUnitMeta(params.subject, params.curriculum, params.unit)
  return { title: `Practice — ${unit?.title ?? params.unit}` }
}

export default function MCQPage({ params }: Props) {
  const mcqSet = getMCQSet(params.subject, params.curriculum, params.unit)
  if (!mcqSet) notFound()

  const questions = mcqSet.questions.map((q) => ({
    ...q,
    choices: getMCQChoicesAsArray(q.choices),
  }))

  const unitHref = `/courses/${params.subject}/${params.curriculum}/${params.unit}`

  return (
    <MCQSet
      questions={questions}
      unit={params.unit}
      curriculum={params.curriculum}
      backHref={unitHref}
    />
  )
}
