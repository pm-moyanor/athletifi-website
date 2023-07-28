import Image from "next/image";
import React from "react";
import { ButtonArrow } from "../common/Icon";

const HeroHomepage = () => {
  return (
    <>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="max-w-[490px] lg:max-w-[520px] xl:max-w-[608px]">
            <h1 className="font-HelveticaNeueMedium text-white text-[24px] sm:text-[40px] lg:text-[50px] xl:text-xxl font-medium leading-7 sm:leading-10 lg:leading-[66px]">
              Make club soccer more affordable
            </h1>
            <p className="font-Segoe text-white text-[16px] sm:text-md font-normal mt-2 md:mt-4 opacity-80">
              Unlocking opportunities for aspiring young athletes. Connecting
              all talent, no matter where they are from, with top-tier coaches,
              scholarships, and unparalledled resources. Welcome to the future
              of sports... for everyone!
            </p>
            <button className="flex items-center bg-skyblue py-[10px] px-[20px] sm:py-[14px] sm:px-[27px] mt-5 md:mt-[40px] border border-skyblue hover:bg-transparent duration-300 join_now_btn">
              <span className="text-black duration-300 font-Segoe text-sm sm:text-base font-semibold">
                Join now
              </span>
              <ButtonArrow />
            </button>
          </div>
          <div className="pt-10 lg:pt-0">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 max-w-[400px] xl:max-w-[500px] hidden lg:inline-block">
              <Image
                src="/assets/img/png/hero_female_player.png"
                alt="female-player"
                width={500}
                height={500}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="lg:hidden relative h-[450px] w-full">
        <Image
          className="absolute right-0 max-w-[300px] sm:max-w-full"
          src="/assets/img/png/hero_female_player.png"
          alt="female-player"
          width={400}
          height={400}
        />
      </div>
    </>
  );
};

export default HeroHomepage;
