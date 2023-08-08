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
        xxl: "50px",
      },
      colors: {
        skyblue: "#00C5F4",
        primary: "#FDFEFF",
        bgnav: "rgba(0, 8, 15, 0.10)",
        matchtittles: "rgba(0, 197, 244, 0.05)",
        darkgray: "#0D171F",
        offwhite: "#B1B5B8",
        blue_linear_gradient: "rgba(255, 255, 255, 0.03)",
      },
      backgroundImage: {
        "header-bg": "url('/assets/img/webp/header_bg_2.webp')",
        "blue-underline": "url('/assets/img/svg/blue-underline.svg')",
        "strategic-advisor": "url('/assets/img/webp/our_strategic_bg.webp')",
        "playground-unique": "url('/assets/img/webp/Unique-section-bg.webp')",
        "stats-reimagined": "url('/assets/img/svg/bg_stats_reimagined.svg')",
        "about-hero": "url('/assets/img/webp/about-hero-img.webp')",
        "new-hero-img": "url('/assets/img/webp/news-hero-img.webp')",
        "playground-unique-sm":
          "url('/assets/img/webp/sm_Unique-section-bg.webp')",
        shadow_blue: "linear-gradient(151deg, #11568C 0%, #00C5F4 100%)",
      },
      boxShadow: {
        "coach-shadow": "0 50px 60px 0px rgba(88, 133, 249, 0.10)",
      },
    },
  },
  plugins: [],
};
