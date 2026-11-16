import { MapPin, TrendingUp } from 'lucide-react'
import type { ExperienceEntry } from '../../data/types.ts'
import { cn, isPlaceholder, placeholderLabel } from '../../lib/content.ts'
import { durationYears, formatYears } from '../../lib/experience.ts'
import { TechTag } from '../ui/Badge.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { PlaceholderText } from '../ui/SectionHeading.tsx'

/** Renders a value, or a dashed "to confirm" chip when it's a placeholder. */
export function Confirmable({ value }: { value: string }) {
  return isPlaceholder(value) ? <PlaceholderText>{placeholderLabel(value)}</PlaceholderText> : <>{value}</>
}

function period(start: string, end?: string) {
  return end ? `${start} — ${end}` : start
}

function DurationBadge({ years, className }: { years: number | undefined; className?: string }) {
  if (years === undefined) return null
  return (
    <p className={cn('inline-flex items-baseline gap-1.5 text-fg', className)}>
      <span className="text-2xl font-semibold tracking-tight">{years}</span>
      <span className="text-sm text-fg-muted">{years === 1 ? 'year' : 'years'}</span>
    </p>
  )
}

function RoleDuration({ years }: { years: number | undefined }) {
  if (years === undefined) return null
  return <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-fg-muted">{formatYears(years)}</span>
}

interface OrgGroup {
  organization: string
  location?: string
  roles: ExperienceEntry[]
}

/** Consecutive roles at the same organization form one career-progression group. */
function groupByOrganization(entries: ExperienceEntry[]): OrgGroup[] {
  const groups: OrgGroup[] = []
  for (const entry of entries) {
    const last = groups[groups.length - 1]
    if (last && last.organization === entry.organization) {
      last.roles.push(entry)
      last.location ??= entry.location
    } else {
      groups.push({ organization: entry.organization, location: entry.location, roles: [entry] })
    }
  }
  return groups
}

interface ExperienceTimelineProps {
  entries: ExperienceEntry[]
  compact?: boolean
}

export function ExperienceTimeline({ entries, compact = false }: ExperienceTimelineProps) {
  const groups = groupByOrganization(entries)

  return (
    <ol className="space-y-6">
      {groups.map((group) => {
        const newest = group.roles[0]!
        const oldest = group.roles[group.roles.length - 1]!
        const isProgression = group.roles.length > 1
        return (
          <Reveal as="li" key={`${group.organization}-${oldest.start}`}>
            <article className="grid gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
              <header>
                <p className="font-mono text-xs text-fg-subtle">{period(oldest.start, newest.end)}</p>
                <DurationBadge years={durationYears(oldest.start, newest.end)} className="mt-3" />
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  <Confirmable value={group.organization} />
                </h3>
                {group.location && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-fg-muted">
                    <MapPin size={13} aria-hidden="true" className="text-fg-subtle" />
                    {group.location}
                  </p>
                )}
                {isProgression && (
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    <TrendingUp size={13} aria-hidden="true" />
                    {group.roles.length} roles · career progression
                  </p>
                )}
              </header>

              <ol className="relative">
                {group.roles.map((role, i) => {
                  const current = role.end === 'Present'
                  return (
                    <li key={`${role.role}-${role.start}`} className="relative pb-8 pl-8 last:pb-0">
                      {i < group.roles.length - 1 && (
                        <span aria-hidden="true" className="absolute top-3 bottom-0 left-[5px] w-px bg-line" />
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute top-1.5 left-0 size-[11px] rounded-full border-2',
                          current ? 'border-accent bg-accent' : 'border-line-strong bg-surface',
                        )}
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-lg font-semibold text-fg">{role.role}</h4>
                        <p className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                          <span>
                            <Confirmable value={role.start} />
                            {role.end && (
                              <>
                                {' — '}
                                <Confirmable value={role.end} />
                              </>
                            )}
                          </span>
                          {isProgression && <RoleDuration years={durationYears(role.start, role.end)} />}
                        </p>
                      </div>
                      <p className="mt-2 max-w-2xl leading-relaxed text-fg-muted">{role.summary}</p>

                      {!compact && role.responsibilities.length > 0 && (
                        <ul className="mt-4 max-w-2xl space-y-2">
                          {role.responsibilities.map((r) => (
                            <li key={r} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}

                      {!compact && role.technologies && role.technologies.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies used as ${role.role}`}>
                          {role.technologies.map((t) => (
                            <li key={t}>
                              <TechTag>{t}</TechTag>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ol>
            </article>
          </Reveal>
        )
      })}
    </ol>
  )
}
