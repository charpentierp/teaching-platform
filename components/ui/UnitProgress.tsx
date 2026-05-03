interface Props {
  total: number
  completed: number
  className?: string
}

export function UnitProgress({ total, completed, className = '' }: Props) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className={`space-y-1.5 ${className}`} aria-label={`Progress: ${completed} of ${total} lessons completed`}>
      <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>{completed}/{total} lessons</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
