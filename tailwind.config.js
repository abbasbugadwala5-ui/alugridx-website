/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/admin/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D1B3E',
        'primary-dark': '#060e22',
        'primary-light': '#EEF1F8',
        'primary-mid': '#1A2D5A',
        accent: '#0D1B3E',
        navy: '#0D1B3E',
        'navy-light': '#1A2D5A',
        dark: '#111827',
        muted: '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(26,86,219,0.15)',
        blue: '0 4px 24px rgba(26,86,219,0.3)',
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
