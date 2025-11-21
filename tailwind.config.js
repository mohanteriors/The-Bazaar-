/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/src/**/*.{js,ts,jsx,tsx,mdx}',
    './libs/**/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#35598f',
          secondary: '#2a4570',
          light: '#4a6fa5',
          lighter: '#e8edf5',
        },
      },
    },
  },
  plugins: [],
};
