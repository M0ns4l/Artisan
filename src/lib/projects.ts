import { projects } from '../data/projects.ts'
import type { PortfolioProject, ProjectStatus, ProjectTag } from '../data/types.ts'

export const statusMeta: Record<ProjectStatus, { label: string; tone: 'ok' | 'info' | 'warn' | 'idea' | 'neutral' }> = {
  production: { label: 'Production', tone: 'ok' },
  internal: { label: 'Internal Use', tone: 'info' },
  'in-development': { label: 'In Development', tone: 'warn' },
  concept: { label: 'Concept', tone: 'idea' },
  'to-verify': { label: 'Status To Verify', tone: 'neutral' },
}

export type ProjectFilter = 'all' | ProjectTag | 'in-progress'

export const filterDefinitions: Array<{ id: ProjectFilter; label: string; test: (p: PortfolioProject) => boolean }> = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'enterprise-systems', label: 'Enterprise Systems', test: (p) => p.tags.includes('enterprise-systems') },
  { id: 'backend-apis', label: 'Backend / APIs', test: (p) => p.tags.includes('backend-apis') },
  { id: 'tools', label: 'Tools', test: (p) => p.tags.includes('tools') },
  { id: 'hardware', label: 'Hardware & IoT', test: (p) => p.tags.includes('hardware') },
  { id: 'in-progress', label: 'In Progress', test: (p) => p.status === 'in-development' },
]

export function getPublishedProjects(source: PortfolioProject[] = projects): PortfolioProject[] {
  return source.filter((p) => p.publish)
}

export function getFeaturedProjects(source: PortfolioProject[] = projects, limit = 4): PortfolioProject[] {
  return getPublishedProjects(source)
    .filter((p) => p.featured)
    .slice(0, limit)
}

export function getProjectBySlug(slug: string | undefined, source: PortfolioProject[] = projects) {
  if (!slug) return undefined
  return getPublishedProjects(source).find((p) => p.slug === slug)
}

/** Previous/next published project, wrapping around the list. */
export function getAdjacentProjects(slug: string, source: PortfolioProject[] = projects) {
  const list = getPublishedProjects(source)
  const index = list.findIndex((p) => p.slug === slug)
  if (index === -1 || list.length < 2) return { previous: undefined, next: undefined }
  return {
    previous: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  }
}

/** Filters that match at least one project (plus "All"), with counts. */
export function getAvailableFilters(source: PortfolioProject[]) {
  return filterDefinitions
    .map((f) => ({ ...f, count: source.filter(f.test).length }))
    .filter((f) => f.id === 'all' || f.count > 0)
}

export function isProjectFilter(value: string | null): value is ProjectFilter {
  return filterDefinitions.some((f) => f.id === value)
}

export function projectNumber(slug: string, source: PortfolioProject[] = projects): string {
  const index = getPublishedProjects(source).findIndex((p) => p.slug === slug)
  return String(index + 1).padStart(2, '0')
}
