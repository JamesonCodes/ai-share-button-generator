import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // OpenAI-inspired color palette
        surface: {
          light: '#FFFFFF',
          dark: '#2A2A2A',
        },
        border: {
          light: '#E5E5E5',
          dark: '#3A3A3A',
        },
        accent: {
          DEFAULT: '#10A37F', // OpenAI green
          light: '#10A37F',
          dark: '#19C37D', // Slightly brighter for dark mode
          purple: '#AB68FF',
        },
        text: {
          primary: {
            light: '#1A1A1A',
            dark: '#E5E5E5',
          },
          secondary: {
            light: '#6B6B6B',
            dark: '#B0B0B0',
          },
        },
      },
      borderRadius: {
        'soft': '8px',
        'softer': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      transitionDuration: {
        'smooth': '200ms',
        'smoother': '300ms',
      },
    },
  },
  plugins: [],
};
export default config;

