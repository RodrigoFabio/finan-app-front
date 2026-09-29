/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC',
          400: '#818CF8', 500: '#6366F1', 600: '#4F46E5', 700: '#4338CA',
          800: '#3730A3', 900: '#312E81',
        },
        secondary: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
          800: '#1E293B', 900: '#0F172A',
        },
        success: {
          50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7',
          400: '#34D399', 500: '#10B981', 600: '#059669', 700: '#047857',
          800: '#065F46', 900: '#064E3B',
        },
        error: {
          50: '#FFF1F2', 100: '#FFE4E6', 200: '#FECDD3', 300: '#FDA4AF',
          400: '#FB7185', 500: '#F43F5E', 600: '#E11D48', 700: '#BE123C',
          800: '#9F1239', 900: '#881337',
        },
        warning: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D',
          400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309',
          800: '#92400E', 900: '#78350F',
        },
        info: {
          50: '#F0F9FF', 100: '#E0F2FE', 200: '#BAE6FD', 300: '#7DD3FC',
          400: '#38BDF8', 500: '#0EA5E9', 600: '#0284C7', 700: '#0369A1',
          800: '#075985', 900: '#0C4A6E',
        },
        neutral: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
          800: '#1E293B', 900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
        xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem',
        '4xl': '2.25rem', '5xl': '3rem',
      },
      fontWeight: {
        light: '300', normal: '400', medium: '500', semibold: '600', bold: '700',
      },
      lineHeight: {
        none: '1', tight: '1.25', snug: '1.375', normal: '1.5',
        relaxed: '1.625', loose: '2',
      },
      letterSpacing: {
        tighter: '-0.05em', tight: '-0.025em', normal: '0em',
        wide: '0.025em', wider: '0.05em', widest: '0.1em',
      },
      borderRadius: {
        none: '0', sm: '0.25rem', DEFAULT: '0.375rem', md: '0.5rem',
        lg: '0.75rem', xl: '1rem', '2xl': '1.5rem', '3xl': '2rem', full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.04)',
        DEFAULT: '0 4px 8px -2px rgba(15,23,42,0.08), 0 2px 4px -2px rgba(15,23,42,0.04)',
        md: '0 4px 12px -2px rgba(15,23,42,0.10), 0 2px 6px -2px rgba(15,23,42,0.06)',
        lg: '0 12px 24px -4px rgba(15,23,42,0.10), 0 4px 8px -2px rgba(15,23,42,0.06)',
        xl: '0 20px 32px -6px rgba(15,23,42,0.12), 0 8px 16px -4px rgba(15,23,42,0.08)',
        '2xl': '0 32px 48px -8px rgba(15,23,42,0.20)',
        inner: 'inset 0 2px 4px 0 rgba(15,23,42,0.06)',
        glow: '0 0 0 3px rgba(99,102,241,0.15)',
      },
      borderWidth: {
        none: '0', thin: '1px', DEFAULT: '1px', medium: '2px', thick: '4px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0)' },
          '50%': { boxShadow: '0 0 0 6px rgba(99,102,241,0.12)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out both',
        'fade-in-fast': 'fadeIn 0.18s ease-out both',
        'slide-in-left': 'slideInLeft 0.25s ease-out both',
        'scale-in': 'scaleIn 0.2s ease-out both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
        slow: '350ms',
      },
    },
  },
  plugins: [],
};
