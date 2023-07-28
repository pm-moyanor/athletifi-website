import React from "react";
import { ButtonArrow } from "../common/Icon";
import Image from "next/image";
import football_net from "../../public/assets/img/png/football_net.png";

const SoccerExpensive = () => {
  return (
    <>
      <div className="relative xl:min-h-screen flex items-center md:mt-10 lg:bg-soccer-expensive-bg bg-no-repeat bg-cover justify-center flex-col lg:flex-row lg:mb-14 sm:mb-20 md:mb-5 lg:py-14 xl:py-0">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
          <div className="max-w-[623px] mx-auto lg:mx-0">
            <h2 className="font-HelveticaNeueMedium text-primary xl:text-xl lg:text-[43px] md:text-[40px] font-medium mb-4 text-[25px] sm:text-[35px] text-center lg:text-start leading-[120%] xl:leading-[60px]">
              <span className="relative after:content after:absolute after:bottom-[-2px] after:left-0 md:after:w-[220px] after:w-[120px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
                Soccer is{" "}
              </span>
              Expensive & Reduces Accessibility
            </h2>
            <p className="font-Segoe font-normal text-md text-primary opacity-80 text-center lg:text-start">
              There is an unfortunate contradiction at the heart of club soccer
              — a sport renowned for its global unity, yet hindered by
              prohibitive costs that reduce accessibility and limit
              participation. Club soccer is creating a system that excludes
              potential players from less privileged backgrounds.
            </p>
            <button className="flex items-center bg-skyblue py-[10px] px-[20px] sm:py-[14px] sm:px-[27px] mt-[40px] border border-skyblue hover:bg-transparent duration-300 join_now_btn mx-auto lg:mx-0">
              <span className="text-black duration-300 font-Segoe text-sm sm:text-base font-semibold">
                Read more
              </span>
              <ButtonArrow />
            </button>
          </div>
        </div>
        <div className="absolute right-0 lg:top-1/2 lg:-translate-y-1/2 xl:w-[700px] xl:h-[1000px] w-[300px] sm:w-[450px] lg:w-[500px] hidden lg:inline-block">
          <Image
            className="w-full "
            src="/assets/img/png/expensive_football.png"
            alt="football"
            width={700}
            height={700}
          />
        </div>
        <div className="lg:hidden relative w-full sm:w-[60%] mx-auto mt-5">
          <Image
            className="mx-auto"
            src="/assets/img/png/expensive_football_ipad.png"
            alt="football"
            width={700}
            height={400}
          />
        </div>
      </div>
    </>
  );
};

export default SoccerExpensive;
