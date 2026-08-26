import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, RotateCcw } from 'lucide-react'
import { LOVE_BUBBLES, LOVE_BUBBLES_FINAL } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

// Pre-set spots around the heart (percentages of the play area).
const POSITIONS = [
  { left: 16, top: 12 },
  { left: 78, top: 10 },
  { left: 8, top: 46 },
  { left: 88, top: 44 },
  { left: 18, top: 82 },
  { left: 76, top: 84 },
  { left: 48, top: 4 },
  { left: 46, top: 92 },
]

export default function LoveReasons() {
  const areaRef = useRef(null)
  const [flying, setFlying] = useState({}) // index -> {x, y} offset to the center
  const [absorbed, setAbsorbed] = useState([])

  const allGone = absorbed.length === LOVE_BUBBLES.length

  const absorb = (i) => {
    if (flying[i] || !areaRef.current) return
    const rect = areaRef.current.getBoundingClientRect()
    const pos = POSITIONS[i % POSITIONS.length]
    setFlying((f) => ({
      ...f,
      [i]: {
        x: ((50 - pos.left) / 100) * rect.width,
        y: ((50 - pos.top) / 100) * rect.height,
      },
    }))
    setTimeout(() => setAbsorbed((a) => (a.includes(i) ? a : [...a, i])), 550)
  }

  const reset = () => {
    setFlying({})
    setAbsorbed([])
  }

  return (
    <section className="relative overflow-hidden bg-blush/60 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose">an incomplete list</p>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">
            Things I love about you
          </h2>
          <p className="mt-4 text-mauve">Tap the bubbles. Feed them to the heart. 🤲</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div ref={areaRef} className="relative mx-auto mt-10 h-[420px] max-w-2xl sm:h-[460px]">
            {/* the center heart, growing as it eats reasons */}
            <motion.div
              key={absorbed.length}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.22, 1] }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-28 w-28 rounded-full bg-rose/30 blur-2xl" />
                <Heart
                  className="relative h-20 w-20 animate-heartbeat text-deeprose sm:h-24 sm:w-24"
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ scale: 1 + absorbed.length * 0.04 }}
                />
                <span className="absolute font-body text-sm font-semibold text-cream">
                  {absorbed.length > 0 && `+${absorbed.length}`}
                </span>
              </div>
            </motion.div>

            {/* the floating reasons */}
            {LOVE_BUBBLES.map((text, i) => {
              if (absorbed.includes(i)) return null
              const pos = POSITIONS[i % POSITIONS.length]
              return (
                <motion.button
                  key={i}
                  onClick={() => absorb(i)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  animate={
                    flying[i]
                      ? { x: flying[i].x, y: flying[i].y, scale: 0.15, opacity: 0 }
                      : { x: 0, y: 0, scale: 1, opacity: 1 }
                  }
                  transition={
                    flying[i]
                      ? { duration: 0.55, ease: [0.5, 0, 0.75, 0.6] }
                      : { duration: 0.4 }
                  }
                  whileHover={flying[i] ? {} : { scale: 1.08 }}
                >
                  <span
                    className="block whitespace-nowrap rounded-full border border-petal bg-white/85 px-4 py-2 text-sm text-mauve shadow-soft backdrop-blur-sm transition-colors hover:border-rose hover:text-deeprose sm:px-5 sm:py-2.5 sm:text-base"
                    style={{
                      animation: `floaty ${3.2 + (i % 4) * 0.7}s ease-in-out ${i * 0.35}s infinite`,
                    }}
                  >
                    {text}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-6 flex min-h-[4.5rem] flex-col items-center justify-center text-center">
          <AnimatePresence>
            {allGone && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex flex-col items-center gap-3"
              >
                <p className="font-display text-2xl italic text-ink sm:text-3xl">
                  {LOVE_BUBBLES_FINAL}
                </p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm text-rose transition-colors hover:text-deeprose"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> release them again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
