import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta SATELTRACK
        bg: {
          DEFAULT: "#0a0d12",     // Fondo principal - negro azulado
          card: "#0f1419",        // Tarjetas
          elevated: "#161c24",    // Elementos elevados
          hover: "#1a2230",       // Hover states
        },
        border: {
          DEFAULT: "#1f2937",     // Bordes normales
          strong: "#374151",      // Bordes destacados
        },
        brand: {
          red: "#dc2626",         // Rojo principal SATELTRACK
          "red-dim": "#991b1b",   // Rojo apagado
          "red-glow": "#ef4444",  // Rojo brillante para alertas
        },
        text: {
          DEFAULT: "#e5e7eb",
          muted: "#9ca3af",
          dim: "#6b7280",
          accent: "#dc2626",
        },
        status: {
          active: "#10b981",      // Verde activo
          warning: "#f59e0b",     // Amarillo - por vencer
          danger: "#dc2626",      // Rojo - vencido
          inactive: "#6b7280",    // Gris - inactivo
          info: "#3b82f6",        // Azul - info
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "scan": "scan 4s linear infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "0" },
          "50%": { transform: "translateY(100%)", opacity: "1" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)",
        "radar-gradient": "radial-gradient(circle at center, rgba(220,38,38,0.15) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "32px 32px",
      },
    },
  },
  plugins: [],
};
export default config;
