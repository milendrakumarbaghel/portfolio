import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems, personal, socials } from '../../data/personal.ts'
import { useActiveSection } from '../../hooks/useActiveSection.ts'
import { getLenis } from '../../lib/scroll.ts'
import { cn } from '../../lib/cn.ts'
import { EASE_OUT } from '../../lib/motion.ts'
import { SectionLink } from '../ui/SectionLink.tsx'
import { Button } from '../ui/Button.tsx'
import { socialIcons } from '../ui/BrandIcons.tsx'

const sectionIds = navItems.flatMap((n) => n.sections)

export function Logo() {
  return (
    <SectionLink to="#top" className="group flex items-center gap-3" aria-label="Milendra Kumar Baghel — back to top">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] border border-line-strong bg-ink-850 font-display text-[0.8rem] font-semibold tracking-tight">
        <span className="absolute inset-0 bg-gradient-to-br from-violet/30 via-transparent to-cyan/20 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative">MK</span>
      </span>
      <span className="hidden font-display text-[0.95rem] font-medium tracking-tight sm:block">
        Milendra<span className="text-muted"> Kumar Baghel</span>
      </span>
    </SectionLink>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(sectionIds, onHome)
  const activeNav = onHome ? navItems.find((n) => n.sections.includes(activeSection))?.id : undefined
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Close the menu on route change (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    const trigger = menuButton.current
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && panel.current) {
        // Keep focus inside the open menu.
        const focusables = [menuButton.current, ...panel.current.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-line bg-ink-950/70 backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
        aria-hidden="true"
      />
      <div className="container-x relative flex h-[4.25rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-ink-900/40 p-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeNav === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <SectionLink
                    to={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </SectionLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="#contact" variant="secondary" icon={<ArrowUpRight size={15} aria-hidden="true" />} magnetic={false}>
              Let’s talk
            </Button>
          </div>
          <button
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 flex flex-col overflow-y-auto bg-ink-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-x flex-1 py-8">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.04 * i }}
                  >
                    <SectionLink
                      to={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={activeNav === item.id ? 'location' : undefined}
                      className="flex items-baseline gap-4 border-b border-line py-3.5 font-display text-[2rem] font-medium tracking-tight"
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      <span className={activeNav === item.id ? 'text-fg' : 'text-fg-soft'}>{item.label}</span>
                    </SectionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x space-y-5 pb-10">
              <a href={`mailto:${personal.email}`} className="block break-all text-sm text-fg-soft">
                {personal.email}
              </a>
              <ul className="flex gap-2">
                {socials.map((s) => {
                  const Icon = socialIcons[s.id]
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.label} (opens in a new tab)`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-soft"
                      >
                        <Icon size={17} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
