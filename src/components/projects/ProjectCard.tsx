import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { PortfolioProject } from '../../data/types.ts'
import { cn } from '../../lib/content.ts'
import { projectNumber } from '../../lib/projects.ts'
import { StatusBadge, TechTagList } from '../ui/Badge.tsx'
import { ThumbnailImage } from './ProjectThumbnail.tsx'

interface ProjectCardProps {
  project: PortfolioProject
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export function ProjectCard({ project, headingLevel: Heading = 'h3', className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-[border-color,box-shadow,transform] duration-300',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-raised focus-within:border-line-strong sm:p-8',
        className,
      )}
    >
      {project.thumbnail && (
        <div className="relative -mx-3 -mt-3 mb-6 aspect-video overflow-hidden rounded-xl border border-line sm:-mx-4 sm:-mt-4">
          <ThumbnailImage
            thumbnail={project.thumbnail}
            alt=""
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-fg-subtle">
          <span className="text-accent">{projectNumber(project.slug)}</span>
          <span aria-hidden="true"> / </span>
          <span className="sr-only">, </span>
          {project.category}
        </p>
        <StatusBadge status={project.status} />
      </div>

      <Heading className="mt-6 text-[1.375rem] leading-snug font-semibold tracking-tight text-fg">
        <Link
          to={`/projects/${project.slug}`}
          className="rounded-sm after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">{project.challenge}</p>

      <div className="mt-6">
        <TechTagList technologies={project.technologies} verified={project.technologiesVerified} max={4} />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm font-medium text-fg group-hover:text-accent">Read case study</span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="text-fg-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-accent opacity-0 group-has-[a:focus-visible]:opacity-100"
      />
    </article>
  )
}
