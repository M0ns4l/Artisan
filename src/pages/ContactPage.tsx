import { Briefcase, Code2, Handshake, MapPin } from 'lucide-react'
import { ContactActions, ContactChannelList } from '../components/contact/ContactActions.tsx'
import { PageIntro } from '../components/ui/PageIntro.tsx'
import { profile } from '../data/profile.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'
import { isConfiguredEmail } from '../lib/content.ts'

const topics = [
  { icon: Briefcase, title: 'Engineering roles', description: 'Senior and full-stack positions building web applications and internal platforms.' },
  { icon: Code2, title: 'Project work', description: 'Well-scoped systems: portals, workflow tools, APIs and admin applications.' },
  { icon: Handshake, title: 'Collaboration', description: 'Conversations with teams and engineers working on similar problems.' },
]

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact',
    description: `Get in touch with ${profile.name} about engineering roles, projects or collaborations.`,
    path: '/contact',
  })

  const hasEmail = isConfiguredEmail(profile.email)

  return (
    <>
      <PageIntro eyebrow="Contact" title={profile.contact.heading} description={profile.contact.body} />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
        <section aria-labelledby="reach-title" className="min-w-0">
          <h2 id="reach-title" className="text-2xl font-semibold">
            Reach me directly
          </h2>
          {hasEmail && (
            <p className="mt-3 font-mono text-lg break-all text-fg sm:text-xl">{profile.email}</p>
          )}
          <div className="mt-6">
            <ContactActions />
          </div>

          <div className="mt-10">
            <ContactChannelList />
          </div>

          <p className="mt-10 flex items-center gap-2 text-sm text-fg-subtle">
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </p>
        </section>

        <section aria-labelledby="topics-title" className="min-w-0">
          <h2 id="topics-title" className="text-2xl font-semibold">
            Good reasons to write
          </h2>
          <ul className="mt-6 space-y-4">
            {topics.map((t) => (
              <li key={t.title} className="flex gap-4 rounded-lg border border-line bg-surface p-5">
                <t.icon size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{t.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
