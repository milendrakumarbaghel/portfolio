import { motion } from 'motion/react'
import { EASE_OUT } from '../../lib/motion.ts'
import { cn } from '../../lib/cn.ts'

interface Props {
  text: string
  className?: string
  /** Words rendered with the brand gradient. */
  accent?: string[]
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

/**
 * Word-by-word masked reveal. Each word slides up from behind its own mask, so the
 * heading wraps naturally at every viewport width. Words stay real text separated by
 * real spaces, so screen readers and crawlers read the sentence normally.
 */
export function MaskText({ text, className, accent = [], delay = 0, stagger = 0.045, immediate = false }: Props) {
  const words = text.split(' ')
  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -8% 0px' } }

  return (
    <motion.span className={cn('block', className)} initial="hidden" {...trigger}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn('inline-block will-change-transform', accent.includes(word) && 'text-gradient')}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.95, ease: EASE_OUT, delay: delay + i * stagger } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
