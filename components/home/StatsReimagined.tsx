import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const StatsReimagined = () => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
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
    <section className="py-14 sm:mb-10 lg:mb-20 xl:mb-[125px] relative lg:mt-10 sl:mt-0">
      <div className="absolute sm:-bottom-[40px] lg:-bottom-[100px`] bottom-0 start-0 lg:w-[230px] lg:h-[286px] -z-[] opacity-30">
        <Image
          className="xl:max-w-[240px] sm:max-w-[140px] max-w-[100px]"
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
        <div className="blue_Linear_Gradient lg:pb-6 relative after:absolute flex justify-center flex-col items-center">
          <h2
            className="lg:text-5xl md:text-[40px] sm:text-4xl text-[24px]   text-primary font-medium font-HelveticaNeueMedium relative z-20 max-w-[539px] mx-auto text-center md:pt-9 pt-6 px-3 md:px-0 lg:pt-[72px] sm:leading-[45px] md:!leading-[60px]"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            <span className="relative after:content after:absolute after:bottom-[-8px] sm:after:bottom-[-4px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Stats Reimagined.
            </span>{" "}
            Exposure elevated.
          </h2>
          <p
            className="font-Segoe font-normal text-md text-center text-[#FDFEFF] leading-7 px-4 md:px-0 max-w-[700px] lg:max-w-[769px] mx-auto md:mt-4 mt-2 relative z-20"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="400"
            data-aos-offset="200"
          >
            Experience the future of sports collectibles as we integrate dynamic
            statistics into every card, taking your passion for the game to new
            heights. Every goal, pass, and block is updated on the digital
            trading card within 48 hours after every game.{" "}
            <span className="block md:mt-4 mt-2">
              Each purchase directly supports underserved athletes, making club
              soccer more accessible and empowering dreams to flourish.
            </span>
          </p>
          <Slider
            {...settings}
            className="w-full justify-between items-center pt-5 md:pt-0 max-w-[1000px] mx-auto lg:justify-center relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:-top-20 before:left-1/2 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/2 before:-z-10 before:rounded-full"
          >
            <div
              className=" md:py-20 pt-15 sm:pb-10"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="400"
            >
              <Image
                className="mx-auto w-full max-w-[350px]"
                src="/assets/img/webp/castle.webp"
                width={280}
                height={280}
                alt="castle-img"
              />
            </div>
            <div
              className=" md:py-20 pt-15 sm:pb-10 relative z-10 "
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="800"
            >
              <Image
                className="mx-auto md:scale-125 w-full max-w-[350px]"
                src="/assets/img/webp/space.webp"
                width={409}
                height={409}
                alt="space-image"
              />
            </div>
            <div
              className=" md:py-20 pt-15 sm:pb-10 "
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="1200"
            >
              <Image
                className="mx-auto w-full max-w-[300px] lg:max-w-[350px] pt-5"
                src="/assets/img/webp/phoenix.webp"
                width={280}
                height={280}
                alt="phonix-image"
              />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default StatsReimagined;
