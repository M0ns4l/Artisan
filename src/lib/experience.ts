import type { ExperienceEntry } from '../data/types.ts'

/** Resolves a year string; "Present" (or a missing end) means the current year. */
export function resolveYear(value: string | undefined, now: Date): number | undefined {
  if (!value || value === 'Present') return now.getFullYear()
  const year = Number.parseInt(value, 10)
  return Number.isNaN(year) ? undefined : year
}

/** Whole years between start and end (at least 1 for any recorded role). */
export function durationYears(start: string, end: string | undefined, now = new Date()): number | undefined {
  const from = resolveYear(start, now)
  const to = end ? resolveYear(end, now) : from
  if (from === undefined || to === undefined) return undefined
  return Math.max(1, to - from)
}

export function formatYears(years: number): string {
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`
}

export function formatYearsLong(years: number): string {
  return `${years} ${years === 1 ? 'year' : 'years'}`
}

/**
 * Total professional experience: the union of all role periods, so overlapping
 * or back-to-back roles aren't double-counted and gaps (e.g. study) aren't counted.
 */
export function totalExperienceYears(entries: ExperienceEntry[], now = new Date()): number {
  const ranges = entries
    .filter((e) => !e.excludeFromTotal)
    .map((e) => {
      const from = resolveYear(e.start, now)
      const to = e.end ? resolveYear(e.end, now) : from
      return from !== undefined && to !== undefined ? ([from, Math.max(to, from + 1)] as const) : undefined
    })
    .filter((r) => r !== undefined)
    .sort((a, b) => a[0] - b[0])

  let total = 0
  let current: [number, number] | undefined
  for (const [from, to] of ranges) {
    if (current && from <= current[1]) {
      current[1] = Math.max(current[1], to)
    } else {
      if (current) total += current[1] - current[0]
      current = [from, to]
    }
  }
  if (current) total += current[1] - current[0]
  return total
}

/** Distinct organizations in the work history. */
export function organizationCount(entries: ExperienceEntry[]): number {
  return new Set(entries.map((e) => e.organization)).size
}
