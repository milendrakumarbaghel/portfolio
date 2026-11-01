import { ArrowDown, Download } from 'lucide-react'
import { personal } from '../data/personal.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { Tilt } from '../components/ui/Tilt.tsx'
import { Img } from '../components/ui/Img.tsx'
import { Button } from '../components/ui/Button.tsx'

const facts = [
  { label: 'Now', value: 'Graduate Engineer Trainee (Java Developer)', sub: 'MPSeDC, Bhopal' },
  { label: 'Education', value: 'MCA, NIT Bhopal (MANIT)', sub: 'Completed May 2026' },
  { label: 'Core stack', value: 'Java · Spring Boot · React', sub: 'MySQL · PostgreSQL · REST' },
  { label: 'Beyond work', value: 'Hackathons & client websites', sub: 'AI tools · live business sites' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Tilt max={6} className="mx-auto max-w-[420px] lg:mx-0">
              <figure className="relative overflow-hidden rounded-[1.4rem] border border-line-strong bg-ink-850 p-2.5">
                <div className="relative overflow-hidden rounded-[1rem]">
                  <Img
                    src={personal.portrait.src}
                    srcSet={personal.portrait.srcSet}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    width={personal.portrait.width}
                    height={personal.portrait.height}
                    alt={personal.portrait.alt}
                    className="aspect-[17/20] w-full object-cover saturate-[0.85]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 mix-blend-overlay [background:linear-gradient(135deg,rgb(136_104_255/0.35),transparent_50%,rgb(75_220_245/0.25))]" aria-hidden="true" />
                </div>
                <figcaption className="flex items-center justify-between px-2 pb-1 pt-3.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  <span>{personal.name}</span>
                  <span>Bhopal, IN</span>
                </figcaption>
              </figure>
            </Tilt>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading id="about-title" index="02" eyebrow="About me" title="Engineering that holds up — and interfaces people enjoy." accent={['enjoy.']} align="stack" />
          <Reveal delay={0.1} className="mt-10 space-y-5 text-lg leading-relaxed text-fg-soft">
            <p>
              I’m Milendra Kumar Baghel, a software engineer and full-stack developer with a strong interest in building scalable backend
              systems, intelligent applications, and visually engaging web experiences.
            </p>
            <p className="text-muted">
              My engineering work spans Java, Spring Boot, React, databases, security, and modern development workflows. Beyond professional
              software development, I enjoy participating in hackathons, exploring practical AI applications, and helping businesses establish a
              stronger digital presence through freelance development.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="bg-ink-950 p-6">
                <dt className="eyebrow flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  {f.label}
                </dt>
                <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-[-0.01em]">{f.value}</dd>
                <dd className="mt-1 text-sm text-muted">{f.sub}</dd>
              </div>
            ))}
          </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button href="#experience" variant="secondary" icon={<ArrowDown size={16} aria-hidden="true" />}>
              My experience
            </Button>
            <Button href={personal.resume.href} download={personal.resume.downloadName} variant="ghost" icon={<Download size={16} aria-hidden="true" />} aria-label="Download résumé (PDF)">
              Download résumé
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
