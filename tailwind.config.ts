import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "#f0faf4",
            100: "#dcf5e7",
            200: "#bbe9cf",
            300: "#8dd7ae",
            400: "#57be87",
            500: "#33a368",
            600: "#1a7c3e",
            700: "#166636",
            800: "#14502c",
            900: "#104225",
          },
      orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#f59e3a",
          500: "#e8710a",
          600: "#c45e08",
          700: "#9a3412",
          800: "#7c2d12",
          900: "#5b2106",
        },
          cream: "#f8f6f2",
          dark: "#0f1a14",
        },
        primary: {
          50: "#f0faf4",
          100: "#dcf5e7",
          200: "#bbe9cf",
          300: "#8dd7ae",
          400: "#57be87",
          500: "#33a368",
          600: "#1a7c3e",
          700: "#166636",
          800: "#14502c",
          900: "#104225",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#f59e3a",
          500: "#e8710a",
          600: "#c45e08",
          700: "#9a3412",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
        "card-hover": "0 20px 40px -8px rgba(26,124,62,0.15), 0 8px 16px -4px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
