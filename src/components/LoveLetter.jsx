import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CONFIG, LETTER } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

const fullText = LETTER.body
  .replaceAll('{her}', CONFIG.herName)
  .replaceAll('{me}', CONFIG.yourName)

export default function LoveLetter() {
  const paperRef = useRef(null)
  const inView = useInView(paperRef, { once: true, margin: '-120px' })
  const reduced = useReducedMotion()
  const [chars, setChars] = useState(0)
  const done = chars >= fullText.length

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setChars(fullText.length)
      return
    }
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= fullText.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 30)
    return () => clearInterval(id)
  }, [inView, reduced])

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-rose">from me, to you</p>
        <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">{LETTER.heading}</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          ref={paperRef}
          className="relative mt-14 rounded-[2rem] border border-petal bg-white/85 p-8 shadow-lifted backdrop-blur-sm sm:p-12"
        >
          {/* wax-seal-ish detail */}
          <span className="absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-deeprose text-lg text-cream shadow-glow">
            ❤
          </span>

          <p className="min-h-[16rem] whitespace-pre-line font-hand text-[1.5rem] leading-relaxed text-ink sm:text-[1.65rem]">
            {fullText.slice(0, chars)}
            {!done && inView && <span className="typewriter-cursor" aria-hidden />}
          </p>

          {!done && inView && !reduced && (
            <button
              onClick={() => setChars(fullText.length)}
              className="mt-6 text-xs uppercase tracking-[0.2em] text-rose transition-colors hover:text-deeprose"
            >
              too impatient? read it all →
            </button>
          )}

          {done && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-right text-2xl"
            >
              💌
            </motion.p>
          )}
        </div>
      </Reveal>
    </section>
  )
}
