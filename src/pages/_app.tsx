// This is the main application file for the Next.js project.
// It wraps around all pages and can be used to include global styles or components.

import "@/styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
    setInterval(() => {
      AOS.init({
        once: true,
      });
    }, 1000);
  }, [AOS]);
  return <Component {...pageProps} />;
}
