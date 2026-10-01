// Tiny Explorers Hub palette, taken from the channel logo (token names kept from the original design system)
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
    './data/**/*.ts',
    './composables/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        // "Explorers" navy
        ink: { DEFAULT: '#0B1F4F', soft: '#3A4A73', mute: '#6B7897' },
        // Cream from the logo's cloud badge
        paper: { DEFAULT: '#FCEFD9', light: '#FFF8EE' },
        lilac: '#EDE3FB',
        brand: {
          blue: '#1565C0',
          sky: '#1E88E5', // the blue "T"
          coral: '#E53935', // the red "y"
          orange: '#EE6D0C', // the "Hub" badge
          green: '#3DAA3C', // the green "n"
          teal: '#13A89E',
          cyan: '#74CFF9', // sky behind the explorer
          purple: '#8E5CD9',
          pink: '#E86BB0',
          yellow: '#FFB800', // the yellow "i"
        },
        band: { sky: '#D8ECFD', lavender: '#EDE3FB', ice: '#E6F6FE' },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1080px',
        wide: '1200px',
      },
      dropShadow: {
        card: '0 3px 6px rgba(0,0,0,0.16)',
        lift: '0 6px 14px rgba(0,0,0,0.14)',
      },
      gridTemplateColumns: { 13: 'repeat(13, minmax(0, 1fr))' },
      boxShadow: {
        pop: '0 4px 0 rgba(11,31,79,0.12)',
      },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        bob: 'bob 3s ease-in-out infinite',
      },
    },
  },
}
