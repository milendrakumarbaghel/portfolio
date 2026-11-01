import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}
export const getLenis = () => lenis

/**
 * Smooth-scrolls to `#id`, an element or a y position, with or without Lenis.
 * The fixed-header offset comes from `scroll-padding-top` on <html>, which both
 * Lenis and native `scrollIntoView` respect.
 */
export function scrollToTarget(target: string | HTMLElement | number, opts: { immediate?: boolean } = {}, attempt = 0): boolean {
  // Lenis is paused while the mobile menu is open; wait for it to close and resume.
  if (lenis?.isStopped && attempt < 10) {
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(target, opts, attempt + 1)))
    return true
  }
  const el = typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target
  if (el === null) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTop = el === 0 || (el instanceof HTMLElement && el.id === 'top')

  const immediate = opts.immediate || reduce

  if (lenis) {
    // The page may have just grown (route change, lazy sections); refresh Lenis's cached limits first.
    lenis.resize()
    lenis.scrollTo(isTop ? 0 : el, { immediate, duration: 1.2, force: true })
  } else if (typeof el === 'number' || isTop) {
    window.scrollTo({ top: isTop ? 0 : (el as number), behavior: immediate ? 'auto' : 'smooth' })
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' })
  }
  if (el instanceof HTMLElement) {
    // Move focus for keyboard and screen-reader users without a second jump.
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
  return true
}
