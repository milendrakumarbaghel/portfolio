import { Component, lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { HeroFallback } from './HeroFallback.tsx'
import { canRenderWebGL, isLowPowerDevice } from '../../lib/webgl.ts'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery.ts'
import type { SceneQuality } from './HeroScene.tsx'

const HeroScene = lazy(() => import('./HeroScene.tsx'))

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.warn('3D hero disabled:', error)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

type Mode = 'pending' | 'static' | SceneQuality

/** Chooses between the live WebGL scene and the static illustration, and pauses the scene off-screen. */
export function HeroVisual({ className }: { className?: string }) {
  const reduce = usePrefersReducedMotion()
  const narrow = useMediaQuery('(max-width: 767px)')
  const [quality, setQuality] = useState<SceneQuality | null>(null)
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const lowPower = useMemo(() => isLowPowerDevice(), [])
  // Phones get the static art: the visual sits below the fold there, and skipping the
  // ~250 KB WebGL chunk keeps mid-range Android devices fast.
  const staticOnly = reduce || narrow || !canRenderWebGL()
  const mode: Mode = staticOnly ? 'static' : (quality ?? 'pending')

  useEffect(() => {
    if (staticOnly) return
    // Defer the 3D chunk until the main thread is idle so text paints first.
    const pick = () => setQuality(lowPower ? 'low' : 'high')
    const idle = window.requestIdleCallback?.(pick, { timeout: 1200 })
    const timer = idle === undefined ? window.setTimeout(pick, 300) : undefined
    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [staticOnly, lowPower])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let onScreen = true
    const update = () => setActive(onScreen && document.visibilityState === 'visible')
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  const fallback = <HeroFallback className="h-full w-full" />
  const live = mode === 'high' || mode === 'low'

  return (
    <div ref={ref} className={className}>
      {/* Static art sits underneath and fades away once the live scene has rendered. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: live && ready ? 0 : 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: live && ready ? 0.2 : 0.3 }}
      >
        {fallback}
      </motion.div>
      {live && (
        <SceneBoundary fallback={null}>
          <Suspense fallback={null}>
            <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.4 }}>
              <HeroScene quality={mode as SceneQuality} active={active} onReady={() => setReady(true)} />
            </motion.div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  )
}
