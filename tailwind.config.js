/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          xl: "0rem",
          "2xl": "0rem",
        },
      },
      fontSize: {
        base: "16px",
        md: "18px",
        basemd: "24px",
        lg: "28px",
        xl: "48px",
        xxl: "56px",
      },
      colors: {
        skyblue: "#00C5F4",
        primary: "#FDFEFF",
        bgnav: "rgba(0, 8, 15, 0.10)",
        matchtittles: "rgba(0, 197, 244, 0.05)",
        darkgray: "#0D171F",
      },
      backgroundImage: {
        "header-bg": "url('/assets/img/png/hero_bg.png')",
        "blue-underline": "url('/assets/img/svg/blue-underline.svg')",
        "strategic-advisor": "url('/assets/img/png/meet_our_strategic_bg.png')",
        "playground-unique": "url('/assets/img/png/Unique-section-bg.png')",
        "stats-reimagined": "url('/assets/img/svg/bg_stats_reimagined.svg')",
        "about-hero": "url('/assets/img/webp/about-hero-img.webp')",
        "playground-unique-sm":
          "url('/assets/img/png/sm_Unique-section-bg.png')",
        shadow_blue: "linear-gradient(151deg, #11568C 0%, #00C5F4 100%)",
      },
    },
  },
  plugins: [],
};
