/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B9AAA',
          dark: '#16808D',
        },
        navy: {
          DEFAULT: '#142C52',
        },
        text: {
          dark: '#071426',
        },
        background: {
          DEFAULT: '#F4F7FA',
        },
        surface: {
          DEFAULT: '#FFFFFF',
        },
        success: {
          DEFAULT: '#22C55E',
        },
        alert: {
          DEFAULT: '#EF4444',
        }
      }
    },
  },
  plugins: [],
}