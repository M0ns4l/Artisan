import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react'
import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { profile } from '../../data/profile.ts'
import { getPortfolioStats } from '../../lib/stats.ts'
import { SocialIconLinks } from '../contact/SocialLinks.tsx'
import { AnimatedHeadline } from '../ui/AnimatedHeadline.tsx'
import { Eyebrow } from '../ui/Badge.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { CountUp } from '../ui/CountUp.tsx'
import { HeroVisual } from './HeroVisual.tsx'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ delay, children, className }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </m.div>
  )
}

export function HeroSection() {
  const { hero } = profile
  const stats = getPortfolioStats()
  const statItems = [
    { value: stats.yearsExperience, suffix: '+', label: 'Years of experience' },
    { value: stats.yearsBuilding, suffix: '+', label: 'Years building software' },
    { value: stats.systemsBuilt, suffix: '', label: 'In-house systems built' },
  ]

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pt-10 pb-24 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pt-20 lg:pb-32">
        <div>
          <FadeUp delay={0}>
            {profile.currentRole && (
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-4 pl-2 text-[0.8125rem] font-medium text-fg-muted shadow-card">
                <span className="flex size-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <BadgeCheck size={13} aria-hidden="true" />
                </span>
                {profile.availability.show ? profile.availability.label : profile.currentRole}
              </p>
            )}
          </FadeUp>

          <FadeUp delay={0.05}>
            <Eyebrow className="mt-8">{hero.eyebrow}</Eyebrow>
          </FadeUp>

          <AnimatedHeadline
            id="hero-title"
            text={hero.headline}
            delay={0.12}
            className="mt-4 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg sm:text-6xl lg:text-[5rem]"
          />

          <FadeUp delay={0.45}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl sm:leading-relaxed">
              {hero.subheadline}
            </p>
          </FadeUp>

          <FadeUp delay={0.6} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/projects" className="group">
              {hero.primaryCta}
              <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </FadeUp>

          <FadeUp delay={0.7} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}
            </span>
            <SocialIconLinks className="-ml-2" />
          </FadeUp>

          <FadeUp delay={0.85}>
            <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
              {statItems.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-[0.8125rem] leading-snug text-fg-subtle">{s.label}</dt>
                  <dd className="order-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <m.div
          className="order-first lg:order-none"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          <HeroVisual />
        </m.div>
      </div>
    </section>
  )
}
