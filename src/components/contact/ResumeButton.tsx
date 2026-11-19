import { FileText } from 'lucide-react'
import { profile } from '../../data/profile.ts'
import { assetUrl } from '../../lib/assets.ts'
import { isConfiguredHref } from '../../lib/content.ts'
import { ButtonAnchor } from '../ui/Button.tsx'
import type { ButtonSize, ButtonVariant } from '../ui/buttonStyles.ts'

interface ResumeButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Opens the résumé PDF in a new tab. Renders nothing until `profile.resumeUrl` points at a real file. */
export function ResumeButton({ variant = 'secondary', size = 'md', className }: ResumeButtonProps) {
  if (!isConfiguredHref(profile.resumeUrl)) return null
  return (
    <ButtonAnchor href={assetUrl(profile.resumeUrl)} external variant={variant} size={size} className={className}>
      <FileText size={17} aria-hidden="true" />
      View Résumé
    </ButtonAnchor>
  )
}
