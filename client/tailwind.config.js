/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Industrial-floor palette: gunmetal/steel-blue chrome (the "machine
        // housing") with two working-site signal colors doing real duty as
        // status/role indicators, the way hi-vis vests and panel lights do
        // on a shop floor - not decoration.
        primary: {
          // Steel blue - the operational/interactive color.
          50: '#eef4f9',
          100: '#d9e6f0',
          200: '#b3cce0',
          300: '#84add0',
          400: '#4d84ae',
          500: '#2e6690',
          600: '#265576',
          700: '#1f4560',
          800: '#1a3a50',
          900: '#13293a',
        },
        gunmetal: {
          // The dark chrome: sidebar, headers-on-dark, high-emphasis text.
          50: '#f2f4f5',
          100: '#dde3e6',
          200: '#b6c1c8',
          300: '#8a99a3',
          400: '#5e6f7a',
          500: '#3f4c56',
          600: '#2c3841',
          700: '#212b32',
          800: '#182027',
          900: '#10161b',
        },
        amber: {
          // Signal amber - caution tape / forklift beacon. Primary accent.
          50: '#fdf6e3',
          100: '#faeac2',
          200: '#f4d485',
          300: '#eebd4d',
          400: '#e7a520',
          500: '#c9860f',
          600: '#a4680b',
          700: '#7d4f0c',
        },
        safety: {
          // Safety orange - used sparingly for alerts/critical CTAs, the
          // way hazard markings get used on equipment.
          400: '#f2703a',
          500: '#e2551d',
          600: '#c04416',
        },
        rivet: {
          // Working green - on-track / approved / present states.
          400: '#4fa473',
          500: '#3a8a5c',
          600: '#2c6c46',
        },
        accent: {
          400: '#e7a520',
          500: '#c9860f',
          600: '#a4680b',
        },
        surface: '#eef1f3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
