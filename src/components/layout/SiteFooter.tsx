import { Link } from 'react-router'
import { profile } from '../../data/profile.ts'
import { SocialIconLinks } from '../contact/SocialLinks.tsx'
import { BrandLogo } from './BrandLogo.tsx'
import { navItems } from './navigation.ts'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
        <div className="max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center rounded-md transition-opacity hover:opacity-75"
            aria-label={`${profile.name}, home`}
          >
            <BrandLogo className="h-7" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">{profile.footerStatement}</p>
          <SocialIconLinks className="mt-5 -ml-2" />
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  )
}
