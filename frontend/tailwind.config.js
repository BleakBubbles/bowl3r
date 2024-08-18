/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blurple': '#5865F2',
        'dark-blurple': '#454FBF',
        'legacy-blurple': '#7289DA',
        'legacy-dark-blurple' : '#4E5D94'
      },
      fontFamily: {
        poppinsBlack: ['"Poppins Black"', 'poppinsBlack'],
        poppinsRegular: ['"Poppins Regular"', 'poppinsRegular'],
        poppinsSemiBold: ['"Poppins SemiBold"', 'poppinsSemiBold']
      }
    },
  },
  plugins: [],
}