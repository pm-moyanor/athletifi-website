import React from "react";
import { ButtonArrow } from "../common/Icon";
import Image from "next/image";
import football_net from "../../public/assets/img/png/football_net.png";

const SoccerExpensive = () => {
  return (
    <>
      <div className="relative xl:min-h-screen flex items-center mt-20 lg:bg-soccer-expensive-bg bg-no-repeat bg-cover justify-center flex-col lg:flex-row mb-32 sm:mb-20 py-28 xl:py-0">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
          <div className="max-w-[623px]">
            <h1 className="font-HelveticaNeueMedium text-primary xl:text-xl font-medium md:leading-[60px] mb-4 text-[25px] sm:text-[35px]">
              <span className="relative after:content after:absolute after:bottom-[-2px] after:left-0 md:after:w-[220px] after:w-[120px] after:h-1 after:bg-blue-underline after:bg-cover after:bg-no-repeat">
                Soccer is{" "}
              </span>
              Expensive & Reduces Accessibility
            </h1>
            <p className="font-Segoe font-normal text-md text-primary opacity-80">
              There is an unfortunate contradiction at the heart of club soccer
              — a sport renowned for its global unity, yet hindered by
              prohibitive costs that reduce accessibility and limit
              participation. Club soccer is creating a system that excludes
              potential players from less privileged backgrounds.
            </p>
            <button className="flex items-center bg-skyblue py-[10px] px-[20px] sm:py-[14px] sm:px-[27px] mt-[40px] border border-skyblue hover:bg-transparent duration-300 join_now_btn">
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
        <div className="lg:hidden relative h-[450px] w-full">
          <Image
            className="absolute right-0 top-0 sm:top-[60%] sm:-translate-y-1/2"
            src="/assets/img/png/expensive_football.png"
            alt="football"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default SoccerExpensive;
