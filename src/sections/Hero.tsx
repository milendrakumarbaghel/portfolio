import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { useRef } from 'react'
import { personal, socials } from '../data/personal.ts'
import { EASE_OUT } from '../lib/motion.ts'
import { MaskText } from '../components/animations/MaskText.tsx'
import { RoleTicker } from '../components/animations/RoleTicker.tsx'
import { Button } from '../components/ui/Button.tsx'
import { SectionLink } from '../components/ui/SectionLink.tsx'
import { socialIcons } from '../components/ui/BrandIcons.tsx'
import { HeroVisual } from '../components/three/HeroVisual.tsx'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[4.25rem]">
      {/* Layered background: hairline grid, two soft light sources, a horizon line. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_40%,black,transparent)]" />
        <div className="absolute -right-[10%] top-[8%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(136_104_255/0.22),transparent_62%)]" />
        <div className="absolute -left-[20%] bottom-[-30%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgb(75_220_245/0.08),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="container-x relative grid flex-1 items-center gap-6 lg:grid-cols-12">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 pt-12 lg:col-span-7 lg:pt-6">
          <motion.p {...fadeUp(0.05)} className="eyebrow mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-cyan/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Software Engineer — Bhopal, India
          </motion.p>

          <h1 id="hero-title" className="font-display font-semibold tracking-[-0.035em]">
            <MaskText immediate delay={0.12} text="Hi, I’m Milendra." className="mb-3 text-[clamp(1.35rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-fg-soft" />
            <MaskText
              immediate
              delay={0.28}
              text={personal.headline}
              accent={['immersive']}
              className="text-[clamp(2.4rem,5.4vw,4.9rem)] leading-[0.98]"
            />
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-6 flex items-baseline gap-3 font-display text-lg text-fg-soft md:text-xl">
            <span className="font-mono text-sm text-violet-soft" aria-hidden="true">
              {'//'}
            </span>
            <RoleTicker roles={personal.roles} />
          </motion.p>

          {/* Visible from the first frame (only slides) so it can paint as the LCP element immediately. */}
          <motion.p
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {personal.intro}
          </motion.p>

          <motion.div {...fadeUp(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#work" size="lg" icon={<ArrowDown size={16} aria-hidden="true" />}>
              Explore my work
            </Button>
            <Button href="#contact" size="lg" variant="secondary" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
              Let’s work together
            </Button>
            <Button
              href={personal.resume.href}
              download={personal.resume.downloadName}
              variant="ghost"
              size="lg"
              icon={<Download size={16} aria-hidden="true" />}
              aria-label="Download résumé (PDF)"
            >
              Download résumé
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(1.05)} className="mt-8 flex items-center gap-2" aria-label="Social profiles">
            {socials.map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              )
            })}
            <li className="ml-3 hidden items-center gap-2 border-l border-line pl-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted sm:flex">
              Now — {personal.current.role.split(' (')[0]} at {personal.current.organisation}
            </li>
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative -mx-5 h-[400px] sm:h-[480px] lg:absolute lg:inset-y-0 lg:right-[-4%] lg:mx-0 lg:h-auto lg:w-[54%]">
          <HeroVisual className="absolute inset-0" />
        </motion.div>
      </div>

      <div className="container-x relative z-10 flex items-end justify-between pb-7 pt-4">
        <SectionLink to="#freelance" className="group flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted hover:text-fg">
          <span className="relative h-10 w-px overflow-hidden bg-line-strong" aria-hidden="true">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-fg"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: [0.76, 0, 0.24, 1] }}
            />
          </span>
          Scroll to explore
        </SectionLink>
        <p className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted md:block" aria-hidden="true">
          23.2599° N, 77.4126° E
        </p>
      </div>
    </section>
  )
}
