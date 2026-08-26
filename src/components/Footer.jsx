import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { CONFIG, FINAL, SECRETS } from '../data/loveData.js'

const lineAnim = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
}

export default function Footer() {
  const [starMsg, setStarMsg] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush to-petal/80 px-6 pb-16 pt-28 text-center sm:pt-40">
      <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center">
        <motion.p
          {...lineAnim}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-display text-3xl italic text-mauve sm:text-5xl"
        >
          {FINAL.line1}
        </motion.p>

        <motion.p
          {...lineAnim}
          transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
          className="mt-8 font-display text-4xl italic text-ink sm:text-6xl"
        >
          {FINAL.line2}
        </motion.p>

        <motion.p
          {...lineAnim}
          transition={{ duration: 0.9, delay: 1.8, ease: 'easeOut' }}
          className="mt-8 text-lg tracking-wide text-deeprose sm:text-xl"
        >
          {FINAL.line3}
        </motion.p>

        {/* names */}
        <motion.div
          {...lineAnim}
          transition={{ duration: 1, delay: 2.6, ease: 'easeOut' }}
          className="mt-16 flex items-center gap-4 font-display text-2xl italic text-ink sm:text-3xl"
        >
          <span>{CONFIG.yourName}</span>
          <Heart
            className="h-6 w-6 animate-heartbeat text-deeprose"
            fill="currentColor"
            strokeWidth={0}
          />
          <span>{CONFIG.herName}</span>
        </motion.div>

        {/* secret: a tiny star with a wish */}
        <motion.div
          {...lineAnim}
          transition={{ duration: 1, delay: 3.2 }}
          className="relative mt-14"
        >
          <button
            aria-label="a tiny star"
            onClick={() => setStarMsg((s) => !s)}
            onMouseEnter={() => setStarMsg(true)}
            onMouseLeave={() => setStarMsg(false)}
            className="animate-twinkle text-lg text-gold transition-transform hover:scale-125"
          >
            ✦
          </button>
          <AnimatePresence>
            {starMsg && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-full left-1/2 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-petal bg-white/90 px-4 py-3 font-hand text-lg leading-snug text-mauve shadow-lifted backdrop-blur-sm"
              >
                {SECRETS.star}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="mt-16 text-xs uppercase tracking-[0.3em] text-mauve/60">{FINAL.footer}</p>
    </section>
  )
}
