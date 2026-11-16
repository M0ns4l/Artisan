import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './renderApp.tsx'

describe('document metadata', () => {
  it('sets a unique title and description per route without a fake canonical', async () => {
    renderApp('/projects/cictd-helpdesk')
    await screen.findByRole('heading', { level: 1, name: 'CICTD Helpdesk' })
    expect(document.title).toBe('CICTD Helpdesk — Monsal Dawa')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toMatch(/service-management/i)
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('CICTD Helpdesk — Monsal Dawa')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
  })

  it('marks the 404 page noindex', () => {
    renderApp('/nope')
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, follow')
  })
})
