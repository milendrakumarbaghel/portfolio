import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery.ts'

/**
 * A restrained companion to the native cursor (which stays visible). Over elements
 * with `data-cursor="Label"` it expands into a contextual pill such as "View project".
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduce = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const enabled = fine && !reduce

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = (e.target as Element | null)?.closest?.('[data-cursor]')
      setLabel(target?.getAttribute('data-cursor') ?? null)
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[80]" style={{ x: sx, y: sy }}>
      <AnimatePresence>
        {visible && label && (
          <motion.span
            key="label"
            className="absolute left-4 top-4 whitespace-nowrap rounded-full bg-fg px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-950 shadow-lg"
            initial={{ opacity: 0, scale: 0.6, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        className="absolute -left-4 -top-4 block h-8 w-8 rounded-full border border-fg/30"
        animate={{ opacity: visible && !label ? 1 : 0, scale: visible && !label ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
