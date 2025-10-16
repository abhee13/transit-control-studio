/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7fb",
          100: "#eef1f8",
          200: "#dde3f0",
          300: "#c0cbe2",
          400: "#9aaacb",
          500: "#7d8fb8",
          600: "#6476a2",
          700: "#4f5d84",
          800: "#414c6b",
          900: "#39415b",
          950: "#111428",
        },
        azure: "#2f80ed",
        success: "#16a34a",
        warn: "#f59e0b",
        danger: "#ef4444",
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17,20,40,.08)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
