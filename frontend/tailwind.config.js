/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-muted': '#f3f4f6',
        'colour-7': '#6071d9',
        'colour-6': '#7583de',
        'colour-5': '#8996e3',
        'colour-4': '#9ea8e8',
        'colour-3': '#b3baed',
        'colour-2': '#c7cdf2',
        'colour-1': '#dcdff7',
      },
    },
  },
  plugins: [],
});