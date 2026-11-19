/**
 * Public profile content. Edit this file to update your name, links and copy.
 * Values in [BRACKETS] are placeholders: the related links/buttons stay hidden
 * until you replace them with real values.
 */
const name = 'Monsal Dawa'

export const profile = {
  name,
  initials: 'MD',
  title: 'Senior Programmer · Full-Stack Software Engineer',
  shortTitle: 'Senior Programmer',
  /** Current employer, shown as a credibility badge in the hero. Empty to hide. */
  currentRole: 'Senior Programmer at Mommy Gina Tuna Resources',
  location: 'General Santos City, Philippines',
  timezone: 'Philippine Time (UTC+8)',

  email: 'artisanlaracast@gmail.com',
  github: 'https://github.com/M0ns4l',
  linkedin: 'https://www.linkedin.com/in/monsal-dawa-4273b2312/',
  facebook: 'https://www.facebook.com/Somnalistic',
  instagram: '[YOUR_INSTAGRAM_URL]',
  /** Résumé PDF in /public (path is case-sensitive). Leave empty to hide every résumé button. */
  resumeUrl: '/Resume/Monsal_Dawa_Resume.pdf',

  /** Transparent-background PNG; the WebP is a web-optimized copy (npm run assets:profile). */
  photo: {
    src: '/Profile/profile.png',
    webp: '/Profile/profile.webp',
    alt: 'Portrait of Monsal Dawa',
  },

  /** Only shown when `show` is true — availability is never claimed automatically. */
  availability: {
    show: false,
    label: 'Open to senior engineering roles',
  },

  /** Emit JSON-LD Person data. Enable once name, title and links are verified. */
  structuredData: true,

  hero: {
    eyebrow: 'Full-Stack Engineer',
    headline: `Hi, I’m ${name}.`,
    subheadline:
      'A full-stack engineer who loves solving real-world problems. I build web applications — with a focus on corporate, in-house systems that organizations run on every day.',
    primaryCta: 'Explore My Work',
    secondaryCta: 'Get in Touch',
  },

  footerStatement: 'Building dependable business software, one well-considered workflow at a time.',

  about: {
    intro:
      'I’m a full-stack engineer who loves solving real-world problems. I build web applications, with a focus on the corporate, in-house systems organizations run on every day.',
    paragraphs: [
      'My work sits where operations meet software. I take processes that live in spreadsheets, paper forms and long email threads and turn them into web applications people can rely on—clear to use, careful with data and straightforward to maintain.',
      'I started in IT support in 2018, selling hardware and building computers, and graduated with a BS in Computer Science from STI College Gensan in 2023. Since then I’ve moved from system technician to junior programmer to senior programmer — so I understand systems from the hardware and the help desk all the way up to the database and the interface.',
      'On the frontend I work with React and Tailwind CSS to build interfaces that stay calm under complexity. On the backend I build with PHP, Laravel, MySQL and PostgreSQL, designing REST APIs, authentication and authorization so the rules of the business are enforced where they belong.',
      'I care about the long life of software: code that the next engineer can read, permissions that hold up to scrutiny and interfaces that respect the people using them every day.',
    ],
    problems: [
      {
        title: 'Fragmented internal tools',
        description: 'Bringing separate systems together behind consistent, role-aware access.',
      },
      {
        title: 'Manual, paper-heavy workflows',
        description: 'Turning requests, approvals and records into trackable digital processes.',
      },
      {
        title: 'Complex organizational data',
        description: 'Modeling hierarchies, records and relationships so they stay accurate as they grow.',
      },
      {
        title: 'Access and accountability',
        description: 'Designing authentication, authorization and history so actions are attributable.',
      },
    ],
    principles: [
      {
        title: 'Security by default',
        description:
          'Authorization is enforced on the server, inputs are validated at the boundary and sensitive data is exposed only to those who need it.',
      },
      {
        title: 'Maintainability',
        description:
          'Clear module boundaries, predictable conventions and code written for the engineer who inherits it.',
      },
      {
        title: 'Performance',
        description:
          'Efficient queries, sensible pagination and interfaces that stay responsive as data volumes grow.',
      },
      {
        title: 'Accessibility',
        description:
          'Semantic markup, keyboard support and readable contrast, so internal tools work for everyone who depends on them.',
      },
      {
        title: 'Pragmatism',
        description:
          'Choosing the simplest design that solves the real problem, and leaving room to evolve when requirements change.',
      },
    ],
    currentFocus: [
      'Enterprise web applications and internal business systems',
      'API design, authentication and authorization patterns',
      'Workflow automation for approval-driven processes',
    ],
    exploring: ['ASP.NET Core / C#', 'Playwright for end-to-end testing', 'Infrastructure and networking tools'],
  },

  /** Purpose & target market (home page). */
  purpose: {
    statement:
      'My purpose is to replace manual, paper-based work with reliable software — so the people who run an organization spend their time on decisions, not paperwork.',
    audience: [
      { title: 'Corporate & enterprise teams', description: 'Organizations that need dependable in-house systems built around how they actually work.' },
      { title: 'HR, IT & operations departments', description: 'Teams buried in forms, approvals, spreadsheets and follow-ups.' },
      { title: 'Manufacturing & production', description: 'Operations where weights, stages and inventory must be tracked accurately.' },
      { title: 'Hiring managers', description: 'Teams looking for an engineer who can own a system from idea to production.' },
    ],
  },

  contact: {
    heading: 'Let’s build something dependable.',
    body: 'I’m happy to talk about engineering roles, internal systems that need rethinking or collaborations on well-scoped web applications. Email is the best way to reach me.',
  },
} as const

export type Profile = typeof profile
