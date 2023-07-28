import Image from "next/image";
import React from "react";
import { ButtonArrow } from "../common/Icon";

const OurStrategicAdvisor = () => {
  return (
    <>
      <div className="bg-strategic-advisor bg-no-repeat bg-cover">
        <div className="container">
          <div className="flex items-center justify-center lg:gap-8 xl:gap-[114px] flex-col-reverse lg:flex-row py-16 lg:pt-[95px] lg:pb-[165px]">
            <Image
              className="max-w-[270px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[475px] mt-8 lg:mt-0"
              src="/assets/img/png/meet_our_strategic_profile.png"
              alt="profile"
              width={475}
              height={430}
            />
            <div className="lg:max-w-[555px]">
              <h3 className="text-primary font-HelveticaNeueMedium text-[30px] sm:text-[36px] md:text-[43px] xl:text-xl font-medium md:leading-[60px]">
                <span className="relative after:absolute after:bottom-[-5px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
                  Meet our
                </span>{" "}
                strategic advisor Darren John
              </h3>
              <p className="text-primary text-base md:text-md font-Segoe font-normal opacity-80 mt-4">
                In 2009 Darren played in the Trinidad and Tobago pro league as a
                16 year old where he completed one year with Northeast Stars
                before migrating to the U.S. During his coaching career Darren
                has coached at several clubs in Montgomery County which includes
                Philadelphia Union pre academy and FC Delco. He is also the
                technical director of the Villanova Soccer Academy.
              </p>
              <button className="flex items-center bg-skyblue py-[10px] px-[20px] sm:py-[14px] sm:px-[27px]  mt-[40px] border border-skyblue hover:bg-transparent duration-300 join_now_btn">
                <span className="text-black duration-300 font-Segoe text-sm sm:text-base font-semibold">
                  Join now
                </span>
                <ButtonArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStrategicAdvisor;
