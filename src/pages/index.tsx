// index.tsx

// This is the main landing page of the website.
// It includes various components to showcase the features and services offered.


import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LatestNews from "../../components/home/LatestNews";
import OurStrategicAdvisor from "../../components/home/OurStrategicAdvisor";
import StatsReimagined from "../../components/home/StatsReimagined";
import TrustedPartners from "../../components/home/TrustedPartners";
import SoccerExpensive from "../../components/home/SoccerExpensive";
import UniqueAthletifi from "../../components/home/UniqueAthletifi";
import HeroHomepage from "../../components/home/HeroHomepage";
import Backtotop from "../../components/common/Backtotop";
import { useEffect, useState } from "react";
import { PageLogo } from "../../components/common/Icon";
import Seo from "../../components/common/Seo";

// Importing the Inter font
const inter = Inter({ subsets: ["latin"] });

// Main functional component for the Home page
export default function Home() {
  // PRELOADER
    // State variable for preloader. A preloader is a visual element that appears on the screen while a webpage or a portion of a webpage is loading.
  const [preloader, setpreloader] = useState(true);
    // The preloader state variable is initially set to true, indicating that the preloader should be displayed.

  // useEffect hook to handle preloader and body overflow
  useEffect(() => {
   
    // Delay for preloader to disappear
    setTimeout(() => {
      setpreloader(false);
    }, 1500);

    // Adding CSS classes to body for overflow control
    document.body.classList.add("overflow_anchor");
    if (preloader) {
      document.body.classList.add("overflow_hidden");
    } else {
      document.body.classList.remove("overflow_hidden");
    }

  });

  // SEO
  const pageSEO = {
    // SEO TITLE
    title: "Make club soccer more affordable",

    // SEO DESCRIPTION
    description:
      "Unlocking opportunities for aspiring young athletes. Connecting all talent, no matter where they are from, with top-tier coaches, scholarships, and unparalledled resources. Welcome to the future of sports... for everyone!",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/",

    // SEO IMAGE
    image: "/lending_meta_img.webp",
  };
  return (
    <>
      {/* SEO */}
      <Seo pageSEO={pageSEO} />
      {/* PRELOADER is conditionally rendered based on the value of the preloader state variable. */}
      {preloader && (
        <div
          className={`preloader fixed min-h-screen top-0 left-0 w-full z-50 flex justify-center items-center`}
        >
          <span>
            <PageLogo />
          </span>
        </div>
      )}
      <div className="overflow_hidden">
        <div className="hero_homepage_bg min-h-screen bg-no-repeat bg-cover flex flex-col justify-center bg-center">
          <Header />
          <div className="flex lg:items-center lg:flex-row flex-col flex-grow relative">
            <HeroHomepage />
            <Image
              className="absolute right-0 hero_grid_position -z-10 hidden lg:block w-[450px] xl:w-[700px]"
              src="/assets/img/svg/hero_grid.svg"
              alt="grid-lines"
              width={700}
              height={700}
            />
          </div>
        </div>
        <StatsReimagined />
        <SoccerExpensive />
        <UniqueAthletifi />
        <OurStrategicAdvisor />
        <TrustedPartners />
        <LatestNews />
        <Footer />
        <Backtotop />
      </div>
    </>
  );
}

