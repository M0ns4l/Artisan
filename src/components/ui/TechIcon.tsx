import { Bot, Code2, Database, DatabaseZap, Server, type LucideIcon } from 'lucide-react'
import {
  siApache,
  siClaude,
  siDotnet,
  siGithub,
  siHtml5,
  siLaragon,
  siLaravel,
  siMysql,
  siPhp,
  siPostgresql,
  siPostman,
  siReact,
  siTailwindcss,
  siXampp,
  type SimpleIcon,
} from 'simple-icons'
import { cn } from '../../lib/content.ts'

/** Brand marks from Simple Icons (CC0); line icons where no brand mark exists. */
const brands: Record<string, SimpleIcon> = {
  php: siPhp,
  html: siHtml5,
  mysql: siMysql,
  laravel: siLaravel,
  react: siReact,
  tailwind: siTailwindcss,
  postgresql: siPostgresql,
  csharp: siDotnet,
  github: siGithub,
  postman: siPostman,
  apache: siApache,
  claude: siClaude,
  xampp: siXampp,
  laragon: siLaragon,
}

const fallbacks: Record<string, LucideIcon> = {
  sql: Database,
  navicat: DatabaseZap,
  vscode: Code2,
  chatgpt: Bot,
  iis: Server,
}

/** Very dark brand colours (e.g. GitHub) would vanish in dark mode — use the text colour instead. */
function isDark(hex: string) {
  const n = Number.parseInt(hex, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.25
}

interface TechIconProps {
  name: string
  size?: number
  /** Render inside a softly tinted tile. */
  tile?: boolean
  className?: string
}

export function TechIcon({ name, size = 20, tile = false, className }: TechIconProps) {
  const brand = brands[name]
  const Fallback = fallbacks[name] ?? Code2
  const color = brand && !isDark(brand.hex) ? `#${brand.hex}` : undefined

  const glyph = brand ? (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={color ?? 'currentColor'}>
      <path d={brand.path} />
    </svg>
  ) : (
    <Fallback size={size} aria-hidden="true" />
  )

  if (!tile) return <span className={cn('inline-flex shrink-0 text-fg', className)}>{glyph}</span>

  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-xl text-fg', !color && 'bg-surface-2', className)}
      style={color ? { backgroundColor: `${color}1a` } : undefined}
    >
      {glyph}
    </span>
  )
}
