/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#040D12', // Black (buttons)
        secondary: '#F1F1F1', // for backgrounds
        danger: '#dc2626',
        success: '#65a30d'
      }
    },
  },
  plugins: [],
}
// https://colorhunt.co/palette/040d12183d3d5c837493b1a6
