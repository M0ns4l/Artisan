import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { profile } from '../../data/profile.ts'
import { isConfiguredEmail } from '../../lib/content.ts'
import { ContactActions } from '../contact/ContactActions.tsx'
import { SocialIconLinks } from '../contact/SocialLinks.tsx'
import { Eyebrow } from '../ui/Badge.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Reveal } from '../ui/Reveal.tsx'

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-cta-title" className="container-page py-24 lg:py-32">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center sm:px-12 lg:py-24">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
        <div className="relative mx-auto max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-cta-title" className="mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            {profile.contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{profile.contact.body}</p>
          <div className="mt-10 flex flex-col items-center gap-5">
            {isConfiguredEmail(profile.email) ? (
              <ContactActions />
            ) : (
              <ButtonLink to="/contact" className="group">
                Get in Touch
                <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            )}
            <SocialIconLinks />
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-subtle">
              <li className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                {profile.location}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {profile.timezone}
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
