/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'disney-blue': 'rgb(0 99 178 / <alpha-value>)',
        'disney-purple': 'rgb(107 78 156 / <alpha-value>)',
        'disney-yellow': 'rgb(255 215 0 / <alpha-value>)',
        'disney-red': 'rgb(228 0 43 / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
