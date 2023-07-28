import Image from "next/image";
import React from "react";

const StatsReimagined = () => {
  return (
    <section className="py-10 mb-6 sm:mb-10 md:mb-20 lg:mb-[125px] relative">
      <div className="absolute sm:-bottom-[100px] -bottom-8 start-0 lg:w-[230px] lg:h-[286px] -z-10 opacity-30">
        <Image
          className="xl:max-w-[240px]  sm:max-w-[180px] max-w-[130px] "
          src="/assets/img/png/left-ball.png"
          width={240}
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
        <div className="blue_Linear_Gradient pb-6 md:pb-12 relative after:absolute flex justify-center flex-col items-center">
          <h2 className="md:text-5xl sm:text-4xl text-[24px] min-[375px]:text-[26px]  text-primary font-medium font-HelveticaNeueMedium relative z-20 max-w-[539px] mx-auto text-center md:pt-9 pt-6 px-3 md:px-0 lg:pt-[72px] leading-8 sm:leading-[45px] md:leading-[60px]">
            <span className="relative after:content after:absolute after:bottom-[-4px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Stats Reimagined.
            </span>{" "}
            Exposure elevated.
          </h2>
          <p className="font-Segoe font-normal text-md text-center text-[#FDFEFF] leading-7 px-4 md:px-0 md:max-w-[769px] mx-auto md:mt-4 mt-2 relative z-20">
            Experience the future of sports collectibles as we integrate dynamic
            statistics into every card, taking your passion for the game to new
            heights. Every goal, pass, and block is updated on the digital
            trading card within 48 hours after every game.{" "}
            <span className="block md:mt-4 mt-2">
              Each purchase directly supports underserved athletes, making club
              soccer more accessible and empowering dreams to flourish.
            </span>
          </p>
          <div className="flex flex-wrap lg:grid grid-cols-3 w-full justify-between mt-[18px] items-center max-w-[917px] mx-auto lg:justify-center relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:-top-20 before:left-1/2 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/2 before:-z-10 before:rounded-full">
            <div className="w-full lg:w-[409px] lg:h-[409px] lg:hidden flex justify-center relative z-10 lg:-translate-x-14">
              <Image
                className=""
                src="/assets/img/webp/space.webp"
                width={409}
                height={409}
                alt="space-image"
              />
            </div>{" "}
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
            <div className="w-full lg:w-[409px] lg:h-[409px] hidden lg:flex justify-center relative z-10 lg:-translate-x-14">
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
