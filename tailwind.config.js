/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
      gridTemplateColumns: {
        fill: 'repeat(auto-fill, minmax(100px, 1fr));',
        fit: 'repeat(auto-fit, minmax(100px, 1fr));',
      },
    },
  },
  plugins: [],
};
