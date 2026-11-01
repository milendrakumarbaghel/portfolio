import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects.ts'
import { SITE_URL, personal } from '../data/personal.ts'
import type { Project, ProjectImage } from '../types/index.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { EASE_OUT } from '../lib/motion.ts'
import { MaskText } from '../components/animations/MaskText.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { Button } from '../components/ui/Button.tsx'
import { GitHubIcon } from '../components/ui/BrandIcons.tsx'
import { Img } from '../components/ui/Img.tsx'
import { Tag } from '../components/ui/Tag.tsx'
import { BrowserFrame, PhoneFrame } from '../components/projects/DeviceFrames.tsx'
import { ProjectCover } from '../components/projects/ProjectCover.tsx'
import NotFoundPage from './NotFoundPage.tsx'

function JsonLd({ project }: { project: Project }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': project.kind === 'client' ? 'CreativeWork' : 'SoftwareSourceCode',
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/work/${project.slug}`,
    author: { '@type': 'Person', name: personal.name, url: SITE_URL },
    ...(project.links.github && { codeRepository: project.links.github }),
    ...(project.links.live && { sameAs: project.links.live }),
    keywords: project.stack.join(', '),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function Meta({ project }: { project: Project }) {
  const host = project.links.live?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const rows = (
    project.kind === 'client'
      ? [
          ['Role', project.role],
          ['Client', project.title],
          ['Live at', host],
        ]
      : [
          ['Role', project.role],
          ['Built for', project.context],
          ['Team', project.team],
          ['Timeline', project.period],
        ]
  ).filter((r): r is [string, string] => Boolean(r[1]))
  const cols = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[rows.length]
  return (
    <dl className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${cols}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="bg-ink-950 p-5">
          <dt className="eyebrow">{k}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-fg-soft">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
      <div className="md:col-span-4">
        <p className="font-mono text-xs text-violet-soft">{index}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </Reveal>
  )
}

function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className={numbered ? 'grid gap-4 sm:grid-cols-2' : 'space-y-3'}>
      {items.map((item, i) => (
        <li key={item} className={numbered ? 'surface p-5 text-[0.95rem] leading-relaxed text-fg-soft' : 'flex gap-3 leading-relaxed text-fg-soft'}>
          {numbered ? (
            <span className="mb-3 block font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
          ) : (
            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-violet-soft" aria-hidden="true" />
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}

function HeroMedia({ project }: { project: Project }) {
  const cover = project.cover
  if (project.kind === 'client' && !('generative' in cover)) {
    return (
      <div className="relative">
        <BrowserFrame url={project.links.live!} image={cover} priority sizes="(min-width: 1280px) 1200px, 100vw" />
        {project.mobile && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.5 }}
            className="absolute -bottom-10 right-4 hidden w-[18%] min-w-[140px] md:block"
          >
            <PhoneFrame image={project.mobile} />
          </motion.div>
        )}
      </div>
    )
  }
  return (
    <div className="overflow-hidden rounded-[14px] border border-line-strong bg-ink-850 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
      <div className="aspect-[16/10]">
        <ProjectCover project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
      </div>
    </div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  usePageMeta({
    title: project ? `${project.title} — Case study · Milendra Kumar Baghel` : 'Project not found — Milendra Kumar Baghel',
    description: project?.summary ?? 'This project does not exist.',
    path: `/work/${slug ?? ''}`,
    image: project && !('generative' in project.cover) && project.cover.srcSet ? project.cover.src : undefined,
  })

  if (!project) return <NotFoundPage />

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]
  const backHash = project.kind === 'client' ? '#freelance' : '#work'
  const gallery: ProjectImage[] = project.gallery ?? []
  let n = 0
  const idx = () => String(++n).padStart(2, '0')

  return (
    <article id="top" className="pb-10 pt-28 md:pt-36">
      <JsonLd project={project} />
      <div className="container-x">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
          <Link to={`/${backHash}`} className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-fg">
            <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            {project.kind === 'client' ? 'All client work' : 'All projects'}
          </Link>
        </motion.div>

        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
              {project.category}
            </p>
            <h1 className="display-xl mt-5">
              <MaskText immediate text={project.title} delay={0.1} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }} className="mt-5 max-w-2xl font-display text-xl text-fg-soft md:text-2xl">
              {project.tagline}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {project.links.live && (
              <Button href={project.links.live} external icon={<ArrowUpRight size={16} aria-hidden="true" />}>
                {project.kind === 'client' ? 'Visit live website' : 'Live demo'}
              </Button>
            )}
            {project.links.github && (
              <Button href={project.links.github} external variant="secondary" icon={<GitHubIcon size={15} />}>
                Source on GitHub
              </Button>
            )}
            {project.links.demoVideo && (
              <Button href={project.links.demoVideo} external variant="ghost" icon={<PlayCircle size={16} aria-hidden="true" />}>
                Demo video
              </Button>
            )}
          </motion.div>
        </header>

        <motion.div
          className="mt-14"
          initial={{ clipPath: 'inset(8% 6% 8% 6% round 24px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
          transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.25 }}
        >
          <HeroMedia project={project} />
        </motion.div>

        <div className="mt-20">
          <Meta project={project} />
        </div>

        <div className="mt-16">
          <Block index={idx()} title="Overview">
            <p className="text-lg leading-relaxed text-fg-soft">{project.summary}</p>
          </Block>

          {project.problem && (
            <Block index={idx()} title={project.kind === 'client' ? 'The brief' : 'The problem'}>
              <p className="text-lg leading-relaxed text-fg-soft">{project.problem}</p>
            </Block>
          )}

          <Block index={idx()} title={project.kind === 'client' ? 'What’s on the site' : 'What it does'}>
            <List items={project.features} numbered />
          </Block>

          <Block index={idx()} title={project.kind === 'client' ? 'Design & build' : 'Technical highlights'}>
            <List items={project.highlights} />
          </Block>

          {project.sections?.map((s) => (
            <Block key={s.title} index={idx()} title={s.title}>
              {s.body && <p className="mb-5 text-lg leading-relaxed text-fg-soft">{s.body}</p>}
              {s.items && <List items={s.items} />}
            </Block>
          ))}

          <Block index={idx()} title={project.kind === 'client' ? 'Built with' : 'Technologies'}>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t}>
                  <Tag className="px-3.5 py-1.5 text-xs">{t}</Tag>
                </li>
              ))}
            </ul>
          </Block>

          {gallery.length > 0 && (
            <Block index={idx()} title="Screens">
              <div className="grid gap-5">
                {gallery.map((img) => (
                  <figure key={img.src}>
                    <div className="overflow-hidden rounded-xl border border-line bg-ink-850">
                      <Img src={img.src} srcSet={img.srcSet} sizes="(min-width: 1024px) 60vw, 100vw" width={img.width} height={img.height} alt={img.alt} className="w-full" />
                    </div>
                    {img.caption && <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Block>
          )}

          {project.notes && (
            <Reveal className="mt-4 flex gap-4 rounded-2xl border border-line bg-white/[0.02] p-6">
              <Info size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
              <div className="space-y-2 text-sm leading-relaxed text-fg-soft">
                {project.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Link
          to={`/work/${next.slug}`}
          className="group mt-24 block border-t border-line pt-12 md:mt-32"
          data-cursor="Next project"
        >
          <p className="eyebrow">Next project</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <p className="display-lg transition-colors duration-500 group-hover:text-gradient">{next.title}</p>
            <ArrowRight size={40} aria-hidden="true" className="mb-2 shrink-0 text-muted transition-all duration-500 group-hover:translate-x-2 group-hover:text-fg" />
          </div>
          <p className="mt-3 text-muted">{next.category}</p>
        </Link>
      </div>
    </article>
  )
}
