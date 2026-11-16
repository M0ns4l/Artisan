import type { ReactNode } from 'react'
import type { ProjectStatus } from '../../data/types.ts'
import { cn } from '../../lib/content.ts'
import { statusMeta } from '../../lib/projects.ts'

const dotTone = {
  ok: 'bg-ok',
  info: 'bg-info',
  warn: 'bg-warn',
  idea: 'bg-idea',
  neutral: 'border border-fg-subtle bg-transparent',
} as const

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = statusMeta[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', dotTone[meta.tone])} />
      {meta.label}
    </span>
  )
}

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.75rem] leading-5 text-fg-muted">
      {children}
    </span>
  )
}

export function TechTagList({
  technologies,
  verified,
  max,
}: {
  technologies: string[]
  verified: boolean
  max?: number
}) {
  if (technologies.length === 0) {
    return (
      <p className="font-mono text-xs text-fg-subtle">
        <span className="rounded border border-dashed border-line-strong px-2 py-0.5">Stack to verify</span>
      </p>
    )
  }
  const shown = max ? technologies.slice(0, max) : technologies
  const hidden = technologies.length - shown.length
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <ul className="contents" aria-label={verified ? 'Technologies' : 'Candidate technologies, to verify'}>
        {shown.map((t) => (
          <li key={t}>
            <TechTag>{t}</TechTag>
          </li>
        ))}
      </ul>
      {hidden > 0 && <span className="font-mono text-xs text-fg-subtle">+{hidden}</span>}
      {!verified && <span className="font-mono text-[0.6875rem] text-fg-subtle">· to verify</span>}
    </div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase', className)}>{children}</p>
  )
}
