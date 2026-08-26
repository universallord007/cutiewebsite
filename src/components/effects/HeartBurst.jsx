import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

const EMOJIS = ['❤️', '💗', '💖', '✨', '🌸']

// A one-shot burst of hearts flying outward from the center of its parent.
// Parent must be `relative`; mount it conditionally and remove it in onDone.
export default function HeartBurst({ count = 22, onDone, className = '' }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6
        const dist = 70 + Math.random() * 150
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          emoji: EMOJIS[i % EMOJIS.length],
          delay: Math.random() * 0.12,
          scale: 0.7 + Math.random() * 0.8,
        }
      }),
    [count]
  )

  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center ${className}`}
    >
      {parts.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: p.scale }}
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
