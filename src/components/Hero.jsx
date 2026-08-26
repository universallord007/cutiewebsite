import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG, HERO, SECRETS } from '../data/loveData.js'
import HeartBurst from './effects/HeartBurst.jsx'

const ORBITERS = ['✦', '♡', '✧', '❀']

export default function Hero() {
  const [burst, setBurst] = useState(false)
  const [secret, setSecret] = useState(false)

  // secret: double-clicking her name
  const onDoubleClick = () => {
    setBurst(true)
    setSecret(true)
    setTimeout(() => setSecret(false), 5000)
  }

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/80 blur-3xl" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative font-display text-4xl leading-tight text-ink sm:text-6xl md:text-7xl"
      >
        {HERO.headlineTop}
        <br />
        <span className="italic">{HERO.headlineBottom}</span>
      </motion.h1>

      {/* her name with orbiting sparkles + heartbeat heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
        className="relative mt-10 sm:mt-14"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-12 sm:-inset-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {ORBITERS.map((g, i) => (
            <span
              key={i}
              className="absolute text-lg text-gold sm:text-xl"
              style={{
                left: `${50 + 46 * Math.cos((i / ORBITERS.length) * Math.PI * 2)}%`,
                top: `${50 + 46 * Math.sin((i / ORBITERS.length) * Math.PI * 2)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {g}
            </span>
          ))}
        </motion.div>

        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 animate-heartbeat select-none text-7xl text-rose/25 sm:text-8xl"
        >
          ❤
        </span>

        <h2
          onDoubleClick={onDoubleClick}
          title="…try double-clicking me"
          className="relative cursor-pointer select-none font-display text-6xl italic text-deeprose drop-shadow-[0_0_24px_rgba(229,169,181,0.6)] sm:text-8xl"
        >
          {CONFIG.herName}
        </h2>
        {burst && <HeartBurst count={30} onDone={() => setBurst(false)} />}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="mt-8 max-w-md text-base font-light text-mauve sm:text-lg"
      >
        {secret ? SECRETS.doubleClickName : HERO.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-1"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-rose">{HERO.scrollHint}</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-rose"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
