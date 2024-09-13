import type { Config } from "tailwindcss";
import { animations, components, palettes, rounded, shade } from "@tailus/themer"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tailus/themer/dist/components/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: palettes.passion,
    },
  },
  plugins: [rounded, shade, components, animations],
};
export default config;
