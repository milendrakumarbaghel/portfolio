import { ArrowUpRight, Building2, Code2, Component, Layers, RefreshCcw, Sparkles, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { personal } from '../data/personal.ts'
import { services } from '../data/achievements.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { Button } from '../components/ui/Button.tsx'
import { SectionLink } from '../components/ui/SectionLink.tsx'
import { cn } from '../lib/cn.ts'

const icons: Record<(typeof services)[number]['id'], LucideIcon> = {
  business: Building2,
  hospitality: UtensilsCrossed,
  react: Component,
  fullstack: Layers,
  motion: Sparkles,
  redesign: RefreshCcw,
  ui: Code2,
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-x-clip py-28 md:py-40">
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[50vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(136_104_255/0.12),transparent)]" />
      <div className="container-x">
        <SectionHeading
          id="services-title"
          index="05"
          eyebrow="Freelance services"
          title="Have an idea? Let’s build something remarkable."
          accent={['remarkable.']}
          intro="I design and develop websites and web applications for businesses and individuals. Tell me what you’re planning and we can talk through scope, timeline and the right approach."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[s.id]
            return (
              <Reveal as="li" key={s.id} delay={0.05 * i} className={cn((i === 0 || i === 3) && 'lg:col-span-2', i === 6 && 'sm:col-span-2 lg:col-span-1')}>
                <div className="surface group relative h-full overflow-hidden p-6 transition-colors duration-500 hover:border-line-strong md:p-7">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line text-violet-soft transition-colors duration-500 group-hover:text-cyan">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            )
          })}
          <Reveal as="li" delay={0.4} className="sm:col-span-2 lg:col-span-3">
            <SectionLink
              to="#contact"
              className="group flex h-full flex-col justify-between gap-6 rounded-[1.25rem] bg-fg p-6 text-ink-950 transition-colors hover:bg-white md:flex-row md:items-end md:p-7"
              data-cursor="Let’s talk"
            >
              <span className="max-w-md font-display text-2xl font-semibold leading-snug tracking-[-0.02em]">
                Not sure what you need yet? That’s a good place to start.
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Share the idea
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </SectionLink>
          </Reveal>
        </ul>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Button href="#freelance" variant="secondary">
            View client work
          </Button>
          <Button href="#contact" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
            Discuss a project
          </Button>
          <Button href={`mailto:${personal.email}?subject=${encodeURIComponent('Website project enquiry')}`} variant="ghost">
            Email me directly
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
