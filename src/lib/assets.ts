/**
 * Resolves a file from /public against the deploy base path.
 * The site is served from a sub-folder on GitHub Pages ("/Artisan/"), so
 * "/thumbnail/x.png" must become "/Artisan/thumbnail/x.png". Vite only does
 * this automatically inside index.html and CSS, not for paths in JS.
 * Absolute URLs (https:, data:) are returned unchanged.
 */
export function assetUrl(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  return `${base}${path.replace(/^\/+/, '')}`
}
