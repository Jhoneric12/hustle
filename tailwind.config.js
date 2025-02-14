/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        'main-color': '#4285F4',
        'font-color': '#424242',
        'accent-color': '#E9F2FF',
        'personal': '#ADCCFF',
        'work': '#FFDFAF',
        'organization': '#FFB2AD',
        'school': '#B2FFAD',
        'grocery': '#F6DEE6'
      }
    },
  },
  plugins: [],
};
