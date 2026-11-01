import type { ProjectImage } from '../../types/index.ts'
import { Img } from '../ui/Img.tsx'
import { cn } from '../../lib/cn.ts'

interface BrowserProps {
  url: string
  image: ProjectImage
  sizes?: string
  priority?: boolean
  className?: string
}

export function BrowserFrame({ url, image, sizes = '(min-width: 1024px) 58vw, 100vw', priority, className }: BrowserProps) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className={cn('overflow-hidden rounded-[14px] border border-line-strong bg-ink-850 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]', className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[0.66rem] text-muted">{host}</span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          <Img
            src={image.src}
            srcSet={image.srcSet}
            sizes={sizes}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  )
}

export function PhoneFrame({ image, className }: { image: ProjectImage; className?: string }) {
  return (
    <div className={cn('rounded-[1.9rem] border border-line-strong bg-black p-[5px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]', className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem] bg-ink-900">
        <span className="absolute left-1/2 top-2 z-10 h-[14px] w-[32%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
        <Img src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="240px" className="h-full w-full object-cover object-top" />
      </div>
    </div>
  )
}
