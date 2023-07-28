import Image from "next/image";
import React from "react";
import { ButtonArrow } from "../common/Icon";

const HeroHomepage = () => {
  return (
    <>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="max-w-[490px] lg:max-w-[520px] xl:max-w-[608px]">
            <h1 className="font-HelveticaNeueMedium text-white text-center lg:text-start text-[30px] sm:text-[45px] lg:text-[50px] xl:text-xxl font-medium md:leading-[56px] lg:leading-[66px]">
              Make club soccer more affordable
            </h1>
            <p className="font-Segoe text-white text-[16px] sm:text-md font-normal mt-4 opacity-80 text-center lg:text-start">
              Unlocking opportunities for aspiring young athletes. Connecting
              all talent, no matter where they are from, with top-tier coaches,
              scholarships, and unparalledled resources. Welcome to the future
              of sports... for everyone!
            </p>
            <button className="flex items-center bg-skyblue py-[10px] px-[20px] sm:py-[14px] sm:px-[27px] mt-[40px] border border-skyblue hover:bg-transparent duration-300 join_now_btn mx-auto lg:mx-0">
              <span className="text-black duration-300 font-Segoe text-sm sm:text-base font-semibold">
                Join now
              </span>
              <ButtonArrow />
            </button>
          </div>
          <div className="pt-10 lg:pt-0">
            <span className="absolute right-0 top-[70%] -translate-y-1/2 max-w-[400px] xl:max-w-[600px] hidden lg:inline-block">
              <Image
                src="/assets/img/png/hero_female_player.png"
                alt="female-player"
                width={600}
                height={600}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="hidden sm:block lg:hidden w-full">
        <Image
          className="mx-auto"
          src="/assets/img/png/hero_female_player_2.png"
          alt="female-player"
          width={500}
          height={500}
        />
      </div>
      <div className="pt-10 lg:pt-0 ">
        <span className=" right-0 top-1/2 -translate-y-1/2 max-w-[400px] sm:hidden">
          <Image
            className="ml-auto"
            src="/assets/img/png/hero_female_player.png"
            alt="female-player"
            width={400}
            height={400}
          />
        </span>
      </div>
    </>
  );
};

export default HeroHomepage;
