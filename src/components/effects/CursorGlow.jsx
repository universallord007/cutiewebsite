import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// A soft rose glow that lazily follows the mouse (desktop only).
export default function CursorGlow() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [reduced])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-50 blur-3xl transition-transform duration-500 ease-out"
      style={{ background: 'radial-gradient(circle, rgba(229,169,181,0.30), transparent 62%)' }}
    />
  )
}
