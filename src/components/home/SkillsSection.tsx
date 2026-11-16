import {
  Bot,
  Braces,
  Cpu,
  Database,
  FlaskConical,
  KeyRound,
  Layers,
  LifeBuoy,
  Server,
  ServerCog,
  Wrench,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { m } from 'motion/react'
import { capabilities, professionalSkills, techStack, toolGroups, type ToolGroup } from '../../data/skills.ts'
import { Reveal } from '../ui/Reveal.tsx'
import { TechIcon } from '../ui/TechIcon.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const toolIcons: Record<ToolGroup['id'], LucideIcon> = { tools: Wrench, ai: Bot, servers: ServerCog }
const capabilityIcons: LucideIcon[] = [Layers, Braces, Database, KeyRound, Workflow, FlaskConical, Cpu, LifeBuoy]

function yearsLabel(years: number) {
  return `${years} ${years === 1 ? 'year' : 'years'}`
}

export function TechStackGrid() {
  const maxYears = Math.max(...techStack.map((t) => t.years), 1)
  return (
    <div className="space-y-5">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((tech, i) => (
          <Reveal as="li" key={tech.name} delay={(i % 3) * 0.06}>
            <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <TechIcon
                    name={tech.icon}
                    size={22}
                    tile
                    className="size-11 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{tech.name}</h3>
                    <p className="mt-0.5 font-mono text-xs text-fg-subtle">{tech.category}</p>
                  </div>
                </div>
                <p className="text-right">
                  <span aria-hidden="true">
                    <span className="text-2xl font-semibold tracking-tight text-fg">{tech.years}</span>
                    <span className="ml-1 text-sm text-fg-subtle">{tech.years === 1 ? 'yr' : 'yrs'}</span>
                  </span>
                  <span className="sr-only">{yearsLabel(tech.years)} of experience</span>
                </p>
              </div>
              <div aria-hidden="true" className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <m.div
                  className="h-full origin-left rounded-full bg-accent"
                  style={{ width: `${(tech.years / maxYears) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1, delay: 0.15 + (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <ul className="grid gap-4 md:grid-cols-3">
        {toolGroups.map((group, i) => {
          const Icon = toolIcons[group.id]
          return (
            <Reveal as="li" key={group.id} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{group.title}</h3>
                    <p className="text-xs text-fg-subtle">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={group.title}>
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-bg py-1 pr-3 pl-2 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      <TechIcon name={item.icon} size={15} />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}

export function TechStackSection() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="border-y border-line bg-surface">
      <div className="container-page py-24 lg:py-32">
        <SectionHeading
          id="stack-title"
          eyebrow="Tech stack"
          title="The tools behind the systems."
          description="Years of hands-on, production experience with each technology, from database to interface."
        />
        <div className="mt-14">
          <TechStackGrid />
        </div>
      </div>
    </section>
  )
}

export function CapabilitiesGrid() {
  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {capabilities.map((c, i) => {
          const Icon = capabilityIcons[i % capabilityIcons.length] ?? Server
          return (
            <Reveal as="li" key={c.title} delay={(i % 2) * 0.05} className="group bg-surface p-6 transition-colors hover:bg-bg">
              <Icon size={19} aria-hidden="true" className="text-accent transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">{c.description}</p>
            </Reveal>
          )
        })}
      </ul>
      <Reveal className="h-fit rounded-2xl border border-dashed border-line-strong p-6 lg:sticky lg:top-24">
        <h3 className="font-semibold">Professional skills</h3>
        <p className="mt-1.5 text-sm text-fg-subtle">How I work with the people around the code.</p>
        <ul className="mt-5 space-y-3">
          {professionalSkills.map((s) => (
            <li key={s} className="flex items-center gap-3 text-[0.9375rem] text-fg">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="container-page py-24 lg:py-32">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        title="What I bring to a team."
        description="Beyond the stack: the capabilities that turn requirements into working, supported systems."
      />
      <div className="mt-14">
        <CapabilitiesGrid />
      </div>
    </section>
  )
}
