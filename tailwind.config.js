/** @type {import("tailwindcss").Config} */

import customStyles from "./tailwind-custom-styles"; // Adjust the path as needed

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color_1: "#121212",
        color_2: "#1e1e1e",
        color_3: "#a9a9a9",
        color_4: "#e1e1e1",
        color_5: "#4b5563",
        color_6: "#3b3b3b",
        color_accent: "#67ad7c",
        color_accent_secondary: "#6f957b",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [customStyles],
}