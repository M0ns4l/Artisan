import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile.ts'
import { renderApp } from './renderApp.tsx'

describe('résumé', () => {
  it('points at a PDF that exists in /public (exact case)', () => {
    const files = Object.keys(import.meta.glob('/public/Resume/*.pdf', { query: '?url' })).map((f) => f.replace('/public', ''))
    expect(files).toContain(profile.resumeUrl)
  })

  it('offers a download button in the hero and the contact section', () => {
    renderApp('/')
    const buttons = screen.getAllByRole('link', { name: /download résumé/i })
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    for (const b of buttons) {
      expect(b).toHaveAttribute('href', profile.resumeUrl)
      expect(b).toHaveAttribute('download', 'Monsal_Dawa_Resume.pdf')
    }
  })

  it('keeps the small icon rows to social profiles only', () => {
    renderApp('/')
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).queryByRole('link', { name: /résumé/i })).not.toBeInTheDocument()
    expect(within(footer).getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
  })

  it('lists the résumé on the contact page with a readable description', async () => {
    renderApp('/contact')
    await screen.findByRole('heading', { level: 1 })
    const link = screen.getByRole('link', { name: /résumé/i })
    expect(link).toHaveAttribute('href', profile.resumeUrl)
    expect(link).toHaveTextContent('PDF · opens in a new tab')
  })
})
