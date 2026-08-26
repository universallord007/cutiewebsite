import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { OPEN_WHEN } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

export default function OpenWhen() {
  const [active, setActive] = useState(null)

  return (
    <section className="relative bg-blush/60 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose">tiny letters</p>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">Open when...</h2>
          <p className="mt-4 text-mauve">Little envelopes for the days I can&apos;t be right next to you.</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {OPEN_WHEN.map((letter, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-3xl border border-petal bg-white/80 p-5 text-left shadow-soft backdrop-blur-sm transition-shadow duration-300 hover:shadow-lifted sm:p-7"
            >
              <span className="block text-3xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:text-4xl">
                {letter.emoji}
              </span>
              <span className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-rose">
                open when
              </span>
              <span className="mt-1 block font-display text-lg italic leading-snug text-ink sm:text-xl">
                {letter.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* opened letter */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-5 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 50, scale: 0.92, rotateX: 14 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ transformPerspective: 900 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream shadow-lifted"
            >
              {/* envelope flap */}
              <div className="relative bg-petal/70 px-7 pb-5 pt-7">
                <motion.span
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 16 }}
                  className="block text-4xl"
                >
                  {OPEN_WHEN[active].emoji}
                </motion.span>
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-deeprose">
                  open when
                </p>
                <h3 className="font-display text-2xl italic text-ink">{OPEN_WHEN[active].title}</h3>
                <button
                  onClick={() => setActive(null)}
                  aria-label="close"
                  className="absolute right-4 top-4 rounded-full bg-white/70 p-2 text-mauve transition-colors hover:text-deeprose"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* the letter sliding out */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
                className="px-7 py-7"
              >
                <p className="whitespace-pre-line font-hand text-[1.45rem] leading-relaxed text-ink">
                  {OPEN_WHEN[active].message}
                </p>
                <p className="mt-6 text-right font-hand text-xl text-deeprose">— me ❤️</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
