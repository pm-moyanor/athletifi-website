import React from "react";
import { EyeBallIcon, VillanovaIcon } from "../common/Icon";

// import {
//   DisealIcon,
//   EuropcarIcon,
//   HsbcIcon,
//   KayakIcon,
//   KelloggsIcon,
//   MerckIcon,
//   SpotifyIcon,
//   StripeIcon,
// } from "../common/Icon";
// import Slider, { Settings, ResponsiveObject } from 'react-slick';

const TrustedPartners: React.FC = () => {
  // const settings: Settings = {
  //   arrows: false,
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   cssEase: "linear",
  //   speed: 4000,
  //   pauseOnHover: false,
  //   responsive: [
  //     {
  //       breakpoint: 4000,
  //       settings: "unslick",
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 700,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 350,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  return (
    <>
      <section>
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto xl:px-0 px-5">
          <h2
            className="text-center font-HelveticaNeueMedium font-medium lg:text-5xl md:text-[40px] sm:text-4xl text-[26px] text-primary sm:py-10 pb-5 leading-[120%]"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
          >
            <span className="relative after:content after:absolute after:bottom-[-10px] sm:after:bottom-[-4px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Our trusted
            </span>{" "}
            partners
          </h2>
          <div
            className="flex md:justify-between flex-col md:flex-row lg:pt-5 sm:gap-4 gap-3 md:items-start items-center"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
            data-aos-delay="400"
            data-aos-offset="200"
          >
            <h3 className=" max-w-[396px] text-primary sm:text-2xl text-md font-HelveticaNeueMedium md:text-start text-center">
              Stats for the next generation of soccer superstars
            </h3>
            <h4 className="font-Segoe text-primary opacity-80 max-w-md md:text-start text-center">
              We have partnered with some of the top soccer clubs in the
              Mid-Atlantic region to bring sports technology to new heights.
            </h4>
          </div>
          {/* <Slider
            {...settings}
            className="flex comapny_logo lg:justify-between justify-center md:py-6 lg:py-12 pt-5 sm:pb-5 flex-wrap lg:gap-[38px] xl:gap-x-14"
          >
            <div className="lg:max-w-[214px] max-w-[130px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <MerckIcon />
            </div>
            <div className="lg:max-w-[183px] max-w-[120px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <KelloggsIcon />
            </div>
            <div className="lg:max-w-[311px] max-w-[170px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <KayakIcon />
            </div>
            <div className="lg:max-w-[159px] max-w-[115px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <DisealIcon />
            </div>
            <div className="lg:max-w-[238px] max-w-[150px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <HsbcIcon />
            </div>
            <div className="lg:max-w-[135px] max-w-[100px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <StripeIcon />
            </div>
            <div className="lg:max-w-[211px] max-w-[140px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <SpotifyIcon />
            </div>
            <div className="lg:max-w-[185px] max-w-[130px] hover:mix-blend-luminosity mix-blend-luminosity hover:-translate-y-2 duration-300 cursor-pointer">
              <EuropcarIcon />
            </div>
          </Slider> */}
          <div className="flex justify-evenly xl:mt-16 mt-10 xl:mb-28 sm:mb-14 mb-4 sm:flex-row flex-col">
            <div
              className="md:w-[43%] sm:max-w-[48%] w-full md:h-[152px] h-[120px] border border-solid border-[#49545C] hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-[#000B13] rounded-lg"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="600"
              data-aos-offset="200"
            >
              <EyeBallIcon />
            </div>
            <div
              className="md:w-[43%] sm:max-w-[48%] w-full mt-4 sm:mt-0 md:h-[152px] h-[120px] border border-solid border-[#49545C] hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-[#000B13] rounded-lg"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="1000"
              data-aos-offset="200"
            >
              <VillanovaIcon />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;
