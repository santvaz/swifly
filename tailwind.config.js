/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'grape': {
          '50': '#f8f5fd',
          '100': '#f0edfa',
          '200': '#e4def6',
          '300': '#d1c3ef',
          '400': '#b9a0e5',
          '500': '#a079d9',
          '600': '#905ccb',
          '700': '#7f4ab7',
          '800': '#6b3d9a',
          '900': '#59347e',
          '950': '#3d235c',
        },
        'plum': {
          '50': '#fdf6fd',
          '100': '#faecfb',
          '200': '#f6d7f7',
          '300': '#efb8ef',
          '400': '#e58de4',
          '500': '#d461d2',
          '600': '#b841b3',
          '700': '#983392',
          '800': '#7d2c77',
          '900': '#672862',
          '950': '#42103c',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}