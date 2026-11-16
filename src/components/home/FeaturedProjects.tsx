import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '../../lib/projects.ts'
import { ProjectDeck } from '../projects/ProjectDeck.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

export function FeaturedProjects() {
  const featured = getFeaturedProjects(undefined, 9)
  if (featured.length === 0) return null

  return (
    <section id="projects" aria-labelledby="featured-title" className="overflow-x-clip py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="featured-title"
          eyebrow="Projects"
          title="In-house systems I’ve built."
          description="Production software for HR, IT, field operations and production teams, each one written up as a case study."
          action={
            <ButtonLink to="/projects" variant="secondary" size="sm" className="group">
              View All Projects
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          }
        />
      </div>

      <Reveal className="mx-auto mt-10 max-w-[90rem]">
        <ProjectDeck projects={featured} />
      </Reveal>
    </section>
  )
}
