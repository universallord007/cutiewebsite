// ═══════════════════════════════════════════════════════════════════
// 💌  THIS IS THE ONLY FILE YOU NEED TO EDIT.
//
//  Everything she reads on the website lives here.
//  Replace the [PLACEHOLDERS] and the sample lines with your own
//  words — the more specific and "you two", the better it lands.
// ═══════════════════════════════════════════════════════════════════

export const CONFIG = {
  herName: 'Cutiepie', // her name (or the nickname only you call her)
  yourName: 'Your Favourite Idiot', // how you sign off
  relationshipStartDate: '2024-02-14', // YYYY-MM-DD — the day it all started
}

// ── 1. Cinematic opening ───────────────────────────────────────────
export const INTRO = {
  line1: 'Hey, you. ❤️',
  line2: 'I made a tiny universe for you.',
  button: 'Enter my heart →',
  warning: 'Warning: excessive cuteness ahead.',
}

// ── 2. Hero ────────────────────────────────────────────────────────
export const HERO = {
  headlineTop: 'Out of everyone in this world,',
  headlineBottom: 'I somehow got YOU.',
  subtitle: "And honestly... I still don't know how I got this lucky.",
  scrollHint: "there's more ↓",
}

// ── 3. Why you? ────────────────────────────────────────────────────
export const REASONS = [
  { emoji: '😊', text: 'Your smile should honestly be illegal.' },
  { emoji: '☕', text: 'You somehow make ordinary days feel special.' },
  { emoji: '🌪️', text: 'You are simultaneously my peace and my biggest headache.' },
  { emoji: '🎧', text: 'I could listen to you talk for hours. Even about [THING SHE RANTS ABOUT].' },
  { emoji: '🌱', text: 'You make me want to become a better version of myself.' },
  { emoji: '🤝', text: 'You still laugh at [OUR INSIDE JOKE], and that says everything.' },
]

// ── 4. Open when... ────────────────────────────────────────────────
export const OPEN_WHEN = [
  {
    emoji: '💌',
    title: "you're missing me",
    message:
      "Hey. I know. I miss you too — probably more, but let's not argue about it right now.\n\nClose your eyes for a second and think about [THAT ONE MEMORY]. That's us. That's not going anywhere.\n\nNow text me. You know you want to.",
  },
  {
    emoji: '🌙',
    title: "you can't sleep",
    message:
      "Okay, insomniac. First of all — put the phone down after this.\n\nPretend my arm is around you. Pretend I'm doing the annoying thing where I [HER FAVOURITE ANNOYING THING YOU DO].\n\nGoodnight. Dream of me. That's an order.",
  },
  {
    emoji: '🥺',
    title: "you're feeling sad",
    message:
      "Hey hey hey. Come here.\n\nWhatever it is — it's temporary. You've survived 100% of your worst days so far, and you did most of them while looking unfairly cute.\n\nI'm on your team. Always. Even when the enemy is your own brain.",
  },
  {
    emoji: '😤',
    title: "you're angry at me",
    message:
      "So... I did something dumb, didn't I.\n\nIn my defence — actually no, I have no defence. You're probably right.\n\nI'm sorry. Even when I'm being an idiot, I'm YOUR idiot. That's legally binding now, sorry.",
  },
  {
    emoji: '❤️',
    title: 'you need a reminder',
    message:
      "In case nobody told you today:\n\nYou are loved. Very much. Aggressively, even.\n\nBy me. Specifically me. Forever. Okay bye.",
  },
  {
    emoji: '✨',
    title: 'you want to smile',
    message:
      "Remember when [FUNNY MEMORY]? Yeah. I still laugh about that.\n\nAlso, quick reminder that you once said \"[THING SHE ALWAYS SAYS]\" and I've never let it go.\n\nNever will. It's my favourite thing.",
  },
]

