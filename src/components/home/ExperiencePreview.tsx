import { ArrowRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router'
import { education, experience } from '../../data/experience.ts'
import { cn } from '../../lib/content.ts'
import { ExperienceSummary } from '../experience/ExperienceSummary.tsx'
import { ExperienceTimeline } from '../experience/ExperienceTimeline.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

/** Home-page experience section: the full career story plus education. */
export function ExperiencePreview() {
  if (experience.length === 0) return null
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-bg">
      <div className="container-page py-24 lg:py-32">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="From fixing computers to building the systems."
          description="Every role added a layer: hardware, then support, then maintaining software, and now building it end to end."
          action={
            <Link to="/experience" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Full experience
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <div className="mt-12">
          <ExperienceSummary entries={experience} />
        </div>
        <div className="mt-6">
          <ExperienceTimeline entries={experience} compact />
        </div>

        {education.length > 0 && (
          <div className="mt-6">
            <h3 className="sr-only">Education</h3>
            <ul className={cn('grid gap-4', education.length > 1 && 'md:grid-cols-2')}>
              {education.map((entry) => (
                <Reveal as="li" key={entry.credential}>
                  <div className="flex h-full items-start gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <GraduationCap size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs text-fg-subtle">
                        Education{entry.end ? ` · ${entry.start ? `${entry.start} — ` : 'Class of '}${entry.end}` : ''}
                      </p>
                      <p className="mt-1.5 text-lg font-semibold tracking-tight">{entry.credential}</p>
                      <p className="mt-1 text-fg-muted">{entry.institution}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
