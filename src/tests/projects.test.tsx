import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects.ts'
import { getAdjacentProjects, getAvailableFilters, getFeaturedProjects, getPublishedProjects } from '../lib/projects.ts'
import { renderApp } from './renderApp.tsx'

const published = getPublishedProjects()

function visibleProjectTitles() {
  return screen
    .getAllByRole('heading', { level: 2 })
    .map((h) => h.textContent)
    .filter((t) => published.some((p) => p.title === t))
}

describe('project data selectors', () => {
  it('excludes unpublished projects everywhere', () => {
    expect(published.every((p) => p.publish)).toBe(true)
    expect(projects.some((p) => !p.publish)).toBe(true)
    expect(getFeaturedProjects().every((p) => p.publish && p.featured)).toBe(true)
    expect(getFeaturedProjects().length).toBeLessThanOrEqual(4)
  })

  it('only offers filters that match at least one project', () => {
    const counts = getAvailableFilters(published)
      .filter((f) => f.id !== 'all')
      .map((f) => f.count)
    expect(counts.length).toBeGreaterThan(0)
    expect(counts.every((c) => c > 0)).toBe(true)
  })

  it('wraps previous/next navigation', () => {
    const first = published[0]!
    const last = published[published.length - 1]!
    expect(getAdjacentProjects(first.slug).previous?.slug).toBe(last.slug)
    expect(getAdjacentProjects(last.slug).next?.slug).toBe(first.slug)
  })

  it('never presents outcomes as measured for unverified projects', () => {
    const unverifiedMeasured = published.filter((p) => !p.verified && p.outcomesAreMeasured)
    expect(unverifiedMeasured).toEqual([])
  })
})

describe('projects page filtering', () => {
  it('lists all published projects by default', async () => {
    renderApp('/projects')
    await screen.findByRole('group', { name: 'Filter projects' })
    expect(visibleProjectTitles()).toHaveLength(published.length)
    expect(screen.getByText(`Showing ${published.length} of ${published.length} projects`)).toBeInTheDocument()
  })

  it('filters by category and reflects it in the URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/projects')
    const group = await screen.findByRole('group', { name: 'Filter projects' })
    await user.click(within(group).getByRole('button', { name: /backend \/ apis/i }))

    const expected = published.filter((p) => p.tags.includes('backend-apis'))
    expect(router.state.location.search).toBe('?filter=backend-apis')
    expect(within(group).getByRole('button', { name: /backend \/ apis/i })).toHaveAttribute('aria-pressed', 'true')
    expect(visibleProjectTitles()).toHaveLength(expected.length)
    expect(screen.queryByRole('heading', { level: 2, name: 'Unified Enterprise Portal' })).not.toBeInTheDocument()
  })

  it('falls back to "All" for an unknown filter parameter', async () => {
    renderApp('/projects?filter=nonsense')
    const group = await screen.findByRole('group', { name: 'Filter projects' })
    expect(within(group).getByRole('button', { name: /^all/i })).toHaveAttribute('aria-pressed', 'true')
  })
})
