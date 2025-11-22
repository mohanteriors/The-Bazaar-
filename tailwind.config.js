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
          // Primary Colors (from Brand Kit)
          primary: '#0057D9',      // Primary Brand Blue
          navy: '#0A1A2F',         // Dark Navy
          gray: '#F2F4F7',         // Neutral Gray
          // Secondary Colors
          success: '#2EB67D',      // Success Green
          warning: '#F4C51A',      // Warning Yellow
          danger: '#D92E2E',       // Danger Red
          accent: '#6C4BF4',       // Accent Purple
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
