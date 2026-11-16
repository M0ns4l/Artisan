import { LazyMotion, MotionConfig, domMax, m } from 'motion/react'
import { Suspense } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { SiteFooter } from '../components/layout/SiteFooter.tsx'
import { SiteHeader } from '../components/layout/SiteHeader.tsx'

function PageFallback() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center">
      <output aria-live="polite" className="font-mono text-xs tracking-widest text-fg-subtle uppercase">
        Loading…
      </output>
    </div>
  )
}

export function RootLayout() {
  const { pathname } = useLocation()
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            <Suspense fallback={<PageFallback />}>
              <m.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </m.div>
            </Suspense>
          </main>
          <SiteFooter />
        </div>
        <ScrollRestoration />
      </MotionConfig>
    </LazyMotion>
  )
}
