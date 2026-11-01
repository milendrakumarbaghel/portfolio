import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { Button } from '../components/ui/Button.tsx'

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found — Milendra Kumar Baghel', description: 'This page doesn’t exist.', path: '/404' })
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center gap-6 pt-28">
      <p className="outline-number text-[clamp(7rem,22vw,16rem)]" aria-hidden="true">
        404
      </p>
      <h1 className="display-lg max-w-2xl">This page took a different route.</h1>
      <p className="max-w-md text-muted">The link may be old or mistyped. Everything I’ve built is one click away.</p>
      <div className="flex flex-wrap gap-3">
        <Button to="/" icon={<ArrowLeft size={16} aria-hidden="true" />}>
          Back home
        </Button>
        <Button href="#work" variant="secondary">
          See my work
        </Button>
      </div>
    </section>
  )
}
