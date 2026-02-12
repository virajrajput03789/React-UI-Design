export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        bg: {
          DEFAULT: '#F8FAFC'
        },
        primary: {
          DEFAULT: '#5B6CFF',
          50: '#EEF1FF',
          100: '#DBE0FF',
          200: '#B7C0FF',
          300: '#93A0FF',
          400: '#6F80FF',
          500: '#5B6CFF',
          600: '#4A58CC',
          700: '#3A4599',
          800: '#293166',
          900: '#191E33'
        },
        sidebar: {
          DEFAULT: '#0F172A'
        },
        text: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
        },
        border: '#E5E7EB',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6'
      },
      boxShadow: {
        card: '0 8px 24px rgba(15, 23, 42, 0.06)'
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px'
      }
    }
  },
  plugins: []
}
