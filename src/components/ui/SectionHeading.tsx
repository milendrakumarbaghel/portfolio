import type { ReactNode } from 'react'
import { MaskText } from '../animations/MaskText.tsx'
import { Reveal } from '../animations/Reveal.tsx'
import { cn } from '../../lib/cn.ts'

interface Props {
  index: string
  eyebrow: string
  title: string
  accent?: string[]
  id?: string
  intro?: ReactNode
  className?: string
  align?: 'split' | 'stack'
}

/** Numbered editorial section header: index, eyebrow, masked title, optional intro. */
export function SectionHeading({ index, eyebrow, title, accent, id, intro, className, align = 'split' }: Props) {
  return (
    <header className={cn('grid gap-8', align === 'split' && 'lg:grid-cols-12 lg:items-end', className)}>
      <div className={cn(align === 'split' && 'lg:col-span-7')}>
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs text-violet-soft">{index}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <h2 id={id} className="display-lg">
          <MaskText text={title} accent={accent} />
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.15} className={cn('max-w-xl text-base leading-relaxed text-muted md:text-lg', align === 'split' && 'lg:col-span-5 lg:justify-self-end')}>
          {intro}
        </Reveal>
      )}
    </header>
  )
}
