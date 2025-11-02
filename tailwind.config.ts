import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"], // Fuente base
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"], // Fuente de cabecera
      },
      colors: {
        primary: "#FFFFFF", // Cambiado a Blanco
        secondary: "#F3F4F6", // Gris claro para fondos
        dark: "#111827", // Texto oscuro principal
        accent: "#3B82F6", // Azul (sin cambios)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;