import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { MEMORIES } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

// Soft decorative art panel — no photos needed, just pretty.
function MemoryArt({ memory, className = '', big = false }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${memory.gradient} ${className}`}
    >
      {/* faint drifting glyphs */}
      {['♡', '✦', '❀', '✧', '♡'].map((g, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute text-white/40"
          style={{
            left: `${12 + i * 19}%`,
            top: `${18 + ((i * 29) % 55)}%`,
            fontSize: big ? '22px' : '15px',
            animation: `floaty ${3.4 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
          }}
        >
          {g}
        </span>
      ))}
      <span className="absolute h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      <span className={`relative drop-shadow-sm ${big ? 'text-7xl' : 'text-5xl'}`}>
        {memory.emoji}
      </span>
    </div>
  )
}

export default function Memories() {
  const [active, setActive] = useState(null)

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-rose">a little archive</p>
        <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">Our memories</h2>
        <p className="mt-4 text-mauve">Some moments I refuse to let my brain delete.</p>
      </Reveal>

      <div className="relative mt-16">
        {/* timeline line */}
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-rose/50 to-transparent sm:left-1/2" />

        <div className="space-y-12 sm:space-y-16">
          {MEMORIES.map((memory, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex items-center gap-6 pl-12 sm:pl-0 ${
                  left ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* timeline dot */}
                <span className="absolute left-5 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:left-1/2">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-rose/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-deeprose" />
                </span>

                <div className={`sm:w-1/2 ${left ? 'sm:pr-14' : 'sm:pl-14'}`}>
                  <motion.button
                    layoutId={`memory-${i}`}
                    onClick={() => setActive(i)}
                    whileHover={{ y: -5 }}
                    className="group block w-full overflow-hidden rounded-3xl border border-petal bg-white/80 text-left shadow-soft backdrop-blur-sm transition-shadow duration-300 hover:shadow-lifted"
                  >
                    <MemoryArt memory={memory} className="h-36 w-full sm:h-40" />
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-rose">
                        {memory.date}
                      </p>
                      <h3 className="mt-1 font-display text-2xl italic text-ink">{memory.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-mauve">{memory.description}</p>
                    </div>
                  </motion.button>
                </div>
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* expanded memory */}
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
              layoutId={`memory-${active}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream shadow-lifted"
            >
              <MemoryArt memory={MEMORIES[active]} className="h-52 w-full sm:h-60" big />
              <div className="p-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-rose">
                  {MEMORIES[active].date}
                </p>
                <h3 className="mt-1 font-display text-3xl italic text-ink">
                  {MEMORIES[active].title}
                </h3>
                <p className="mt-3 leading-relaxed text-mauve">{MEMORIES[active].description}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="close"
                className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-mauve shadow-soft transition-colors hover:text-deeprose"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
