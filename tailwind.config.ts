import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Gold luxury accent — branding, headlines
        accent: {
          DEFAULT: "#E5C07B",
          glow: "#FFD27A",
        },
        // Red laser energy — high-energy hover states, CTAs
        laser: {
          DEFAULT: "#FF2A4D",
          glow: "#FF5577",
          dim: "#9A1A2F",
        },
        // Chrome — metallic accents
        chrome: {
          DEFAULT: "#C8C8CC",
          dark: "#6B6B70",
        },
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "laser-sweep": "laser-sweep 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "laser-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
