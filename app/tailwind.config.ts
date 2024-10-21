import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}', // Include all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the components directory
    './app/**/*.{js,ts,jsx,tsx}', // Include all files in the app directory
    './contexts/**/*.{js,ts,jsx,tsx}', // Include all files in the contexts directory
    './helpers/**/*.{js,ts,jsx,tsx}', // Include all files in the helpers directory
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange : '#f8c24f',
        'light-purple' : '#424c85',
        black : '#000000',
        'dark-theme-bg' : '#121212',
        'light-theme-bg' : '#f9f9f9',
        white : '#ffffff',
        'light-gray' : '#e5e5e2',
        "dark-gray": "#323e46",
        "button-blue": "#2196F3",
        "card-front": "#f9fafd",
        "card-back": "#f7f7f7",
      },
      maxWidth: {
        "8xl": "96rem",
        "5xl": "1200px",
      },
      boxShadow: {
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
        image: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "5": "5px",
        "8": "8px",
        "34": "34px",
      },
    },
  },
  plugins: [
    require("tailwindcss-3d")
  ],
};
export default config;
