import { FormativeCheckClient } from './FormativeCheckClient'

interface Props {
  title?: string
  questionsJson: string
}

export function FormativeCheck({ title = 'Check your understanding', questionsJson }: Props) {
  let questions: Parameters<typeof FormativeCheckClient>[0]['questions'] = []
  try {
    questions = JSON.parse(questionsJson)
  } catch {
    return null
  }
  return <FormativeCheckClient title={title} questions={questions} />
}
