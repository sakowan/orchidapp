/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-muted': '#f3f4f6',  // Example hex color
        'brand-color-light': '#d0d7fe',
        'brand-color-dark': '#9EA8E8',
      },
    },
  },
  plugins: [],
}