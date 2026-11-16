import { cn } from '../../lib/content.ts'

/**
 * The Artisan wordmark. Black version in light theme, white in dark theme.
 * Decorative here: the surrounding link carries the accessible name.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img src="/logo/wordmark-light.png" alt="" width={412} height={112} className="h-full w-auto dark:hidden" />
      <img src="/logo/wordmark-dark.png" alt="" width={412} height={112} className="hidden h-full w-auto dark:block" />
    </span>
  )
}
