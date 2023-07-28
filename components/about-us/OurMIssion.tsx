import React from "react";
import Image from "next/image";
import { UnderLIneText } from "../common/Icon";
import { CenterBlueShadow } from "./../common/Icon";

const OurMIssion = () => {
  return (
    <section className="sm:py-10 py-8 lg:my-10 relative">
      <div className="lg:w-[600px] lg:h-[700px] w-1/4 absolute -end-20 top-10 z-0">
        <Image
          src="/assets/img/png/our-mission-grid-img.png"
          width={692}
          height={200}
          alt="grid-image"
          className="w-full h-full"
        />
      </div>{" "}
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
          <div className="lg:w-5/12 w-9/12 mx-auto lg:ms-0  mt-6 sm:mt-8 lg:mt-0">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/assets/img/png/ourMission-img.png"
                width={496}
                height={603}
                alt="our misssion sec image"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col justify-center h-full lg:ps-6 xl:p-0 text-center lg:text-start">
              {" "}
              <h2 className="font-HelveticaNeueMedium md:text-5xl text-4xl text-[#FDFEFF] font-medium leading-[60px] md:mb-4">
                <span className="relative">
                  Our Mission{" "}
                  <span className="absolute -bottom-2 left-0">
                    <UnderLIneText />
                  </span>
                </span>
              </h2>
              <p className="font-normal font-Segoe text-md leading-7 text-[#FDFEFF] text-center lg:text-start mx-auto lg:ms-0 md:max-w-[506px] opacity-80 m-0 font-sans md:pt-4 pt-2 ">
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

export default OurMIssion;
