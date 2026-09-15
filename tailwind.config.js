/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'light-text': 'var(--light-text)',
        white: 'var(--white)',
        'dark-text': 'var(--dark-text)'
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
