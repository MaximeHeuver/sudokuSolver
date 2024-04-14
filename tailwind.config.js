/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5904b",
        secondary: "#f8c08c",
        tile: "#f0f0f0",
        text: "#454545",
        accent: "#ababab"
      },
      borderRadius: {
        tile: "1rem"
      },
      fontSize: {
        xxs: ["9px", "12px"]
      },
      lineHeight: {

      }
    },
  },
  plugins: [],
}

