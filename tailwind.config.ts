import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        clay: {
          50:  '#fdf6f2',
          100: '#f9ebe2',
          200: '#f0d0b8',
          300: '#e3aa88',
          400: '#d4845A',
          500: '#B8775A',
          600: '#9e6048',
          700: '#7e4c3a',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f3f0',
          200: '#eceae6',
          300: '#dddad4',
          400: '#b8b4ac',
          500: '#8a8580',
          600: '#6b6762',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
