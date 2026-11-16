import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// Mirror index.html's pre-paint script: light theme by default (no .dark class).
beforeEach(() => {
  document.documentElement.className = ''
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

// jsdom lacks these browser APIs used by motion and the header.
if (!window.matchMedia) {
  window.matchMedia = vi.fn<(query: string) => MediaQueryList>().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn<() => void>(),
    removeEventListener: vi.fn<() => void>(),
    addListener: vi.fn<() => void>(),
    removeListener: vi.fn<() => void>(),
    dispatchEvent: vi.fn<() => boolean>(),
  }) as unknown as MediaQueryList)
}

class MockIntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.IntersectionObserver ??= MockIntersectionObserver as unknown as typeof IntersectionObserver
window.scrollTo = vi.fn<() => void>() as unknown as typeof window.scrollTo

