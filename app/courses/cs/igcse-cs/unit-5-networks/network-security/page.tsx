import type { Metadata } from 'next'
import { HtmlLessonFrame } from '@/components/lesson/HtmlLessonFrame'

export const metadata: Metadata = {
  title: 'Network Security & the Internet',
  description: 'IGCSE CS Unit 5 — network security attacks, defences, internet infrastructure, and DNS.',
}

const BACK_HREF = '/courses/cs/igcse-cs/unit-5-networks'

export default function NetworkSecurityPage() {
  return (
    <HtmlLessonFrame
      src="/html-lessons/cs/igcse-cs/unit-5-networks/network-security.html"
      title="Network Security & the Internet"
      curriculum="IGCSE CS"
      unit="Unit 5 — Networks"
      backHref={BACK_HREF}
      minHeight={900}
    />
  )
}
