import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../lib/cn.ts'

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallbackLabel?: string }

/** Lazy, async-decoded image that degrades to a quiet placeholder if the file fails to load. */
export function Img({ className, fallbackLabel, alt = '', loading = 'lazy', ...rest }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn('flex items-center justify-center gap-2 bg-ink-850 text-xs text-muted', className)}
      >
        <ImageOff size={16} aria-hidden="true" />
        {fallbackLabel ?? 'Image unavailable'}
      </span>
    )
  }
  return <img alt={alt} loading={loading} decoding="async" onError={() => setFailed(true)} className={className} {...rest} />
}
