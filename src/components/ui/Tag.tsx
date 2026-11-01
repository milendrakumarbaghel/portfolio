import type { ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-fg-soft', className)}>
      {children}
    </span>
  )
}
