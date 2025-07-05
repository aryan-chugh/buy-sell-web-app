/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Add custom theme extensions here
      colors: {
        // Example custom colors
        primary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          // ... add more shades as needed
        }
      },
      fontFamily: {
        // Example custom fonts
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}