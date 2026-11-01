import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE_OUT } from '../../lib/motion.ts'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery.ts'

/** Cycles through roles; holds still for reduced-motion users. */
export function RoleTicker({ roles, interval = 2600 }: { roles: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), interval)
    return () => window.clearInterval(id)
  }, [roles.length, interval, reduce])

  return (
    <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom">
      <span className="sr-only">{roles.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
