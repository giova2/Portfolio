/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: [],
  purge: {
    enabled: process.env.ENABLE_PURGE || false,
    content: ['./src/**/*.html', './src/**/*.scss'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
