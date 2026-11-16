import { useState, type ImgHTMLAttributes } from 'react'
import { profile } from '../../data/profile.ts'
import { assetUrl } from '../../lib/assets.ts'
import { cn } from '../../lib/content.ts'

type ProfilePictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  /** Rendered when the image fails to load. */
  fallbackClassName?: string
}

/** The owner's photo: optimized WebP with the original PNG as fallback, and a monogram if both fail. */
export function ProfilePicture({ className, fallbackClassName, ...props }: ProfilePictureProps) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={cn('flex items-center justify-center bg-surface-2 font-mono text-5xl text-fg-muted', fallbackClassName)}>
        {profile.initials}
      </div>
    )
  }
  return (
    <picture>
      {profile.photo.webp && <source srcSet={assetUrl(profile.photo.webp)} type="image/webp" />}
      <img
        src={assetUrl(profile.photo.src)}
        alt={profile.photo.alt}
        width={900}
        height={900}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className={cn('select-none', className)}
        {...props}
      />
    </picture>
  )
}
