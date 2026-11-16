import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Factory,
  Headset,
  IdCard,
  LayoutGrid,
  Layers,
  Lock,
  MapPinned,
  MonitorCog,
  Scale,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { m, type PanInfo } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router'
import type { PortfolioProject } from '../../data/types.ts'
import { cn, isConfiguredUrl } from '../../lib/content.ts'
import { projectNumber } from '../../lib/projects.ts'
import { techIconKey } from '../../lib/techIcons.ts'
import { StatusBadge } from '../ui/Badge.tsx'
import { buttonClasses } from '../ui/buttonStyles.ts'
import { TechIcon } from '../ui/TechIcon.tsx'
import { ThumbnailImage } from './ProjectThumbnail.tsx'

const icons: Record<string, LucideIcon> = {
  hris: Users,
  'cictd-helpdesk': Headset,
  'it-core': MonitorCog,
  porktrack: Factory,
  'id-generator': IdCard,
  'truck-scale': Scale,
  'official-business-management-system': MapPinned,
  'unified-enterprise-portal': LayoutGrid,
  'payease-payroll-platform': Wallet,
}

const spring = { type: 'spring', stiffness: 170, damping: 26, mass: 1 } as const

/** Shortest signed distance from the active card, wrapping around the deck. */
function offsetFrom(index: number, active: number, total: number) {
  let d = index - active
  if (d > total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

function domain(p: PortfolioProject) {
  const parts = p.category.split('·').map((s) => s.trim())
  return parts[parts.length - 1] ?? p.category
}

/** Left panel of a card: the project screenshot, or a quiet placeholder when there is none. */
function DeckMedia({ project, active, Icon }: { project: PortfolioProject; active: boolean; Icon: LucideIcon }) {
  if (project.thumbnail) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        tabIndex={active ? 0 : -1}
        aria-label={`View the ${project.title} case study`}
        className="group/thumb relative block aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface-2"
      >
        <ThumbnailImage
          thumbnail={project.thumbnail}
          alt={`${project.title} screenshot`}
          className="transition-transform duration-700 ease-out group-hover/thumb:scale-105"
        />
      </Link>
    )
  }
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <span className="relative flex size-16 items-center justify-center rounded-2xl bg-surface text-accent shadow-card">
        <Icon size={30} aria-hidden="true" />
      </span>
      <span className="relative font-mono text-xs text-fg-subtle">Screenshot coming soon</span>
    </div>
  )
}

function DeckCard({ project, active }: { project: PortfolioProject; active: boolean }) {
  const Icon = icons[project.slug] ?? LayoutGrid
  const demo = isConfiguredUrl(project.demoUrl) ? project.demoUrl : undefined
  const stack = project.technologies.slice(0, 4)

  return (
    <article className="grid h-full gap-7 rounded-[2rem] border border-line bg-surface p-5 shadow-raised sm:p-7 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:p-8">
      <DeckMedia project={project} active={active} Icon={Icon} />

      <div className="flex h-full flex-col px-2 pb-2 sm:px-1 lg:py-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-fg-subtle">
            <span className="text-accent">{projectNumber(project.slug)}</span>
            <span aria-hidden="true"> / </span>
            <span className="sr-only">, </span>
            {domain(project)}
          </p>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-fg sm:text-[1.875rem]">{project.title}</h3>
        {project.kind && <p className="mt-1 text-base text-fg-subtle sm:text-lg">{project.kind}</p>}

        <p className="mt-4 flex-1 leading-relaxed text-fg-muted">{project.summary}</p>

        {stack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {stack.map((tech) => {
              const key = techIconKey(tech)
              return (
                <li
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg py-1 pr-3 pl-2 text-sm text-fg-muted"
                >
                  {key ? <TechIcon name={key} size={14} /> : <Layers size={14} aria-hidden="true" className="text-fg-subtle" />}
                  {tech}
                </li>
              )
            })}
            {project.technologies.length > stack.length && (
              <li className="inline-flex items-center px-1 text-sm text-fg-subtle">+{project.technologies.length - stack.length}</li>
            )}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <Link to={`/projects/${project.slug}`} tabIndex={active ? 0 : -1} className={buttonClasses('primary', 'md', 'group')}>
            Read case study
            <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1} className={buttonClasses('secondary')}>
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
              <Lock size={14} aria-hidden="true" />
              {project.visibility === 'private' ? 'Private system' : 'No public demo'}
            </span>
          )}
          {project.modules && project.modules.length > 0 && (
            <span className="ml-auto font-mono text-xs text-fg-subtle">{project.modules.length} modules</span>
          )}
        </div>
      </div>
    </article>
  )
}

