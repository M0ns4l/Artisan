import type { ProjectThumbnail } from '../../data/types.ts'
import { cn } from '../../lib/content.ts'

interface ThumbnailImageProps {
  thumbnail: ProjectThumbnail
  alt: string
  className?: string
  eager?: boolean
}

/** Project screenshot (PNG). */
export function ThumbnailImage({ thumbnail, alt, className, eager = false }: ThumbnailImageProps) {
  return (
    <img
      src={thumbnail.src}
      alt={alt}
      width={1672}
      height={941}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={cn('h-full w-full object-cover select-none', className)}
    />
  )
}
