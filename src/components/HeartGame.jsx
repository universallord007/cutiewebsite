import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import { GAME } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

const HEART_EMOJIS = ['❤️', '💗', '💖', '💕']

export default function HeartGame() {
  const [playing, setPlaying] = useState(false)
  const [won, setWon] = useState(false)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState([])
  const [pops, setPops] = useState([])
  const idRef = useRef(0)
  const reduced = useReducedMotion()

  const start = () => {
    setScore(0)
    setHearts([])
    setPops([])
    setWon(false)
    setPlaying(true)
  }

  // spawn hearts while playing
  useEffect(() => {
    if (!playing) return
    const spawn = () => {
      setHearts((hs) => {
        if (hs.length >= 12) return hs
        idRef.current += 1
        return [
          ...hs,
          {
            id: idRef.current,
            left: 6 + Math.random() * 84,
            size: 30 + Math.random() * 22,
            duration: reduced ? 8 : 3.6 + Math.random() * 3,
            emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
            wobble: Math.random() > 0.5 ? 14 : -14,
          },
        ]
      })
    }
    spawn()
    const id = setInterval(spawn, 700)
    return () => clearInterval(id)
  }, [playing, reduced])

  const removeHeart = useCallback((id) => {
    setHearts((hs) => hs.filter((h) => h.id !== id))
  }, [])

  const catchHeart = (heart, e) => {
    e.stopPropagation()
    removeHeart(heart.id)

    // little pop where she tapped
    const rect = e.currentTarget.closest('[data-game-area]').getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const popId = `pop-${heart.id}`
    setPops((ps) => [...ps, { id: popId, x, y }])
    setTimeout(() => setPops((ps) => ps.filter((p) => p.id !== popId)), 700)

    setScore((s) => {
      const next = s + 1
      if (next >= GAME.target) {
        setPlaying(false)
        setWon(true)
        setHearts([])
      }
      return next
    })
  }

  return (
    <section className="relative bg-blush/60 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose">intermission</p>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{GAME.title}</h2>
          <p className="mt-4 text-mauve">{GAME.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            data-game-area
            className="relative mt-12 h-[420px] touch-manipulation select-none overflow-hidden rounded-[2rem] border border-petal bg-gradient-to-b from-white/80 to-blush/70 shadow-soft backdrop-blur-sm"
          >
            {/* score */}
            {playing && (
              <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-white/80 px-5 py-1.5 text-sm font-medium text-deeprose shadow-soft backdrop-blur-sm">
                {score} / {GAME.target} ❤️
              </div>
            )}

            {/* rising hearts */}
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                aria-label="catch a heart"
                onPointerDown={(e) => catchHeart(heart, e)}
                initial={{ top: '104%', x: 0 }}
                animate={{ top: '-14%', x: [0, heart.wobble, 0, -heart.wobble, 0] }}
                transition={{
                  top: { duration: heart.duration, ease: 'linear' },
                  x: { duration: heart.duration, ease: 'easeInOut' },
                }}
                onAnimationComplete={() => removeHeart(heart.id)}
                className="absolute z-10 -translate-x-1/2 cursor-pointer"
                style={{ left: `${heart.left}%`, fontSize: `${heart.size}px` }}
              >
                <span className="block drop-shadow-[0_4px_10px_rgba(201,123,139,0.4)]">
                  {heart.emoji}
                </span>
              </motion.button>
            ))}

            {/* tap pops */}
            {pops.map((pop) => (
              <motion.span
                key={pop.id}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{ opacity: 0, scale: 1.4, y: -34 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="pointer-events-none absolute z-20 font-hand text-xl text-deeprose"
                style={{ left: pop.x, top: pop.y }}
              >
                +1 ✨
              </motion.span>
            ))}

            {/* start screen */}
            {!playing && !won && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5">
                <span className="animate-heartbeat text-6xl">❤️</span>
                <p className="max-w-xs text-center text-sm text-mauve">
                  Catch {GAME.target} hearts before they float away. They&apos;re shy.
                </p>
                <motion.button
                  onClick={start}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full bg-deeprose px-7 py-3 font-medium text-cream shadow-glow"
                >
                  <Play className="h-4 w-4" fill="currentColor" /> start
                </motion.button>
              </div>
            )}

            {/* win screen */}
            <AnimatePresence>
              {won && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-white/60 px-6 text-center backdrop-blur-md"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
                    className="text-6xl"
                  >
                    🏆
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-display text-3xl italic text-ink"
                  >
                    {GAME.winTitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-mauve"
                  >
                    {GAME.winSubtitle}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    onClick={start}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-rose transition-colors hover:text-deeprose"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> {GAME.replay}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
