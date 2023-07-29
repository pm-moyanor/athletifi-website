import Image from "next/image";
import React from "react";

interface HeroProps {
  // Define the properties of the 'hero' object
  // For example:
  title: string;
  subtitle: string;
  heading: string;
  // Add more properties if necessary
}

const CommonHero: React.FC<{ hero: HeroProps }> = ({ hero }) => {
  return (
    <>
      <section className="relative">
        <Image
          className="absolute start-1/2 -top-28 -z-10 -translate-x-1/2"
          src="/assets/img/png/about-hero-center-shadow.png"
          alt="about-hero-shadow"
          width={1494}
          height={1494}
        />
        <Image
          className="absolute end-0 md-top-28 -z-10 -translate-x-0"
          src="/assets/img/png/yellow-shadow-hero.png"
          alt="about-hero-shadow"
          width={1494}
          height={1494}
        />
        <Image
          className="absolute start-0 md-top-28 -z-10 translate-x-0"
          src="/assets/img/png/left-shadow-about-hero.png"
          alt="about-hero-shadow"
          width={1494}
          height={1494}
        />
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
          <div className="md:pb-24 md:pt-[189px] pb-12 pt-32">
            <h2
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-offset="100"
              className="font-HelveticaNeueMedium font-medium text-[30px] sm:text-[45px] lg:text-[50px] xl:text-xxl text-white leading-[66px] text-center md:pb-14"
            >
              {hero.heading}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommonHero;
