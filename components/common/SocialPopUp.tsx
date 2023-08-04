import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowButton,
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  TiktokIcon,
  TwitterIcon,
  CancelIcon,
} from "./Icon";

const SocialPopUp = () => {
  return (
    <>
      <div className="min-h-screen bg_social_icon flex items-center justify-center gap-[20px] flex-col-reverse sm:flex-row fixed top-0 left-0 w-full z-20">
        <Link
          href="/sign-up"
          className="sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out social_btn_contact_us"
        >
          Contact Us
          <span className="group-hover:translate-x-3 transition duration-300 ease-out">
            <ArrowButton />
          </span>
        </Link>
        <div className="flex gap-4">
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out"
            href="https://www.tiktok.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokIcon />
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out"
            href="https://twitter.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out"
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
          </Link>
          <Link
            className="hover:-translate-y-2 transition duration-300 ease-out"
            href="https://in.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SocialPopUp;
