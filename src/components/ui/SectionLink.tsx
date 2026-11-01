import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToTarget } from '../../lib/scroll.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: `#${string}` }

/** In-page anchor that smooth-scrolls on the home page and navigates home from other routes. */
export function SectionLink({ to, onClick, ...rest }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToTarget(to)
      history.replaceState(null, '', to === '#top' ? '/' : to)
    } else {
      navigate(`/${to}`)
    }
  }

  return <a href={`/${to}`} onClick={handle} {...rest} />
}
