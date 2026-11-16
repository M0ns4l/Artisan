import { m } from 'motion/react'
import { Fragment } from 'react'

interface AnimatedHeadlineProps {
  text: string
  className?: string
  id?: string
  delay?: number
}

/** H1 whose words rise into place one after another. Text stays fully readable to assistive tech. */
export function AnimatedHeadline({ text, className, id, delay = 0 }: AnimatedHeadlineProps) {
  const words = text.split(' ')
  return (
    <h1 id={id} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <m.span
              className="inline-block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </h1>
  )
}
