/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['"Poppins"', "sans-serif"],
        fira: ['"Fira Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
}

