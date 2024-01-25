import Image from 'next/image';
import React from 'react';

// COMMON HEADING
export interface heroProps {
  heading: string;
  title?: string;
  subtitle?: string;
}

const HERO_SHADOW_IMAGE_WIDTH = 1494;
const HERO_SHADOW_IMAGE_HEIGHT = 1494;
const AOS_DURATION = 600;
const AOS_OFFSET = 100;

const CommonHero: React.FC<{ hero: heroProps }> = ({ hero }) => {
  return (
    <>
      <section className="relative">
        {/* HERO SHADOW */}
        <Image
          className="absolute start-1/2 -top-28 -z-10 -translate-x-1/2"
          src="/assets/img/png/about-hero-center-shadow.png"
          alt=""
          width={HERO_SHADOW_IMAGE_WIDTH}
          height={HERO_SHADOW_IMAGE_HEIGHT}
        />
        <Image
          className="absolute end-0 md-top-28 -z-10 -translate-x-0"
          src="/assets/img/png/yellow-shadow-hero.png"
          alt=""
          width={HERO_SHADOW_IMAGE_WIDTH}
          height={HERO_SHADOW_IMAGE_HEIGHT}
        />
        <Image
          className="absolute start-0 md-top-28 -z-10 translate-x-0"
          src="/assets/img/png/left-shadow-about-hero.png"
          alt=""
          width={HERO_SHADOW_IMAGE_WIDTH}
          height={HERO_SHADOW_IMAGE_HEIGHT}
        />
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 relative z-10">
          <div className="sm:pb-16 sm:pt-160 xl:pb-126 xl:pt-170 pb-16 pt-36">
            <h1
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-offset={AOS_OFFSET}
              className="font-HelveticaNeueMedium font-medium text-lgxl sm:text-lgxl md:text-6xl lg:text-7xl text-white sm:leading-66 text-center leading-110"
            >
              {hero.heading}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommonHero;
