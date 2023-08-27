/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding:"1.5rem"
    },
    extend: {
      colors: {
        primary: "#284B63",
        secondary: "#FFFFFF",
        tertiary: "#3C6E71",
        black: "#353535",
        gray: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
