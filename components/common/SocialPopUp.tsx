import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowButton,
  FacebookIcon,
  LinkedInIcon,
  TiktokIcon,
  TwitterIcon,
} from "./Icon";

const SocialPopUp = () => {
  return (
    <>
      <div className="bg_social_icon flex items-start justify-center gap-[20px] fixed top-[90px] left-1/2 z-20 flex-col-reverse p-6">
        {/* CONTACT US BUTTON */}
        <Link
          href="/sign-up"
          className="sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out social_btn_contact_us"
        >
          Contact Us
          <span className="group-hover:translate-x-3 transition duration-300 ease-out">
            <ArrowButton />
          </span>
        </Link>
        <div className="flex gap-4 flex-col">
          {/* SOCIAL ICONS LINKS */}
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out flex items-center"
            href="https://www.tiktok.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Tiktok
            </span>
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300  flex items-center"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Facebook
            </span>
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300  flex items-center"
            href="https://twitter.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Twitter
            </span>
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300  flex items-center"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/img/svg/Instagram.svg"
              alt="grid-lines"
              width={32}
              height={32}
            />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Instagram
            </span>
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300  flex items-center"
            href="https://in.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Linkedin
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SocialPopUp;
