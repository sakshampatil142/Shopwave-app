/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base light surfaces (Amazon-style: light grey page, white cards)
        bg: "#EAEDED",           // page background — light grey
        surface: "#FFFFFF",       // card background — white
        surface2: "#F7F8F8",      // subtle hover / input background
        border: "#D5D9D9",
        // Text
        ink: "#0F1111",           // primary text — near-black
        muted: "#565959",         // secondary text — grey
        // Header navy (Amazon-style dark header, distinct from card surfaces)
        navy: {
          DEFAULT: "#131921",
          800: "#131921",
          700: "#232F3E",
          600: "#37475A",
        },
        // Brand accents
        accent: {
          400: "#FEBD69",
          500: "#FF9900",         // primary CTA — Amazon orange
          600: "#E88A00",
          700: "#C97600",
        },
        amber: {
          400: "#E3122A",
          500: "#CC0C39",         // deal/discount red
          600: "#B10021",
        },
        magenta: {
          400: "#FB7185",
          500: "#E11D48",         // wishlist / secondary accent
        },
        link: "#007185",          // Amazon-style teal link color
      },
      fontFamily: {
        display: ["'Inter'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,17,17,0.08), 0 0 0 1px rgba(213,217,217,0.7)",
        cardHover: "0 4px 14px rgba(15,17,17,0.16)",
        glow: "0 0 0 3px rgba(255,153,0,0.35)",
      },
      backgroundImage: {
        "hero-grid": "none",
      },
    },
  },
  plugins: [],
};
