import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery.ts'
import { cn } from '../../lib/cn.ts'

/** Soft perspective tilt that follows the pointer. Desktop pointers only. */
export function Tilt({ children, max = 5, className }: { children: ReactNode; max?: number; className?: string }) {
  const fine = useFinePointer()
  const reduce = usePrefersReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 160, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const enabled = fine && !reduce

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={cn('[transform-style:preserve-3d]', className)}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
    >
      {children}
    </motion.div>
  )
}
