module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "check-start": "hsl(192, 100%, 67%)",
        "check-end": "hsl(280, 87%, 65%)",
      },
      fontFamily: {
        body: ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: {
        "mobile-light": "url('/bg-mobile-light.png')",
        "desktop-light": "url('/bg-desktop-light.png')",
      },
    },
  },
  variants: {
    extend: {
      outline: ["hover", "active", "checked"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
