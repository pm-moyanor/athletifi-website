import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlueButton from "../common/BlueButton";

interface NewsProps {
  allNewsList: any;
}

const LatestNews: React.FC<NewsProps> = (props) => {
  const { allNewsList } = props;

  return (
    <>
      <div className="py-14 md:py-0 relative before:content-[''] before:absolute sm:before:w-[448px] before:w-[248px] sm:before:h-[448px] before:h-[248px] before:top-0 before:left-0 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/4 before:z-0 before:rounded-full after:content-[''] after:absolute sm:after:w-[448px] sm:after:h-[448px] after:w-[248px] after:h-[248px] after:bottom-20 after:right-0 after:bg-shadow_blue after:blur-[111px] after:opacity-25 after:translate-x-1/4 after:z-0 after:rounded-full">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto relative z-10">
          <h2
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
            data-aos-delay="100"
            data-aos-offset="200"
            className="text-center font-HelveticaNeueMedium font-medium lg:text-5xl md:text-[40px] text-[26px] text-primary md:py-10 pb-5">
            <span className="relative after:content after:absolute after:bottom-[-6px] md:after:bottom-[-2px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Latest News
            </span>
          </h2>
          {allNewsList.data.map((val: any, index: any) => {
            return (
              <div
                className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-[20px] mb-6 sm:mt-5  "
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-easing="ease"
                data-aos-delay={val.delay}
                key={index}>
                <Image
                  className="md:w-[315px] rounded-[10px] object-cover w-full"
                  src={`https://vidalco.in${val.image.url}`}
                  width={315}
                  height={240}
                  alt="football match"
                />
                <div className="sm:pt-0 pt-3">
                  {/* NEWS HEADING */}
                  <h3 className="sm:text-basemd text-[18px] text-primary font-HelveticaNeueMedium leading-[140%]">
                    {val.title}{" "}
                  </h3>
                  <div className="flex sm:items-center sm:flex-row flex-col sm:gap-3 gap-2 pt-2">
                    <h4 className="lg:pe-3 ">
                      <span className="lg:text-md text-base text-primary font-Segoe opacity-80 font-normal lg:pe-2 pe-1">
                        by
                      </span>{" "}
                      <span className="lg:text-base text-sm text-primary font-Segoe font-semibold">
                        {val.author.fullName}
                      </span>
                    </h4>
                    {/* NEWS CATEGORY */}
                    {val.categories.map((obj: any, i: any) => {
                      return (
                        <span key={i} className="flex gap-x-3">
                          <button className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtittles rounded-full leading-[150%] duration-300 hover:text-white">
                            {obj.title}
                          </button>
                        </span>
                      );
                    })}
                  </div>
                  {/* NEWS DATA */}
                  <p className="sm:text-md text:base text-primary opacity-80 font-Segoe leading-[150%] sm:pt-6 pt-3 lg:pe-14 sm:pe-4">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center items-center pt-4 md:pb-14 lg:mb-10">
            <Link href="/news">
              <BlueButton text="View all" />
            </Link>
          </div>
        </div>
        {/* BACKGROUND RIGHT GRID */}
        <Image
          className="xl:w-[600px] lg:[550px] sm:w-[400px] w-[250px] absolute bottom-10 right-[-50px] -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={716}
          height={692}
          alt={"grid image"}
        />
        {/* BACKGROUND LEFT GRID */}
        <Image
          className="xl:w-[606px] lg:[550px] sm:w-[400px] w-[250px] absolute top-40 -translate-y-1/3 left-2 -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={716}
          height={692}
          alt={"grid image"}
        />
      </div>
    </>
  );
};

export default LatestNews;
