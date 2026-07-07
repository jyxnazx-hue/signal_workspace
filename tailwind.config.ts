// web/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // dark charcoal radio-chassis base
                radioBg: "#0d0f12",
                // Warm, glowing radio valve filament color
                valveAmber: {
                    DEFAULT: "#ff9f1c",
                    dim: "#cc7a00",
                    glow: "rgba(255, 159, 28, 0.15)",
                },
                // Old display paper overlay tint
                parchment: "#f4f1ea",
            },
            fontFamily: {
                // Clean terminal typography
                mono: ["JetBrains Mono", "SF Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;