/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // MoonWay Color Palette
        primary: '#6ec3ec', // Light blue
        secondary: '#b5bff5', // Light purple
        accent: '#616dce', // Medium blue
        dark: '#231c3c', // Dark purple (main background)
        'dark-secondary': '#2f2e85', // Dark blue
        'dark-tertiary': '#3e6a8c', // Medium dark blue
        'purple-light': '#635b94', // Light purple gray
        'blue-dark': '#204361', // Dark blue
        'purple-dark': '#262563', // Dark purple blue
        'gray-purple': '#463e69', // Gray purple
        white: '#ffffff',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        }
      },
      fontFamily: {
        'inter-regular': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
      },
    },
  },
  plugins: [],
}