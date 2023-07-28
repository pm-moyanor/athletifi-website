import React from "react";
import { BlueShodow, UnderLIneText } from "../common/Icon";
import Image from "next/image";

const WhoweAre = () => {
  return (
    <section className="pt-10 pb-16 sm:mb-14 sm:pb-16 lg:mb-20 relative">
      <div className="absolute -top-[40px] lg:-top-[150px] -end-10 lg:w-[250px] lg:h-[380px] z-0">
        <Image
          className="h-full w-full"
          src="/assets/img/png/football.png"
          width={286}
          height={286}
          alt="what we do foot ball image"
        />
      </div>
      <Image
        className="absolute -top-[250px] end-0 z-0"
        src="/assets/img/png/what-we-do-shadow.png"
        width={448}
        height={448}
        alt="shadow"
      />
      <span className="absolute top-50 start-0 z-0">
        <BlueShodow />
      </span>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative">
        <div className="blue_Linear_Gradient after:absolute relative lg:py-20 py-5 md:py-10 sm:mt-8 z-0">
          <h2 className="font-HelveticaNeueMedium md:text-5xl text-4xl pt-0.5 text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
            <span className="relative ">
              Who we Are
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLIneText />
              </span>
            </span>
          </h2>
          <p className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 md:pt-4 pt-2 max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
            Welcome to the future of sports collectibles! We've revolutionized
            the world of trading cards by integrating dynamic statistics into
            every card. Now, every goal, pass, and block is updated on the
            digital trading card within 48 hours after every game.
            <span className="block pb-2">
              {" "}
              But we're not just about collectibles. Every purchase you make
              directly supports underserved athletes, making club soccer more
              accessible and empowering dreams to flourish. Join us in this
              incredible journey to elevate the world of sports collectibles and
              make a positive impact on the lives of aspiring athletes. The
              future of sports collectibles starts now!
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoweAre;
