import { ArrowRight, KeyRound, Radio, ShieldCheck } from 'lucide-react'
import { m } from 'motion/react'
import { Link } from 'react-router'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

/** Modules that run inside the Unified Portal (positions are % of the diagram box). */
const modules = [
  { label: 'HRIS', slug: 'hris', x: 50, y: 11 },
  { label: 'Helpdesk', slug: 'cictd-helpdesk', x: 87, y: 38 },
  { label: 'OBMS', slug: 'official-business-management-system', x: 73, y: 83 },
  { label: 'ID Generator', slug: 'id-generator', x: 27, y: 83 },
  { label: 'IT Core', slug: 'it-core', x: 13, y: 38 },
]

const points = [
  { icon: KeyRound, title: 'One login, shared access', text: 'Every module sits behind one sign-in, with page-level permissions they all share.' },
  { icon: Radio, title: 'Real-time by default', text: 'Presence, notifications and live updates delivered over Laravel Reverb.' },
  { icon: ShieldCheck, title: 'One design language', text: 'Shared components keep every system consistent, in light and dark.' },
]

function HubDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {/* Static rings */}
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full border border-line" />
      <div aria-hidden="true" className="absolute inset-[27%] rounded-full border border-dashed border-line-strong" />

      {/* Connections draw in from the hub */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {modules.map((mod, i) => (
          <g key={mod.slug}>
            <m.line
              x1={50}
              y1={50}
              x2={mod.x}
              y2={mod.y}
              stroke="var(--fg-subtle)"
              strokeOpacity={0.45}
              strokeWidth={0.3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
            />
            <m.circle
              r={1.1}
              fill="var(--accent)"
              initial={{ cx: 50, cy: 50, opacity: 0 }}
              whileInView={{ cx: mod.x, cy: mod.y, opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: 0.9 + i * 0.12, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>

      {/* Hub */}
      <m.div
        className="absolute top-1/2 left-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-surface text-center shadow-raised"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase">Unified</span>
        <span className="text-sm font-semibold sm:text-base">Portal</span>
      </m.div>

      {/* Module nodes */}
      <ul>
        {modules.map((mod, i) => (
          <m.li
            key={mod.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/projects/${mod.slug}`}
              className="block rounded-full border border-line bg-surface px-3.5 py-2 text-[0.8125rem] font-medium whitespace-nowrap text-fg shadow-card transition-colors hover:border-accent hover:text-accent sm:px-4 sm:text-sm"
            >
              {mod.label}
            </Link>
          </m.li>
        ))}
      </ul>
    </div>
  )
}

export function PlatformSection() {
  return (
    <section aria-labelledby="platform-title" className="border-y border-line bg-surface">
      <div className="container-page grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading
            id="platform-title"
            eyebrow="Platform thinking"
            title="One login. Every system."
            description="HRIS, Helpdesk, IT Core, ID Generator and OBMS all run inside the Unified Portal I build on: one access model, one real-time layer, one design system."
          />
          <ul className="mt-10 space-y-6">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-accent">
                  <p.icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Link
            to="/projects"
            className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            See the systems it runs
            <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <HubDiagram />
      </div>
    </section>
  )
}
