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
import { NavLogo } from "../../components/common/Icon";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [preloader, setpreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setpreloader(false);
    }, 2500);
    document.body.classList.add("overflow_anchor");
    if (preloader) {
      document.body.classList.add("overflow_hidden");
    } else {
      document.body.classList.remove("overflow_hidden");
    }
  });
  return (
    <>
      {preloader && (
        <div
          className={`
          } preloader fixed min-h-screen top-0 left-0 w-full z-50 flex justify-center items-center`}
        >
          <span>
            <NavLogo />
          </span>
        </div>
      )}
      <div className="overflow_hidden">
        <div className="hero_homepage_bg min-h-screen bg-no-repeat bg-cover flex flex-col justify-center bg-center">
          <Header />
          <div className="flex lg:items-center lg:flex-row flex-col flex-grow relative pt-32">
            <HeroHomepage />
            <Image
              className="absolute h-100 right-0 top-2/3 lg:top-1/3 -z-10 hidden lg:block w-[450px] xl:w-[700px]"
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
