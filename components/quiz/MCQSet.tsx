'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DifficultyTag } from '@/components/ui/DifficultyTag'

interface Choice {
  key: string
  text: string
}

interface Question {
  id: string
  stem: string
  choices: Choice[]
  answer: string
  explanation: string
  difficulty?: string
}

interface Props {
  questions: Question[]
  unit: string
  curriculum: string
  backHref?: string
}

export function MCQSet({ questions, unit, curriculum, backHref }: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const answered = Object.keys(selected).length
  const score = submitted
    ? questions.filter((q) => selected[q.id] === q.answer).length
    : 0
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  function handleSubmit() {
    if (answered < questions.length) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setSelected({})
    setSubmitted(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            <span>←</span>
            <span>Back to unit</span>
          </Link>
        )}
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">{curriculum} · {unit}</p>
        <h1 className="font-display text-3xl font-semibold mb-2">Practice Quiz</h1>
        <p className="text-sm text-zinc-400">{questions.length} questions</p>
      </div>

      {submitted && (
        <div className={`mb-10 p-6 rounded-xl border ${pct >= 80 ? 'border-emerald-700/50 bg-emerald-900/20' : pct >= 60 ? 'border-yellow-700/50 bg-yellow-900/20' : 'border-red-700/50 bg-red-900/20'}`}>
          <p className="font-display text-2xl font-semibold mb-1">
            {score}/{questions.length} correct — {pct}%
          </p>
          <p className="text-sm text-zinc-400">
            {pct >= 80 ? 'Excellent work.' : pct >= 60 ? 'Good effort — review the explanations below.' : 'Review the material and try again.'}
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium rounded-md transition-colors"
          >
            Retake
          </button>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, i) => {
          const isSubmitted = submitted
          const userAnswer = selected[q.id]
          const correct = isCorrect(q, userAnswer)

          return (
            <div key={q.id} className="border border-white/8 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-zinc-600 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-zinc-200 leading-relaxed">{q.stem}</p>
                </div>
                {q.difficulty && (
                  <DifficultyTag difficulty={q.difficulty} size="sm" className="shrink-0" />
                )}
              </div>

              <div className="space-y-2 ml-6">
                {q.choices.map((choice) => {
                  const isSelected = userAnswer === choice.key
                  const choiceCorrect = q.answer === choice.key

                  let style = 'border-white/8 text-zinc-400 hover:border-white/15 hover:text-zinc-200 cursor-pointer'
                  if (!isSubmitted && isSelected) style = 'border-primary-500/60 bg-primary-500/10 text-zinc-200 cursor-pointer'
                  if (isSubmitted && choiceCorrect) style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 cursor-default'
                  if (isSubmitted && isSelected && !choiceCorrect) style = 'border-red-500/60 bg-red-500/10 text-red-300 cursor-default'
                  if (isSubmitted && !isSelected && !choiceCorrect) style = 'border-white/5 text-zinc-600 cursor-default'

                  return (
                    <button
                      key={choice.key}
                      onClick={() => !isSubmitted && setSelected((s) => ({ ...s, [q.id]: choice.key }))}
                      disabled={isSubmitted}
                      className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg text-sm text-left transition-all ${style}`}
                    >
                      <span className="font-mono font-medium shrink-0 w-5">{choice.key}.</span>
                      <span>{choice.text}</span>
                    </button>
                  )
                })}
              </div>

              {isSubmitted && (
                <div className={`mt-4 ml-6 px-4 py-3 rounded-lg text-sm ${correct ? 'bg-emerald-900/20 border border-emerald-800/40' : 'bg-red-900/20 border border-red-800/40'}`}>
                  <p className={`font-medium mb-1 ${correct ? 'text-emerald-300' : 'text-red-300'}`}>
                    {correct ? '✓ Correct' : `✗ Incorrect — answer: ${q.answer}`}
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted && (
        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-zinc-500 font-mono">
            {answered}/{questions.length} answered
          </p>
          <button
            onClick={handleSubmit}
            disabled={answered < questions.length}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
          >
            Submit answers
          </button>
        </div>
      )}
    </div>
  )
}

function isCorrect(q: Question, answer: string | undefined) {
  return q.answer === answer
}
