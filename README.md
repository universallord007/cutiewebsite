# a tiny universe for her ❤️

A handcrafted, frontend-only romantic website. React + Vite + Tailwind + Framer Motion. No backend, no database — everything runs in the browser.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

To build for deployment (Netlify / Vercel / GitHub Pages):

```bash
npm run build
```

The finished site lands in `dist/`.

## Personalize it (the important part)

**Edit ONE file: `src/data/loveData.js`**

Everything she reads lives there:

| What | Where in the file |
| --- | --- |
| Her name, your name, relationship start date | `CONFIG` |
| Opening screen lines | `INTRO` |
| Hero headline + subtitle | `HERO` |
| "Why you?" cards | `REASONS` |
| The six "Open when..." letters | `OPEN_WHEN` |
| Memory timeline entries | `MEMORIES` |
| Floating love bubbles | `LOVE_BUBBLES` |
| The "how much do I like you?" meter | `METER` |
| Mini-game text + target score | `GAME` |
| The typewriter love letter | `LETTER` |
| The "don't click this" surprise | `SURPRISE` |
| Final scene + footer | `FINAL` |
| All 5 hidden secrets | `SECRETS` |

Search the file for `[PLACEHOLDERS]` like `[OUR INSIDE JOKE]`, `[HER CUTE HABIT]`, `[THAT ONE MEMORY]` and replace them with your own words. Specific beats poetic — every time.

## Memories

No photos needed — each memory in the timeline is a decorative art card with an emoji centerpiece and a soft gradient. Add, remove, or edit memories in the `MEMORIES` array in `loveData.js` (each has an `emoji`, `gradient`, `date`, `title`, and `description`).

## Music

Put your song at `public/music/our-song.mp3`. The floating music player (bottom-right) appears automatically when the file exists and stays hidden when it doesn't. It never autoplays — she presses play.

## The 5 hidden secrets 🤫

So you can point her at them if she misses them:

1. A tiny `♡` hides in the bottom-left corner of the screen.
2. Double-click her name in the hero.
3. Hover/tap the tiny gold `✦` star in the final section.
4. Type the word `love` anywhere (desktop keyboard).
5. Stay on the site for 3 minutes.

All the secret messages are editable in `SECRETS` inside `loveData.js`.

## Notes

- Fully responsive and touch-friendly — built to be opened on her phone.
- Respects `prefers-reduced-motion`.
