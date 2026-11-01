import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects.ts'
import { SITE_URL } from './src/data/personal.ts'

/** Emits sitemap.xml from the same project data the app renders. */
function sitemap(): Plugin {
  return {
    name: 'portfolio-sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = ['/', ...projects.map((p) => `/work/${p.slug}`)]
      const body = urls
        .map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  build: { target: 'es2022' },
})
