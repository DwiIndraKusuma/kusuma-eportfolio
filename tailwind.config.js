/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    container:{
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        'neon':    '#F3FE00',
        'lime':    '#33DE1D',
        'eerie':   '#1A1A1A',
        'smoke':   '#F2F2F2',
        'eerie2':  '#111111',
        'dim':     '#2A2A2A',
        'muted':   '#888888',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"Barlow"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}