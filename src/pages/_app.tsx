import "@/styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
    setInterval(() => {
      AOS.init({
        // once: true,
      });
    }, 1000);
  }, [AOS]);
  return <Component {...pageProps} />;
}
