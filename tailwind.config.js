/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00829B',
          50: '#F0F9FB',
          100: '#E6F3F5',
          200: '#B8E2EB',
          300: '#7AC4D6',
          400: '#3BA6C0',
          500: '#00829B',
          600: '#006C82',
          700: '#005566',
          800: '#003F4C',
          900: '#002932',
        },
        secondary: {
          DEFAULT: '#22A06B',
          50: '#EAF8F2',
          100: '#D5F1E5',
          200: '#ABE3CB',
          300: '#81D5B1',
          400: '#57C797',
          500: '#22A06B',
          600: '#1C8658',
          700: '#156B46',
          800: '#0E5133',
          900: '#073621',
        },
        hospital: {
          bg: '#F4F6F6',
          surface: '#FFFFFF',
          textDark: '#1A1A1A',
          textMuted: '#666666',
          border: '#E5E7EB',
          success: '#22A06B',
          warning: '#E9A23B',
          error: '#DC5555',
          teal: '#00829B',
          tealDark: '#006C82',
          tealLight: '#E6F3F5',
          darkNavy: '#0A1A22',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(32, 43, 39, 0.05), 0 1px 2px -1px rgba(32, 43, 39, 0.05)',
        'card': '0 4px 6px -1px rgba(32, 43, 39, 0.05), 0 2px 4px -2px rgba(32, 43, 39, 0.05)',
        'float': '0 10px 15px -3px rgba(32, 43, 39, 0.08), 0 4px 6px -4px rgba(32, 43, 39, 0.04)',
      },
    },
  },
  plugins: [],
};

