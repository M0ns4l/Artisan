import { domains } from '../data/domains.ts'
import { experience } from '../data/experience.ts'
import { techStack } from '../data/skills.ts'
import { totalExperienceYears } from './experience.ts'
import { getPublishedProjects } from './projects.ts'

/** Headline numbers derived from real content — never typed in by hand. */
export function getPortfolioStats(now = new Date()) {
  const built = getPublishedProjects().filter((p) => p.verified)
  return {
    yearsExperience: totalExperienceYears(experience, now),
    yearsBuilding: techStack.reduce((max, t) => Math.max(max, t.years), 0),
    systemsBuilt: built.length,
    featureModules: built.reduce((sum, p) => sum + (p.modules?.length ?? 0), 0),
    domains: domains.length,
  }
}
