import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn.ts'
import { Magnetic } from './Magnetic.tsx'
import { SectionLink } from './SectionLink.tsx'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Common {
  children: ReactNode
  variant?: Variant
  size?: 'md' | 'lg'
  icon?: ReactNode
  className?: string
  magnetic?: boolean
  'aria-label'?: string
  'data-cursor'?: string
}

type Props =
  | (Common & { href: `#${string}` })
  | (Common & { to: string })
  | (Common & { href: string; external?: boolean; download?: string })
  | (Common & { onClick: () => void; type?: 'button' | 'submit'; disabled?: boolean })

const styles: Record<Variant, string> = {
  primary:
    'bg-fg text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_30px_-10px_rgb(136_104_255/0.55)]',
  secondary: 'border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]',
  ghost: 'text-fg-soft hover:text-fg',
}

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', icon, className, magnetic = variant !== 'ghost' } = props
  const cls = cn(
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)]',
    'active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none',
    size === 'lg' ? 'h-13 px-6 text-[0.95rem]' : 'h-11 px-5 text-sm',
    variant === 'ghost' && 'px-1',
    styles[variant],
    className,
  )
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
          {icon}
        </span>
      )}
    </>
  )
  const shared = { className: cls, 'aria-label': props['aria-label'], 'data-cursor': props['data-cursor'] }

  let el: ReactNode
  if ('onClick' in props) {
    el = (
      <button type={props.type ?? 'button'} onClick={props.onClick} disabled={props.disabled} {...shared}>
        {inner}
      </button>
    )
  } else if ('to' in props) {
    el = (
      <Link to={props.to} {...shared}>
        {inner}
      </Link>
    )
  } else if (props.href.startsWith('#')) {
    el = (
      <SectionLink to={props.href as `#${string}`} {...shared}>
        {inner}
      </SectionLink>
    )
  } else {
    const p = props as Common & { href: string; external?: boolean; download?: string }
    el = (
      <a
        href={p.href}
        download={p.download}
        {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...shared}
      >
        {inner}
        {p.external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}
