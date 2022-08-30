/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: 'repeat(18, minmax(0, 1fr))',
      },
      fontSize: {
        tag: ['0.625rem', '0.75rem'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
