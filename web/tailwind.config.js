/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
