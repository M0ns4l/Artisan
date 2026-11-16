import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading.tsx'

/** Top-of-page heading block used by inner pages (renders the page's single H1). */
export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-line">
      <div className="container-page pt-14 pb-12 sm:pt-20 sm:pb-16">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </div>
  )
}
