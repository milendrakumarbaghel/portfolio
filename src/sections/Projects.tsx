import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import type { ProjectFilter } from '../types/index.ts'
import { engineeringProjects, filterLabels } from '../data/projects.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { EngineeringCard } from '../components/projects/EngineeringCard.tsx'
import { EASE_OUT } from '../lib/motion.ts'
import { cn } from '../lib/cn.ts'

type Filter = ProjectFilter | 'all'
const FILTERS: Filter[] = ['all', 'ai', 'fullstack', 'hackathon', 'web']

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = useMemo(
    () => engineeringProjects.filter((p) => filter === 'all' || p.filters.includes(filter)),
    [filter],
  )
  const current = visible.filter((p) => !p.archived)
  const earlier = visible.filter((p) => p.archived)
  const count = (f: Filter) => engineeringProjects.filter((p) => f === 'all' || p.filters.includes(f)).length

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="04"
          eyebrow="Engineering & AI projects"
          title="Things I’ve Engineered"
          accent={['Engineered']}
          intro="Backend systems, full-stack applications and AI-assisted tools — several built under hackathon deadlines with real data and real users in mind. Every project links to its source."
        />

        <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-5 mt-14 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <LayoutGroup id="filters">
            {FILTERS.map((f) => {
              const active = f === filter
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'relative flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300',
                    active ? 'border-transparent text-ink-950' : 'border-line text-fg-soft hover:border-line-strong hover:text-fg',
                  )}
                >
                  {active && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{filterLabels[f]}</span>
                  <span className={cn('relative font-mono text-[0.68rem]', active ? 'text-ink-950/60' : 'text-muted')}>{count(f)}</span>
                </button>
              )
            })}
          </LayoutGroup>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {current.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <EngineeringCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {earlier.length > 0 && (
          <motion.div layout className="mt-20">
            <div className="mb-8 flex items-center gap-4">
              <p className="eyebrow shrink-0">Earlier projects</p>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
              <AnimatePresence mode="popLayout" initial={false}>
                {earlier.map((p) => (
                  <motion.li key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
                    <EngineeringCard project={p} compact />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  )
}
