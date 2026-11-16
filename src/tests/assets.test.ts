import { afterEach, describe, expect, it, vi } from 'vitest'
import { assetUrl } from '../lib/assets.ts'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('assetUrl', () => {
  it('prefixes public files with the GitHub Pages base path', () => {
    vi.stubEnv('BASE_URL', '/Artisan/')
    expect(assetUrl('/thumbnail/hris-thumbnail.png')).toBe('/Artisan/thumbnail/hris-thumbnail.png')
    expect(assetUrl('Profile/profile.png')).toBe('/Artisan/Profile/profile.png')
  })

  it('works at the domain root too', () => {
    vi.stubEnv('BASE_URL', '/')
    expect(assetUrl('/logo/wordmark-light.png')).toBe('/logo/wordmark-light.png')
  })

  it('leaves absolute URLs untouched', () => {
    vi.stubEnv('BASE_URL', '/Artisan/')
    expect(assetUrl('https://example.com/a.png')).toBe('https://example.com/a.png')
    expect(assetUrl('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })
})
