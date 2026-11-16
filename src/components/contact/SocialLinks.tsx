import { cn } from '../../lib/content.ts'
import { getSocialLinks } from './contactLinks.tsx'

export function SocialIconLinks({ className }: { className?: string }) {
  const links = getSocialLinks()
  if (links.length === 0) return null
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
            title={link.label}
            className="inline-flex size-9 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}
