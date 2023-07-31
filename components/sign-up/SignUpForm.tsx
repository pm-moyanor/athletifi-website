import Image from "next/image";
import React, { useState } from "react";
import { ButtonWhiteArrow, UnderLIneText } from "../common/Icon";

const SignUpForm = () => {
  const [checked, setChecked] = useState(false);
  return (
    <section className="py-8 sm:py-[64px] lg:pt-[100px] xl:pt-[145px] lg:pb-[100px] xl:pb-[139px] relative z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:top-2 before:-left-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full overflow-hidden">
      <Image
        className="lg:w-[462px] lg:h-[452px] w-40 h-40 lg:top-10 lg:-left-10 absolute -z-20 opacity-40"
        src="/assets/img/svg/news-grid-line.svg"
        width={400}
        height={448}
        alt="grid-line"
      />
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
        <div className="flex justify-between flex-wrap grid-cols-2 w-full">
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="font-HelveticaNeueMedium font-medium text-[24px] md:text-5xl sm:text-4xl leading-[60px] text-[#FDFEFF] md:mb-3">
                <span className="relative">
                  Sign Up!
                  <span className="absolute -bottom-3 left-0">
                    <UnderLIneText />
                  </span>
                </span>
              </h2>
              <p className="font-Segoe font-normal text-md md:max-w-[365px] text-center lg:text-start text-[#FDFEFF] mx-auto lg:ms-0 leading-[27px] sm:pt-4 md:pt-3">
                Signup for exclusive updates! Become part of the sport's
                revolution.
              </p>
              <p className="font-Segoe font-normal text-md md:max-w-[600px] lg:max-w-[543px] text-center lg:text-start text-white mx-auto lg:ms-0 opacity-70 mt-2 sm:pt-0.5 leading-[27px]">
                By subscribing, you're not only embracing the future of sports
                collectibles, but you're also at the ground floor of changing
                the world of access to sports as we know them today-- a future
                of sports where anyone can get exposure to scouts.
              </p>
              <form action="submit" className="w-full sm:w-3/4">
                <div className="flex flex-col mt-6">
                  <label
                    className="font-Segoe font-normal group text-md md:max-w-[365px] text-[#FDFEFF] opacity-80 leading-[27px]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="font-Sugoe font-normal input:-webkit-autofill focus:border-[white] autofill:none text-base text-[#FDFEFF] leading-6 py-5 px-4 bg-transparent w-full lg:max-w-[400px] mt-[5px] border border-1 border-[#FFFFFF40] outline-none"
                    id="email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    className="font-Segoe font-normal input:-webkit-autofill text-md md:max-w-[365px] text-[#FDFEFF] opacity-80 leading-[27px]"
                    htmlFor="Password"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="Password"
                    placeholder="Password"
                    className="font-Sugoe font-normal text-base focus:border-[white] text-[#FDFEFF] leading-6 py-5 px-4 bg-transparent w-full lg:max-w-[400px] mt-[5px] border border-1 border-[#FFFFFF40] outline-none"
                    id="Password"
                  />
                </div>
                <div className="mt-4 gap-3 flex items-start sm:items-center">
                  <div
                    onClick={() => setChecked(!checked)}
                    className="mt-1 sm:mt-0 cursor-pointer"
                  >
                    <span className="after:border flex justify-center items-center after:border-1 relative after:border[#FFFFFF63] after:bg-transparent after:inline-block after:left-0 after:top-0 after:rounded after:w-5 after:h-5 after:absolute z-0">
                      {checked ? (
                        <>
                          <Image
                            className=" pt-1 ps-1"
                            src="/assets/img/png/white-check-icon.png"
                            width={15}
                            height={15}
                            alt="checked-image"
                          />
                        </>
                      ) : (
                        <>
                          <>
                            <Image
                              className="invisible pt-1 ps-1"
                              src="/assets/img/png/check-icon.png"
                              width={15}
                              height={15}
                              alt="checked-image"
                            />
                          </>
                        </>
                      )}
                    </span>
                  </div>

                  <span className="font-Segoe font-normal sm:pt-1 text-md md:max-w-[365px] text-[#FDFEFF] opacity-80 leading-[27px] ">
                    I agree to all Term, Privacy Policy and Fees
                  </span>
                </div>

                <div className="flex mt-6 md:mt-8 lg:max-w-[400px]">
                  <button
                    type="submit"
                    className="sm:w-full justify-center text-center sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out"
                  >
                    Sign Up
                    <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                      <ButtonWhiteArrow />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:w-1/2 sm:w-3/5 mx-auto w-full relative flex justify-center items-center z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:-bottom-28 before:-right-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
            <Image
              className="xl:max-w-[658px] xl:h-[610px] lg:absolute lg:right-0 mt-10 lg:mt-0"
              src="/assets/img/webp/signup-img.webp"
              width={658}
              height={598}
              alt="signUp-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
