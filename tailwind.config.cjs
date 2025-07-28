module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        accent: '#a78bfa',
        background: '#f9fafb',
        darkbg: '#18181b',
      },
      keyframes: {
        'typing': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'blink': {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        'typing': 'typing 2s steps(20, end) forwards',
        'blink': 'blink 1s step-end infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
