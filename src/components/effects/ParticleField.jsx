import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = ['♡', '✦', '✧', '❀', '♡', '·']

// Soft ambient particles drifting up the whole page (CSS-animated, cheap).
export default function ParticleField() {
  const reduced = useReducedMotion()

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        size: 10 + Math.random() * 14,
        duration: 22 + Math.random() * 26,
        delay: -Math.random() * 40,
        opacity: 0.12 + Math.random() * 0.2,
      })),
    []
  )

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-rose"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  )
}
