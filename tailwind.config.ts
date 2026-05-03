import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#fce8f0',
          DEFAULT: '#f8c8dc',
          mid: '#f0a0c0',
        },
        cherry: {
          DEFAULT: '#d14b6a',
          dark: '#b03358',
        },
        brown: {
          DEFAULT: '#6b2d2d',
          light: '#9b5555',
        },
        cream: '#fff5f8',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fadeInUp 0.5s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
