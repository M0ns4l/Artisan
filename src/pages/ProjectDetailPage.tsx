import { ArrowLeft, ArrowRight, ExternalLink, Info, Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Confirmable } from '../components/experience/ExperienceTimeline.tsx'
import { ContactCta } from '../components/home/ContactCta.tsx'
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram.tsx'
import { ThumbnailImage } from '../components/projects/ProjectThumbnail.tsx'
import { GithubIcon } from '../components/ui/BrandIcons.tsx'
import { StatusBadge, TechTagList } from '../components/ui/Badge.tsx'
import { ButtonAnchor } from '../components/ui/Button.tsx'
import type { PortfolioProject } from '../data/types.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'
import { isConfiguredUrl } from '../lib/content.ts'
import { getAdjacentProjects, getProjectBySlug, projectNumber, statusMeta } from '../lib/projects.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

interface CaseSection {
  id: string
  title: string
  content: ReactNode
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
          <span>
            <Confirmable value={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-[1.0625rem] leading-relaxed text-fg-muted">{children}</p>
}

function buildSections(project: PortfolioProject): CaseSection[] {
  const sections: CaseSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-5">
          <Prose>{project.overview}</Prose>
          {project.intendedUsers && (
            <div className="rounded-md border border-line bg-surface px-5 py-4">
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">Intended users</p>
              <p className="mt-1.5 text-fg">{project.intendedUsers}</p>
            </div>
          )}
        </div>
      ),
    },
  ]

  if (project.problem) sections.push({ id: 'problem', title: 'Problem', content: <Prose>{project.problem}</Prose> })
  if (project.role?.length) sections.push({ id: 'role', title: 'My role', content: <BulletList items={project.role} /> })

  if (project.solution || project.modules?.length) {
    sections.push({
      id: 'solution',
      title: 'Solution',
      content: (
        <div className="space-y-8">
          {project.solution && <Prose>{project.solution}</Prose>}
          {project.modules && project.modules.length > 0 && (
            <div>
              <h3 className="mb-4 font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
                {project.verified ? 'Major modules' : 'Planned modules · to verify'}
              </h3>
              <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {project.modules.map((mod) => (
                  <li key={mod.title} className="bg-surface p-5">
                    <p className="font-semibold text-fg">{mod.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{mod.description}</p>
                  </li>
                ))}
                {project.modules.length % 2 === 1 && <li aria-hidden="true" className="hidden bg-surface sm:block" />}
              </ul>
            </div>
          )}
        </div>
      ),
    })
  }

  if (project.architecture?.length) {
    sections.push({
      id: 'architecture',
      title: 'Architecture',
      content: (
        <ArchitectureDiagram layers={project.architecture} title={project.title} verified={project.technologiesVerified} />
      ),
    })
  }

  if (project.challenges?.length) {
    sections.push({
      id: 'challenges',
      title: 'Technical challenges',
      content: (
        <div className="space-y-4">
          {!project.verified && (
            <p className="text-sm text-fg-subtle">Representative engineering considerations for a system of this kind.</p>
          )}
          <BulletList items={project.challenges} />
        </div>
      ),
    })
  }

  if (project.security?.length) {
    sections.push({ id: 'security', title: 'Security & reliability', content: <BulletList items={project.security} /> })
  }

  if (project.outcomes?.length) {
    sections.push({
      id: 'outcomes',
      title: project.outcomesAreMeasured ? 'Results' : 'Intended outcomes',
      content: (
        <div className="space-y-4">
          {!project.outcomesAreMeasured && (
            <p className="text-sm text-fg-subtle">Deliverables and intended benefits — not measured results.</p>
          )}
          <BulletList items={project.outcomes} />
        </div>
      ),
    })
  }

  if (project.images?.length) {
    sections.push({
      id: 'visuals',
      title: 'Visuals',
      content: (
        <div className="grid gap-5">
          {project.images.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-lg border border-line bg-surface">
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full" />
              {img.caption && <figcaption className="border-t border-line px-5 py-3 text-sm text-fg-subtle">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ),
    })
  }

  return sections
}

function ProjectLinks({ project }: { project: PortfolioProject }) {
  const demo = isConfiguredUrl(project.demoUrl) ? project.demoUrl : undefined
  const repo = isConfiguredUrl(project.repositoryUrl) ? project.repositoryUrl : undefined

  if (!demo && !repo) {
    return (
      <p className="flex items-start gap-2 text-sm text-fg-muted">
        <Lock size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-fg-subtle" />
        {project.visibility === 'private' ? 'Private / Internal Project' : 'No public links available'}
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      {demo && (
        <ButtonAnchor href={demo} external size="sm">
          <ExternalLink size={15} aria-hidden="true" /> Live demo
        </ButtonAnchor>
      )}
      {repo && (
        <ButtonAnchor href={repo} external size="sm" variant="secondary">
          <GithubIcon size={15} /> Repository
        </ButtonAnchor>
      )}
    </div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useDocumentMeta({
    title: project?.title ?? 'Project not found',
    description: project?.summary ?? 'This project could not be found.',
    path: project ? `/projects/${project.slug}` : '/projects',
    type: 'article',
    noIndex: !project,
  })

  if (!project) return <NotFoundPage embedded />

  const sections = buildSections(project)
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <article aria-labelledby="project-title">
      <header className="border-b border-line">
        <div className="container-page pt-10 pb-12 sm:pt-14 sm:pb-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-fg-subtle">
              <span className="text-accent">{projectNumber(project.slug)}</span> / {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h1 id="project-title" className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.5rem]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg-muted sm:text-xl">{project.summary}</p>

          {!project.verified && (
            <div role="note" className="mt-8 flex max-w-3xl gap-3 rounded-lg border border-dashed border-line-strong bg-surface px-5 py-4 text-sm">
              <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              <p className="text-fg-muted">
                <span className="font-medium text-fg">Draft case study.</span> Scope, responsibilities and stack are
                being confirmed. Capabilities describe the system’s intended design, not verified results.
              </p>
            </div>
          )}

          {project.thumbnail && (
            <figure className="mt-12 max-w-5xl">
              <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-raised">
                <ThumbnailImage
                  thumbnail={project.thumbnail}
                  alt={project.thumbnail.caption ?? `${project.title} screenshot`}
                  eager
                />
              </div>
              <figcaption className="mt-3 text-sm text-fg-subtle">{project.thumbnail.caption ?? `${project.title} interface`}</figcaption>
            </figure>
          )}
        </div>
      </header>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[15rem_1fr] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-lg border border-line bg-surface p-5 text-sm lg:grid-cols-1">
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">Status</dt>
              <dd className="mt-1 text-fg">{statusMeta[project.status].label}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">Category</dt>
              <dd className="mt-1 text-fg">{project.category}</dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="mb-2 font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">Stack</dt>
              <dd>
                <TechTagList technologies={project.technologies} verified={project.technologiesVerified} />
              </dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="mb-2 font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">Links</dt>
              <dd>
                <ProjectLinks project={project} />
              </dd>
            </div>
          </dl>

          <nav aria-label="On this page" className="mt-8 hidden lg:block">
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">On this page</p>
            <ul className="mt-3 space-y-1 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-fg-muted hover:border-accent hover:text-fg">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-16">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <div className="mb-6 flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h2 id={`${s.id}-title`} className="text-2xl font-semibold">
                  {s.title}
                </h2>
              </div>
              {s.content}
            </section>
          ))}
        </div>
      </div>

      {previous && next && (
        <nav aria-label="More projects" className="border-t border-line">
          <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
            <Link
              to={`/projects/${previous.slug}`}
              className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
                <ArrowLeft size={14} aria-hidden="true" /> Previous project
              </span>
              <span className="mt-2 block font-semibold text-fg group-hover:text-accent">{previous.title}</span>
            </Link>
            <Link
              to={`/projects/${next.slug}`}
              className="group rounded-lg border border-line bg-surface p-5 text-right transition-colors hover:border-line-strong"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-fg-subtle">
                Next project <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="mt-2 block font-semibold text-fg group-hover:text-accent">{next.title}</span>
            </Link>
          </div>
        </nav>
      )}

      <div className="border-t border-line">
        <ContactCta />
      </div>
    </article>
  )
}
