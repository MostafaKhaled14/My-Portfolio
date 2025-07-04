/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteof: "#F8F9FA",
        mywhite: "#e0ddd4",
        whiteoof: "#f8f9fa73",
        gold: "#feb401",
        pale: "#0000004b",
        palehov: "#00000088",
        gren: "#27df4a",
        myblack: "#26272c",
        mybground: "#26272c",
        myground: "#575656",
        layer: "#1a1a1a",
      },
      fontFamily: {
        myfont: ["Tajawal", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
