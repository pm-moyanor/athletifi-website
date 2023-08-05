import Link from "next/link";
import React from "react";
import BlueButton from "../common/BlueButton";
import Image from "next/image";

const NewsCard = () => {
  return (
    <>
      <div className="blue_linear_gradient relative after:absolute flex justify-center flex-col items-center  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] mx-3 sm:mx-10 md:mx-16 mt-[154px]">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto py-[30px] lg:py-[50px] xl:py-[86px] relative z-10">
          <div className="flex flex-wrap justify-between flex-col xl:flex-row items-center">
            <div className="lg:max-w-[70%] xl:max-w-[46%] text-center xl:text-start">
              <h3 className="font-medium text-[20px] sm:text-lg text-primary font-HelveticaNeueMedium lg:max-w-[447px] mx-auto xl:mx-0">
                "Mastering the Game: A Coach's Guide to Unlocking Football
                Strategies"
              </h3>
              <p className="text-base text-primary opacity-70 font-Segoe font-normal mt-2">
                by: Graham Clark &bull; 23 June 2023
              </p>
              <p className="text-base sm:text-md text-primary opacity-70 font-Segoe font-normal mt-3 sm:mt-4">
                Football strategies are the tactical blueprints that coaches
                devise to guide their teams to success on the field. These
                strategies encompass a wide range of aspects, including
                formations, player positioning, ball distribution, defensive and
                offensive tactics, and set-piece plays.
              </p>
              <div className="mt-4 flex items-center gap-[14px] justify-center xl:justify-start">
                <button className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtittles rounded-full leading-[150%] duration-300 hover:text-white">
                  Most popular
                </button>
                <button className="lg:text-base text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtittles rounded-full leading-[150%] duration-300 hover:text-white">
                  Trending
                </button>
              </div>
              <div className="flex xl:justify-start justify-center items-center mt-10">
                <Link href="/about-us">
                  <BlueButton text="Read&nbsp;more" />
                </Link>
              </div>
            </div>
            <div className=" sm:w-[70%] lg:max-w-[47%] mt-10 xl:mt-0">
              <Image
                className="w-full"
                src="/assets/img/png/news-playing-image-card.png"
                alt="football"
                width={531}
                height={486}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
