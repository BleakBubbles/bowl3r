/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blurple': '#7289DA'
      },
      fontFamily: {
        poppinsBlack: ['"Poppins Black"', 'poppinsBlack'],
        poppinsRegular: ['"Poppins Regular"', 'poppinsRegular']
      }
    },
  },
  plugins: [],
}