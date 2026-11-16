import { SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { ProjectCard } from '../components/projects/ProjectCard.tsx'
import { ProjectFilters } from '../components/projects/ProjectFilters.tsx'
import { Button } from '../components/ui/Button.tsx'
import { PageIntro } from '../components/ui/PageIntro.tsx'
import { profile } from '../data/profile.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'
import {
  filterDefinitions,
  getAvailableFilters,
  getPublishedProjects,
  isProjectFilter,
  type ProjectFilter,
} from '../lib/projects.ts'

export default function ProjectsPage() {
  useDocumentMeta({
    title: 'Projects',
    description: `Case studies by ${profile.name}: enterprise platforms, HR systems, service management and workflow automation.`,
    path: '/projects',
  })

  const [params, setParams] = useSearchParams()
  const published = getPublishedProjects()
  const filters = getAvailableFilters(published)

  const requested = params.get('filter')
  const active: ProjectFilter =
    isProjectFilter(requested) && filters.some((f) => f.id === requested) ? requested : 'all'
  const test = filterDefinitions.find((f) => f.id === active)?.test ?? (() => true)
  const visible = published.filter(test)

  const setFilter = (filter: ProjectFilter) => {
    setParams(filter === 'all' ? {} : { filter }, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Systems, workflows and the thinking behind them."
        description="Each case study covers the problem, the approach, the architecture and the engineering considerations. Private systems are described without exposing confidential details."
      />

      <section aria-label="Project list" className="container-page py-12 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ProjectFilters filters={filters} active={active} onChange={setFilter} />
          <p className="text-sm text-fg-subtle" aria-live="polite">
            Showing {visible.length} of {published.length} {published.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-lg border border-dashed border-line-strong px-6 py-16 text-center">
            <SearchX size={28} aria-hidden="true" className="text-fg-subtle" />
            <h2 className="mt-4 font-semibold">No projects in this category yet</h2>
            <p className="mt-2 max-w-sm text-sm text-fg-muted">Try another filter, or view everything.</p>
            <Button variant="secondary" size="sm" className="mt-6" onClick={() => setFilter('all')}>
              Show all projects
            </Button>
          </div>
        )}
      </section>
    </>
  )
}