// ── 5. Our memories ────────────────────────────────────────────────
// No photos needed — each memory gets a pretty art card instead.
// `emoji` is the centerpiece, `gradient` is its Tailwind gradient.
export const MEMORIES = [
  {
    type: 'image',
    src: '/images_webcutie/photo_8.jpeg',
    gradient: 'from-rose via-petal to-lavender',
    date: 'Expressions',
    title: 'That day ❤️',
    description: "The day I realized you weren't just another person.",
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_4.jpeg',
    gradient: 'from-gold/70 via-petal to-blush',
    date: 'Heavenly bliss',
    title: 'The cutest laugh',
    description: 'Your laughter brightens up the entire atmosphere❤️.',
  },
  {
    type: 'video',
    src: '/images_webcutie/video_2.mp4',
    gradient: 'from-lavender via-blush to-petal',
    date: 'Some random day',
    title: 'Nothing special (everything special)',
    description: 'We did absolutely nothing that day. It was perfect.',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_1.jpeg',
    gradient: 'from-petal via-rose/70 to-lavender',
    date: 'Somewhere in my heart',
    title: 'My prettiest lady',
    description: "Still choosing you. Still can't believe you chose me back.",
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_7.jpeg',
    gradient: 'from-blush via-petal to-gold/70',
    date: 'A good one',
    title: 'That smile',
    description: 'This is the exact face that started this whole mess.',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_6.jpeg',
    gradient: 'from-rose via-lavender to-petal',
    date: 'Somewhere nice',
    title: 'I love You alotttt',
    description: "No caption needed. This one just speaks for itself.",
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_2.jpeg',
    gradient: 'from-lavender via-rose/70 to-blush',
    date: 'That one moment at IIT Guwahati',
    title: 'Beautiful memory',
    description: 'One of the best moments I will adore forever !!!',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_3.jpeg',
    gradient: 'from-gold/70 via-blush to-lavender',
    date: 'Fun times',
    title: 'Doing silly random things 😂❤️',
    description: 'Seeing you do random things is one of my favourite hobby.',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_9.jpeg',
    gradient: 'from-petal via-lavender to-rose',
    date: 'Cute❤️',
    title: 'My Cutie Being a cutie',
    description: 'Nothing just cuteness !!!',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_10.jpeg',
    gradient: 'from-blush via-rose/70 to-gold/70',
    date: 'Somewhere ',
    title: 'Beautiful lady ❤️',
    description: 'My chotu don ❤️',
  },
  {
    type: 'image',
    src: '/images_webcutie/photo_11.jpeg',
    gradient: 'from-rose via-petal to-blush',
    date: 'Lately',
    title: 'This one right here',
    description: 'My favourite recent proof that I got lucky.',
  },
  {
    type: 'video',
    src: '/images_webcutie/video_1.mp4',
    gradient: 'from-lavender via-blush to-rose',
    date: 'Caught on camera',
    title: 'That moment, moving',
    description: "Some things a photo just can't hold — so here's the video.",
  }
]

// ── 6. Things I love about you ─────────────────────────────────────
export const LOVE_BUBBLES = [
  'Your laugh',
  'Your eyes',
  'Your voice',
  'Your random rants',
  'Your cute anger',
  'Your hugs',
  'Your existence',
]

export const LOVE_BUBBLES_FINAL = 'And somehow, this list could go on forever.'

// ── 7. The "how much" meter ────────────────────────────────────────
// A very scientific instrument. It fills to 100%... then breaks.
export const METER = {
  heading: 'a very scientific measurement',
  title: 'How much do I like you?',
  statuses: [
    { at: 0, label: 'calibrating...' },
    { at: 35, label: 'a normal, respectable amount' },
    { at: 70, label: 'okay, above the safe limit' },
    { at: 100, label: 'maximum reached' },
    { at: 140, label: 'wait. the scale broke' },
    { at: 300, label: 'measurement failed. too much.' },
  ],
  finalStatus: 'conclusion: unmeasurable',
  finalLine1: "It's only been a few weeks...",
  finalLine2: 'Imagine what forever looks like. ❤️',
  replay: 'measure again',
}

// ── 8. Mini game ───────────────────────────────────────────────────
export const GAME = {
  title: 'Catch the hearts ❤️',
  subtitle: 'They keep escaping. Just like you when I try to take a photo of you.',
  target: 10,
  winTitle: 'Okay okay... you win.',
  winSubtitle: 'But I still love you more. 😌❤️',
  replay: 'one more round',
}

// ── 9. The letter ──────────────────────────────────────────────────
// {her} and {me} get replaced with the names from CONFIG.
export const LETTER = {
  heading: 'A letter for you',
  body: `Dear {her},

I don't think I say this enough...

You have become such a beautiful part of my life.

Through the good days, the stupid arguments, the random laughs, the late-night conversations and all the little moments in between... I wouldn't trade what we have for anything.

You put up with my nonsense. You laugh at my worst jokes (sometimes). You do [HER CUTE HABIT] and pretend you don't, and it kills me every time.

If I could choose one person to annoy for the rest of my life...

well...

you already know who I'd choose. ❤️

Always yours,
{me}`,
}

// ── 10. The surprise button ────────────────────────────────────────
export const SURPRISE = {
  button: "Don't click this 👀",
  hint: '(seriously, don’t)',
  line1: 'Okay... I have one more thing to say.',
  line2: 'I LOVE YOU.',
  close: 'okay, my heart is full 🥹',
}

// ── 11. Final section ──────────────────────────────────────────────
export const FINAL = {
  line1: 'If I had to choose again...',
  line2: "I'd still choose you.",
  line3: 'Every. Single. Time. ❤️',
  footer: 'Made with an unreasonable amount of love.',
}

// ── Secrets 🤫 (hidden interactions) ──────────────────────────────
export const SECRETS = {
  // tiny heart hiding in the bottom-left corner of the screen
  cornerHeart: "You found the hidden heart. Of course you did — you already have mine. 🤍",
  // double-clicking her name in the hero
  doubleClickName: 'You double-clicked your own name. Obsessed with yourself? Same. 😌',
  // the tiny star in the final section
  star: 'I would wish on this star, but I already have you.',
  // typing this word anywhere on the page (desktop keyboards)
  typedWord: 'love',
  typedMessage: "You typed \"love\"... were you thinking about me? Suspicious. 👀❤️",
  // after this many minutes on the site
  timeMinutes: 3,
  timeMessage: "You've been here a while... I like that you didn't want to leave. Me neither.",
}
