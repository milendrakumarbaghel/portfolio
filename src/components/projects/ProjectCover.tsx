import type { Project } from '../../types/index.ts'
import { GenerativeCover } from './GenerativeCover.tsx'
import { Img } from '../ui/Img.tsx'
import { cn } from '../../lib/cn.ts'

/** Screenshot, document-style image or generative artwork, normalised to fill a 16:10 slot. */
export function ProjectCover({ project, sizes, priority, className }: { project: Project; sizes?: string; priority?: boolean; className?: string }) {
  const { cover } = project
  if ('generative' in cover) {
    return (
      <div className={cn('h-full w-full', className)}>
        <GenerativeCover kind={cover.generative} title={project.title} accent={project.accent} />
      </div>
    )
  }

  // Tall images (e.g. a scanned answer sheet) are shown as a document on a tinted backdrop.
  const isDocument = cover.height / cover.width > 0.75
  if (isDocument) {
    return (
      <div className={cn('relative h-full w-full overflow-hidden bg-ink-850', className)}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 20%, ${project.accent}55, transparent 60%)` }} />
        <Img
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute left-1/2 top-[12%] w-[62%] -translate-x-1/2 -rotate-3 rounded-sm shadow-[0_30px_60px_-10px_rgb(0_0_0/0.8)] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-rotate-1 group-hover:scale-[1.02]"
        />
      </div>
    )
  }

  return (
    <Img
      src={cover.src}
      srcSet={cover.srcSet}
      sizes={sizes}
      width={cover.width}
      height={cover.height}
      alt={cover.alt}
      loading={priority ? 'eager' : 'lazy'}
      className={cn('h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]', className)}
    />
  )
}
