import type { EducationEntry, ExperienceEntry } from './types.ts'

/**
 * Work history, most recent first. Consecutive roles at the same
 * organization are grouped automatically into a career progression.
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Programmer',
    organization: 'Mommy Gina Tuna Resources',
    start: '2025',
    end: 'Present',
    summary:
      'Leads the full software lifecycle for in-house business systems — from planning and design through development, testing and production deployment.',
    responsibilities: [
      'Plan, design, develop, test and deploy software applications to production.',
      'Build in-house systems that digitize HR, IT service, field operations and administrative workflows.',
      'Design databases, REST APIs and role-based access for multi-module applications.',
    ],
    technologies: ['React', 'Laravel', 'PHP', 'MySQL', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    role: 'Junior Programmer',
    organization: 'Mommy Gina Tuna Resources',
    start: '2024',
    end: '2025',
    summary: 'Maintained the company’s web applications and enhanced existing features.',
    responsibilities: [
      'Maintained production web applications and resolved reported issues.',
      'Enhanced existing features based on requests from users and departments.',
    ],
    technologies: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    role: 'System Technician',
    organization: 'Mommy Gina Tuna Resources',
    start: '2023',
    end: '2024',
    summary: 'Resolved IT-related problems for employees and provided day-to-day technical support.',
    responsibilities: [
      'Diagnosed and fixed hardware, software and network issues for employees.',
      'Provided hands-on technical support across departments.',
    ],
  },
  {
    role: 'IT Support',
    organization: 'PC Worx Gensan',
    location: 'General Santos City',
    start: '2018',
    end: '2019',
    // Shown in the timeline, not counted in the years-of-experience total.
    excludeFromTotal: true,
    summary: 'Sold IT products and assembled custom computers for customers.',
    responsibilities: [
      'Advised customers on IT products and sold hardware and accessories.',
      'Assembled and configured custom-built computers.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    credential: 'Bachelor of Science in Computer Science',
    institution: 'STI College Gensan',
    end: '2023',
  },
]
