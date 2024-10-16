/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#5A607F',
        customBlue: '#414480'
      },
    },
  },
  plugins: [],
}
