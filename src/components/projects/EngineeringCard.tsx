import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../../types/index.ts'
import { GitHubIcon } from '../ui/BrandIcons.tsx'
import { Tag } from '../ui/Tag.tsx'
import { Tilt } from '../ui/Tilt.tsx'
import { cn } from '../../lib/cn.ts'
import { ProjectCover } from './ProjectCover.tsx'

export function EngineeringCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { links } = project
  const extra = project.stack.length - 5
  return (
    <Tilt max={compact ? 3 : 4} className="h-full">
      <article
        className="surface group relative flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-line-strong"
        data-cursor="View project"
        aria-labelledby={`card-${project.slug}`}
      >
        <div className={cn('relative overflow-hidden border-b border-line', compact ? 'aspect-[16/8]' : 'aspect-[16/10]')}>
          <ProjectCover project={project} sizes="(min-width: 768px) 45vw, 100vw" />
          {project.context && (
            <span className="absolute left-4 top-4 max-w-[80%] truncate rounded-full border border-white/15 bg-ink-950/75 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-fg-soft backdrop-blur-md">
              {project.context.split(' — ')[0].split(',')[0]}
            </span>
          )}
          {project.archived && (
            <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/75 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted backdrop-blur-md">
              Earlier work
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="eyebrow">{project.category}</p>
          <h3 id={`card-${project.slug}`} className="mt-3 font-display text-2xl font-semibold tracking-[-0.025em] md:text-[1.7rem]">
            {/* Stretched link: the whole card opens the case study. */}
            <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 after:z-0 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.problem ?? project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.slice(0, 5).map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Tag className="text-muted">+{extra}</Tag>
              </li>
            )}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 pt-7">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-fg-soft transition-colors group-hover:text-fg" aria-hidden="true">
              Case study
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="relative z-10 flex items-center gap-2">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                  data-cursor="GitHub"
                >
                  <GitHubIcon size={15} />
                </a>
              )}
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
                  aria-label={`${project.title} live demo (opens in a new tab)`}
                  data-cursor="Live demo"
                >
                  Live demo <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Tilt>
  )
}
