import Image from "next/image";
import React from "react";
import { ButtonArrow } from "../common/Icon";
import BlueButton from "../common/BlueButton";

const OurStrategicAdvisor = () => {
  return (
    <>
      <div className="bg-strategic-advisor bg-no-repeat bg-cover">
        <div className="container">
          <div className="flex items-center justify-center lg:gap-8 xl:gap-[114px] flex-col-reverse lg:flex-row pt-14 pb-14 xl:pt-[95px] xlpb-[150px]">
            <Image
              className="max-w-[270px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[475px] xl:max-h-[430px] mt-8 lg:mt-0 shadow-coach-shadow"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-easing="linear"
              data-aos-delay="500"
              data-aos-offset="200"
              src="/assets/img/png/meet_our_strategic_profile.png"
              alt="profile"
              width={475}
              height={430}
            />
            <div
              className="lg:max-w-[555px]"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-easing="linear"
              data-aos-delay="500"
              data-aos-offset="200"
            >
              <h3 className="text-primary font-HelveticaNeueMedium text-[26px] sm:text-[36px] xl:text-5xl lg:text-[43px] md:text-[40px] font-medium lg:!leading-[60px] sm:leading-[45px] md:leading-[58px] leading-[36px] text-center lg:text-start">
                <span className="relative after:absolute after:bottom-[-8px] sm:after:bottom-[-5px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
                  Meet our
                </span>{" "}
                strategic advisor Darren John
              </h3>
              <p className="text-primary text-base md:text-md font-Segoe font-normal opacity-80 mt-4 text-center lg:text-start">
                In 2009 Darren played in the Trinidad and Tobago pro league as a
                16 year old where he completed one year with Northeast Stars
                before migrating to the U.S. During his coaching career Darren
                has coached at several clubs in Montgomery County which includes
                Philadelphia Union pre academy and FC Delco. He is also the
                technical director of the Villanova Soccer Academy.
              </p>
              <div className="flex justify-center lg:justify-start pt-5 lg:pt-10">
                <BlueButton text="Join now" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStrategicAdvisor;
