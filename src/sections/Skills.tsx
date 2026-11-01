import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { skillGroups } from '../data/skills.ts'
import { projects } from '../data/projects.ts'
import { experience } from '../data/experience.ts'
import type { Skill } from '../types/index.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { EASE_OUT } from '../lib/motion.ts'
import { cn } from '../lib/cn.ts'

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Whole-token match so "java" finds "Java 21" but not "JavaScript". */
function usesSkill(stack: string[], tokens: string[] = []) {
  return tokens.some((t) => {
    const re = new RegExp(`(^|[^a-z])${escape(t)}([^a-z]|$)`, 'i')
    return stack.some((s) => re.test(s))
  })
}

function useUsage(skill: Skill) {
  return useMemo(
    () => ({
      roles: experience.filter((e) => usesSkill(e.stack, skill.match)),
      work: projects.filter((p) => usesSkill(p.stack, skill.match)),
    }),
    [skill],
  )
}

function Usage({ skill, compact = false }: { skill: Skill; compact?: boolean }) {
  const { roles, work } = useUsage(skill)
  const empty = roles.length === 0 && work.length === 0
  return (
    <div className={cn(compact ? 'mt-5 border-t border-line pt-5' : '')}>
      {!compact && (
        <>
          <p className="eyebrow">Where I’ve used it</p>
          <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">{skill.name}</p>
        </>
      )}
      <p className={cn('flex items-center gap-2 text-sm text-fg-soft', !compact && 'mt-3')}>
        <Dot context={skill.context} />
        {skill.context === 'professional' ? 'Used in professional work' : 'Used in projects and self-study'}
      </p>

      {roles.length > 0 && (
        <div className="mt-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Roles</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {roles.map((r) => (
              <li key={r.id} className="text-fg-soft">
                {r.shortName} <span className="text-muted">· {r.role.split(' — ')[0]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {work.length > 0 && (
        <div className="mt-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Projects</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {work.map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}`} className="inline-flex rounded-full border border-line px-3 py-1 text-xs text-fg-soft transition-colors hover:border-line-strong hover:text-fg">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {empty && <p className="mt-5 text-sm leading-relaxed text-muted">Listed on my résumé — not part of a project shown on this site.</p>}
    </div>
  )
}

function Dot({ context }: { context: Skill['context'] }) {
  return context === 'professional' ? (
    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
  ) : (
    <span className="h-2 w-2 shrink-0 rounded-full border border-violet-soft" aria-hidden="true" />
  )
}

export function Skills() {
  const [selected, setSelected] = useState<Skill>(skillGroups[0].skills[0])

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="06"
          eyebrow="Skills & technologies"
          title="The tools behind the work."
          intro="Grouped by how I actually use them. Select any technology to see the roles and projects where I’ve used it — no made-up percentages."
        />

        <Reveal className="mt-12 flex flex-wrap items-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          <span className="flex items-center gap-2">
            <Dot context="professional" /> Professional work
          </span>
          <span className="flex items-center gap-2">
            <Dot context="projects" /> Projects
          </span>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {skillGroups.map((group, gi) => {
              const holdsSelection = group.skills.includes(selected)
              return (
                <Reveal key={group.id} delay={0.05 * gi} className={cn('surface p-6', gi === 0 && 'sm:col-span-2')}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.015em]">{group.title}</h3>
                    <span className="font-mono text-xs text-muted">{String(group.skills.length).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{group.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const active = skill === selected
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelected(skill)}
                            className={cn(
                              'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-[color,border-color,background-color] duration-300',
                              active ? 'border-fg/60 bg-white/[0.08] text-fg' : 'border-line text-fg-soft hover:border-line-strong hover:text-fg',
                            )}
                          >
                            <Dot context={skill.context} />
                            {skill.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  {/* On smaller screens the usage appears right under the group you tapped. */}
                  {holdsSelection && (
                    <div className="lg:hidden" aria-live="polite">
                      <Usage skill={selected} compact />
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>

          <aside className="hidden lg:col-span-4 lg:block" aria-live="polite">
            <div className="surface sticky top-28 min-h-[22rem] overflow-hidden p-7">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[radial-gradient(closest-side,rgb(136_104_255/0.22),transparent)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="relative"
                >
                  <Usage skill={selected} />
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
