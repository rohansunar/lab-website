/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the `app` folder
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` folder
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "scale-up": {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "bounce-small": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(5%)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-up": "scale-up 0.5s ease-out",
        "bounce-small": "bounce-small 2s infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [],
};
