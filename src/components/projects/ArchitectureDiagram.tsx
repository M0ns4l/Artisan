import { ArrowDown, ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import type { ArchitectureLayer } from '../../data/types.ts'
import { isPlaceholder } from '../../lib/content.ts'

interface ArchitectureDiagramProps {
  layers: ArchitectureLayer[]
  title: string
  verified: boolean
}

/**
 * A clean, labelled system diagram rendered from project data — used in place
 * of screenshots, and explicitly captioned as illustrative.
 */
export function ArchitectureDiagram({ layers, title, verified }: ArchitectureDiagramProps) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="bg-grid relative p-5 sm:p-8">
        <div aria-hidden="true" className="absolute inset-0 bg-surface/85" />
        <ol className="relative flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
          {layers.map((layer, i) => {
            const unknown = isPlaceholder(layer.title)
            return (
              <Fragment key={layer.layer}>
                <li className="flex-1 rounded-md border border-line-strong bg-surface p-4 shadow-card">
                  <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-accent uppercase">{layer.layer}</p>
                  <p className={unknown ? 'mt-1.5 font-mono text-sm text-fg-subtle' : 'mt-1.5 font-semibold text-fg'}>
                    {unknown ? 'Stack to verify' : layer.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">{layer.detail}</p>
                </li>
                {i < layers.length - 1 && (
                  <li aria-hidden="true" className="flex shrink-0 items-center justify-center text-fg-subtle lg:px-2">
                    <ArrowDown size={16} className="lg:hidden" />
                    <ArrowRight size={16} className="hidden lg:block" />
                  </li>
                )}
              </Fragment>
            )
          })}
        </ol>
      </div>
      <figcaption className="flex flex-col gap-1 border-t border-line px-5 py-3 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <span>Illustrative architecture diagram for {title} — not a screenshot.</span>
        {!verified && <span className="font-mono">Candidate stack · to verify</span>}
      </figcaption>
    </figure>
  )
}
