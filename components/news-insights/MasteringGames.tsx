import Image from "next/image";
import React from "react";

const MasteringGame = () => {
  return (
    <>
      <section className="lg:pb-12 relative">
        <Image
          className="lg:w-[462px] lg:h-[441px] w-40 lg:-top-28 lg:-left-10 absolute -z-20 opacity-50"
          src="/assets/img/svg/news-grid-line.svg"
          width={400}
          height={448}
          alt="grid-line"
        />
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
          <div className="xl:mt-[190px] lg:mt-[108px] md:mt-[60px] mt-[48px] relative z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:-top-24 before:-left-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
            <Image
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="100"
              src="/assets/img/webp/news-playing-image.webp"
              width={1140}
              height={556}
              alt="players"
              className="w-full h-full"
            />
            <div className="lg:mt-14 md:mt-7 mt-5 relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:-top-20 before:-end-60 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
              <h3
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-HelveticaNeueMedium text-[#FDFEFF]  font-medium text-[22px] sm:text-lg leading-8 md:leading-[39px] sm:text-start text-center"
              >
                "Mastering the Game: A Coach's Guide to Unlocking Football
                Strategies"
              </h3>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-Segoe text-[#B1B5B8] mt-2 font-normal text-base sm:text-start text-center"
              >
                by: Graham Clark.23 June 2023
              </p>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-Segoe font-normal text-md lg:mt-4 mt-2 leading-7 text-[#B1B5B8] sm:text-start text-center"
              >
                Football strategies are the tactical blueprints that coaches
                devise to guide their teams to success on the field. These
                strategies encompass a wide range of aspects, including
                formations, player positioning, ball distribution, defensive and
                offensive tactics, and set-piece plays. A seasoned coach
                understands the intricacies of the game and utilizes strategies
                to maximize their team's strengths while exploiting the
                weaknesses of their opponents.
              </p>
            </div>
            <div className="mt-6">
              <h3
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-HelveticaNeueMedium text-[#FDFEFF] font-medium text-[22px] sm:text-basemd leading-8 md:leading-[39px] m-0 sm:text-start text-center"
              >
                "Elevate your game, ignite your passion, and conquer the field!"
              </h3>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-Segoe font-normal text-md leading-7 text-[#B1B5B8] mt-2 lg:scroll-pt-0.5 lg:max-w-[1140px] sm:text-start text-center"
              >
                Are you ready to unlock your full potential and leave your mark
                on the football field? Join us on a journey of inspiration and
                transformation as we embark on a relentless pursuit of
                greatness. Our dedicated coach is here to guide, motivate, and
                push you beyond your limits, instilling in you the unwavering
                belief that anything is possible. Through intense training,
                tactical mastery, and unwavering discipline, we will shape you
                into a formidable force on the pitch.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="200"
              className="mt-6"
            >
              <h3 className="font-HelveticaNeueMedium text-[#FDFEFF] font-medium text-[22px] sm:text-basemd leading-8 md:leading-[39px] m-0 sm:text-start text-center">
                "Unveiling the Winning Formula: Where Strategy Meets Victory!"
              </h3>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                className="font-Segoe font-normal text-md leading-7 text-[#B1B5B8] mt-2 lg:pt-0.5 lg:max-w-[1024px] sm:text-start text-center"
              >
                Welcome to the realm of strategic mastery on the football field.
                Our coach is your guiding light, unveiling the secrets behind a
                winning game plan that leaves opponents in awe. Prepare to dive
                into a world where meticulous planning, calculated moves, and
                tactical brilliance reign supreme.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MasteringGame;
