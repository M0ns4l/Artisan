import { ArrowRight, Check, Compass, MapPin } from 'lucide-react'
import { CapabilitiesGrid, TechStackGrid } from '../components/home/SkillsSection.tsx'
import { Eyebrow } from '../components/ui/Badge.tsx'
import { ButtonLink } from '../components/ui/Button.tsx'
import { ProfilePicture } from '../components/ui/ProfilePicture.tsx'
import { Reveal } from '../components/ui/Reveal.tsx'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { profile } from '../data/profile.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'

function Portrait() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-surface shadow-raised">
      <div className="relative aspect-square overflow-hidden bg-[color-mix(in_oklab,var(--accent)_9%,var(--surface))]">
        <ProfilePicture className="absolute inset-0 h-full w-full object-cover object-top" fallbackClassName="h-full w-full" />
      </div>
      <figcaption className="border-t border-line px-5 py-4">
        <p className="font-semibold">{profile.name}</p>
        <p className="mt-1 text-sm text-fg-muted">{profile.title}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-fg-subtle">
          <MapPin size={14} aria-hidden="true" />
          {profile.location}
        </p>
      </figcaption>
    </figure>
  )
}

export default function AboutPage() {
  const { about } = profile
  useDocumentMeta({
    title: 'About',
    description: `About ${profile.name}: engineering principles, the business problems I work on and my current technical focus.`,
    path: '/about',
  })

  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-line">
        <div className="container-page grid gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:pb-24">
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 id="about-title" className="mt-4 text-4xl leading-[1.1] font-semibold sm:text-5xl">
              Software for the work behind the work.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-fg">{about.intro}</p>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/projects">
                See case studies
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/experience" variant="secondary">
                View experience
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:mx-0 lg:self-start">
            <Portrait />
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="container-page py-20 lg:py-24">
        <SectionHeading
          id="principles-title"
          eyebrow="Principles"
          title="How I approach engineering."
          description="The standards I hold my own work to, regardless of the size of the system."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {about.principles.map((principle, i) => (
            <Reveal as="li" key={principle.title} delay={(i % 3) * 0.05} className="bg-surface p-6 lg:p-7">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-lg font-semibold">{principle.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{principle.description}</p>
            </Reveal>
          ))}
          <li className="hidden bg-surface p-6 sm:flex sm:items-end lg:p-7">
            <p className="text-sm text-fg-subtle">Good software is mostly good decisions, made consistently.</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="problems-title" className="border-y border-line bg-surface">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[0.8fr_2fr] lg:gap-16 lg:py-24">
          <SectionHeading id="problems-title" eyebrow="Problem space" title="Business problems I work on." />
          <ul className="grid gap-5 sm:grid-cols-2">
            {about.problems.map((problem) => (
              <li key={problem.title} className="rounded-lg border border-line bg-bg p-6">
                <h3 className="font-semibold">{problem.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{problem.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="container-page py-20 lg:py-24">
        <SectionHeading id="focus-title" eyebrow="Now" title="Current focus and what I’m exploring." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-6 sm:p-7">
            <h3 className="flex items-center gap-2.5 font-semibold">
              <Check size={18} aria-hidden="true" className="text-accent" />
              Current technical focus
            </h3>
            <ul className="mt-5 space-y-3">
              {about.currentFocus.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-dashed border-line-strong p-6 sm:p-7">
            <h3 className="flex items-center gap-2.5 font-semibold">
              <Compass size={18} aria-hidden="true" className="text-accent" />
              Exploring
            </h3>
            <p className="mt-2 text-sm text-fg-subtle">Areas I’m actively learning — not yet claimed as production depth.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {about.exploring.map((item) => (
                <li key={item} className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-fg-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-skills-title" className="border-t border-line">
        <div className="container-page py-20 lg:py-24">
          <SectionHeading id="about-skills-title" eyebrow="Tech stack" title="Technologies and years of experience." />
          <div className="mt-12">
            <TechStackGrid />
          </div>
          <h2 className="mt-20 text-2xl font-semibold tracking-tight">Skills</h2>
          <div className="mt-8">
            <CapabilitiesGrid />
          </div>
        </div>
      </section>
    </>
  )
}
