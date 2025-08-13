/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#101820",
          accent: "#9B5CFF",
        },
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(155, 92, 255, 0.35)",
      },
      backgroundImage: {
        noise: "url('/assets/noise.svg')",
        radial:
          "radial-gradient(50% 50% at 50% 50%, rgba(155,92,255,0.12) 0%, rgba(16,24,32,0) 70%)",
        grid:
          "linear-gradient(rgba(155,92,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155,92,255,0.08) 1px, transparent 1px)",
      },
      backgroundSize: { grid: "28px 28px" },
    },
  },
  plugins: [],
}
