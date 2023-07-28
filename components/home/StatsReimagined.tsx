import Image from "next/image";
import React from "react";
import { BlueShodow, UnderLIneText } from "../common/Icon";

const StatsReimagined = () => {
  return (
    <section className="py-10 min-h-screen mb-6 sm:mb-10 md:mb-20 lg:mb-[125px] relative">
      <div className="absolute -bottom-[100px] start-0 lg:w-[230px] lg:h-[286px] -z-10 opacity-30">
        <Image
          className="h-full w-full"
          src="/assets/img/png/left-ball.png"
          width={286}
          height={286}
          alt="what we do foot ball image"
        />
      </div>
      <Image
        className="absolute -bottom-[300px] start-0 z-0"
        src="/assets/img/png/left-shadow.png"
        width={448}
        height={448}
        alt="shadow"
      />
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
        <div className="blue_Linear_Gradient pb-6 md:pb-12 overflow-hidden relative after:absolute flex justify-center flex-col items-center">
          <h2 className="md:text-5xl text-4xl text-primary font-medium font-HelveticaNeueMedium relative z-20 max-w-[539px] mx-auto text-center md:pt-9 pt-6 px-4 lg:pt-[72px]">
            <span className="relative">
              Stats
              <span className="absolute -bottom-2 w-full hidden md:flex left-0">
                <UnderLIneText />
              </span>
            </span>{" "}
            Reimagined. Exposure elevated.
          </h2>
          <p className="font-Segoe font-normal text-md text-center text-[#FDFEFF] leading-7 px-4 md:px-0 md:max-w-[769px] mx-auto md:mt-4 mt-2 relative z-20">
            {" "}
            Experience the future of sports collectibles as we integrate dynamic
            statistics into every card, taking your passion for the game to new
            heights. Every goal, pass, and block is updated on the digital
            trading card within 48 hours after every game.{" "}
            <span className="block md:mt-4 mt-2">
              Each purchase directly supports underserved athletes, making club
              soccer more accessible and empowering dreams to flourish.
            </span>
          </p>
          <div className="flex flex-wrap lg:grid grid-cols-3 w-full justify-between mt-[18px] items-center max-w-[917px] mx-auto lg:justify-center relative z-20">
            <Image
              className="-translate-x-1/2 absolute -bottom-[250px] lg:w-[350px] lg:top-0 lg:-translate-y-1/2 start-1/2 rotate-90 -z-10"
              src="/assets/img/png/what-we-do-shadow.png"
              width={917}
              height={280}
              alt="shadow"
            />

            <div className="sm:w-1/2 w-full lg:w-auto flex justify-center lg:justify-start">
              <Image
                className="mx-auto"
                src="/assets/img/webp/castle.webp"
                width={280}
                height={280}
                alt="castle-img"
              />
            </div>
            <div className="sm:w-1/2 w-full lg:hidden flex justify-center">
              <Image
                className="md:-translate-x-6"
                src="/assets/img/webp/phoenix.webp"
                width={280}
                height={280}
                alt="phoenix-image"
              />
            </div>

            <div className="w-full lg:w-[409px] lg:h-[409px] flex justify-center relative z-10 lg:-translate-x-14">
              <Image
                className=""
                src="/assets/img/webp/space.webp"
                width={409}
                height={409}
                alt="space-image"
              />
            </div>

            <div className="sm:w-1/2 lg:w-auto hidden lg:flex">
              {" "}
              <Image
                className=""
                src="/assets/img/webp/phoenix.webp"
                width={280}
                height={280}
                alt="phonix-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsReimagined;
