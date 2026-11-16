import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { projects } from './src/data/projects.ts'


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

/**
 * GitHub Pages has no SPA fallback: a direct visit or refresh on
 * /Artisan/projects/hris would get GitHub's 404 page. Serving a copy of
 * index.html as 404.html lets the app load and route on every URL.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL), githubPagesSpaFallback()],
    // GitHub Pages project site: https://m0ns4l.github.io/Artisan/
    base: '/Artisan/',
  }
})
