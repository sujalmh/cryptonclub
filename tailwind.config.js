/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0a',
          dark: '#111111',
          neon: '#39FF14',
          dim: '#1b4d24',
          alert: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            maxWidth: '100%',

            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#39FF14',
            '--tw-prose-code': '#39FF14',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#0a0a0a',
            '--tw-prose-quotes': '#9ca3af',
            '--tw-prose-bullets': '#39FF14',
            '--tw-prose-counters': '#39FF14',
            '--tw-prose-hr': '#1b4d24',

            h1: {
              color: '#ffffff',
              fontWeight: '800',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            h2: {
              color: '#ffffff',
              fontWeight: '700',
              borderBottom: '1px solid #1b4d24',
              paddingBottom: '0.75rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              color: '#ffffff',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            strong: { color: '#39FF14' },
            a: {
              color: '#39FF14',
              textDecoration: 'none',
              borderBottom: '1px dashed #39FF14',
              '&:hover': { color: '#ffffff', borderBottomColor: '#ffffff' }
            },
            code: {
              color: '#39FF14',
              backgroundColor: 'rgba(57,255,20,0.1)',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontFamily: '"Fira Code", monospace',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#050505',
              border: '1px solid #1b4d24',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            blockquote: {
              borderLeftColor: '#39FF14',
              borderLeftWidth: '4px',
              backgroundColor: 'rgba(57,255,20,0.05)',
              color: '#e5e7eb',
              fontStyle: 'normal',
              padding: '1rem 1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            }
          }
        }
      }),
      animation: {
        'cursor-blink': 'blink 1s step-start infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'cursor-blink': 'blink 1s step-start infinite',
        'glitch': 'glitch 1s linear infinite',
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}