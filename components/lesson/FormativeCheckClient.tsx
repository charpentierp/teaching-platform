'use client'

import { useState } from 'react'

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
}

interface Props {
  title: string
  questions: Question[]
}

export function FormativeCheckClient({ title, questions }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  function submit(qId: string) {
    if (!selected[qId]) return
    setSubmitted((s) => ({ ...s, [qId]: true }))
  }

  return (
    <div className="my-8 border border-primary-500/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-primary-500/10 hover:bg-primary-500/15 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
          <span className="font-display font-medium text-zinc-200">{title}</span>
          <span className="text-xs font-mono text-zinc-500">
            {questions.length} question{questions.length !== 1 ? 's' : ''}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 py-5 space-y-6">
          {questions.map((q) => {
            const isSubmitted = submitted[q.id]
            const userAnswer = selected[q.id]
            const correct = q.answer === userAnswer

            return (
              <div key={q.id}>
                <p className="font-body text-zinc-200 mb-3 leading-relaxed">{q.stem}</p>
                <div className="space-y-2">
                  {q.choices.map((choice) => {
                    const isSelected = userAnswer === choice.key
                    const choiceCorrect = q.answer === choice.key

                    let style = 'border-white/8 text-zinc-400 hover:border-white/15 hover:text-zinc-200'
                    if (isSelected && !isSubmitted) style = 'border-primary-500/60 bg-primary-500/10 text-zinc-200'
                    if (isSubmitted && choiceCorrect) style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                    if (isSubmitted && isSelected && !choiceCorrect) style = 'border-red-500/60 bg-red-500/10 text-red-300'

                    return (
                      <button
                        key={choice.key}
                        onClick={() => !isSubmitted && setSelected((s) => ({ ...s, [q.id]: choice.key }))}
                        disabled={isSubmitted}
                        className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg text-sm text-left transition-all ${style} disabled:cursor-default`}
                      >
                        <span className="font-mono font-medium shrink-0 w-5">{choice.key}.</span>
                        <span>{choice.text}</span>
                      </button>
                    )
                  })}
                </div>

                {!isSubmitted && (
                  <button
                    onClick={() => submit(q.id)}
                    disabled={!userAnswer}
                    className="mt-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Check answer
                  </button>
                )}

                {isSubmitted && (
                  <div className={`mt-3 px-4 py-3 rounded-lg text-sm ${correct ? 'bg-emerald-900/20 text-emerald-300' : 'bg-red-900/20 text-red-300'}`}>
                    <p className="font-medium mb-1">
                      {correct ? '✓ Correct' : `✗ Incorrect — correct answer: ${q.answer}`}
                    </p>
                    <p className="text-zinc-400 text-xs leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
