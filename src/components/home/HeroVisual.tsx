import { GraduationCap } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { education } from '../../data/experience.ts'
import { cn } from '../../lib/content.ts'
import { ProfilePicture } from '../ui/ProfilePicture.tsx'
import { TechIcon } from '../ui/TechIcon.tsx'

const ease = [0.22, 1, 0.36, 1] as const
const coreStack = ['react', 'laravel', 'php', 'mysql']

/**
 * The portrait box sits over the circle and is taller than it. Everything
 * above the circle's centre line stays visible, so the head rises out of the
 * circle; below that line the photo is clipped to the circle.
 * Circle centre = 61.54% down the box (box height = 1.3 × circle diameter).
 */
const popOutMask = [
  'linear-gradient(#000, #000) 0 0 / 100% 61.54% no-repeat',
  'radial-gradient(circle closest-side at 50% 61.54%, #000 99.4%, transparent 100%) 0 0 / 100% 100% no-repeat',
].join(', ')

/** A glass chip that enters once, then drifts very slowly (off for reduced motion). */
function FloatingChip({
  children,
  className,
  delay,
  drift,
}: {
  children: ReactNode
  className?: string
  delay: number
  drift: number
}) {
  const reduce = useReducedMotion()
  return (
    <m.div
      className={cn('absolute z-20', className)}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      <m.div
        animate={reduce ? undefined : { y: [0, drift, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.8 }}
        className="rounded-2xl border border-white/60 bg-surface/85 shadow-raised backdrop-blur-xl dark:border-line"
      >
        {children}
      </m.div>
    </m.div>
  )
}

/**
 * Circular portrait with soft concentric rings; the transparent photo rises
 * out of the top of the circle. Chips sit on the shoulder line and below the
 * circle so they never cover the face.
 */
export function HeroVisual() {
  const degree = education[0]

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[20rem] sm:max-w-[24rem] lg:mr-2 lg:max-w-[27rem]">
      {/* Circle region (bottom square of the box) */}
      <div className="absolute inset-x-0 bottom-0 aspect-square">
        <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-accent-soft blur-3xl" />
        <m.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-dashed border-line-strong"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        />
        <m.div
          aria-hidden="true"
          className="absolute inset-[4.5%] rounded-full border border-line"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        />
        {/* Backdrop disc */}
        <m.div
          aria-hidden="true"
          className="absolute inset-[9%] rounded-full border border-line bg-[color-mix(in_oklab,var(--accent)_9%,var(--surface))] shadow-raised"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease }}
        />
      </div>

      {/* Portrait, popping out of the disc */}
      <m.div
        className="absolute z-10 overflow-hidden"
        style={{
          left: '9%',
          width: '82%',
          bottom: '7.5%',
          height: '88.83%',
          mask: popOutMask,
          WebkitMask: popOutMask,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease }}
      >
        <ProfilePicture
          fetchPriority="high"
          className="absolute bottom-0 left-1/2 w-[120%] max-w-none -translate-x-1/2"
          fallbackClassName="absolute inset-x-0 bottom-0 aspect-square rounded-full"
        />
      </m.div>

      {/* Core stack chip: right shoulder */}
      <FloatingChip className="top-[66%] -right-1 sm:-right-6" delay={1.1} drift={-5}>
        <div className="px-3.5 py-3">
          <p className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase">Core stack</p>
          <ul className="mt-2 flex items-center gap-1.5" aria-label="Core stack: React, Laravel, PHP, MySQL">
            {coreStack.map((icon) => (
              <li key={icon}>
                <TechIcon name={icon} size={16} tile className="size-8 rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      </FloatingChip>

      {/* Education chip: below the circle, left */}
      {degree && (
        <FloatingChip className="-bottom-3 -left-1 sm:-left-6" delay={1.3} drift={5}>
          <div className="flex items-center gap-3 px-3.5 py-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <GraduationCap size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.8125rem] font-semibold text-fg">BS Computer Science</p>
              <p className="text-xs text-fg-subtle">
                {degree.institution}
                {degree.end ? ` · ${degree.end}` : ''}
              </p>
            </div>
          </div>
        </FloatingChip>
      )}
    </div>
  )
}
