/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

        colors: {
          primary: "rgba(203, 226, 246, 0.80)",
          secondary: "#0072BC",
          white: "#ffff",
          buttonSecondery:"#5B4937",
          gray:"#5C5C5C",
          customBase:"#97ADC1"
        },
      
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
