import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#eaf0ff",
          200: "#cad9ff",
          300: "#9fbaff",
          400: "#7398ff",
          500: "#4d78ff",
          600: "#345ce6",
          700: "#2a49b8",
          800: "#243f92",
          900: "#1e3576"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
