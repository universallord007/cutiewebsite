import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

const SONG_PATH = '/music/our-song.mp3'

// Elegant floating music control. It only appears when a playable
// file exists at public/music/our-song.mp3 — otherwise it stays hidden.
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.65)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'metadata'
    const onReady = () => setAvailable(true)
    const onError = () => setAvailable(false)
    audio.addEventListener('canplay', onReady)
    audio.addEventListener('error', onError)
    audio.src = SONG_PATH
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeEventListener('canplay', onReady)
      audio.removeEventListener('error', onError)
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch {
      // playback blocked or file vanished — fail quietly
      setPlaying(false)
    }
  }

  if (!available) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-center gap-2 rounded-full border border-petal bg-white/80 p-2 shadow-lifted backdrop-blur-md"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="music player"
          className="flex h-9 w-9 items-center justify-center rounded-full text-deeprose transition-colors hover:bg-blush"
        >
          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-deeprose"
                  style={{ animation: `eq 0.9s ease-in-out ${i * 0.15}s infinite` }}
                />
              ))}
            </span>
          ) : (
            <Music className="h-4 w-4" />
          )}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-3 overflow-hidden pr-1"
            >
              <button
                onClick={toggle}
                aria-label={playing ? 'pause our song' : 'play our song'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deeprose text-cream shadow-glow transition-transform hover:scale-105"
              >
                {playing ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="volume"
                className="love-range w-20"
              />
              <span className="whitespace-nowrap pr-2 text-[11px] uppercase tracking-[0.15em] text-rose">
                our song
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
