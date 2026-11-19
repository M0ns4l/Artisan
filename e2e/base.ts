import { readFileSync } from 'node:fs'

/** The `base` from vite.config.ts, so tests always match how the site is built. */
export const BASE = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8').match(/^\s*base:\s*['"]([^'"]+)['"]/m)?.[1] ?? '/'
