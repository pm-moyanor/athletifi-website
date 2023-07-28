import React from "react";
import {
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  TiktokIcon,
  TwitterIcon,
} from "./Icon";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-[#00C7FF]">
        <div className=" container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto  flex flex-col md:flex-row gap-5 items-center justify-between py-7">
          <ul className=" flex gap-lg-10 gap-5">
            <li>
              <Link
                className=" text-white text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className=" text-white text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out"
                href="/about-us"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className=" text-white text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out"
                href="/news"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                className=" text-white text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out"
                href="/socials"
              >
                Socials
              </Link>
            </li>
          </ul>
          <p className=" text-white text-sm font-Segoe opacity-70">
            @2023 Athletifi
          </p>
          <div className="flex gap-4">
            <Link className="hover:-translate-y-2 transition duration-300 ease-out" href="#" target="_blank" rel="noopener noreferrer">
              <TiktokIcon />
            </Link>
            <Link className="hover:-translate-y-2 transition duration-300 ease-out" href="#" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </Link>
            <Link className="hover:-translate-y-2 transition duration-300 ease-out" href="#" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </Link>
            <Link className="hover:-translate-y-2 transition duration-300 ease-out" href="#" target="_blank" rel="noopener noreferrer">
              <InstaIcon />
            </Link>
            <Link className="hover:-translate-y-2 transition duration-300 ease-out" href="#" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
