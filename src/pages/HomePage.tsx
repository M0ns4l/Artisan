import { ContactCta } from '../components/home/ContactCta.tsx'
import { ExperiencePreview } from '../components/home/ExperiencePreview.tsx'
import { FeaturedProjects } from '../components/home/FeaturedProjects.tsx'
import { HeroSection } from '../components/home/HeroSection.tsx'
import { SkillsSection, TechStackSection } from '../components/home/SkillsSection.tsx'
import { NicheSection } from '../components/home/NicheSection.tsx'
import { PlatformSection } from '../components/home/PlatformSection.tsx'
import { ProcessSection } from '../components/home/ProcessSection.tsx'
import { profile } from '../data/profile.ts'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'
import { isConfiguredUrl } from '../lib/content.ts'

function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.shortTitle,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: [profile.github, profile.linkedin].filter((u) => isConfiguredUrl(u)),
  }
}

export function HomePage() {
  useDocumentMeta({
    description: `${profile.name} builds enterprise operations software — HRIS, IT service management, field operations and production systems — with React and Laravel.`,
    path: '/',
    type: 'profile',
    jsonLd: profile.structuredData ? personJsonLd() : undefined,
  })

  return (
    <>
      <HeroSection />
      <NicheSection />
      <ExperiencePreview />
      <FeaturedProjects />
      <PlatformSection />
      <TechStackSection />
      <SkillsSection />
      <ProcessSection />
      <ContactCta />
    </>
  )
}
