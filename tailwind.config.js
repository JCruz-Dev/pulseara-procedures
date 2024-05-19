/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#edf3f1",
        "procedure-blue-100": "#3f48ad",
        "procedure-blue-200": "#1e2469",
        "procedure-blue-300": "#306495",
        "procedure-green-100": "#07b284",
        "procedure-green-200": "#9cbeb3",
        "procedure-green-300": "hsla(160, 21%, 68%, 1)",
        "procedure-purple-100": "#80868b",
        "procedure-purple-200": "#D6D6EB",
        "procedure-purple-300": "#6e6d8c",
        "procedure-black-100": "hsla(0, 0%, 0%, 1)",
        "procedure-neutral-gray-100": "#80868b",
        "procedure-neutral-gray-200": "hsla(207, 5%, 52%, 1)",
        "procedure-neutral-gray-300": "hsla(0, 0%, 0%, 0.3)",
        "procedure-neutral-gray-400": "hsla(0, 0%, 58%, 1)",
      },
      fontFamily: {
        body: ['"Raleway"'],
        modal_titles: ["Open Sans"],
      },
      gridTemplateColumns: {
        "5-auto": "repeat(5, minmax(0, auto))",
      },
    },
  },
  plugins: [],
};
