import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExperienceTimeline } from '../components/experience/ExperienceTimeline.tsx'
import { experience } from '../data/experience.ts'
import { techStack } from '../data/skills.ts'
import { getPortfolioStats } from '../lib/stats.ts'
import { renderApp } from './renderApp.tsx'

describe('career timeline', () => {
  it('groups consecutive roles at one organization into a progression', () => {
    render(<ExperienceTimeline entries={experience} />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(2)

    const mgtr = articles[0]!
    expect(within(mgtr).getByRole('heading', { level: 3 })).toHaveTextContent('Mommy Gina Tuna Resources')
    expect(within(mgtr).getByText(/3 roles · career progression/)).toBeInTheDocument()
    expect(within(mgtr).getByText('2023 — Present')).toBeInTheDocument()
    expect(within(mgtr).getAllByRole('heading', { level: 4 }).map((h) => h.textContent)).toEqual([
      'Senior Programmer',
      'Junior Programmer',
      'System Technician',
    ])
  })

  it('shows the earlier employer with its full date range', () => {
    render(<ExperienceTimeline entries={experience} />)
    const pcWorx = screen.getAllByRole('article')[1]!
    expect(within(pcWorx).getByRole('heading', { level: 3 })).toHaveTextContent('PC Worx Gensan')
    expect(within(pcWorx).getAllByText('2018 — 2019').length).toBeGreaterThan(0)
  })

  it('shows only the start year when an end year is omitted', () => {
    render(<ExperienceTimeline entries={[{ role: 'Role', organization: 'Org', start: '2020', summary: 's', responsibilities: [] }]} />)
    expect(screen.getAllByText('2020').length).toBeGreaterThan(0)
    expect(screen.queryByText(/—/)).not.toBeInTheDocument()
  })
})

describe('experience durations', () => {
  it('computes role and company durations', async () => {
    const { durationYears, totalExperienceYears } = await import('../lib/experience.ts')
    const now = new Date('2026-06-01')
    expect(durationYears('2025', 'Present', now)).toBe(1)
    expect(durationYears('2023', 'Present', now)).toBe(3)
    expect(durationYears('2018', '2019', now)).toBe(1)
    expect(durationYears('2020', undefined, now)).toBe(1)
    // PC Worx is excluded from the total: 2023–2026 at Mommy Gina = 3.
    expect(totalExperienceYears(experience, now)).toBe(3)
    expect(totalExperienceYears(experience.map((e) => ({ ...e, excludeFromTotal: false })), now)).toBe(4)
  })

  it('shows per-role and per-company years in the timeline', () => {
    render(<ExperienceTimeline entries={experience} />)
    const mgtr = screen.getAllByRole('article')[0]!
    expect(within(mgtr).getAllByText('1 yr')).toHaveLength(3)
    expect(within(mgtr).getByText('years')).toBeInTheDocument()
  })
})

describe('portfolio stats', () => {
  it('derives years and counts from the content files', () => {
    const stats = getPortfolioStats(new Date('2026-06-01'))
    // 2023–2026 at Mommy Gina; PC Worx is shown but excluded from the total.
    expect(stats.yearsExperience).toBe(3)
    expect(stats.yearsBuilding).toBe(Math.max(...techStack.map((t) => t.years)))
    expect(stats.systemsBuilt).toBeGreaterThan(0)
  })
})

describe('home page flow', () => {
  it('renders the sections in the proposed order', () => {
    renderApp('/')
    const titles = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    const order = ['Software for organizations', 'From fixing computers', 'In-house systems', 'One login', 'The tools behind', 'What I bring', 'From paper process', 'Let’s build']
    const positions = order.map((t) => titles.findIndex((title) => title?.startsWith(t)))
    expect(positions.every((p) => p >= 0)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  it('shows configured social links and hides unconfigured ones', () => {
    renderApp('/')
    expect(screen.getAllByRole('link', { name: /github/i })[0]).toHaveAttribute('href', 'https://github.com/M0ns4l')
    expect(screen.getAllByRole('link', { name: /linkedin/i })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/monsal-dawa-4273b2312/')
    expect(screen.getAllByRole('link', { name: /facebook/i })[0]).toHaveAttribute('href', 'https://www.facebook.com/Somnalistic')
    expect(screen.queryByRole('link', { name: /instagram/i })).not.toBeInTheDocument()
  })

  it('shows education alongside experience', () => {
    renderApp('/')
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('STI College Gensan')).toBeInTheDocument()
  })

  it('offers a working email action', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:artisanlaracast@gmail.com')
  })
})
