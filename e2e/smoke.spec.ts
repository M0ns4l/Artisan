import { expect, test, type Page } from '@playwright/test'

const routes = ['/', '/about', '/projects', '/projects/porktrack', '/projects/truck-scale', '/experience', '/contact', '/missing-page']

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(0)
}

test.describe('smoke', () => {
  for (const route of routes) {
    test(`${route} loads without console errors or horizontal scroll`, async ({ page }) => {
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
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.reload()
    // Class is applied by the inline script before React renders.
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('deep links to project pages resolve (SPA fallback)', async ({ page }) => {
    await page.goto('/projects/hris')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Human Resource Information System')
  })

  test('primary navigation works', async ({ page, isMobile, viewport }) => {
    await page.goto('/')
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
