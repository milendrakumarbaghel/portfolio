import { motion, type HTMLMotionProps } from 'motion/react'
import { EASE_OUT } from '../../lib/motion.ts'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'li' | 'section' | 'article' }

/** Fades and lifts content in once it scrolls into view. */
export function Reveal({ delay = 0, y = 28, as = 'div', children, ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
