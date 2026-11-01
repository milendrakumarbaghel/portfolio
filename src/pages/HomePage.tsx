import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { scrollToTarget } from '../lib/scroll.ts'
import { Hero } from '../sections/Hero.tsx'

// Start fetching the rest of the page as soon as this module runs.
const belowFold = import('../sections/BelowFold.tsx')
const BelowFold = lazy(() => belowFold)

export default function HomePage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Milendra Kumar Baghel — Software Engineer & Full-Stack Developer',
    description:
      'Milendra Kumar Baghel is a software engineer in Bhopal building secure Java and Spring Boot systems, full-stack React applications, AI-powered hackathon projects and websites for real businesses.',
    path: '/',
  })

  // Arriving with a hash (e.g. /#work): wait for the lazy sections, then jump once.
  useEffect(() => {
    if (!hash) return
    let cancelled = false
    belowFold.then(() => {
      let tries = 0
      const attempt = () => {
        if (cancelled) return
        if (scrollToTarget(hash, { immediate: true }) || ++tries > 60) return
        requestAnimationFrame(attempt)
      }
      requestAnimationFrame(attempt)
    })
    return () => {
      cancelled = true
    }
  }, [hash])

  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <BelowFold />
      </Suspense>
    </>
  )
}
