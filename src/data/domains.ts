/**
 * The niche: operational domains you build for. Each links to real case
 * studies by slug, so the home page always points at actual work.
 */
export interface Domain {
  id: 'people' | 'it' | 'field' | 'production'
  title: string
  description: string
  projects: string[]
}

export const domains: Domain[] = [
  {
    id: 'people',
    title: 'People & HR',
    description: 'Employee records, attendance, leave routing, evaluations, clinic and ID issuance.',
    projects: ['hris', 'id-generator'],
  },
  {
    id: 'it',
    title: 'IT Service & Operations',
    description: 'Service requests, approvals, asset accountability, inventory and live monitoring.',
    projects: ['cictd-helpdesk', 'it-core'],
  },
  {
    id: 'field',
    title: 'Field & Fleet',
    description: 'Official business trips, live route maps, GPS-tracked vehicles and exit passes.',
    projects: ['official-business-management-system', 'cictd-helpdesk'],
  },
  {
    id: 'production',
    title: 'Production & Hardware',
    description: 'Stage-by-stage production tracking with live weighing-scale and device integration.',
    projects: ['porktrack', 'truck-scale'],
  },
]
