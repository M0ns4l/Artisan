/** A value like "[YOUR_EMAIL]" or "[To verify]" is an unconfirmed placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true
  const v = value.trim()
  return v.length === 0 || (v.startsWith('[') && v.endsWith(']'))
}

/** Absolute http(s) URL that is not a placeholder. */
export function isConfiguredUrl(value: string | undefined | null): value is string {
  if (isPlaceholder(value)) return false
  try {
    const url = new URL(value as string)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

/** Site-relative path (e.g. "/resume.pdf") or absolute URL. */
export function isConfiguredHref(value: string | undefined | null): value is string {
  if (isPlaceholder(value)) return false
  return (value as string).startsWith('/') || isConfiguredUrl(value)
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isConfiguredEmail(value: string | undefined | null): value is string {
  return !isPlaceholder(value) && EMAIL_PATTERN.test((value as string).trim())
}

/** Strips brackets for display: "[Start date]" → "Start date". */
export function placeholderLabel(value: string): string {
  return value.trim().replace(/^\[/, '').replace(/\]$/, '')
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
