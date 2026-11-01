import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { certifications, education, hackathons } from '../data/achievements.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading id="education-title" index="07" eyebrow="Education & achievements" title="Foundations and milestones." />

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={0.08 * i} className="surface relative overflow-hidden p-7 md:p-9">
              <span aria-hidden="true" className="outline-number absolute -bottom-3 right-5 text-[clamp(4.5rem,9vw,7rem)]">
                {e.period.slice(-4)}
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{e.period}</p>
              <h3 className="relative mt-6 max-w-sm font-display text-2xl font-semibold leading-tight tracking-[-0.025em]">{e.degree}</h3>
              <p className="relative mt-2 max-w-md text-fg-soft">{e.institution}</p>
              <p className="relative mt-6 inline-flex rounded-full border border-line px-3 py-1 font-mono text-xs text-fg">{e.grade}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="eyebrow mb-6">Hackathon builds</h3>
            <ul className="divide-y divide-line border-y border-line">
              {hackathons.map((h) => (
                <li key={h.event}>
                  <Link to={`/work/${h.slug}`} className="group flex items-center justify-between gap-6 py-5" data-cursor="View project">
                    <span>
                      <span className="block font-display text-lg font-medium tracking-[-0.01em] transition-colors group-hover:text-fg">{h.project}</span>
                      <span className="mt-0.5 block text-sm text-muted">{h.event}</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="eyebrow mb-6">Certifications</h3>
            <ul className="divide-y divide-line border-y border-line">
              {certifications.map((c) => (
                <li key={c.title}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-5">
                    <span>
                      <span className="block font-display text-lg font-medium tracking-[-0.01em]">{c.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {c.issuer}
                        {c.year && ` · ${c.year}`}
                        {'note' in c && c.note && <span className="text-cyan"> · {c.note}</span>}
                      </span>
                      <span className="sr-only">(view credential, opens in a new tab)</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
