/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        sm: "500px",
        md: "700px",
        lg: "1100px",
        xl: "1250px",
      },
      colors: {
        "custom-white": "var(--custom-white)",
        "custom-black-1": "var(--custom-black-1)",
        "custom-black-2": "var(--custom-black-2)",
        "custom-blue-1": "var(--custom-blue-1)",
        "custom-blue-2": "var(--custom-blue-2)",
        "custom-blue-3": "var(--custom-blue-3)",
        "custom-blue-4": "var(--custom-blue-4)",
        "custom-red-1": "var(--custom-red-1)",
        "custom-red-2": "var(--custom-red-2)",
        "custom-gray-1": "var(--custom-gray-1)",
        "custom-gray-2": "var(--custom-gray-2)",
        "custom-gray-3": "var(--custom-gray-3)",
        "custom-border": "var(--custom-border)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
