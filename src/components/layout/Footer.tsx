import { ArrowUp } from 'lucide-react'
import { navItems, personal, socials } from '../../data/personal.ts'
import { scrollToTarget } from '../../lib/scroll.ts'
import { SectionLink } from '../ui/SectionLink.tsx'
import { socialIcons } from '../ui/BrandIcons.tsx'
import { Logo } from './SiteHeader.tsx'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="space-y-5 md:col-span-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Software engineer building secure backend systems, full-stack applications and websites for real businesses.
          </p>
          <a href={`mailto:${personal.email}`} className="link-underline inline-block text-sm text-fg-soft hover:text-fg">
            {personal.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <SectionLink to={`#${n.id}`} className="link-underline text-fg-soft hover:text-fg">
                  {n.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2.5 text-sm">
            {socials.map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-fg-soft hover:text-fg">
                    <Icon size={15} className="text-muted transition-colors group-hover:text-fg" />
                    <span className="link-underline">{s.label}</span>
                    <span className="font-mono text-xs text-muted">{s.handle}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
            <li>
              <a href={personal.resume.href} target="_blank" rel="noopener" className="link-underline text-fg-soft hover:text-fg">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {personal.name}. Designed and built with React, TypeScript and Three.js.
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget('#top')}
          className="group inline-flex items-center gap-2 self-start font-mono uppercase tracking-[0.16em] text-fg-soft hover:text-fg sm:self-auto"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
