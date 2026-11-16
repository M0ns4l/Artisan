import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects.ts'
import { renderApp } from './renderApp.tsx'

const withThumbnail = projects.filter((p) => p.publish && p.thumbnail)

describe('project screenshots', () => {
  it('configures a PNG screenshot for all seven in-house systems', () => {
    expect(withThumbnail.map((p) => p.slug).sort()).toEqual(
      ['cictd-helpdesk', 'hris', 'id-generator', 'it-core', 'official-business-management-system', 'porktrack', 'truck-scale'].sort(),
    )
    for (const p of withThumbnail) {
      expect(p.thumbnail!.src).toMatch(/^\/thumbnail\/.+\.png$/)
    }
  })

  it('points every screenshot at a file that exists (exact case)', () => {
    const files = new Set(
      Object.keys(import.meta.glob('/public/thumbnail/*.png', { query: '?url' })).map((f) => f.replace('/public', '')),
    )
    for (const p of withThumbnail) {
      expect(files.has(p.thumbnail!.src)).toBe(true)
    }
  })

  it('shows the screenshot on the case study page, with no video player', async () => {
    renderApp('/projects/hris')
    await screen.findByRole('heading', { level: 1, name: 'Human Resource Information System' })
    expect(screen.getByRole('img', { name: 'Human Resource Information System screenshot' })).toHaveAttribute(
      'src',
      '/thumbnail/hris-thumbnail.png',
    )
    expect(document.querySelector('video')).toBeNull()
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
  })

  it('links the deck screenshot to the case study', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: 'View the Human Resource Information System case study' })).toHaveAttribute(
      'href',
      '/projects/hris',
    )
    expect(screen.queryByText(/demo video/i)).not.toBeInTheDocument()
  })

  it('labels a concept image as a concept, not a real screenshot', async () => {
    renderApp('/projects/truck-scale')
    await screen.findByRole('heading', { level: 1, name: 'Truck Scale System' })
    expect(screen.getByText('Truck Scale System dashboard concept with demo data', { selector: 'figcaption' })).toBeInTheDocument()
  })

  it('needs no placeholder in the deck now that every featured system has a screenshot', () => {
    renderApp('/')
    expect(screen.queryByText('Screenshot coming soon', { exact: false })).not.toBeInTheDocument()
  })
})
