/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/components/**/*.tsx", "./src/screens/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",
        backgroundSecondary: "#F2F2F2",

        primary: "#083061",
        primaryLight: "#083061",

        secondary: "#077167",
        secondaryLight: "#01A9A9",

        danger: "#F15959",
        warning: "#EFF333",
        success: "#00A72F",
        info: "#002FA7",

        textPrimary: "#000",
        textSecondary: "#494949",
        textTertiary: "#767676",
        textQuaternary: "#B3BFDA",

        gray: "#C4C4C4",
        grayLight: "#D9D9D9"
      },
    },
  },
  plugins: [],
};
