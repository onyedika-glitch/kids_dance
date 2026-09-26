// Palette sampled from the Figma screenshots in dance.eys-kids.com/static
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
        ink: { DEFAULT: '#333333', soft: '#555555', mute: '#888888' },
        paper: { DEFAULT: '#EEEEEE', light: '#F6F6F6' },
        lilac: '#F5EBFF',
        brand: {
          blue: '#0079E4',
          sky: '#23AADD',
          coral: '#FF5860',
          orange: '#FF9300',
          green: '#8DC21F',
          teal: '#13B5B1',
          cyan: '#0FA8E0',
          purple: '#A66BF0',
          pink: '#E86BB0',
          yellow: '#F2C230',
        },
        band: { sky: '#83C6DF', lavender: '#C3ABE6', ice: '#D4ECF7' },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        display: ['Poppins', '"Noto Sans"', 'sans-serif'],
      },
      maxWidth: {
        content: '1000px',
        wide: '1200px',
      },
      dropShadow: {
        card: '0 3px 6px rgba(0,0,0,0.16)',
        lift: '0 6px 14px rgba(0,0,0,0.14)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
      },
    },
  },
}
