/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['Poppins'],
      },
      colors:{
        "theme": "#f59e0b",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}