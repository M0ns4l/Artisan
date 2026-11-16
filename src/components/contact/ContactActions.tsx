import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../../data/profile.ts'
import { isConfiguredEmail } from '../../lib/content.ts'
import { ButtonAnchor } from '../ui/Button.tsx'
import { CopyEmailButton } from './CopyEmailButton.tsx'
import { getSocialLinks } from './contactLinks.tsx'

interface ContactActionsProps {
  email?: string
}

/**
 * Primary contact controls. Shows a mailto link + copy button when an email
 * is configured; otherwise an explicit "being finalized" state — never a dead link.
 */
export function ContactActions({ email = profile.email }: ContactActionsProps) {
  if (!isConfiguredEmail(email)) {
    return (
      <div className="rounded-lg border border-dashed border-line-strong p-5 text-sm text-fg-muted" role="note">
        <p className="font-medium text-fg">Contact details are being finalized.</p>
        <p className="mt-1">A direct email address will appear here shortly.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonAnchor href={`mailto:${email}`}>
        <Mail size={17} aria-hidden="true" />
        Email Me
      </ButtonAnchor>
      <CopyEmailButton email={email} />
    </div>
  )
}

/** Full list of configured channels with visible labels (used on /contact). */
export function ContactChannelList() {
  const links = getSocialLinks()
  if (links.length === 0) return null
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-fg-muted group-hover:text-accent">{link.icon}</span>
              <span className="shrink-0 font-medium text-fg">{link.label}</span>
              <span className="hidden min-w-0 truncate text-sm text-fg-subtle sm:block">{link.href.replace(/^mailto:|^https?:\/\//, '')}</span>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-fg-subtle group-hover:text-accent" />
            {link.external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
