import { cn } from '../../lib/content.ts'
import type { ProjectFilter } from '../../lib/projects.ts'

interface ProjectFiltersProps {
  filters: Array<{ id: ProjectFilter; label: string; count: number }>
  active: ProjectFilter
  onChange: (filter: ProjectFilter) => void
}

export function ProjectFilters({ filters, active, onChange }: ProjectFiltersProps) {
  return (
    <fieldset className="-mx-1 flex min-w-0 flex-wrap gap-2 px-1">
      <legend className="sr-only">Filter projects</legend>
      {filters.map((f) => {
        const isActive = f.id === active
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(f.id)}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-fg bg-fg text-bg'
                : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {f.label}
            <span className={cn('font-mono text-xs', isActive ? 'text-bg/70' : 'text-fg-subtle')}>{f.count}</span>
          </button>
        )
      })}
    </fieldset>
  )
}
