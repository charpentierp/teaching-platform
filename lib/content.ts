import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ── Types ────────────────────────────────────────────────────────────────────

export interface LessonFrontmatter {
  title: string
  curriculum: string
  subject: string
  unit: number
  order: number
  type: string
  difficulty: string
  language: string
  updatedAt?: string
}

export interface CurriculumMeta {
  title: string
  curriculum: string
  subject: string
  description: string
  language: string
  units: string[]
  active: boolean
}

export interface HtmlLessonEntry {
  slug: string
  title: string
  difficulty?: string
  type?: string
}

export interface UnitMeta {
  title: string
  order: number
  description?: string
  active: boolean
  htmlLessons?: HtmlLessonEntry[]
}

export interface LessonEntry {
  slug: string
  frontmatter: LessonFrontmatter
}

export interface UnitEntry {
  slug: string
  meta: UnitMeta
}

export interface MCQQuestion {
  id: string
  stem: string
  choices: Record<string, string>
  answer: string
  explanation: string
  difficulty?: string
  tip?: string
}

export interface MCQSet {
  unit: string
  curriculum: string
  questions: MCQQuestion[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJSON<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function mdxFilesInDir(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx'))
      .sort()
  } catch {
    return []
  }
}

function subdirsInDir(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
  } catch {
    return []
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

export function getCurriculumMeta(subject: string, curriculum: string): CurriculumMeta | null {
  const filePath = path.join(CONTENT_DIR, subject, curriculum, 'meta.json')
  return readJSON<CurriculumMeta>(filePath)
}

export function getUnitMeta(subject: string, curriculum: string, unit: string): UnitMeta | null {
  const filePath = path.join(CONTENT_DIR, subject, curriculum, unit, 'meta.json')
  return readJSON<UnitMeta>(filePath)
}

export function getUnits(subject: string, curriculum: string): UnitEntry[] {
  const curriculumDir = path.join(CONTENT_DIR, subject, curriculum)
  const slugs = subdirsInDir(curriculumDir)

  return slugs
    .map((slug) => {
      const meta = getUnitMeta(subject, curriculum, slug)
      if (!meta || !meta.active) return null
      return { slug, meta }
    })
    .filter((u): u is UnitEntry => u !== null)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getLessons(subject: string, curriculum: string, unit: string): LessonEntry[] {
  const unitDir = path.join(CONTENT_DIR, subject, curriculum, unit)
  const files = mdxFilesInDir(unitDir)

  return files.map((file) => {
    const filePath = path.join(unitDir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = file.replace(/^\d+-/, '').replace(/\.mdx$/, '')
    return {
      slug,
      frontmatter: data as LessonFrontmatter,
    }
  })
}

export function getLessonContent(
  subject: string,
  curriculum: string,
  unit: string,
  lessonSlug: string
): { frontmatter: LessonFrontmatter; rawContent: string; content: string } | null {
  const unitDir = path.join(CONTENT_DIR, subject, curriculum, unit)

  let filePath: string | null = null

  try {
    const files = fs.readdirSync(unitDir).filter((f) => f.endsWith('.mdx'))
    const match = files.find(
      (f) => f.replace(/^\d+-/, '').replace(/\.mdx$/, '') === lessonSlug
    )
    if (match) filePath = path.join(unitDir, match)
  } catch {
    return null
  }

  if (!filePath) return null

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      frontmatter: data as LessonFrontmatter,
      rawContent: raw,
      content,
    }
  } catch {
    return null
  }
}

export function getMCQSet(subject: string, curriculum: string, unit: string): MCQSet | null {
  const filePath = path.join(CONTENT_DIR, subject, curriculum, unit, `mcq-${unit}.json`)
  const data = readJSON<MCQSet>(filePath)
  if (!data) return null

  // Normalise choices from Record<string, string> to array
  return data
}

export function getMCQChoicesAsArray(choices: Record<string, string>) {
  return Object.entries(choices).map(([key, text]) => ({ key, text }))
}
