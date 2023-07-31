import Image from "next/image";
import React from "react";
import BlueButton from "../common/BlueButton";
import RecentNews from "../common/Helper";
import { ButtonWhiteArrow, UnderLIneText } from "../common/Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecentNewsInsights = () => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="lg:py-14 pb-12 md:py-14 pt-12 mt-1 md:mb-1 lg:mb-14 xl:mb-[75px] relative z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:-top-28 before:-left-24 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
      <Image
        className="lg:w-[462px] lg:h-[541px] w-[150px] -top-8 sm:-left-20 -left-5 absolute opacity-60"
        src="/assets/img/svg/news-grid-line.svg"
        width={362}
        height={241}
        alt="grid-line"
      />
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
        <h2
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="linear"
          data-aos-delay="200"
          data-aos-offset="200"
          className="font-HelveticaNeueMedium text-center lg:text-start font-medium text-[24px]  md:text-5xl sm:text-4xl lg:leading-[60px] text-[#FDFEFF]"
        >
          <span className="relative">
            Recent News
            <span className="absolute -bottom-2 -md:bottom-[-2px] w-full left-0">
              <UnderLIneText />
            </span>
          </span>{" "}
          and Insights
        </h2>
        <div className="md:mt-0 lg:mt-11 xl:mt-[73px] relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:top-0 before:-end-56 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full ">
          <Slider {...settings}>
            {RecentNews.map((data, i) => {
              return (
                <div className="lg:w-1/3 sm:w-1/2 w-full lg:px-3 md:px-5 mt-8 sm:mt-12 lg:mt-0 flex justify-center rounded-2xl">
                  <div
                    data-aos="fade-up"
                    data-aos-duration="300"
                    data-aos-easing="linear"
                    data-aos-delay={data.delay}
                    data-aos-offset="200"
                    className=" justify-center flex flex-col lg:items-start sm:px-3 px-2   lg:px-0 "
                  >
                    <Image
                      className="lg:w-[362px] lg:h-[241px] w-full"
                      src={data.TrainingImg}
                      width={362}
                      height={241}
                      alt="what we do shadow"
                    />

                    <h3 className="font-Segoe font-normal lg:max-w-[358px] md:text-2xl text-[20px] mt-2 sm:mt-4 leading-8 text-[#FDFEFF] lg:text-start">
                      {data.heading}
                    </h3>
                    <p className="font-Segoe font-normal text-base mt-2 md:mt-4 leading-6 text-[#FDFEFF] lg:text-start opacity-70">
                      {data.date}
                    </p>
                    <p className="font-Segoe lg:max-w-[358px] font-normal text-md mt-2 md:mt-4 leading-7 text-[#FDFEFF] lg:text-start opacity-70">
                      {data.pera}
                    </p>
                    <span>
                      <button
                        type="submit"
                        className="justify-center text-center sm:px-[24px] px-4 py-[14.5px] flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue mb-2 hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out mt-4 md:mt-8"
                      >
                        Read More
                        <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                          <ButtonWhiteArrow />
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>{" "}
      </div>
    </section>
  );
};

export default RecentNewsInsights;
