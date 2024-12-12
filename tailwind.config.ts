import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mobobold: ["MoboBold"],
        moboextralight: ["MoboExtraLight"],
        moboregular: ["MoboRegular"],
        mobosemibold: ["MoboSemiBold"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-color": "#365a5a",
      },
    },
  },
  plugins: [],
} satisfies Config;
