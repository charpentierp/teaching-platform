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
        primary: {
          DEFAULT: "#4A5240",
          50:  "#f4f5f2",
          100: "#e4e6df",
          200: "#c9cec1",
          300: "#a8b09d",
          400: "#859178",
          500: "#4A5240",
          600: "#3e4536",
          700: "#33392c",
          800: "#292e23",
          900: "#1f231a",
        },
        accent: {
          DEFAULT: "#C4843C",
          light: "#d9a060",
          dark: "#a06520",
        },
        subject: {
          math:    "#4A5240",
          physics: "#3D5A7A",
          cs:      "#5A3D6B",
        },
        curriculum: {
          ap:     "#C4843C",
          igcse:  "#3D5A7A",
          "bac-fr": "#7A5A3D",
          ib:     "#5A3D6B",
        },
        difficulty: {
          foundations: "#4A7A5A",
          core:        "#4A5A7A",
          advanced:    "#7A4A4A",
          "exam-ready": "#7A7A3D",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body:    ["var(--font-source-serif)", "Georgia", "serif"],
        mono:    ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "var(--font-source-serif)",
            maxWidth: "72ch",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
