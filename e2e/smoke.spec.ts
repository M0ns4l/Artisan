import { expect, test, type Page } from '@playwright/test'
import { BASE } from './base.ts'

// Relative to baseURL (http://localhost:4173 + vite `base`)
const routes = ['', 'about', 'projects', 'projects/porktrack', 'projects/truck-scale', 'experience', 'contact', 'missing-page']

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(0)
}

test.describe('smoke', () => {
  for (const route of routes) {
    test(`/${route} loads without console errors or horizontal scroll`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
      page.on('pageerror', (err) => errors.push(err.message))

      await page.goto(route)
      await expect(page.locator('h1')).toHaveCount(1)
      await expectNoHorizontalScroll(page)
      expect(errors).toEqual([])
    })
  }

  test('theme preference persists across reloads without flashing', async ({ page }) => {
    await page.goto('')
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.reload()
    // Class is applied by the inline script before React renders.
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('deep links to project pages resolve (SPA fallback)', async ({ page }) => {
    await page.goto('projects/hris')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Human Resource Information System')
  })

  test('primary navigation works', async ({ page, isMobile, viewport }) => {
    await page.goto('')
    if (isMobile || (viewport && viewport.width < 768)) {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Projects' }).click()
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Projects' }).click()
    }
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Systems, workflows')
  })
})

test.describe('deploy base path', () => {
  test(`every image and icon loads from ${BASE}`, async ({ page }) => {
    const failed: string[] = []
    page.on('response', (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`)
    })
    await page.goto('projects')
    // Force lazy images to load (the browser may defer ones scrolled past), then wait for all of them.
    await page.evaluate(() => {
      for (const img of Array.from(document.images)) img.loading = 'eager'
    })
    // `complete` is also true for a cancelled/restarted request, so wait for real pixels.
    await page.waitForFunction(
      () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
      undefined,
      { timeout: 30_000 },
    )

    const images = await page.$$eval('img', (els) => els.map((e) => ({ src: e.currentSrc || e.src, ok: e.naturalWidth > 0 })))
    expect(images.length).toBeGreaterThan(0)
    for (const img of images) {
      expect(new URL(img.src).pathname.startsWith(BASE), img.src).toBe(true)
      expect(img.ok, `${img.src} should load`).toBe(true)
    }
    const icons = await page.$$eval('link[rel~="icon"], link[rel="apple-touch-icon"]', (els) => els.map((e) => e.getAttribute('href')))
    for (const href of icons) expect(href?.startsWith(BASE), href ?? '').toBe(true)
    expect(failed).toEqual([])
  })

  test('deep links work on a hard refresh', async ({ page }) => {
    await page.goto('projects/hris')
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Human Resource Information System')
  })
})
