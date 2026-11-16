import { cn } from '../../lib/content.ts'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,opacity,transform] duration-200 select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-ink-fg shadow-card hover:opacity-90 active:translate-y-px',
  secondary:
    'border border-line-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2 active:translate-y-px',
  ghost: 'text-fg-muted hover:bg-surface-2 hover:text-fg',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-12 px-6 text-[0.9375rem]',
  sm: 'h-9 px-4 text-sm',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
