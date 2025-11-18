/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0F',
        'bg-secondary': '#13131A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#E0E0E0',
        'accent-pink': '#E6007A',
        'accent-magenta': '#FF006B',
        'mesh-pink': '#FF0080',
        'slate-50': '#F5F5F7',
        'slate-100': '#E8E8ED',
        'slate-200': '#D2D2D7',
        'slate-900': '#1D1D1F',
        'gray-light': '#86868B',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 40px rgba(230, 0, 122, 0.6)',
        'glow-magenta': '0 0 60px rgba(255, 0, 128, 0.4)',
        'glow-pink-hover': '0 0 50px rgba(230, 0, 122, 0.8)',
        'card-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-dark-hover': '0 12px 48px rgba(255, 0, 128, 0.3)',
      },
    },
  },
  plugins: [],
}

