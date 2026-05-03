import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getLessonContent, getLessons, getCurriculumMeta, getUnitMeta } from '@/lib/content'
import { LessonPage } from '@/components/lesson/LessonPage'
import { FormativeCheck } from '@/components/lesson/FormativeCheck'
import { InfoBox, TipBox, DangerBox } from '@/components/ui/CalloutBox'

interface Props {
  params: {
    subject: string
    curriculum: string
    unit: string
    lesson: string
  }
}

const mdxComponents = {
  FormativeCheck,
  InfoBox,
  TipBox,
  DangerBox,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLessonContent(params.subject, params.curriculum, params.unit, params.lesson)
  if (!lesson) return {}
  return { title: lesson.frontmatter.title }
}

export default function LessonRoute({ params }: Props) {
  const lesson = getLessonContent(params.subject, params.curriculum, params.unit, params.lesson)
  if (!lesson) notFound()

  const curriculumMeta = getCurriculumMeta(params.subject, params.curriculum)
  const unitMeta = getUnitMeta(params.subject, params.curriculum, params.unit)
  const allLessons = getLessons(params.subject, params.curriculum, params.unit)

  const currentIndex = allLessons.findIndex((l) => l.slug === params.lesson)
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const basePath = `/courses/${params.subject}/${params.curriculum}/${params.unit}`

  const renderedContent = (
    <MDXRemote
      source={lesson.rawContent}
      components={mdxComponents}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  )

  return (
    <LessonPage
      frontmatter={lesson.frontmatter}
      content={renderedContent}
      rawContent={lesson.rawContent}
      breadcrumb={{
        subject: params.subject,
        curriculum: curriculumMeta?.title ?? params.curriculum,
        curriculumHref: `/courses/${params.subject}/${params.curriculum}`,
        unit: unitMeta?.title ?? params.unit,
        unitHref: basePath,
      }}
      prev={prev ? { title: prev.frontmatter.title, href: `${basePath}/${prev.slug}` } : null}
      next={next ? { title: next.frontmatter.title, href: `${basePath}/${next.slug}` } : null}
    />
  )
}
