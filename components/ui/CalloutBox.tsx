import { ReactNode } from 'react'

interface CalloutProps {
  label?: string
  children: ReactNode
  className?: string
}

export function InfoBox({ label = 'Note', children, className = '' }: CalloutProps) {
  return (
    <div className={`info-box ${className}`}>
      <span className="callout-label">{label}</span>
      {children}
    </div>
  )
}

export function TipBox({ label = 'Tip', children, className = '' }: CalloutProps) {
  return (
    <div className={`tip-box ${className}`}>
      <span className="callout-label">{label}</span>
      {children}
    </div>
  )
}

export function DangerBox({ label = 'Warning', children, className = '' }: CalloutProps) {
  return (
    <div className={`danger-box ${className}`}>
      <span className="callout-label">{label}</span>
      {children}
    </div>
  )
}
