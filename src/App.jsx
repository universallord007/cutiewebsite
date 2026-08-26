import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import Reasons from './components/Reasons.jsx'
import OpenWhen from './components/OpenWhen.jsx'
import Memories from './components/Memories.jsx'
import LoveReasons from './components/LoveReasons.jsx'
import LoveCounter from './components/LoveCounter.jsx'
import HeartGame from './components/HeartGame.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import Surprise from './components/Surprise.jsx'
import Footer from './components/Footer.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import ParticleField from './components/effects/ParticleField.jsx'
import CursorGlow from './components/effects/CursorGlow.jsx'
import Secrets from './components/effects/Secrets.jsx'

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <Intro key="intro" onEnter={() => setEntered(true)} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <CursorGlow />
          <ParticleField />
          <main className="relative z-10">
            <Hero />
            <Reasons />
            <OpenWhen />
            <Memories />
            <LoveReasons />
            <LoveCounter />
            <HeartGame />
            <LoveLetter />
            <Surprise />
            <Footer />
          </main>
          <MusicPlayer />
          <Secrets />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
