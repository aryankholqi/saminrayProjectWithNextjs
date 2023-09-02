/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.3rem",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT:"#546a7b",
          100:"#4c5f6f",
          200:"#435562",
          300:"#3b4a56",
          400:"#32404a"
        },
        secondary: {
          DEFAULT: "#FDFDFF",
          100: "#e4e4e6",
          200: "#cacacc",
        },
        tertiary: {
          DEFAULT: "#62929E",
          100: "#58838e",
          200: "#4e757e",
          300: "#45666f",
          400: "#3b585f",
          500: "#31494f"
        },
        black: {
          DEFAULT: "#393D3F",
          100: "#333739",
          200: "#2e3132",
          300: "#282b2c",
          400: "#222526",
        },
        gray: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
