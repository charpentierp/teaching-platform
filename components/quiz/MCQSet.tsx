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
  tip?: string
}

interface Props {
  questions: Question[]
  unit: string
  curriculum: string
  backHref?: string
}

export function MCQSet({ questions, unit, curriculum, backHref }: Props) {
  const [selected, setSelected]   = useState<Record<string, string>>({})
  const [struck, setStruck]       = useState<Record<string, Set<string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [strikeMode, setStrikeMode] = useState(false)

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
    setStruck({})
    setSubmitted(false)
  }

  function toggleStrike(qId: string, key: string) {
    setStruck((prev) => {
      const current = new Set(prev[qId] ?? [])
      if (current.has(key)) {
        current.delete(key)
      } else {
        // Can't strike the currently selected answer
        if (selected[qId] !== key) current.add(key)
      }
      return { ...prev, [qId]: current }
    })
  }

  function handleChoiceClick(qId: string, key: string) {
    if (submitted) return
    if (strikeMode) {
      toggleStrike(qId, key)
    } else {
      setSelected((s) => ({ ...s, [qId]: key }))
      // Un-strike if user selects a previously struck option
      setStruck((prev) => {
        const current = new Set(prev[qId] ?? [])
        current.delete(key)
        return { ...prev, [qId]: current }
      })
    }
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold mb-2">Practice Quiz</h1>
            <p className="text-sm text-zinc-400">{questions.length} questions</p>
          </div>
          {/* Strike-through toggle */}
          {!submitted && (
            <button
              onClick={() => setStrikeMode((m) => !m)}
              title="Toggle elimination mode — right-click (or tap in this mode) to strike through options you've ruled out"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                strikeMode
                  ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                  : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
              }`}
            >
              <span className={strikeMode ? 'line-through' : ''}>A</span>
              <span>{strikeMode ? 'Elimination ON' : 'Eliminate'}</span>
            </button>
          )}
        </div>
        {!submitted && (
          <p className="text-xs text-zinc-600 mt-3 font-mono">
            {strikeMode
              ? 'Click any option to strike it out. Click again to restore. Toggle off to select your answer.'
              : 'Click an option to select it. Use Eliminate mode to cross out wrong answers.'}
          </p>
        )}
      </div>

      {submitted && (
        <div className={`mb-10 p-6 rounded-xl border ${
          pct >= 80
            ? 'border-emerald-700/50 bg-emerald-900/20'
            : pct >= 60
              ? 'border-yellow-700/50 bg-yellow-900/20'
              : 'border-red-700/50 bg-red-900/20'
        }`}>
          <p className="font-display text-2xl font-semibold mb-1">
            {score}/{questions.length} correct — {pct}%
          </p>
          <p className="text-sm text-zinc-400">
            {pct >= 80
              ? 'Excellent work.'
              : pct >= 60
                ? 'Good effort — review the explanations below.'
                : 'Review the material and try again.'}
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
          const userAnswer = selected[q.id]
          const struckKeys = struck[q.id] ?? new Set<string>()
          const correct = submitted && userAnswer === q.answer

          return (
            <div key={q.id} className="border border-white/8 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-zinc-600 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="font-body text-zinc-200 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: q.stem }}
                  />
                </div>
                {q.difficulty && (
                  <DifficultyTag difficulty={q.difficulty} size="sm" className="shrink-0" />
                )}
              </div>

              <div className="space-y-2 ml-6">
                {q.choices.map((choice) => {
                  const isSelected  = userAnswer === choice.key
                  const isStruck    = struckKeys.has(choice.key)
                  const choiceRight = q.answer === choice.key

                  // Style resolution
                  let style: string
                  if (!submitted) {
                    if (isSelected) {
                      style = 'border-primary-500/60 bg-primary-500/10 text-zinc-200 cursor-pointer'
                    } else if (isStruck) {
                      style = 'border-white/5 text-zinc-700 cursor-pointer'
                    } else {
                      style = strikeMode
                        ? 'border-white/8 text-zinc-400 hover:border-amber-500/40 hover:text-zinc-300 cursor-pointer'
                        : 'border-white/8 text-zinc-400 hover:border-white/15 hover:text-zinc-200 cursor-pointer'
                    }
                  } else {
                    if (choiceRight)              style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 cursor-default'
                    else if (isSelected)          style = 'border-red-500/60 bg-red-500/10 text-red-300 cursor-default'
                    else                          style = 'border-white/5 text-zinc-600 cursor-default'
                  }

                  return (
                    <button
                      key={choice.key}
                      onClick={() => handleChoiceClick(q.id, choice.key)}
                      disabled={submitted}
                      className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg text-sm text-left transition-all ${style}`}
                    >
                      <span className="font-mono font-medium shrink-0 w-5">{choice.key}.</span>
                      <span className={isStruck && !submitted ? 'line-through opacity-50' : ''}>{choice.text}</span>
                      {isStruck && !submitted && (
                        <span className="ml-auto text-xs text-zinc-700 font-mono shrink-0">✕</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {submitted && (
                <div className={`mt-4 ml-6 px-4 py-3 rounded-lg text-sm ${
                  correct
                    ? 'bg-emerald-900/20 border border-emerald-800/40'
                    : 'bg-red-900/20 border border-red-800/40'
                }`}>
                  <p className={`font-medium mb-1 ${correct ? 'text-emerald-300' : 'text-red-300'}`}>
                    {correct ? '✓ Correct' : `✗ Incorrect — answer: ${q.answer}`}
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{q.explanation}</p>
                  {q.tip && (
                    <p className="mt-2 text-xs text-amber-400/80 leading-relaxed border-t border-white/8 pt-2">
                      <span className="font-semibold text-amber-400">Exam tip: </span>{q.tip}
                    </p>
                  )}
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
