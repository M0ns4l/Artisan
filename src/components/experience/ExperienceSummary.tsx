import type { ExperienceEntry } from '../../data/types.ts'
import { organizationCount, totalExperienceYears } from '../../lib/experience.ts'
import { CountUp } from '../ui/CountUp.tsx'

/** Totals derived from the work history: years, companies and roles. */
export function ExperienceSummary({ entries }: { entries: ExperienceEntry[] }) {
  const years = totalExperienceYears(entries)
  const companies = organizationCount(entries)
  const items = [
    { value: years, suffix: '+', label: years === 1 ? 'Year of professional experience' : 'Years of professional experience' },
    { value: companies, suffix: '', label: companies === 1 ? 'Company' : 'Companies' },
    { value: entries.length, suffix: '', label: entries.length === 1 ? 'Role' : 'Roles' },
  ]
  return (
    <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col bg-surface px-5 py-5 sm:px-7 sm:py-6">
          <dt className="order-2 mt-1 text-[0.8125rem] leading-snug text-fg-subtle">{item.label}</dt>
          <dd className="order-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            <CountUp value={item.value} suffix={item.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
