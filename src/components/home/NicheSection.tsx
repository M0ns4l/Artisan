import { ArrowUpRight, Factory, Headset, Quote, Truck, Users, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { domains, type Domain } from '../../data/domains.ts'
import { profile } from '../../data/profile.ts'
import { getProjectBySlug } from '../../lib/projects.ts'
import { Eyebrow } from '../ui/Badge.tsx'
import { Reveal } from '../ui/Reveal.tsx'

const icons: Record<Domain['id'], LucideIcon> = {
  people: Users,
  it: Headset,
  field: Truck,
  production: Factory,
}

/** Purpose statement, target market and the operational domains served. */
export function NicheSection() {
  const { purpose } = profile
  return (
    <section id="purpose" aria-labelledby="purpose-title" className="container-page py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow>Purpose</Eyebrow>
          <h2 id="purpose-title" className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-[2.5rem]">
            Software for organizations that run on operations.
          </h2>
          <Reveal className="mt-8 rounded-2xl border border-line bg-surface p-7">
            <Quote size={20} aria-hidden="true" className="text-accent" />
            <p className="mt-4 text-lg leading-relaxed text-fg sm:text-xl sm:leading-relaxed">{purpose.statement}</p>
          </Reveal>
        </div>
        <div>
          <Eyebrow>Target market</Eyebrow>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">Who I build for</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {purpose.audience.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06} className="flex gap-5 py-5">
                <span className="font-mono text-xs leading-7 text-accent">0{i + 1}</span>
                <div>
                  <p className="font-semibold text-fg">{a.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg-muted">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Domains I build for">
        {domains.map((domain, i) => {
          const Icon = icons[domain.id]
          const related = domain.projects.map((slug) => getProjectBySlug(slug)).filter((p) => p !== undefined)
          return (
            <Reveal as="li" key={domain.id} delay={(i % 4) * 0.07}>
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-raised">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-105">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{domain.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">{domain.description}</p>
                {related.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${domain.title} case studies`}>
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-2.5 py-1 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {p.shortTitle ?? p.title}
                          <ArrowUpRight size={12} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
