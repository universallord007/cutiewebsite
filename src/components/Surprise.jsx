import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SURPRISE } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

const RAIN_EMOJIS = ['❤️', '💗', '💖', '🌸', '✨', '💕']

function HeartRain() {
  const drops = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
        emoji: RAIN_EMOJIS[i % RAIN_EMOJIS.length],
      })),
    []
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className="absolute"
          style={{ left: `${d.left}%`, fontSize: `${d.size}px` }}
          initial={{ top: '-8%', opacity: 0, rotate: -10 }}
          animate={{ top: '108%', opacity: [0, 1, 1, 0.6], rotate: 14 }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export default function Surprise() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!open) return
    setStage(0)
    const t1 = setTimeout(() => setStage(1), 1800)
    const t2 = setTimeout(() => setStage(2), 4200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [open])

  // lock scroll while the overlay is up
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
      <Reveal>
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full border-2 border-dashed border-rose bg-white/70 px-8 py-4 font-display text-xl italic text-deeprose shadow-soft backdrop-blur-sm transition-shadow hover:shadow-lifted sm:text-2xl"
        >
          {SURPRISE.button}
        </motion.button>
        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-rose/70">{SURPRISE.hint}</p>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blush via-cream to-lavender"
          >
            <HeartRain />

            <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
              <AnimatePresence mode="wait">
                {stage === 0 && (
                  <motion.span
                    key="s0"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="block text-7xl"
                  >
                    👀
                  </motion.span>
                )}
                {stage === 1 && (
                  <motion.p
                    key="s1"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="font-display text-3xl italic text-ink sm:text-4xl"
                  >
                    {SURPRISE.line1}
                  </motion.p>
                )}
                {stage === 2 && (
                  <motion.div key="s2">
                    <motion.p
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                      className="font-display text-6xl italic text-deeprose drop-shadow-[0_0_30px_rgba(229,169,181,0.8)] sm:text-8xl"
                    >
                      {SURPRISE.line2}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                      onClick={() => setOpen(false)}
                      className="mt-12 rounded-full bg-white/80 px-6 py-3 text-sm text-mauve shadow-soft backdrop-blur-sm transition-colors hover:text-deeprose"
                    >
                      {SURPRISE.close}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
