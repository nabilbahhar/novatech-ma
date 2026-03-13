import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#071426",
          800: "#0B1F3A",
          700: "#112D54",
          600: "#1A3D6E",
          500: "#2354A4",
          100: "#D6E4F7",
          50: "#EEF4FC",
        },
        accent: {
          DEFAULT: "#D42B3A",
          dk: "#A81F2C",
        },
        success: "#00B87A",
        warning: "#F0A500",
        "muted-color": "#6B7A99",
        bg: "#F7F9FC",
        surface: "#FFFFFF",
        "border-brand": "#E2E8F4",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["Clash Display", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 2px 20px rgba(11,31,58,0.07)",
        "card-hover": "0 8px 30px rgba(11,31,58,0.12)",
        whatsapp: "0 4px 20px rgba(37,211,102,0.4)",
        "whatsapp-hover": "0 6px 28px rgba(37,211,102,0.5)",
      },
    },
  },
  plugins: [],
}
export default config
