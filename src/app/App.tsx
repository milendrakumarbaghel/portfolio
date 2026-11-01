import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage.tsx'
import { SiteHeader } from '../components/layout/SiteHeader.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { SmoothScroll } from '../components/layout/SmoothScroll.tsx'
import { ScrollProgress } from '../components/layout/ScrollProgress.tsx'
import { CustomCursor } from '../components/layout/CustomCursor.tsx'
import { ErrorBoundary } from '../components/layout/ErrorBoundary.tsx'
import { getLenis } from '../lib/scroll.ts'
import { EASE_OUT } from '../lib/motion.ts'

const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage.tsx'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.tsx'))

function resetScroll() {
  if (window.location.hash) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <AnimatePresence mode="wait" onExitComplete={resetScroll}>
        <motion.main
          key={location.pathname}
          id="main"
          tabIndex={-1}
          className="outline-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
        >
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/work/:slug" element={<ProjectDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </MotionConfig>
  )
}
