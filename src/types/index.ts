export type ProjectKind = 'client' | 'engineering'

export type ProjectFilter = 'ai' | 'fullstack' | 'hackathon' | 'web'

export interface ProjectImage {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
  caption?: string
}

/** Abstract artwork used when a project has no public screenshot. */
export type GenerativeCover = 'diagnostics' | 'site-plan' | 'policy-flow' | 'route-network'

export interface ProjectLinks {
  github?: string
  live?: string
  demoVideo?: string
}

export interface ProjectSection {
  title: string
  body?: string
  items?: string[]
}

export interface Project {
  slug: string
  kind: ProjectKind
  title: string
  /** One-line hook shown under the title. */
  tagline: string
  /** Human-readable category, e.g. "Restaurant / Hospitality Website". */
  category: string
  filters: ProjectFilter[]
  /** Event or engagement the project was built for. */
  context?: string
  period?: string
  role: string
  team?: string
  summary: string
  problem?: string
  features: string[]
  stack: string[]
  highlights: string[]
  /** Extra case-study sections (architecture, method, principles...). */
  sections?: ProjectSection[]
  /** Honest scope notes shown on the case-study page. */
  notes?: string[]
  links: ProjectLinks
  cover: ProjectImage | { generative: GenerativeCover }
  mobile?: ProjectImage
  gallery?: ProjectImage[]
  /** Accent colour used for glows and details around the project. */
  accent: string
  /** Older projects render lower in the hierarchy. */
  archived?: boolean
}

export interface ExperienceEntry {
  id: string
  organisation: string
  shortName: string
  role: string
  period: string
  location: string
  summary: string
  points: string[]
  stack: string[]
  details?: string[]
  link?: { label: string; href: string }
}

export type SkillContext = 'professional' | 'projects'

export interface Skill {
  name: string
  context: SkillContext
  /** Lower-case tokens matched against project stacks to find where it was used. */
  match?: string[]
}

export interface SkillGroup {
  id: string
  title: string
  blurb: string
  skills: Skill[]
}

export interface NavItem {
  id: string
  label: string
  /** Section ids that light up this nav item. */
  sections: string[]
}
