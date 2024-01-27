// Tailwind CSS plugin file
import plugin from "tailwindcss/plugin"

export default plugin(({ addUtilities }) => {
  const newUtilities = {
    ".focus-visible-style": {
      outline: "none",
    },
    ".focus-visible-style:focus-visible": {
      outline: "2px solid #67ad7c", // Use your accent color
      outlineOffset: "2px",
    },
  }

  addUtilities(newUtilities, ["responsive", "hover", "focus", "active"])
})
