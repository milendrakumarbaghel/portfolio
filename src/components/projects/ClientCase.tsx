import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project, ProjectImage } from '../../types/index.ts'
import { EASE_OUT } from '../../lib/motion.ts'
import { cn } from '../../lib/cn.ts'
import { Button } from '../ui/Button.tsx'
import { Reveal } from '../animations/Reveal.tsx'
import { Img } from '../ui/Img.tsx'
import { BrowserFrame, PhoneFrame } from './DeviceFrames.tsx'

/** Editorial, scroll-driven case study for a live client website. */
export function ClientCase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const frameY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -110])
  const tilt = useTransform(scrollYProgress, [0, 0.45, 1], [9, 0, -5])
  const reversed = index % 2 === 1
  const cover = project.cover as ProjectImage
  const live = project.links.live!
  const number = String(index + 1).padStart(2, '0')

  return (
    <article ref={ref} aria-labelledby={`${project.slug}-title`} className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Media column */}
      <div className={cn('relative lg:col-span-7', reversed && 'lg:order-2')}>
        <div
          aria-hidden="true"
          className="absolute -inset-[12%] -z-10 opacity-60 blur-2xl"
          style={{ background: `radial-gradient(closest-side, ${project.accent}33, transparent)` }}
        />
        <Link to={`/work/${project.slug}`} className="group block" data-cursor="View case study" aria-label={`${project.title} — read the case study`}>
          <motion.div
            style={{ rotateX: tilt, y: frameY, transformPerspective: 1800 }}
            initial={{ clipPath: 'inset(10% 8% 10% 8% round 28px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
          >
            <BrowserFrame url={live} image={cover} />
          </motion.div>
        </Link>

        {project.mobile && (
          <motion.div
            style={{ y: phoneY }}
            className={cn('absolute -bottom-6 hidden w-[22%] min-w-[130px] sm:block', reversed ? '-left-[3%]' : '-right-[3%]')}
          >
            <PhoneFrame image={project.mobile} />
          </motion.div>
        )}

        {project.gallery && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-10 sm:w-[78%]" style={reversed ? { marginLeft: 'auto' } : undefined}>
            {project.gallery.slice(0, 2).map((img, i) => (
              <Reveal key={img.src} delay={0.08 * i}>
                <figure className="group overflow-hidden rounded-xl border border-line bg-ink-850">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      width={img.width}
                      height={img.height}
                      alt={img.alt}
                      className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                  </div>
                  {img.caption && <figcaption className="px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">{img.caption}</figcaption>}
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Copy column — sticks while the media scrolls past */}
      <div className={cn('lg:col-span-5 lg:self-start lg:sticky lg:top-28', reversed && 'lg:order-1')}>
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <span className="outline-number text-[clamp(4.5rem,10vw,8.5rem)]" aria-hidden="true">
              {number}
            </span>
            <span className="mb-2 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
              Live site
            </span>
          </div>
          <p className="eyebrow mt-6">{project.category}</p>
          <h3 id={`${project.slug}-title`} className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {project.title}
          </h3>
          <p className="mt-3 font-display text-lg italic text-fg-soft">{project.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-7 space-y-2.5 border-t border-line pt-6 text-sm text-fg-soft">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-[0.55em] h-px w-3 shrink-0" style={{ background: project.accent }} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={live} external icon={<ArrowUpRight size={16} aria-hidden="true" />} data-cursor="Open site">
              Visit live website
            </Button>
            <Button to={`/work/${project.slug}`} variant="secondary" icon={<ArrowRight size={16} aria-hidden="true" />}>
              Case study
            </Button>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
