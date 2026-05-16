/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/admin/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Brand
        navy: '#0D1B3E',
        'navy-light': '#1A2D5A',
        'navy-dark': '#060e22',
        accent: '#1A56DB',
        'accent-dark': '#1747B8',
        blue: '#1A56DB',

        // Surfaces
        offwhite: '#F8FAFC',
        hairline: '#E2E8F0',

        // Text
        ink: '#0D1B3E',
        slate: '#334155',
        muted: '#64748B',

        // Legacy aliases (kept so older class names keep working)
        primary: '#0D1B3E',
        'primary-dark': '#060e22',
        'primary-light': '#EEF1F8',
        'primary-mid': '#1A2D5A',
        dark: '#0D1B3E',
        border: '#E2E8F0',
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        // Tight, restrained scale (1 H1 / 1 H2 / 1 H3 / 1 body)
        h1: ['clamp(2.5rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 3vw, 2.5rem)',  { lineHeight: '1.15', letterSpacing: '-0.005em', fontWeight: '700' }],
        h3: ['1.25rem',                       { lineHeight: '1.3', fontWeight: '700' }],
        body: ['0.9375rem',                   { lineHeight: '1.6' }],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        // Borders > shadows. One subtle hover shadow only.
        none: 'none',
        hover: '0 4px 14px rgba(13, 27, 62, 0.06)',
      },
      borderColor: {
        DEFAULT: '#E2E8F0',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in-left': 'slideInLeft 0.6s ease forwards',
        'count-up': 'countUp 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
