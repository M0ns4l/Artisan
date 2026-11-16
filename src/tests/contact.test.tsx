import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { ContactActions } from '../components/contact/ContactActions.tsx'
import { isConfiguredEmail, isConfiguredHref, isConfiguredUrl, isPlaceholder } from '../lib/content.ts'
import { renderApp } from './renderApp.tsx'

describe('content validation helpers', () => {
  it('detects placeholders and validates links', () => {
    expect(isPlaceholder('[YOUR_EMAIL]')).toBe(true)
    expect(isPlaceholder('')).toBe(true)
    expect(isPlaceholder('Present')).toBe(false)
    expect(isConfiguredEmail('[YOUR_EMAIL]')).toBe(false)
    expect(isConfiguredEmail('not-an-email')).toBe(false)
    expect(isConfiguredEmail('me@example.com')).toBe(true)
    expect(isConfiguredUrl('[YOUR_GITHUB_URL]')).toBe(false)
    expect(isConfiguredUrl('javascript:alert(1)')).toBe(false)
    expect(isConfiguredUrl('https://github.com/example')).toBe(true)
    expect(isConfiguredHref('/resume.pdf')).toBe(true)
    expect(isConfiguredHref('')).toBe(false)
  })
})

describe('contact actions', () => {
  it('shows an honest pending state (no dead mailto) while email is a placeholder', () => {
    render(
      <MemoryRouter>
        <ContactActions email="[YOUR_EMAIL]" />
      </MemoryRouter>,
    )
    expect(screen.getByText(/contact details are being finalized/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /email me/i })).not.toBeInTheDocument()
  })

  it('renders a mailto link and copies the address with accessible feedback', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })

    render(
      <MemoryRouter>
        <ContactActions email="hello@example.com" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:hello@example.com')

    await user.click(screen.getByRole('button', { name: /copy email/i }))
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
    expect(await screen.findByRole('status')).toHaveTextContent('Email address copied to clipboard.')
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()
  })

  it('reports a copy failure instead of faking success', async () => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn<(text: string) => Promise<void>>().mockRejectedValue(new Error('denied')) },
      configurable: true,
    })
    render(
      <MemoryRouter>
        <ContactActions email="hello@example.com" />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: /copy email/i }))
    expect(await screen.findByRole('status')).toHaveTextContent(/could not copy/i)
  })

  it('lists configured channels on the contact page and hides unconfigured ones', async () => {
    renderApp('/contact')
    await screen.findByRole('heading', { level: 1 })
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /linkedin/i }).length).toBeGreaterThan(0)
    expect(screen.queryByRole('link', { name: /instagram/i })).not.toBeInTheDocument()
  })
})
