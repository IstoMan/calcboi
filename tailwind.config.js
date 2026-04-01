/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        calculator: {
          bg: '#000000',
          display: '#000000',
          'key-num': '#333333',
          'key-fn': '#a5a5a5',
          'key-fn-alt': '#d4d4d2',
          operator: '#ff9500',
          'operator-active': '#ff9f0a',
          surface: '#1c1c1c',
          'key-dark': '#505050',
          text: '#ffffff',
          'text-muted': '#a5a5a5',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        'geist-sans': ['Geist_400Regular'],
        'geist-medium': ['Geist_500Medium'],
        'geist-semibold': ['Geist_600SemiBold'],
        'geist-bold': ['Geist_700Bold'],
      },
    },
  },
  plugins: [],
};
