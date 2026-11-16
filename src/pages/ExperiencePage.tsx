import { GraduationCap } from 'lucide-react'
import { ExperienceSummary } from '../components/experience/ExperienceSummary.tsx'
import { Confirmable, ExperienceTimeline } from '../components/experience/ExperienceTimeline.tsx'
import { ContactCta } from '../components/home/ContactCta.tsx'
import { PageIntro } from '../components/ui/PageIntro.tsx'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { education, experience } from '../data/experience.ts'
import { profile } from '../data/profile.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'

export default function ExperiencePage() {
  useDocumentMeta({
    title: 'Experience',
    description: `Professional experience of ${profile.name}, ${profile.title}.`,
    path: '/experience',
  })

  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Building internal systems, end to end."
        description="Roles, responsibilities and the kind of work I own—from interface to database."
      />

      <section aria-label="Work history" className="container-page py-16 lg:py-24">
        <div className="mb-6">
          <ExperienceSummary entries={experience} />
        </div>
        <ExperienceTimeline entries={experience} />
      </section>

      {education.length > 0 && (
        <section aria-labelledby="education-title" className="border-t border-line">
          <div className="container-page py-16 lg:py-24">
            <SectionHeading id="education-title" eyebrow="Education" title="Education." />
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {education.map((entry) => (
                <li key={entry.credential} className="flex gap-4 rounded-lg border border-line bg-surface p-6">
                  <GraduationCap size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">{entry.credential}</h3>
                    <p className="mt-1 text-sm text-fg-muted">
                      <Confirmable value={entry.institution} />
                    </p>
                    {(entry.start || entry.end) && (
                      <p className="mt-2 font-mono text-xs text-fg-subtle">
                        {entry.start} {entry.start && entry.end && '—'} {entry.end}
                      </p>
                    )}
                    {entry.notes && <p className="mt-3 text-sm text-fg-muted">{entry.notes}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="border-t border-line">
        <ContactCta />
      </div>
    </>
  )
}
