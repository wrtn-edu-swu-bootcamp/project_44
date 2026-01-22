import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (버건디 계열)
        burgundy: {
          DEFAULT: '#8B1538',
          dark: '#6B0F2A',
          light: '#A51B45',
          lighter: '#C42A5A',
        },
        // Status Colors
        'empty-room': {
          DEFAULT: '#90EE90',
          bright: '#B4FFB4',
          dark: '#7ACC7A',
        },
        'occupied': {
          DEFAULT: '#DC2626',
          light: '#F87171',
          dark: '#B91C1C',
        },
        'upcoming': {
          DEFAULT: '#FBBF24',
          light: '#FCD34D',
          dark: '#D97706',
        },
        // Neutral Colors
        gray: {
          DEFAULT: '#6B7280',
          light: '#E5E7EB',
          dark: '#374151',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        background: {
          DEFAULT: '#F9FAFB',
          card: '#FFFFFF',
        },
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Malgun Gothic', '맑은 고딕', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-large': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        body: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-small': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        button: ['14px', { lineHeight: '1.2', fontWeight: '500' }],
        caption: ['11px', { lineHeight: '1.3', fontWeight: '400' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 2px 4px rgba(0, 0, 0, 0.1)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
