import { m } from 'motion/react'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const steps = [
  {
    title: 'Map the workflow',
    text: 'Sit with the people doing the work. Capture every step, approval and exception before writing code.',
  },
  {
    title: 'Model data & rules',
    text: 'Design the schema, roles and permissions first, so the system enforces the business, not the screen.',
  },
  {
    title: 'Build in modules',
    text: 'Ship focused modules on a shared foundation, one workflow at a time, each one usable on its own.',
  },
  {
    title: 'Support & refine',
    text: 'Iterate from real usage: reports, access changes and new modules as the organization grows.',
  },
]

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="container-page py-24 lg:py-32">
      <SectionHeading
        id="process-title"
        eyebrow="How I work"
        title="From paper process to production system."
        description="A simple, repeatable approach: understand first, structure second, build third."
      />
      <div className="relative mt-16">
        {/* Progress rail that draws across as the section enters */}
        <div aria-hidden="true" className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-line lg:block">
          <m.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.15 + i * 0.12} className="relative">
              <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm text-fg shadow-card">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
