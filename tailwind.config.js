/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F4',
        blush: '#FBEDEF',
        petal: '#F6DCE1',
        rose: '#E5A9B5',
        deeprose: '#C97B8B',
        mauve: '#9A6270',
        ink: '#5A3843',
        lavender: '#EAE4F6',
        gold: '#D9B98A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.12)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.12)' },
          '70%': { transform: 'scale(1)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        drift: {
          '0%': { transform: 'translateY(105vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-12vh) rotate(30deg)' },
        },
        eq: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '14px' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.8s ease-in-out infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(201, 123, 139, 0.25)',
        lifted: '0 24px 60px -16px rgba(201, 123, 139, 0.35)',
        glow: '0 0 40px 4px rgba(229, 169, 181, 0.35)',
      },
    },
  },
  plugins: [],
}
