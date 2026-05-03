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
        // ── Legacy scale (kept for existing routes) ──────────────────────────
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
          dark:  "#a06520",
        },

        // ── Stitch / Material Design 3 semantic tokens ───────────────────────
        // Text
        "text-main":   "#F0EFE9",
        "text-muted":  "#A8A89E",
        "text-dim":    "#6A6A62",

        // Backgrounds
        "bg-1": "#0F0F0E",
        "bg-2": "#161614",
        "bg-3": "#1E1E1B",

        // Surfaces
        "surface-container-lowest":  "#0e0e0d",
        "surface-container-low":     "#1c1c1a",
        "surface-container":         "#20201e",
        "surface-container-high":    "#2a2a28",
        "surface-container-highest": "#353533",
        "surface-bright":            "#393937",

        // Borders
        "border-base":   "#2A2A27",
        "border-strong": "#3A3A36",

        // Subject accent colours
        "math-steel":     "#4A7FA5",
        "physics-copper": "#8B6F47",
        "cs-moss":        "#5A7A5A",

        // Semantic callout colours
        "tip-gold":     "#C4A84A",
        "info-blue":    "#8AB4D4",
        "danger-red":   "#D47A7A",
        "success-green":"#6AB48A",

        // Primary variants (Stitch palette)
        "primary-dark":       "#363D2F",
        "primary-light":      "#5C6650",
        "primary-container":  "#4a5240",
        "on-primary-container": "#bcc5ae",
        "primary-fixed-dim":  "#c1cab3",

        // On-colours
        "on-primary":         "#2b3323",
        "on-surface":         "#e5e2df",
        "on-surface-variant": "#c6c7be",
        "on-tertiary":        "#3c2c35",
        "on-error":           "#690005",
        "on-secondary-fixed": "#291800",

        // Misc MD3
        "outline-variant": "#454840",
        "surface-tint":    "#c1cab3",
      },

      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body:    ["var(--font-noto-serif)",  "Georgia", "serif"],
        mono:    ["var(--font-space-grotesk)", "ui-sans-serif", "sans-serif"],
      },

      // ── Stitch named type scale ────────────────────────────────────────────
      fontSize: {
        "h1-hero":   ["36px", { lineHeight: "1.3", fontWeight: "600" }],
        "h1-page":   ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        "h2":        ["22px", { lineHeight: "1.3", fontWeight: "500" }],
        "body-main": ["15px", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm":   ["13px", { lineHeight: "1.65", fontWeight: "400" }],
        "mono-label":["11px", { lineHeight: "1",    letterSpacing: "0.06em", fontWeight: "700" }],
      },

      // ── Stitch named spacing tokens ────────────────────────────────────────
      // These extend (not replace) Tailwind's numeric scale.
      // Usage: p-xs, gap-sm, px-lg, py-xl, max-w-site-max etc.
      spacing: {
        "xs":          "4px",
        "sm":          "8px",
        "md":          "16px",
        "lg":          "24px",
        "xl":          "40px",
        "site-max":    "1200px",
        "content-max": "740px",
      },
    },
  },
  plugins: [],
};

export default config;
