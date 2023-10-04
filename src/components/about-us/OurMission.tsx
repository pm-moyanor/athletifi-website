// OurMission.tsx

// This component renders the "Our Mission" section on the "About Us" page.
// It provides information about the company's mission and objectives.

import React from "react";
import Image from "next/image";
import { UnderLIneText } from "../common/Icon";
import { CenterBlueShadow } from "../common/Icon";

const OurMission = () => {
  const playerImageMission = "stebi-nft-mission";
  return (
    <section className="sm:py-10 py-8 lg:mt-14 relative">
      <div className="lg:w-[600px] lg:h-[700px] w-1/4 absolute -end-20 top-10 z-0">
        {/* GRID IMG */}
        <Image
          src="/assets/img/png/our-mission-grid-img.png"
          width={692}
          height={200}
          alt="grid-image"
          className="w-full h-full"
        />
      </div>
      {/* SHADOW IMG */}
      <Image
        className="absolute top-100 end-0 z-0"
        src="/assets/img/png/what-we-do-shadow.png"
        width={608}
        height={448}
        alt="shadow"
      />
      <span className="absolute -top-48 start-[45%] -translate-x-1/2 z-0">
        <CenterBlueShadow />
      </span>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 sm:py-2 z-10 relative">
        <div className="flex lg:flex-row flex-col-reverse justify-between">
          <div className="lg:w-5/12 xl:w-[531px] min-[1530px]:w-[40%] w-9/12 sm:w-3/5 mx-auto lg:ms-0  mt-6 sm:mt-8 lg:mt-0">
            <div
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="200"
              className="flex justify-center lg:justify-start"
            >
              <Image
                src={`/assets/img/webp/${playerImageMission}.webp`}
                className="xl:h-[603px] xl:w-[505px] min-[1530px]:w-full"
                width={505}
                height={603}
                alt="our misssion sec image"
              />
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-[506px] min-[1530px]:w-1/2 ">
            <div
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="600"
              data-aos-offset="100"
              className="flex flex-col justify-center h-full text-center min-[1530px]:items-end lg:text-start"
            >
              <h2 className="font-HelveticaNeueMedium md:text-5xl sm:text-4xl text-[26px] min-[1530px]:w-[506px] sm:mt-6 text-[#FDFEFF] font-medium leading-[60px] md:mb-4">
                <span className="relative">
                  Our Mission{" "}
                  <span className="absolute -bottom-2 left-0">
                    <UnderLIneText />
                  </span>
                </span>
              </h2>
              <p className="font-normal font-Segoe text-md leading-7 text-[#FDFEFF] text-center mx-auto lg:ms-0 min-[1530px]:me-0 lg:text-start md:max-w-[506px] xl:w-auto opacity-80 m-0 font-sans sm:pt-4">
                Our mission is to level the playing field for enrollment in
                travel and club soccer- to give every athlete equal access to
                exposure from scouts. We believe in delivering access to strong
                athletes who are not confined to the boundaries of affluent
                neighborhoods or privileged families.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
