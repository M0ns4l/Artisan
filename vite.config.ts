import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { projects } from './src/data/projects.ts'

/**
 * Emits robots.txt (always) and sitemap.xml (only when VITE_SITE_URL is set).
 * A sitemap needs absolute URLs, so we never invent a production domain.
 */
function seoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl?.replace(/\/+$/, '')
      const robots = ['User-agent: *', 'Allow: /']
      if (base) robots.push('', `Sitemap: ${base}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (!base) return
      const paths = [
        '/',
        '/about',
        '/projects',
        '/experience',
        '/contact',
        ...projects.filter((p) => p.publish).map((p) => `/projects/${p.slug}`),
      ]
      const urls = paths.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL)],
    base: '/Artisan/',
  }
})
