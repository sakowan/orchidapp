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
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1.0)' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%': { opacity: '0' },
          '20%': { opacity: '1' },
          '30%': { opacity: '1' },
          '40%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        zoomOut: 'zoomOut 0.75s ease-out',
        fadeInOut: 'fadeInOut 15s infinite',
      },
      transitionProperty: {
        opacity: 'opacity',
      },
      transitionDuration: {
        'fade': '1s',
      },
      transitionTimingFunction: {
        'fade': 'ease-in-out',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.fade-in': {
          opacity: '1',
          transitionProperty: 'opacity',
          transitionDuration: theme('transitionDuration.fade'),
          transitionTimingFunction: theme('transitionTimingFunction.fade'),
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
});