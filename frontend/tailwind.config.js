/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-muted': '#f5f5f5',  // Example hex color
        // Add more custom colors here
      },
    },
  },
  plugins: [],
}