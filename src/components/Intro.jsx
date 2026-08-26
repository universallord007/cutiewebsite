import { useState } from 'react'
import { motion } from 'framer-motion'
import { INTRO } from '../data/loveData.js'
import HeartBurst from './effects/HeartBurst.jsx'

// Cinematic opening screen: two lines fade in, then the button.
// Clicking bursts hearts and hands off to the main experience.
export default function Intro({ onEnter }) {
  const [leaving, setLeaving] = useState(false)

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onEnter, 1100)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-cream"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blush blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-lavender/70 blur-3xl" />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="font-display text-4xl italic text-ink sm:text-5xl"
        >
          {INTRO.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: 'easeOut' }}
          className="mt-6 text-lg font-light text-mauve sm:text-xl"
        >
          {INTRO.line2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.8, ease: 'easeOut' }}
          className="relative mt-12 inline-block"
        >
          <motion.button
            onClick={enter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative rounded-full bg-deeprose px-8 py-3.5 text-base font-medium tracking-wide text-cream shadow-glow transition-shadow duration-300 hover:shadow-lifted"
          >
            {INTRO.button}
          </motion.button>
          {leaving && <HeartBurst count={26} />}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.6 }}
          className="mt-8 text-xs uppercase tracking-[0.25em] text-rose"
        >
          {INTRO.warning}
        </motion.p>
      </div>
    </motion.div>
  )
}
