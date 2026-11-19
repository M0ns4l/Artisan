import { defineConfig, devices } from '@playwright/test'
import { BASE } from './e2e/base.ts'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    // Follows `base` in vite.config.ts. Test paths are relative to it.
    baseURL: `http://localhost:4173${BASE}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 780 }, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: `http://localhost:4173${BASE}`,
    reuseExistingServer: true,
    timeout: 180_000,
  },
})
