import { motion } from 'framer-motion'
import { REASONS } from '../data/loveData.js'
import Reveal from './effects/Reveal.jsx'

export default function Reasons() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-rose">a few facts</p>
        <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">Why you?</h2>
        <p className="mt-4 text-mauve">Glad you asked. I made a list.</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
            className="group rounded-3xl border border-petal/80 bg-white/70 p-7 shadow-soft backdrop-blur-sm transition-shadow duration-300 hover:shadow-lifted"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-2xl transition-transform duration-300 group-hover:scale-110">
              {reason.emoji}
            </span>
            <p className="mt-5 font-display text-xl leading-snug text-ink sm:text-[1.35rem]">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
