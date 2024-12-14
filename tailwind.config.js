/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#F7F6F2",
        primaryAccentColor: "#C8D5B9",
        secondaryAccentColor: "#E9C46A",
        textColor: "#2A2A2A",
        highlightColor: "#FAD4D4",
        extrasColor: "#FFA62F"
      }
    },
  },
  plugins: [],
}