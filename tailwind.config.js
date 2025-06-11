/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6BD099',
        secondary: '#A3E4C4',
        accent: '#E6FFF2',
        dark: '#1a1a1a',
        'dark-secondary': '#2a2a2a',
        'dark-tertiary': '#3a3a3a',
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