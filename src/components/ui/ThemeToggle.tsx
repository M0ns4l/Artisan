import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.tsx'
import { cn } from '../../lib/content.ts'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors',
        'hover:border-line-strong hover:bg-surface-2 hover:text-fg',
        className,
      )}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  )
}
