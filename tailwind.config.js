/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,astro}",
    "./pages/**/*.{html,js,astro}",
    "./components/**/*.{html,js,astro}",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#C2AE92",
        cherry: "#691C32",
        neutral: "#ECECEC",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
