import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        negro: '#0A0A0A',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DFC06A',
          dark: '#A8883A',
        },
        crema: '#F5F0E8',
        surface: '#111111',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
        original: ['var(--font-syne)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest: '0.2em',
        'super-wide': '0.35em',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.06)',
      },
      backgroundOpacity: {
        '2': '0.02',
        '3': '0.03',
        '8': '0.08',
      },
      animation: {
        'slide-in': 'slideIn 0.4s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'ticker': 'ticker 28s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
