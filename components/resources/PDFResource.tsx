interface Props {
  title: string
  href: string
  type: 'exercises' | 'answers'
  className?: string
}

export function PDFResource({ title, href, type, className = '' }: Props) {
  const isAnswers = type === 'answers'

  return (
    <a
      href={href}
      download
      className={`flex items-center gap-4 border rounded-lg px-5 py-4 transition-all group
        ${isAnswers
          ? 'border-zinc-700/50 hover:border-zinc-600 bg-zinc-900/30 hover:bg-zinc-900/60'
          : 'border-primary-500/30 hover:border-primary-500/60 bg-primary-500/5 hover:bg-primary-500/10'
        } ${className}`}
    >
      <div className={`shrink-0 ${isAnswers ? 'text-zinc-500' : 'text-primary-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
          {title}
        </p>
        <p className="text-xs text-zinc-600 mt-0.5">
          {isAnswers ? 'Answer key · PDF' : 'Exercises · PDF'}
        </p>
      </div>
      <div className="shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </div>
    </a>
  )
}
