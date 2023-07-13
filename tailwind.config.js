const { colors, fontFamily, keyframes, animation, screens } = require("./src/theme.js")

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: { colors, fontFamily, keyframes, animation, screens },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  variants: {},
}
