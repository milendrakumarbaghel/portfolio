import { useEffect, useState } from 'react'
import { SECTIONS_READY } from '../lib/events.ts'

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState(ids[0])
  const [generation, setGeneration] = useState(0)
  const key = ids.join('|')

  // Lazily-loaded sections announce themselves; re-observe when they arrive.
  useEffect(() => {
    const bump = () => setGeneration((g) => g + 1)
    window.addEventListener(SECTIONS_READY, bump)
    return () => window.removeEventListener(SECTIONS_READY, bump)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!elements.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key, enabled, generation])

  return active
}