function ArrowButton({
  direction,
  onClick,
  onKeyDown,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  onKeyDown: (e: KeyboardEvent) => void
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={direction === 'prev' ? 'Previous project' : 'Next project'}
      className={cn(
        'relative z-30 inline-flex size-12 items-center justify-center rounded-full sm:absolute sm:top-1/2 sm:-translate-y-1/2 border border-line bg-surface/90 text-fg shadow-raised backdrop-blur-md transition-[scale,background-color,border-color] duration-200 hover:scale-110 hover:border-line-strong active:scale-95 sm:size-14',
        direction === 'prev' ? 'sm:left-3 lg:left-8' : 'sm:right-3 lg:right-8',
      )}
    >
      <Icon size={22} aria-hidden="true" />
    </button>
  )
}

/**
 * A fanned deck of project cards: the active card sits in front, its
 * neighbours tilt out behind it. Hover zooms the front card; click a side
 * card, swipe, or use the arrows (and arrow keys) to move through the deck.
 */
export function ProjectDeck({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const total = projects.length
  if (total === 0) return null

  const go = (delta: number) => setActive((i) => (i + delta + total) % total)
  const current = projects[active]!

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  return (
    <section aria-roledescription="carousel" aria-label="In-house systems" className="relative">
      <div className="grid justify-items-center px-5 py-8 [grid-template-areas:'deck'] sm:px-20 sm:py-12">
        {projects.map((project, i) => {
          const offset = offsetFrom(i, active, total)
          const isActive = offset === 0
          const visible = Math.abs(offset) <= 1
          return (
            <m.div
              key={project.slug}
              className="relative w-full max-w-[40rem] [grid-area:deck] lg:max-w-[68rem]"
              style={{ zIndex: 10 - Math.abs(offset) }}
              initial={false}
              animate={{
                x: `${offset * 58}%`,
                y: Math.abs(offset) * 30,
                rotate: offset * 6,
                scale: isActive ? 1 : 0.84,
                opacity: visible ? 1 : 0,
              }}
              transition={spring}
              drag={isActive && total > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              aria-hidden={!isActive}
            >
              <m.div
                className="h-full"
                animate={
                  isActive
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: hovered === i ? 0.85 : 0.5, scale: hovered === i ? 1.04 : 1, y: 0 }
                }
                whileHover={isActive ? { scale: 1.03, y: -6 } : undefined}
                transition={spring}
                inert={!isActive}
              >
                <DeckCard project={project} active={isActive} />
              </m.div>
              {!isActive && visible && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    setActive(i)
                    setHovered(null)
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute inset-0 cursor-pointer rounded-[2rem]"
                >
                  <span className="sr-only">Show {project.title}</span>
                </button>
              )}
            </m.div>
          )
        })}
      </div>

      {total > 1 && (
        <div className="mt-2 flex justify-center gap-4 sm:contents">
          <ArrowButton direction="prev" onClick={() => go(-1)} onKeyDown={onKeyDown} />
          <ArrowButton direction="next" onClick={() => go(1)} onKeyDown={onKeyDown} />
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing project {active + 1} of {total}: {current.title}
      </p>
    </section>
  )
}
