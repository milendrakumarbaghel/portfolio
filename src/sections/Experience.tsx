import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { experience } from '../data/experience.ts'
import type { ExperienceEntry } from '../types/index.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { SectionLink } from '../components/ui/SectionLink.tsx'
import { Tag } from '../components/ui/Tag.tsx'
import { EASE_OUT } from '../lib/motion.ts'

function Entry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `exp-${entry.id}-details`
  return (
    <Reveal as="li" className="relative grid gap-6 pl-10 md:grid-cols-12 md:gap-10 md:pl-0">
      {/* Node on the timeline */}
      <span aria-hidden="true" className="absolute left-[3px] top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-strong bg-ink-950 md:left-[calc(25%-7px)]">
        <span className={`h-[5px] w-[5px] rounded-full ${index === 0 ? 'bg-cyan' : 'bg-violet-soft'}`} />
      </span>

      <div className="md:col-span-3 md:pr-10 md:text-right">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-soft">{entry.period}</p>
        <p className="mt-1 text-sm text-muted">{entry.location}</p>
      </div>

      <div className="md:col-span-9 md:pl-10">
        <p className="eyebrow">{entry.shortName}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] md:text-[1.75rem]">{entry.role}</h3>
        <p className="mt-1 text-fg-soft">{entry.organisation}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>
        <ul className="mt-5 max-w-2xl space-y-2.5 text-[0.95rem] text-fg-soft">
          {entry.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-violet-soft" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        {entry.details && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-soft hover:text-fg"
            >
              {open ? 'Hide' : 'Show'} technical details
              <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 max-w-2xl space-y-2 border-l border-line pl-5 text-sm text-muted">
                    {entry.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {entry.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        {entry.link && (
          <SectionLink to={entry.link.href as `#${string}`} className="link-underline mt-6 inline-block text-sm text-fg">
            {entry.link.label} →
          </SectionLink>
        )}
      </div>
    </Reveal>
  )
}

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="03"
          eyebrow="Professional experience"
          title="Where I’ve been building."
          intro="From e-Governance systems for public works departments to secure services during my internship and websites for independent businesses."
        />

        <div className="relative mt-20">
          <div aria-hidden="true" className="absolute bottom-0 left-[10px] top-2 w-px bg-line md:left-1/4">
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-cyan via-violet to-violet/0" style={{ scaleY: progress }} />
          </div>
          <ol ref={ref} className="space-y-20 md:space-y-24">
            {experience.map((e, i) => (
              <Entry key={e.id} entry={e} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
