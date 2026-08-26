import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SECRETS } from '../../data/loveData.js'

// Hidden interactions: a tiny corner heart, a typed secret word,
// and a message for staying on the site a while.
export default function Secrets() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)
  const firedRef = useRef({ typed: false, time: false })

  const showToast = (message) => {
    setToast(message)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast(null), 6000)
  }

  // secret: typing the magic word anywhere
  useEffect(() => {
    let buffer = ''
    const onKey = (e) => {
      if (e.key.length !== 1) return
      buffer = (buffer + e.key.toLowerCase()).slice(-12)
      if (!firedRef.current.typed && buffer.endsWith(SECRETS.typedWord)) {
        firedRef.current.typed = true
        showToast(SECRETS.typedMessage)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // secret: staying on the site for a while
  useEffect(() => {
    const t = setTimeout(() => {
      if (!firedRef.current.time) {
        firedRef.current.time = true
        showToast(SECRETS.timeMessage)
      }
    }, SECRETS.timeMinutes * 60 * 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <>
      {/* secret: tiny heart hiding in the corner */}
      <button
        aria-label="a tiny secret"
        onClick={() => showToast(SECRETS.cornerHeart)}
        className="fixed bottom-3 left-3 z-40 select-none text-sm text-rose/40 transition-all duration-300 hover:scale-125 hover:text-rose"
      >
        ♡
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2"
          >
            <div className="flex items-start gap-3 rounded-2xl border border-petal bg-white/85 px-4 py-3.5 shadow-lifted backdrop-blur-md">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-mauve">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
