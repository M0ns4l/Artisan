import { useEffect } from 'react'
import { profile } from '../data/profile.ts'

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '')

interface DocumentMeta {
  /** Page title without the site suffix. Omit on the home page. */
  title?: string
  description: string
  /** Route path used for the canonical URL, e.g. "/projects". */
  path: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  jsonLd?: Record<string, unknown>
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Route-level metadata. Updates existing tags in place (no duplicates).
 * Canonical/og:url are only emitted when VITE_SITE_URL is configured.
 */
export function useDocumentMeta({ title, description, path, type = 'website', noIndex, jsonLd }: DocumentMeta) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.title}`
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow')

    const canonical = SITE_URL ? `${SITE_URL}${path === '/' ? '/' : path}` : null
    upsertLink('canonical', canonical)
    if (canonical) {
      upsertMeta('property', 'og:url', canonical)
      upsertMeta('property', 'og:image', `${SITE_URL}/og-image.png`)
      upsertMeta('name', 'twitter:image', `${SITE_URL}/og-image.png`)
    }

    const existing = document.getElementById('json-ld')
    existing?.remove()
    if (jsonLdString) {
      const script = document.createElement('script')
      script.id = 'json-ld'
      script.type = 'application/ld+json'
      script.textContent = jsonLdString
      document.head.appendChild(script)
    }
  }, [title, description, path, type, noIndex, jsonLdString])
}
