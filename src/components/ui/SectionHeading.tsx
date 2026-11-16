import type { ReactNode } from 'react'
import { cn } from '../../lib/content.ts'
import { Eyebrow } from './Badge.tsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  id?: string
  as?: 'h1' | 'h2'
  action?: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, description, id, as: Tag = 'h2', action, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <Tag
          id={id}
          className={cn(
            'font-semibold text-fg',
            Tag === 'h1' ? 'text-4xl leading-[1.1] sm:text-5xl' : 'text-3xl leading-tight sm:text-[2.25rem]',
          )}
        >
          {title}
        </Tag>
        {description && <div className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Inline display for an unconfirmed placeholder value. */
export function PlaceholderText({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-dashed border-line-strong px-1.5 py-px font-mono text-[0.8em] text-fg-subtle">
      {children}
      <span className="sr-only">(to be confirmed)</span>
    </span>
  )
}
