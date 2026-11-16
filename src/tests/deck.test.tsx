import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { LazyMotion, domMax } from 'motion/react'
import { describe, expect, it } from 'vitest'
import { ProjectDeck } from '../components/projects/ProjectDeck.tsx'
import { getFeaturedProjects } from '../lib/projects.ts'

const projects = getFeaturedProjects(undefined, 9)

function renderDeck() {
  return render(
    <MemoryRouter>
      <LazyMotion features={domMax} strict>
        <ProjectDeck projects={projects} />
      </LazyMotion>
    </MemoryRouter>,
  )
}

const status = () => screen.getByText(/^Showing project \d+ of \d+/)

describe('project deck', () => {
  it('starts on the first project with a single reachable case-study link', () => {
    renderDeck()
    expect(status()).toHaveTextContent(`Showing project 1 of ${projects.length}: ${projects[0]!.title}`)
    const links = screen.getAllByRole('link', { name: /read case study/i })
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', `/projects/${projects[0]!.slug}`)
  })

  it('moves with the arrow buttons and wraps around', async () => {
    const user = userEvent.setup()
    renderDeck()
    await user.click(screen.getByRole('button', { name: 'Next project' }))
    expect(status()).toHaveTextContent(`Showing project 2 of ${projects.length}`)
    expect(screen.getByRole('link', { name: /read case study/i })).toHaveAttribute('href', `/projects/${projects[1]!.slug}`)

    await user.click(screen.getByRole('button', { name: 'Previous project' }))
    await user.click(screen.getByRole('button', { name: 'Previous project' }))
    expect(status()).toHaveTextContent(`Showing project ${projects.length} of ${projects.length}`)
  })

  it('supports the keyboard arrow keys on the controls', async () => {
    const user = userEvent.setup()
    renderDeck()
    screen.getByRole('button', { name: 'Next project' }).focus()
    await user.keyboard('{ArrowRight}{ArrowRight}')
    expect(status()).toHaveTextContent(`Showing project 3 of ${projects.length}`)
    await user.keyboard('{ArrowLeft}')
    expect(status()).toHaveTextContent(`Showing project 2 of ${projects.length}`)
  })

  it('has no pagination dots and shows factual details only', () => {
    renderDeck()
    expect(screen.queryByRole('button', { name: /^Show / })).not.toBeInTheDocument()
    const first = projects[0]!
    expect(screen.getAllByText(`${first.modules?.length} modules`).length).toBeGreaterThan(0)
    expect(screen.queryByText(/#1/)).not.toBeInTheDocument()
  })
})
