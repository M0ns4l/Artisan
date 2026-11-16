/**
 * Content types for the portfolio.
 *
 * Convention: any string wrapped in square brackets, e.g. "[YOUR_EMAIL]" or
 * "[Organization name]", is treated as an unconfirmed placeholder. Links and
 * buttons backed by placeholders are hidden automatically; placeholder text is
 * rendered with a visible "to confirm" style so it is never mistaken for fact.
 */

export type ProjectStatus = 'production' | 'internal' | 'in-development' | 'concept' | 'to-verify'

export type ProjectTag = 'enterprise-systems' | 'backend-apis' | 'tools' | 'hardware'

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectThumbnail {
  /** Screenshot/thumbnail PNG in /public/thumbnail, e.g. "/thumbnail/hris-thumbnail.png" (paths are case-sensitive). */
  src: string
  /** Caption on the case study page. Say so when the image is a concept or uses demo data. */
  caption?: string
}

export interface ProjectModule {
  title: string
  description: string
}

export interface ArchitectureLayer {
  /** Short layer name, e.g. "Client", "API". */
  layer: string
  /** What sits in this layer, e.g. "React SPA". Use "[To verify]" when unknown. */
  title: string
  detail: string
}

export interface PortfolioProject {
  slug: string
  title: string
  /** Optional compact name for chips and diagrams, e.g. "HRIS". */
  shortTitle?: string
  /** What kind of system it is, shown as "Name — Kind" in the project deck. */
  kind?: string
  category: string
  tags: ProjectTag[]
  /** One-sentence description used on cards and in metadata. */
  summary: string
  /** Short challenge → solution statement used on cards. */
  challenge: string
  status: ProjectStatus
  featured: boolean
  /** Set false to hide a project everywhere (lists, routes, sitemap). */
  publish: boolean
  /**
   * False until the owner has confirmed ownership, contribution, scope and
   * stack. Unverified case studies display a transparent draft notice.
   */
  verified: boolean
  /** Private systems show a "Private / Internal Project" label instead of links. */
  visibility: 'public' | 'private'
  technologies: string[]
  /** False when technologies are candidates that still need confirmation. */
  technologiesVerified: boolean

  overview: string
  intendedUsers?: string
  problem?: string
  role?: string[]
  solution?: string
  modules?: ProjectModule[]
  architecture?: ArchitectureLayer[]
  challenges?: string[]
  security?: string[]
  /** Measured results only when evidence exists; otherwise intended benefits. */
  outcomes?: string[]
  outcomesAreMeasured?: boolean
  images?: ProjectImage[]
  /** Screenshot shown on cards and the case study page. Files live in /public/thumbnail. */
  thumbnail?: ProjectThumbnail
  demoUrl?: string
  repositoryUrl?: string
}

export interface ExperienceEntry {
  role: string
  organization: string
  location?: string
  start: string
  /** Omit when unknown; use 'Present' for the current role. */
  end?: string
  summary: string
  responsibilities: string[]
  technologies?: string[]
  /** Set true to show the role in the timeline but leave it out of the years-of-experience total. */
  excludeFromTotal?: boolean
}

export interface EducationEntry {
  credential: string
  institution: string
  start?: string
  end?: string
  notes?: string
}
