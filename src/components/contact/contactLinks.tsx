import { FileText, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { profile } from '../../data/profile.ts'
import { isConfiguredEmail, isConfiguredHref, isConfiguredUrl } from '../../lib/content.ts'
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/BrandIcons.tsx'

export interface SocialLink {
  label: string
  href: string
  icon: ReactNode
  external: boolean
}

/** Only links backed by real, configured values are returned. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = []
  if (isConfiguredEmail(profile.email))
    links.push({ label: 'Email', href: `mailto:${profile.email}`, icon: <Mail size={18} aria-hidden="true" />, external: false })
  if (isConfiguredUrl(profile.github))
    links.push({ label: 'GitHub', href: profile.github, icon: <GithubIcon />, external: true })
  if (isConfiguredUrl(profile.linkedin))
    links.push({ label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinIcon />, external: true })
  if (isConfiguredUrl(profile.facebook))
    links.push({ label: 'Facebook', href: profile.facebook, icon: <FacebookIcon />, external: true })
  if (isConfiguredUrl(profile.instagram))
    links.push({ label: 'Instagram', href: profile.instagram, icon: <InstagramIcon />, external: true })
  if (isConfiguredHref(profile.resumeUrl))
    links.push({ label: 'Résumé', href: profile.resumeUrl, icon: <FileText size={18} aria-hidden="true" />, external: true })
  return links
}
