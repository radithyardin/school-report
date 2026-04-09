/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1814',
          2: '#3d3a35',
          3: '#7a776f',
          4: '#b5b2aa',
        },
        paper: {
          DEFAULT: '#faf9f7',
          2: '#f2f0ec',
          3: '#e8e5df',
        },
        accent: '#c8410a',
        success: '#2d6a2d',
        warning: '#8a5a00',
        danger: '#a82424',
        info: '#1a4a7a',
        sidebar: '#141210',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 24s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
