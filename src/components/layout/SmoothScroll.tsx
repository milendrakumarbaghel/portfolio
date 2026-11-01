import Lenis from 'lenis'
import { useEffect } from 'react'
import { setLenis } from '../../lib/scroll.ts'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery.ts'

/** Lenis smooth scrolling on top of native scroll (no scroll-jacking); off for reduced motion. */
export function SmoothScroll() {
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 1, smoothWheel: true })
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [reduce])
  return null
}
