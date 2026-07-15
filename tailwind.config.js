/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        "ink-soft": "#161B25",
        paper: "#F7F8FA",
        "paper-soft": "#EEF0F4",
        pulse: {
          violet: "#6C5CE7",
          "violet-light": "#8B7CF0",
          mint: "#2DD4A7",
          coral: "#FF6B6B",
          amber: "#F5A623",
        },
        slate: {
          soft: "#8A93A6",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 15, 25, 0.08)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "pulse-gradient": "linear-gradient(135deg, #6C5CE7 0%, #2DD4A7 100%)",
        "pulse-gradient-soft": "linear-gradient(135deg, rgba(108,92,231,0.12) 0%, rgba(45,212,167,0.12) 100%)",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        pulseLine: "pulseLine 1.2s ease-in-out infinite",
        fadeUp: "fadeUp 0.4s ease-out",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
