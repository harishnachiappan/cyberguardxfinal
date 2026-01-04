/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // important for React
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['"Ubuntu"', "system-ui", "sans-serif"],
      },
      colors: {
        darkbg: "#020617",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
