import { Download } from 'lucide-react'
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

/** Downloads the résumé PDF. Renders nothing until `profile.resumeUrl` points at a real file. */
export function ResumeButton({ variant = 'secondary', size = 'md', className }: ResumeButtonProps) {
  if (!isConfiguredHref(profile.resumeUrl)) return null
  const fileName = profile.resumeUrl.split('/').pop() || 'resume.pdf'
  return (
    <ButtonAnchor href={assetUrl(profile.resumeUrl)} download={fileName} variant={variant} size={size} className={className}>
      <Download size={17} aria-hidden="true" />
      Download Résumé
    </ButtonAnchor>
  )
}
