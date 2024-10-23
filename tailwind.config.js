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
        golden: "#E99B2E",
        cherry: "#861F3C",
        neutral: "#767676",
        verde: "#2A6C62",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
