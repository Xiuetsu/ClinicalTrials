const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#0EA5E9",
          foreground: "#0F172A"
        }
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      }
    }
  },
  plugins: []
};
