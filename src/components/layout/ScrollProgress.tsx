import { m, useScroll, useSpring } from 'motion/react'

/** Hairline reading-progress indicator along the bottom of the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
    />
  )
}
