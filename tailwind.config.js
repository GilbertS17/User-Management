export default {
  darkMode: "class", // Enable dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js, ts, jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3251d0",
        "primary-dark": "#2740a6",
        "primary-super-dark": "#051657",
      },
    },
  },
  plugins: [],
};
