/**
 * Tech stack (with years of hands-on experience), tooling and capabilities.
 * Years are yours to keep current — everything on the page derives from here.
 */
export interface StackItem {
  name: string
  years: number
  category: string
  /** Icon key, see src/components/ui/TechIcon.tsx */
  icon: string
}

export const techStack: StackItem[] = [
  { name: 'PHP', years: 3, category: 'Language', icon: 'php' },
  { name: 'HTML', years: 3, category: 'Markup', icon: 'html' },
  { name: 'SQL', years: 3, category: 'Query language', icon: 'sql' },
  { name: 'MySQL', years: 3, category: 'Database', icon: 'mysql' },
  { name: 'Laravel', years: 2, category: 'Backend framework', icon: 'laravel' },
  { name: 'React', years: 2, category: 'Frontend library', icon: 'react' },
  { name: 'Tailwind CSS', years: 2, category: 'Styling', icon: 'tailwind' },
  { name: 'PostgreSQL', years: 2, category: 'Database', icon: 'postgresql' },
  { name: 'C#', years: 1, category: 'Language', icon: 'csharp' },
]

export interface ToolItem {
  name: string
  icon: string
}

export interface ToolGroup {
  id: 'tools' | 'ai' | 'servers'
  title: string
  description: string
  items: ToolItem[]
}

export const toolGroups: ToolGroup[] = [
  {
    id: 'tools',
    title: 'Tools',
    description: 'Daily development workflow',
    items: [
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Navicat', icon: 'navicat' },
      { name: 'Apache', icon: 'apache' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    description: 'Assistants that speed up delivery',
    items: [
      { name: 'ChatGPT', icon: 'chatgpt' },
      { name: 'Claude Code', icon: 'claude' },
    ],
  },
  {
    id: 'servers',
    title: 'Servers & environments',
    description: 'From local development to production',
    items: [
      { name: 'IIS (Internet Information Services)', icon: 'iis' },
      { name: 'Laragon', icon: 'laragon' },
      { name: 'XAMPP', icon: 'xampp' },
    ],
  },
]

export interface Capability {
  title: string
  description: string
}

/** What you can deliver — the "Skills" section. */
export const capabilities: Capability[] = [
  {
    title: 'Full-stack web development',
    description: 'React interfaces and Laravel back ends, built as one coherent product.',
  },
  {
    title: 'REST API design',
    description: 'Clean, versionable endpoints that front ends and other systems can rely on.',
  },
  {
    title: 'Database design',
    description: 'Relational schemas in MySQL and PostgreSQL that stay accurate as data grows.',
  },
  {
    title: 'Authentication & access control',
    description: 'Secure sign-in, roles and page-level permissions shared across modules.',
  },
  {
    title: 'System analysis',
    description: 'Turning paper forms and manual approvals into clear, buildable requirements.',
  },
  {
    title: 'Testing & deployment',
    description: 'Testing changes and shipping them to production on IIS and Apache.',
  },
  {
    title: 'Hardware integration',
    description: 'Connecting software to weighing scales, biometric devices and GPS trackers.',
  },
  {
    title: 'IT support & troubleshooting',
    description: 'A technician’s background: hardware, networks and end-user support.',
  },
]

export const professionalSkills: string[] = [
  'Problem solving',
  'Working directly with end users',
  'Requirements gathering',
  'Documentation & user manuals',
  'Ownership from idea to production',
]
