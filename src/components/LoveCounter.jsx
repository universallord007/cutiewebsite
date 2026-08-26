import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { METER } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'
import HeartBurst from './effects/HeartBurst.jsx'

// The "how much do I like you?" meter. Fills to 100%, pauses,
// then breaks the scale and gives up at ∞.
export default function LoveCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reduced = useReducedMotion()
  const [percent, setPercent] = useState(0)
  const [phase, setPhase] = useState('idle') // idle | filling | paused | overflow | done
  const [burst, setBurst] = useState(false)
  const cleanups = useRef([])

  const clearTimers = () => {
    cleanups.current.forEach((fn) => fn())
    cleanups.current = []
  }

  const run = useCallback(() => {
    clearTimers()
    setBurst(false)
    if (reduced) {
      setPercent(400)
      setPhase('done')
      return
    }
    setPercent(0)
    setPhase('filling')
    let p = 0
    const fillId = setInterval(() => {
      p = Math.min(100, p + 1.4)
      setPercent(p)
      if (p >= 100) {
        clearInterval(fillId)
        setPhase('paused')
        const t = setTimeout(() => {
          setPhase('overflow')
          const ovId = setInterval(() => {
            p += 21
            setPercent(p)
            if (p >= 400) {
              clearInterval(ovId)
              setBurst(true)
              setPhase('done')
            }
          }, 80)
          cleanups.current.push(() => clearInterval(ovId))
        }, 1000)
        cleanups.current.push(() => clearTimeout(t))
      }
    }, 30)
    cleanups.current.push(() => clearInterval(fillId))
  }, [reduced])

  useEffect(() => {
    if (inView && phase === 'idle') run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => clearTimers, [])

  const done = phase === 'done'
  const status = done
    ? METER.finalStatus
    : [...METER.statuses].reverse().find((s) => percent >= s.at)?.label ?? ''

  return (
    <section ref={ref} className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-rose">{METER.heading}</p>
        <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{METER.title}</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <motion.div
          animate={phase === 'overflow' ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
          transition={
            phase === 'overflow' ? { duration: 0.35, repeat: Infinity } : { duration: 0.2 }
          }
          className="mx-auto mt-14 max-w-xl rounded-[2rem] border border-petal bg-white/80 p-8 shadow-soft backdrop-blur-sm sm:p-10"
        >
          {/* the reading */}
          <div className="font-display text-6xl text-deeprose sm:text-7xl">
            {done ? '∞' : `${Math.round(percent)}%`}
          </div>
          <p className="mt-2 min-h-[1.5rem] text-sm italic text-mauve">{status}</p>

          {/* the bar */}
          <div className="relative mt-7">
            <div
              className={`h-4 overflow-hidden rounded-full bg-blush ${
                done ? 'shadow-glow' : ''
              }`}
            >
              <div
                className={`h-full rounded-full bg-gradient-to-r from-rose to-deeprose transition-all duration-100 ${
                  phase === 'overflow' || done ? 'animate-pulse' : ''
                }`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
            {/* hearts escaping off the broken end of the scale */}
            <div className="absolute right-0 top-1/2 h-0 w-0">
              {burst && <HeartBurst count={18} onDone={() => setBurst(false)} />}
            </div>
          </div>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="mt-8 font-display text-2xl italic text-ink sm:text-3xl">
                {METER.finalLine1}
              </p>
              <p className="mt-2 font-display text-2xl italic text-deeprose sm:text-3xl">
                {METER.finalLine2}
              </p>
              <button
                onClick={run}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-rose transition-colors hover:text-deeprose"
              >
                <RotateCcw className="h-3.5 w-3.5" /> {METER.replay}
              </button>
            </motion.div>
          )}
        </motion.div>
      </Reveal>

    </section>
  )
}
