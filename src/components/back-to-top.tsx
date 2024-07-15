import { ArrowUpToLine } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { cn } from '~/utils'

export const BackToTop = () => {
  const [visible, setVisible] = React.useState(false)
  const parentRef = React.useRef()

  React.useLayoutEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY >= window.innerHeight / 2)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <div
          className="sticky flex justify-end bottom-0 pointer-events-none"
          ref={parentRef}
        >
          <motion.button
            initial={{
              scale: 0,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: 40,
            }}
            className={cn(
              'mb-10 mr-10 shadow-lg p-2 rounded-full border',
              'pointer-events-auto'
            )}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpToLine />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
