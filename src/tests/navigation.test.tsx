import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile.ts'
import { renderApp } from './renderApp.tsx'

const NOT_FOUND = /doesn.t resolve/i

describe('routing and navigation', () => {
  it('renders the home page with a single h1 and the hero CTAs', () => {
    renderApp('/')
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(profile.hero.headline)
    expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '/projects')
    for (const link of screen.getAllByRole('link', { name: /get in touch/i })) {
      expect(link).toHaveAttribute('href', '/contact')
    }
  })

  it('uses the supplied profile photo', () => {
    renderApp('/')
    expect(screen.getByRole('img', { name: profile.photo.alt })).toHaveAttribute('src', profile.photo.src)
  })

  it('navigates between pages via the primary navigation', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/')
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    await user.click(within(nav).getByRole('link', { name: 'Experience' }))
    expect(await screen.findByRole('heading', { level: 1, name: /building internal systems/i })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/experience')
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders a rich case study for a published project', async () => {
    renderApp('/projects/hris')
    expect(await screen.findByRole('heading', { level: 1, name: 'Human Resource Information System' })).toBeInTheDocument()
    for (const section of ['Overview', 'Problem', 'My role', 'Solution', 'Architecture', 'Security & reliability']) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument()
    }
    expect(screen.getByText('Private / Internal Project')).toBeInTheDocument()
    expect(screen.queryByText(/draft case study/i)).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'More projects' })).toBeInTheDocument()
  })

  it('labels unverified case studies as drafts', async () => {
    renderApp('/projects/truck-scale')
    expect(await screen.findByRole('heading', { level: 1, name: 'Truck Scale System' })).toBeInTheDocument()
    expect(screen.getByText(/draft case study/i)).toBeInTheDocument()
    // Stack is confirmed even though the full write-up is pending.
    for (const tech of ['C#', 'Windows Forms', 'MySQL']) {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0)
    }
  })

  it('links every niche domain to real case studies', () => {
    renderApp('/')
    const group = screen.getByRole('list', { name: 'Production & Hardware case studies' })
    expect(group.querySelectorAll('a[href="/projects/porktrack"]')).toHaveLength(1)
  })

  it('shows the branded 404 for unknown routes with a working home link', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/does-not-exist')
    expect(screen.getByRole('heading', { level: 1, name: NOT_FOUND })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /return home/i }))
    expect(router.state.location.pathname).toBe('/')
  })

  it('shows the 404 for unpublished project slugs', async () => {
    renderApp('/projects/biometric-log-collection')
    expect(await screen.findByRole('heading', { level: 1, name: NOT_FOUND })).toBeInTheDocument()
  })
})

describe('mobile menu', () => {
  it('opens, exposes links, and closes with Escape returning focus', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    expect(within(mobileNav).getAllByRole('link')).toHaveLength(5)

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes after choosing a destination', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'Contact' }))
    expect(await screen.findByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})
